'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, ChevronLeft, ChevronRight, ScrollText } from 'lucide-react';
import PersonalSection from './cv-sections/PersonalSection';
import ContactSection from './cv-sections/ContactSection';
import ExperienceSection from './cv-sections/ExperienceSection';
import EducationSection from './cv-sections/EducationSection';
import ExpertiseSection from './cv-sections/ExpertiseSection';
import LanguageSection from './cv-sections/LanguageSection';
import CertificateSection from './cv-sections/CertificateSection';
import { CVData } from '@/types/cv-types';
import { parseCVText, generateCVText } from '@/lib/cv-parser';
import { motion } from 'framer-motion';
import { defaultCV } from '@/data/mock/cv';
import { useToast } from '../ui/Toast';

interface CVEditorProps {
  initialText?: string;
  profileImage: string | null;
  onCVChange?: (cv: CVData) => void;
  onProfileImageChange?: (image: string | null) => void;
}

export default function CVEditor({ 
  initialText, 
  profileImage, 
  onCVChange, 
  onProfileImageChange 
}: CVEditorProps) {
  // Parse initial text or use default CV
  const getInitialCV = () => {
    if (initialText) {
      return parseCVText(initialText);
    }
    return parseCVText(defaultCV);
  };

  const [cv, setCv] = useState<CVData>(getInitialCV());
  const [activeTab, setActiveTab] = useState("personal");
  const [hasChanges, setHasChanges] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const { showToast } = useToast();

  // Check if scrolling controls should be visible
  useEffect(() => {
    const checkScroll = () => {
      if (tabsListRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    // Initial check
    checkScroll();

    // Add event listener for resize
    window.addEventListener('resize', checkScroll);
    
    // Add event listener for scroll inside the tabs list
    tabsListRef.current?.addEventListener('scroll', checkScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScroll);
      tabsListRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  // Handle tab scroll buttons
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = 200; // Adjust as needed
      const newScrollLeft = direction === 'left' 
        ? tabsListRef.current.scrollLeft - scrollAmount 
        : tabsListRef.current.scrollLeft + scrollAmount;
      
      tabsListRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Function to handle tab selection and scrolling
  const handleTabSelection = (tabId: string) => {
    setActiveTab(tabId);
    
    // Ensure the selected tab is visible (auto scroll if needed)
    setTimeout(() => {
      if (tabsListRef.current) {
        const tabElement = tabsListRef.current.querySelector(`[data-value="${tabId}"]`);
        if (tabElement) {
          const tabRect = tabElement.getBoundingClientRect();
          const containerRect = tabsListRef.current.getBoundingClientRect();
          
          if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
            // Cast the element to HTMLElement to access offsetLeft
            const htmlTabElement = tabElement as HTMLElement;
            tabsListRef.current.scrollTo({
              left: htmlTabElement.offsetLeft - 20,
              behavior: 'smooth'
            });
          }
        }
      }
    }, 50);
  };

  // Update parent component with CV changes
  useEffect(() => {
    if (onCVChange) {
      onCVChange(cv);
    }
    setHasChanges(true);
  }, [cv, onCVChange]);

  // Save CV locally in browser storage
  const saveCV = () => {
    localStorage.setItem('saved-cv', JSON.stringify(cv));
    setHasChanges(false);
    
    // Use showToast instead of toast.show
    showToast({
      title: "CV Saved",
      description: "Your CV has been saved successfully.",
      variant: "success",
      duration: 3000,
    });
  };

  // Handle changes to each section
  const handlePersonalInfoChange = (updatedInfo: CVData['personalInfo']) => {
    setCv(prev => ({ ...prev, personalInfo: updatedInfo }));
  };

  const handleContactInfoChange = (updatedInfo: CVData['contactInfo']) => {
    setCv(prev => ({ ...prev, contactInfo: updatedInfo }));
  };

  const handleExperiencesChange = (updatedExperiences: CVData['experiences']) => {
    setCv(prev => ({ ...prev, experiences: updatedExperiences }));
  };

  const handleEducationChange = (updatedEducation: CVData['education']) => {
    setCv(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleExpertiseChange = (updatedExpertise: CVData['expertise']) => {
    setCv(prev => ({ ...prev, expertise: updatedExpertise }));
  };

  const handleLanguagesChange = (updatedLanguages: CVData['languages']) => {
    setCv(prev => ({ ...prev, languages: updatedLanguages }));
  };

  const handleCertificatesChange = (updatedCertificates: CVData['certificates']) => {
    setCv(prev => ({ ...prev, certificates: updatedCertificates }));
  };
  
  const handleProfileImageChange = (image: string | null) => {
    if (onProfileImageChange) {
      onProfileImageChange(image);
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
          <ScrollText className="w-6 h-6 text-blue-600" />
          CV Editor
        </h2>
        <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
          <div className="h-10 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-1 rounded-lg inline-flex">
            <Button
              onClick={saveCV}
              variant={hasChanges ? "default" : "ghost"}
              size="sm"
              className={`h-8 px-3 flex items-center gap-1.5 ${hasChanges 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50"}`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden border-0 rounded-xl shadow-lg">
        <Tabs defaultValue="personal" value={activeTab} onValueChange={handleTabSelection}>
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            {/* Left scroll button */}
            {showLeftScroll && (
              <motion.button 
                onClick={() => scrollTabs('left')}
                className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-blue-50 to-transparent dark:from-gray-800/90 dark:to-transparent px-2 flex items-center"
                aria-label="Scroll tabs left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </motion.button>
            )}
            
            {/* Scrollable tabs */}
            <div 
              className="overflow-x-auto scrollbar-hide"
              ref={tabsListRef}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <TabsList className="w-max min-w-full flex px-4 bg-transparent h-14">
                {[
                  { id: 'personal', label: 'Personal' },
                  { id: 'contact', label: 'Contact' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'education', label: 'Education' },
                  { id: 'expertise', label: 'Expertise' },
                  { id: 'languages', label: 'Languages' },
                  { id: 'certificates', label: 'Certificates' }
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-t-lg h-12 transition-all"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Right scroll button */}
            {showRightScroll && (
              <motion.button 
                onClick={() => scrollTabs('right')}
                className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-blue-50 to-transparent dark:from-gray-800/90 dark:to-transparent px-2 flex items-center"
                aria-label="Scroll tabs right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </motion.button>
            )}
          </div>
          
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-800">
            <TabsContent value="personal" className="m-0 mt-2">
              <PersonalSection 
                data={cv.personalInfo} 
                profileImage={profileImage}
                onImageChange={handleProfileImageChange}
                onChange={handlePersonalInfoChange} 
              />
            </TabsContent>
            
            <TabsContent value="contact" className="m-0 mt-2">
              <ContactSection data={cv.contactInfo} onChange={handleContactInfoChange} />
            </TabsContent>
            
            <TabsContent value="experience" className="m-0 mt-2">
              <ExperienceSection experiences={cv.experiences} onChange={handleExperiencesChange} />
            </TabsContent>
            
            <TabsContent value="education" className="m-0 mt-2">
              <EducationSection education={cv.education} onChange={handleEducationChange} />
            </TabsContent>
            
            <TabsContent value="expertise" className="m-0 mt-2">
              <ExpertiseSection expertise={cv.expertise} onChange={handleExpertiseChange} />
            </TabsContent>
            
            <TabsContent value="languages" className="m-0 mt-2">
              <LanguageSection languages={cv.languages} onChange={handleLanguagesChange} />
            </TabsContent>
            
            <TabsContent value="certificates" className="m-0 mt-2">
              <CertificateSection certificates={cv.certificates} onChange={handleCertificatesChange} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
      
      {/* Progress indicator */}
      <div className="hidden sm:flex justify-center">
        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
          {['personal', 'contact', 'experience', 'education', 'expertise', 'languages', 'certificates'].map((step, i) => (
            <React.Fragment key={step}>
              <div 
                className={`w-2 h-2 rounded-full ${
                  activeTab === step 
                    ? 'bg-blue-600 dark:bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              ></div>
              {i < 6 && <div className="w-6 h-px bg-gray-300 dark:bg-gray-700"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}