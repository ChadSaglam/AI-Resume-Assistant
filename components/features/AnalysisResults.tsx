'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import { CVAnalysisResult } from '@/types/analysis-types';
import Modal from '@/components/ui/Modal';

interface AnalysisResultsProps {
  result: CVAnalysisResult;
  onBack: () => void;
  onNext: () => void;
  onRevise: () => void;
}

export default function AnalysisResults({ result, onBack, onNext, onRevise }: AnalysisResultsProps) {
  const { matchScore, strengths, gaps, suggestions } = result;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Score ranges for styling and messaging
  const getScoreDetails = () => {
    if (matchScore >= 90) {
      return {
        color: 'bg-green-500',
        textColor: 'text-green-600 dark:text-green-400',
        message: 'Excellent Match',
        description: 'Your CV is well-optimized for this position!'
      };
    } else if (matchScore >= 75) {
      return {
        color: 'bg-yellow-500',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        message: 'Good Match',
        description: 'Your CV matches well but needs some improvements.'
      };
    } else {
      return {
        color: 'bg-red-500',
        textColor: 'text-red-600 dark:text-red-400',
        message: 'Needs Improvement',
        description: 'Your CV needs significant optimization for this job.'
      };
    }
  };
  
  const scoreDetails = getScoreDetails();
  
  const handleContinueClick = () => {
    if (matchScore === 100) {
      // Perfect score, proceed directly
      onNext();
    } else {
      // Not perfect, show confirmation modal
      setIsModalOpen(true);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">ATS Analysis Results</h2>
        
        {/* Score Section */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex items-center justify-center mb-4 md:mb-0 md:mr-6"
            >
              <div className="relative">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200 dark:text-gray-600"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <motion.circle
                    className={`${matchScore >= 90 ? 'text-green-500' : matchScore >= 75 ? 'text-yellow-500' : 'text-red-500'}`}
                    strokeWidth="8"
                    strokeDasharray={58 * 2 * Math.PI}
                    strokeDashoffset={58 * 2 * Math.PI * (1 - matchScore / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                    initial={{ strokeDashoffset: 58 * 2 * Math.PI }}
                    animate={{ strokeDashoffset: 58 * 2 * Math.PI * (1 - matchScore / 100) }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-3xl font-bold">{matchScore}%</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex-1">
              <h3 className={`text-xl font-bold ${scoreDetails.textColor}`}>
                {scoreDetails.message}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {scoreDetails.description}
              </p>
              
              <div className="bg-gray-200 dark:bg-gray-600 h-2.5 rounded-full">
                <motion.div 
                  className={`h-2.5 rounded-full ${matchScore >= 90 ? 'bg-green-500' : matchScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${matchScore}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {matchScore >= 90 
                    ? 'ATS systems will likely rank your CV highly for this position.' 
                    : 'Your CV may need optimization to pass typical ATS filters.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Strengths & Gaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-xl p-5">
            <h3 className="text-green-700 dark:text-green-400 font-bold flex items-center mb-4">
              <Check className="w-5 h-5 mr-2" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full w-5 h-5 mr-2 flex-shrink-0 text-xs">
                    +
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Gaps */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl p-5">
            <h3 className="text-red-700 dark:text-red-400 font-bold flex items-center mb-4">
              <X className="w-5 h-5 mr-2" />
              Gaps to Address
            </h3>
            <ul className="space-y-2">
              {gaps.map((gap, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-full w-5 h-5 mr-2 flex-shrink-0 text-xs">
                    !
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{gap}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Suggestions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold flex items-center mb-3">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            Improvement Suggestions
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-5">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {suggestions}
            </p>
          </div>
        </div>
        
        {/* Keyword Match Details */}
        {result.keywordMatchDetails && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Keyword Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Importance
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Suggestion
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {result.keywordMatchDetails.map((keyword, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {keyword.keyword}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {keyword.found ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Found
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          keyword.importance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                          keyword.importance === 'high' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {keyword.importance.charAt(0).toUpperCase() + keyword.importance.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {keyword.suggestion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
          >
            {/* <ArrowLeft className="w-5 h-5 mr-2" /> */}
            Back to Job Details
          </button>
          
          <button
            onClick={handleContinueClick}
            className={`flex-1 py-3 px-4 rounded-xl ${
              matchScore >= 90 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-yellow-600 hover:bg-yellow-700'
            } text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center`}
          >
            Continue to Letter Generation
            {/* <ArrowRight className="w-5 h-5 ml-2" /> */}
          </button>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ATS Score Warning"
      >
        <div>
          <div className="mb-4 flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Your CV has a score of {matchScore}/100
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
              onClick={() => {
                setIsModalOpen(false);
                onRevise();
              }}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Revise CV First
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                onNext();
              }}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}