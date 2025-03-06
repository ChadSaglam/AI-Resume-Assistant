'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';
import ModernStepper from '@/components/ui/ModernStepper';
import CVUploader from '@/components/features/CVUploader';
import PdfViewer from '@/components/features/PdfViewer';
import JobDetailsForm from '@/components/features/JobDetailsForm';
import AnalysisLoading from '@/components/features/AnalysisLoading';
import AnalysisResults from '@/components/features/AnalysisResults';
import LetterGenerator from '@/components/features/LetterGenerator';
import Modal from '@/components/ui/Modal';
import { Step } from '@/types/ui-types';
import { JobDetailsData } from '@/types/job-types';
import { CVAnalysisResult } from '@/types/analysis-types';

// Define the steps for our process
const steps: Step[] = [
  {
    id: 'upload',
    label: 'Upload CV',
    description: 'Upload your CV in PDF format',
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
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState<string>('');
  const [jobDetails, setJobDetails] = useState<JobDetailsData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('2025-03-06 12:54:55');
  
  // Function to handle file upload
  const handleFileUploaded = (file: File, text: string) => {
    setCvFile(file);
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
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvText,
          jobDetails: jobData
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }
      
      const result = await response.json();
      
      // Simulate a slight delay to show the loading process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      // Handle error - you could set an error state here
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
  // Fixed to directly navigate to letter step without requiring a second click
  const handleConfirmProceed = () => {
    setIsModalOpen(false);
    // Immediately navigate to the letter step - fixed bug
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
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2 sm:mt-0">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>{currentDateTime}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5" />
              <span>ChadSaglam</span>
            </div>
          </div>
        </div>
        
        <ModernStepper steps={steps} currentStep={currentStep} />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: CV Upload */}
        {currentStep === 'upload' && (
          <motion.div
            key="upload-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div>
              <CVUploader onFileUploaded={handleFileUploaded} />
              
              {cvFile && cvText && (
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
            
            <div>
              <PdfViewer file={cvFile} />
            </div>
          </motion.div>
        )}
        
        {/* Step 2: Job Details */}
        {currentStep === 'job' && (
          <motion.div
            key="job-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <JobDetailsForm 
              onSubmit={handleJobDetailsSubmit}
              onBack={goToPreviousStep}
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
          >
            {isAnalyzing ? (
              <AnalysisLoading />
            ) : analysisResult ? (
              <AnalysisResults 
                result={analysisResult}
                onBack={goToPreviousStep}
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
        
        {/* Step 4: Letter Generation */}
        {currentStep === 'letter' && jobDetails && analysisResult && (
          <motion.div
            key="letter-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <LetterGenerator
              cvText={cvText}
              jobDetails={jobDetails}
              analysisResult={analysisResult}
              onBack={goToPreviousStep}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ATS Score Warning"
      >
        <div>
          <div className="mb-4 flex items-start">
            <div className="text-yellow-500 mr-3 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Your CV has a score of {analysisResult?.matchScore}/100
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                This may significantly reduce your chances of passing the ATS filters and getting an interview.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              We recommend addressing the gaps identified in your CV before proceeding. A higher score will improve your chances significantly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={handleReviseCV}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Revise CV First
            </button>
            <button
              onClick={handleConfirmProceed}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}