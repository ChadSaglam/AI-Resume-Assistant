import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Step, ModernStepperProps } from '@/types/ui-types';

export default function ModernStepper({ steps, currentStep }: ModernStepperProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full py-6">
      <div className="flex flex-col md:flex-row gap-0 md:gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <motion.div 
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isCurrent 
                    ? 'bg-blue-50 border-l-4 border-blue-600 dark:bg-blue-900/20 dark:border-blue-500' 
                    : isCompleted 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-gray-400 dark:text-gray-500'
                } flex-1 mb-1 md:mb-0`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Number or check */}
                <div className={`flex-shrink-0 w-8 h-8 mr-3 flex items-center justify-center rounded-full ${
                  isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {/* Labels */}
                <div className="flex flex-col">
                  <span className={`font-medium ${
                    isCurrent 
                      ? 'text-blue-700 dark:text-blue-400' 
                      : isCompleted 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {step.description}
                    </span>
                  )}
                </div>
              </motion.div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8">
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-700" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}