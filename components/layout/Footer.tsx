'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [dateTime, setDateTime] = useState("");
  
  useEffect(() => {
    // Format the current date and time
    const now = new Date();
    const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
    setDateTime(formattedDateTime);
  }, []);
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; 2025 JobAI Assistant. All rights reserved.
            </p>
            </div>
            <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Contact Us
            </Link>
            </div>
        </div>
        </div>
    </footer>
  );
}