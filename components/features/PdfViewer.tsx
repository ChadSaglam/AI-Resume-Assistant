'use client';
import React from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface PdfViewerProps {
  file: File | null;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (file) {
      setIsLoading(true);
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      setIsLoading(false);
      
      // Clean up the URL when the component unmounts or the file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setObjectUrl(null);
    }
  }, [file]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full">
      <h2 className="text-xl font-bold mb-3">CV Preview</h2>
      
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-[500px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
            <p className="text-gray-600 dark:text-gray-300">Loading PDF...</p>
          </div>
        ) : file && objectUrl ? (
          <iframe 
            src={objectUrl} 
            className="w-full h-full"
            title="PDF Preview" 
          />
        ) : (
          <div className="text-center p-6">
            <p className="text-gray-500 dark:text-gray-400">
              Upload a PDF to see a preview
            </p>
          </div>
        )}
      </div>
      
      {file && (
        <div className="flex justify-center mt-4">
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-l-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-4 py-1 bg-gray-100 dark:bg-gray-800 text-sm">
            Page 1
          </div>
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}