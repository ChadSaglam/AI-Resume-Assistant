'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ModernStepper from '@/components/ui/ModernStepper';
import CVUploader from '@/components/features/CVUploader';
import CVPreview from '@/components/features/CVPreview';
import JobDetailsForm from '@/components/features/JobDetailsForm';
import AnalysisLoading from '@/components/features/AnalysisLoading';
import AnalysisResults from '@/components/features/AnalysisResults';
import LetterGenerator from '@/components/features/LetterGenerator';
import { Step } from '@/types/ui-types';
import { JobDetailsData } from '@/types/job-types';
import { CVAnalysisResult } from '@/types/analysis-types';

// Define the steps for our process
const steps: Step[] = [
  {
    id: 'upload',
    label: 'Create CV',
    description: 'Create or edit your CV',
    icon: 'file'
  },
  {
    id: 'job',
    label: 'Job Details',
    description: 'Enter job description details',
    icon: 'briefcase'
  },
  {
    id: 'analysis',
    label: 'CV Analysis',
    description: 'Review AI analysis results',
    icon: 'chart'
  },
  {
    id: 'letter',
    label: 'Generate Letter',
    description: 'Create motivation letter',
    icon: 'mail'
  }
];

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState('upload');
  const [cvText, setCvText] = useState<string>('');
  const [jobDetails, setJobDetails] = useState<JobDetailsData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Function to handle CV text 
  const handleCVUploaded = (text: string) => {
    setCvText(text);
  };
  
  // Function to handle job details submission
  const handleJobDetailsSubmit = async (data: JobDetailsData) => {
    setJobDetails(data);
    setCurrentStep('analysis');
    await performAnalysis(data);
  };
  
  // Function to perform the CV analysis
  const performAnalysis = async (jobData: JobDetailsData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      // In a real implementation, this would call your API
      // For demo purposes, we'll create a mock result after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult({
        matchScore: 75,
        strengths: [
          "Strong technical skills in the required technologies",
          "Relevant education background in Computer Science",
          "Previous experience in similar roles"
        ],
        improvementAreas: [
          "Missing some specific keywords from the job description",
          "Experience level slightly below the requirement",
          "No mention of specific industry experience"
        ],
        keywordsMissing: ["Docker", "Kubernetes", "Agile methodology"],
        suggestedImprovements: [
          "Add more details about your experience with cloud technologies",
          "Highlight any Agile development experience",
          "Mention specific projects that demonstrate your skills in the required areas"
        ]
      });
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Function to handle "Continue to Letter Generation" button
  const handleContinueToLetter = () => {
    if (analysisResult && analysisResult.matchScore === 100) {
      // Perfect score, proceed directly
      setCurrentStep('letter');
    } else {
      // Not perfect, show confirmation modal
      setIsModalOpen(true);
    }
  };
  
  // Function to confirm proceeding to letter generation despite non-perfect score
  const handleConfirmProceed = () => {
    setIsModalOpen(false);
    // Immediately navigate to the letter step
    setCurrentStep('letter');
  };
  
  // Navigation functions
  const goToPreviousStep = () => {
    if (currentStep === 'job') setCurrentStep('upload');
    else if (currentStep === 'analysis') setCurrentStep('job');
    else if (currentStep === 'letter') setCurrentStep('analysis');
  };
  
  // Function to handle revision (go back to CV upload step)
  const handleReviseCV = () => {
    setIsModalOpen(false); // Close modal before navigating
    setCurrentStep('upload');
  };
  
  const handleProfileImageChange = (image: string | null) => {
    setProfileImage(image);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Application
          </motion.h1>
        </div>
        
        <ModernStepper steps={steps} currentStep={currentStep} />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: CV Creation/Editing */}
        {currentStep === 'upload' && (
          <motion.div
            key="upload-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <CVUploader 
              onFileUploaded={handleCVUploaded} 
              onProfileImageChange={handleProfileImageChange}
            />
            
            <div className="flex flex-col">
              <CVPreview 
                text={cvText}
                profileImage={profileImage}
              />
              
              {cvText && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <button
                    onClick={() => setCurrentStep('job')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Continue to Job Details
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Job Listing */}
        {currentStep === 'job' && (
          <motion.div
            key="job-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <JobDetailsForm 
              onSubmit={handleJobDetailsSubmit}
              onBack={() => setCurrentStep('upload')}
              initialData={jobDetails || undefined}
            />
          </motion.div>
        )}

        {/* Step 3: Analysis */}
        {currentStep === 'analysis' && (
          <motion.div
            key="analysis-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            {isAnalyzing ? (
              <AnalysisLoading />
            ) : analysisResult ? (
              <AnalysisResults 
                result={analysisResult}
                onBack={() => setCurrentStep('job')}
                onNext={handleContinueToLetter}
                onRevise={handleReviseCV}
              />
            ) : (
              <div className="flex justify-center items-center p-20">
                <p className="text-gray-500 dark:text-gray-400">
                  Preparing analysis...
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4: Letter Generator */}
        {currentStep === 'letter' && jobDetails && analysisResult && (
          <motion.div
            key="letter-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
          >
            <LetterGenerator
              cvText={cvText}
              jobDetails={jobDetails}
              analysisResult={analysisResult}
              onBack={() => setCurrentStep('analysis')}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}