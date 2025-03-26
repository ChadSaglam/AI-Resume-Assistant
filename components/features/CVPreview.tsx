'use client';
import React, { useState } from 'react';
import { parseCVText } from '@/lib/cv-parser';
import { Download, Eye, Sparkles, ExternalLink, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import ModernCVPreview from '@/components/templates/ModernCV';
import ClassicCVPreview from '@/components/templates/ClassicCV';

interface CVPreviewProps {
  text: string;
  profileImage: string | null;
}

export default function CVPreview({ text, profileImage }: CVPreviewProps) {
  const [previewStyle, setPreviewStyle] = useState<'modern' | 'classic'>('modern');
  
  // Parse the CV text to get structured data for better display
  const cvData = parseCVText(text || '');
  
  // Function to download CV
  const downloadCV = () => {
    const fileName = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.txt`;
    
    // Create a blob from the text
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    
    // Create an object URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  // Print CV function
  const printCV = () => {
    window.print();
  };
  
  return (
    <Card className="overflow-hidden border-0 rounded-xl shadow-lg">
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <FileSearch className="w-6 h-6 text-blue-600" />
            CV Preview
          </h2>
          
          <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
            <Tabs 
              value={previewStyle} 
              onValueChange={(v) => setPreviewStyle(v as 'modern' | 'classic')}
            >
              <TabsList className="h-10 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-1 rounded-lg">
                <TabsTrigger 
                  value="modern" 
                  className="h-8 px-3 flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Modern</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="classic" 
                  className="h-8 px-3 flex items-center gap-1.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Classic</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="h-10 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-1 rounded-lg inline-flex">
              <Button 
                onClick={downloadCV} 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 flex items-center gap-1.5 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Download</span>
              </Button>
              
              <Button 
                onClick={printCV} 
                variant="ghost" 
                size="sm" 
                className="h-8 px-3 flex items-center gap-1.5 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Print</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 overflow-auto max-h-[70vh] print:max-h-none">
        <AnimatePresence mode="wait">
          {previewStyle === 'modern' ? (
            <motion.div
              key="modern"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ModernCVPreview cvData={cvData} profileImage={profileImage} />
            </motion.div>
          ) : (
            <motion.div
              key="classic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ClassicCVPreview cvData={cvData} profileImage={profileImage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}