'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Cpu, Award } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Optimize Your Job Applications with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Upload your CV, analyze it against job descriptions, and get personalized recommendations to increase your interview chances.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/dashboard" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform makes it easy to optimize your job applications in just a few steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileText className="text-blue-600 dark:text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your CV</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply upload your CV in PDF format. Our system automatically extracts and analyzes your skills and experience.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Cpu className="text-blue-600 dark:text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Paste a job description and our AI will analyze how well your CV matches the requirements, identifying strengths and gaps.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award className="text-blue-600 dark:text-blue-400 w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive personalized suggestions to improve your CV specifically for the target job, highlighting key skills to emphasize.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 mb-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Boost Your Job Search?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start optimizing your CV and increasing your interview chances today
          </p>
          <Link href="/dashboard" className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors">
            Get Started For Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}