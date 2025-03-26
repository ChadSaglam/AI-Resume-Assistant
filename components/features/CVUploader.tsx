'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, FileEdit } from 'lucide-react';
import { CVData } from '@/types/cv-types';
import CVEditor from './CVEditor';
import { parseCVText, generateCVText } from '@/lib/cv-parser';
import { defaultCV } from '@/data/mock/cv';

interface CVUploaderProps {
  onFileUploaded: (text: string) => void;
  onProfileImageChange?: (image: string | null) => void;
}

export default function CVUploader({ onFileUploaded, onProfileImageChange }: CVUploaderProps) {
  const [cvText, setCvText] = useState<string>(defaultCV);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [hasCV, setHasCV] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Use useCallback to memoize the onFileUploaded function call
  const notifyParent = useCallback((text: string) => {
    onFileUploaded(text);
  }, [onFileUploaded]);
  
  // Initialize CV data only once when component mounts
  useEffect(() => {
    const savedCV = localStorage.getItem('saved-cv');
    const savedImage = localStorage.getItem('profile-image');
    
    let initialCvData: CVData;
    let initialCvText: string;
    
    if (savedCV) {
      try {
        initialCvData = JSON.parse(savedCV);
        initialCvText = generateCVText(initialCvData);
      } catch (err) {
        console.error('Error loading saved CV:', err);
        initialCvData = parseCVText(defaultCV);
        initialCvText = defaultCV;
      }
    } else {
      initialCvData = parseCVText(defaultCV);
      initialCvText = defaultCV;
    }
    
    setCvData(initialCvData);
    setCvText(initialCvText);
    setHasCV(true);
    
    if (savedImage) {
      setProfileImage(savedImage);
      if (onProfileImageChange) {
        onProfileImageChange(savedImage);
      }
    }
    
    notifyParent(initialCvText);
    
  // Only run this effect once when the component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleCVChange = (updatedCV: CVData) => {
    // Create the text representation
    const updatedText = generateCVText(updatedCV);
    
    // Batch state updates together
    setCvData(updatedCV);
    setCvText(updatedText);
    setHasCV(true);
    
    // Notify parent after state has been updated
    notifyParent(updatedText);
  };
  
  const handleProfileImageChange = (image: string | null) => {
    setProfileImage(image);
    
    if (image) {
      localStorage.setItem('profile-image', image);
    } else {
      localStorage.removeItem('profile-image');
    }
    
    if (onProfileImageChange) {
      onProfileImageChange(image);
    }
  };
  
  if (!cvData) {
    return <div className="p-8 text-center">Loading CV data...</div>;
  }
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    > 
      {hasCV && (
        <div>
          <CVEditor 
            initialText={cvText}
            profileImage={profileImage}
            onProfileImageChange={handleProfileImageChange}
            onCVChange={handleCVChange}
          />
        </div>
      )}
    </motion.div>
  );
}