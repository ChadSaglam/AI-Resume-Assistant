'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Copy, Check, RefreshCw, Edit, FileText, Save, ArrowRight } from 'lucide-react';
import { JobDetailsData } from '@/types/job-types';
import { CVAnalysisResult } from '@/types/analysis-types';
import { LetterTemplate } from '@/types/letter-types';
import { useRouter } from 'next/navigation';

interface LetterGeneratorProps {
  cvText: string;
  jobDetails: JobDetailsData;
  analysisResult: CVAnalysisResult;
  onBack: () => void;
}

export default function LetterGenerator({ cvText, jobDetails, analysisResult, onBack }: LetterGeneratorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [letter, setLetter] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  
  const templates: LetterTemplate[] = [
    { 
      id: 'professional',
      name: 'Professional',
      description: 'Formal and straightforward, suitable for corporate environments'
    },
    { 
      id: 'enthusiastic',
      name: 'Enthusiastic',
      description: 'Energetic and passionate, shows strong interest in the role'
    },
    { 
      id: 'creative',
      name: 'Creative',
      description: 'Unique and attention-grabbing, good for creative industries'
    },
    { 
      id: 'balanced',
      name: 'Balanced',
      description: 'Mix of professional and personable, works for most positions'
    }
  ];
  
  // Generate letter on component mount
  useEffect(() => {
    generateLetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Function to generate motivation letter
  const generateLetter = async () => {
    setIsLoading(true);
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call your API
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvText,
          jobDetails,
          analysisResult,
          template: selectedTemplate,
          customInstructions
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate letter');
      }
      
      const result = await response.json();
      
      // Simulate a slight delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLetter(result.letter);
      setEditedLetter(result.letter);
    } catch (error) {
      console.error('Error generating letter:', error);
      // Fallback to dummy letter
      setLetter('Dear Hiring Manager,\n\nI am writing to apply for the position...');
      setEditedLetter('Dear Hiring Manager,\n\nI am writing to apply for the position...');
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };
  
  // Function to regenerate letter
  const handleRegenerate = () => {
    setIsGenerating(true);
    generateLetter();
  };
  
  // Function to copy letter to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedLetter : letter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  // Function to download letter as .txt file
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([isEditing ? editedLetter : letter], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Motivation_Letter_${jobDetails.companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  // Function to toggle editing mode
  const handleToggleEditing = () => {
    if (isEditing) {
      setLetter(editedLetter);
    }
    setIsEditing(!isEditing);
  };
  
  // Function to save application and navigate to applications list
  const handleSaveApplication = async () => {
    setIsSaving(true);
    
    try {
      // In a real implementation, this would save to your database
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to applications list page
      router.push('/applications');
    } catch (error) {
      console.error('Error saving application:', error);
    } finally {
      setIsSaving(false);
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
        <h2 className="text-xl font-bold mb-3">Motivation Letter Generator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Create a personalized motivation letter based on your CV and the job description
        </p>
        
        {/* Template and customization options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-3">Letter Options</h3>
            
            {/* Template selector */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Letter Style
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isGenerating}
              >
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              {selectedTemplate && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {templates.find(t => t.id === selectedTemplate)?.description}
                </p>
              )}
            </div>
            
            {/* Custom instructions */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Instructions (Optional)
              </label>
              <textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="E.g., Emphasize my leadership skills, mention my project in machine learning..."
                disabled={isGenerating}
              />
            </div>
            
            {/* Regenerate button */}
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin w-4 h-4 mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Letter
                </>
              )}
            </button>
          </div>
          
          {/* Letter preview and editing */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">Your Motivation Letter</h3>
              
              {/* Restored original buttons layout as requested */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleEditing}
                  className={`p-2 rounded-lg text-sm ${
                    isEditing 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  } hover:bg-opacity-80 transition-colors`}
                >
                  {isEditing ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="sr-only">Save edits</span>
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      <span className="sr-only">Edit letter</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCopy}
                  disabled={isLoading}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-opacity-80 transition-colors disabled:opacity-50"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="sr-only">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="sr-only">Copy to clipboard</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-opacity-80 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span className="sr-only">Download</span>
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="animate-spin w-8 h-8 text-blue-500 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">Generating your letter...</p>
                  </div>
                </div>
              ) : isEditing ? (
                <textarea
                  value={editedLetter}
                  onChange={(e) => setEditedLetter(e.target.value)}
                  className="w-full h-96 p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                  style={{ fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
                />
              ) : (
                <div 
                  className="h-96 p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white overflow-auto"
                  style={{ fontFamily: 'Georgia, serif', lineHeight: '1.6', whiteSpace: 'pre-line' }}
                >
                  {letter}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
          >
            {/* <ArrowLeft className="w-5 h-5 mr-2" /> */}
            Back to Analysis
          </button>
          
          <button
            onClick={handleSaveApplication}
            disabled={isLoading || isSaving}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="animate-spin w-5 h-5 mr-2" />
                Saving...
              </>
            ) : (
              <>
                Save Application
                {/* <ArrowRight className="w-5 h-5 ml-2" /> */}
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}