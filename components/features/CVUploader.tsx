'use client';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileUp, File, X, Loader2, Check } from 'lucide-react';
import { CVUploadResult } from '@/types/cv-types';

interface CVUploaderProps {
  onFileUploaded: (file: File, text: string) => void;
}

export default function CVUploader({ onFileUploaded }: CVUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    setSuccess(false);
    
    if (acceptedFiles.length === 0) return;
    
    const pdfFile = acceptedFiles[0];
    
    // Validate file type
    if (pdfFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    
    setFile(pdfFile);
    setIsProcessing(true);
    
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', pdfFile);
      
      // For now, we'll simulate PDF text extraction
      // In a real app, you'd use the API to extract text from the PDF
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
      
      // Simulate extracted text (in a real app, this would come from your API)
      const simulatedText = "This is simulated CV text for development purposes.";
      
      onFileUploaded(pdfFile, simulatedText);
      setSuccess(true);
    } catch (err: any) {
      console.error('Error processing PDF:', err);
      setError(err.message || 'Failed to process PDF file');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileUploaded]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isProcessing,
    noClick: isProcessing
  });
  
  const handleRemove = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    onFileUploaded(null as any, '');
  };
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-3">Upload Your CV</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Upload your CV in PDF format for AI analysis
      </p>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
        } ${isProcessing ? 'opacity-50 cursor-progress' : ''} ${success ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center py-4">
          {isProcessing ? (
            <>
              <Loader2 className="h-14 w-14 text-blue-500 animate-spin mb-3" />
              <p className="font-medium text-gray-700 dark:text-gray-300">Processing your CV...</p>
            </>
          ) : success ? (
            <>
              <Check className="h-14 w-14 text-green-500 mb-3" />
              <p className="font-medium text-gray-700 dark:text-gray-300">CV processed successfully!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{file?.name}</p>
            </>
          ) : (
            <>
              <FileUp className="h-14 w-14 text-blue-500 mb-3" />
              {isDragActive ? (
                <p className="font-medium text-blue-600 dark:text-blue-400">Drop your PDF here</p>
              ) : (
                <>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Drag & drop your CV here, or click to browse</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Supports PDF format only</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}
      
      {/* File info */}
      {file && success && (
        <div className="mt-4 flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center">
            <File className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">{file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleRemove}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      )}
    </motion.div>
  );
}