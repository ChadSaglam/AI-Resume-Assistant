import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { CVAnalysisResult } from '@/types/analysis-types';

interface AnalysisResultsProps {
  result: CVAnalysisResult;
  onBack: () => void;
  onNext: () => void;
  onRevise: () => void;
}

export default function AnalysisResults({ result, onBack, onNext, onRevise }: AnalysisResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (score >= 60) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-500 bg-red-50 dark:bg-red-900/20';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-8 h-8" />;
    if (score >= 60) return <AlertTriangle className="w-8 h-8" />;
    return <XCircle className="w-8 h-8" />;
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Job Details
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">CV Analysis Results</h2>
      
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
        <div className="flex-1">
          <div className={`p-4 rounded-lg ${getScoreColor(result.matchScore)} mb-4`}>
            <div className="flex items-center gap-3">
              {getScoreIcon(result.matchScore)}
              <div>
                <div className="text-2xl font-bold">{result.matchScore}%</div>
                <div className="text-sm">Match Score</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Key Strengths</h3>
              <ul className="list-disc list-inside pl-2 space-y-1">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
              <ul className="list-disc list-inside pl-2 space-y-1">
                {result.improvementAreas.map((area, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {result.keywordsMissing.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Suggested Improvements</h3>
            <ul className="list-disc list-inside pl-2 space-y-1">
              {result.suggestedImprovements.map((suggestion, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col-reverse sm:flex-row gap-4 justify-between">
        <button
          onClick={onRevise}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Revise CV First
        </button>
        
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue to Letter Generation
        </button>
      </div>
    </motion.div>
  );
}