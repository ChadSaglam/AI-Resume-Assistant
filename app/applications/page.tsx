'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Download, FileText, Clock, Building, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  date: string;
  status: 'complete' | 'in_progress';
  matchScore: number;
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  
  // Set current date time and load applications
  useEffect(() => {
    setCurrentDateTime('2025-03-06 11:13:19');
    
    // Simulate loading applications
    setTimeout(() => {
      setApplications([
        {
          id: '1',
          jobTitle: 'Senior Software Developer | Full-Stack | React/Node.js | 100%',
          companyName: 'TechGrowth Solutions',
          date: '2025-03-06',
          status: 'complete',
          matchScore: 95
        },
        {
          id: '2',
          jobTitle: 'Data Analyst | Business Intelligence | w/m/d | 80-100%',
          companyName: 'DataInsight Analytics',
          date: '2025-03-05',
          status: 'in_progress',
          matchScore: 82
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter applications based on search query
  const filteredApplications = applications.filter(app => 
    app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-4 sm:mb-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Applications
          </motion.h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
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
        
        {/* Search and actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search applications..."
            />
          </div>
          
          <Link 
            href="/dashboard" 
            className="py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center whitespace-nowrap"
          >
            Create New Application
          </Link>
        </div>
        
        {/* Applications list */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No applications found</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {searchQuery ? 'Try a different search term' : 'Start by creating your first application'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Job
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Match
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredApplications.map((application) => (
                    <tr 
                      key={application.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span className="truncate max-w-xs">{application.jobTitle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                          {application.companyName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {application.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${
                          application.status === 'complete' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {application.status === 'complete' ? 'Complete' : 'In Progress'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          application.matchScore >= 90
                            ? 'text-green-600 dark:text-green-400'
                            : application.matchScore >= 75
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                        }`}>
                          {application.matchScore}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                            <span className="sr-only">View</span>
                          </button>
                          <button className="p-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <Download className="w-4 h-4" />
                            <span className="sr-only">Download</span>
                          </button>
                          <Link href={`/applications/${application.id}`} className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            <ChevronRight className="w-4 h-4" />
                            <span className="sr-only">Details</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}