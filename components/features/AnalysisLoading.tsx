'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSearch, ClipboardCheck, PieChart, CheckCircle } from 'lucide-react';

interface AnalysisLoadingProps {
  onCancel?: () => void;
}

export default function AnalysisLoading({ onCancel }: AnalysisLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const steps = [
    {
      title: 'Extracting keywords from CV',
      icon: <FileSearch className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Analyzing job requirements',
      icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Matching skills and experience',
      icon: <PieChart className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Generating ATS compatibility score',
      icon: <CheckCircle className="w-8 h-8 text-blue-500" />
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + 0.5, 100);
        
        // Update steps based on progress
        if (newProgress > 25 && currentStep < 1) setCurrentStep(1);
        else if (newProgress > 50 && currentStep < 2) setCurrentStep(2);
        else if (newProgress > 75 && currentStep < 3) setCurrentStep(3);
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, [currentStep]);
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-6">Analyzing Your CV</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Our AI HR agent is analyzing your CV against the job description...
      </p>
      
      <div className="mb-8">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          
          return (
            <motion.div 
              key={index}
              className={`flex items-center ${
                isActive || isComplete
                  ? 'opacity-100'
                  : 'opacity-50'
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: isActive || isComplete ? 1 : 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`flex-shrink-0 mr-4 ${isActive ? 'animate-pulse' : ''}`}>
                {step.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                {isActive && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Processing...
                  </p>
                )}
                {isComplete && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-0.5">
                    Complete
                  </p>
                )}
              </div>
              {isComplete && (
                <CheckCircle className="ml-auto text-green-500 w-5 h-5" />
              )}
            </motion.div>
          );
        })}
      </div>
      
      {onCancel && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Cancel Analysis
          </button>
        </div>
      )}
    </motion.div>
  );
}