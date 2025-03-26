'use client';
import React, { useState, useEffect } from 'react';
import { Building, User, MapPin, FileText, AlertCircle, Briefcase, CloudUpload, Link as LinkIcon, Loader2, ShieldCheck, Search, Check } from 'lucide-react';
import { JobDetailsData } from '@/types/job-types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';

interface JobDetailsFormProps {
  onSubmit: (jobDetails: JobDetailsData) => void;
  onBack: () => void;
  initialData?: JobDetailsData;
}

export default function JobDetailsForm({ onSubmit, onBack, initialData }: JobDetailsFormProps) {
  const [formData, setFormData] = useState<JobDetailsData>(initialData || {
    companyName: '',
    jobTitle: '',
    hiringManager: '',
    companyAddress: '',
    jobDescription: ''
  });
  
  const [jobUrl, setJobUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof JobDetailsData, string>>>({});
  const [detectedSkills, setDetectedSkills] = useState<string[]>([]);
  const [searchPageDetected, setSearchPageDetected] = useState(false);

  const { showToast } = useToast();

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('jobDetailsFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved job details:', error);
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  const saveToLocalStorage = (data: JobDetailsData) => {
    localStorage.setItem('jobDetailsFormData', JSON.stringify(data));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    saveToLocalStorage(updatedData);
    
    // Clear error when user types
    if (errors[name as keyof JobDetailsData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobUrl(e.target.value);
    if (urlError) setUrlError(null);
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof JobDetailsData, string>> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    
    if (!formData.hiringManager.trim()) {
      newErrors.hiringManager = 'Hiring manager name is required';
    }
    
    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    } else if (formData.jobDescription.trim().length < 50) {
      newErrors.jobDescription = 'Job description should be at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const fetchJobDetails = async () => {
    if (!jobUrl.trim()) {
      setUrlError('Please enter a job listing URL');
      return;
    }
    
    try {
      setIsLoading(true);
      setUrlError(null);
      
      // Change this line from '/api/scrapeJobData' to '/api/scrapeJob'
      const response = await fetch('/api/scrapeJob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: jobUrl })
      });
      
      // Parse response
      const data = await response.json();
      
      // Handle errors
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch job details');
      }
      
      // Success case - update the field mapping to match your API response
      if (data.success) {
        // Reset search page flag if previously shown
        setSearchPageDetected(false);
        
        // Update form with scraped data - match field names from your working API
        const updatedData = {
          companyName: data.companyName || formData.companyName,
          jobTitle: data.jobTitle || formData.jobTitle,
          hiringManager: data.hiringManager?.name || formData.hiringManager,
          companyAddress: data.companyAddress || formData.companyAddress,
          jobDescription: data.jobDescription || formData.jobDescription
        };
        
        // Update state and save to localStorage
        setFormData(updatedData);
        saveToLocalStorage(updatedData);
        
        showToast({
          title: "Job details imported",
          description: "We've populated the form with information from the job listing.",
          variant: "success",
          duration: 3000,
        });
      } else {
        throw new Error('No job details found in the provided URL');
      }
      
    } catch (error: any) {
      console.error('Error fetching job details:', error);
      setUrlError(error.message || 'Failed to fetch job details. Please try again or fill out the form manually.');
      
      showToast({
        title: "Import failed",
        description: error.message || 'Failed to fetch job details. Please try again or fill out the form manually.',
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save to localStorage before submitting
      saveToLocalStorage(formData);
      onSubmit(formData);
    }
  };
  
  const handlePasteJobDescription = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const updatedData = { ...formData, jobDescription: text };
        setFormData(updatedData);
        saveToLocalStorage(updatedData);
        
        if (errors.jobDescription) {
          setErrors(prev => ({ ...prev, jobDescription: undefined }));
        }

        showToast({
          title: "Content pasted",
          description: "Job description has been pasted from clipboard",
          variant: "default",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      showToast({
        title: "Paste failed",
        description: "Unable to access clipboard. Please check your browser permissions.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <Card className="overflow-hidden border-0 rounded-xl shadow-lg">
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Job Details
          </h2>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-green-500" />
            <span>Data is processed securely</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 bg-white dark:bg-gray-800">
        {/* URL Import Feature */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
            <Search className="h-5 w-5" />
            Automatic Job Details Import
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

            <div className="md:col-span-3 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="url"
                value={jobUrl}
                onChange={handleUrlChange}
                placeholder="Paste job listing URL from LinkedIn, Indeed, etc."
                className={`pl-10 border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-800 placeholder:text-gray-400 h-12 ${
                  urlError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                }`}
              />
              
              {urlError && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  {urlError}
                </p>
              )}
              
              {!urlError && (
                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                  For best results, use a direct link to a specific job posting, not a search results page.
                </p>
              )}
            </div>

            <Button
              onClick={fetchJobDetails}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Import Details
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-blue-700 dark:text-blue-400">
            Paste any job URL to automatically extract position details and requirements.
          </p>
        </div>
        
        <div className="mb-6 px-1">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Job Application Details</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Enter information about the position you're applying for to generate a tailored application. Fields marked with * are required.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-1">
                Company Name*
                {formData.companyName && (
                  <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-normal">
                    <Check className="h-3.5 w-3.5 inline" /> Filled
                  </span>
                )}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`pl-10 h-12 ${
                    errors.companyName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="Enter company name"
                />
              </div>
              {errors.companyName && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.companyName}
                </p>
              )}
            </div>
            
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="flex items-center gap-1">
                Job Title*
                {formData.jobTitle && (
                  <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-normal">
                    <Check className="h-3.5 w-3.5 inline" /> Filled
                  </span>
                )}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className={`pl-10 h-12 ${
                    errors.jobTitle ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="E.g., Software Developer | Data Scientist | w/m/d | 80-100%"
                />
              </div>
              {errors.jobTitle && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.jobTitle}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Hiring Manager */}
            <div className="space-y-2">
              <Label htmlFor="hiringManager" className="flex items-center gap-1">
                Hiring Manager*
                {formData.hiringManager && (
                  <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-normal">
                    <Check className="h-3.5 w-3.5 inline" /> Filled
                  </span>
                )}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="hiringManager"
                  name="hiringManager"
                  value={formData.hiringManager}
                  onChange={handleChange}
                  className={`pl-10 h-12 ${
                    errors.hiringManager ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="Enter hiring manager's name"
                />
              </div>
              {errors.hiringManager && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.hiringManager}
                </p>
              )}
            </div>
            
            {/* Company Address (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="companyAddress" className="flex items-center gap-1">
                Company Address <span className="text-gray-400 font-normal">(Optional)</span>
                {formData.companyAddress && (
                  <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-normal">
                    <Check className="h-3.5 w-3.5 inline" /> Filled
                  </span>
                )}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="pl-10 h-12"
                  placeholder="Enter company address (optional)"
                />
              </div>
            </div>
          </div>
          
          {/* Job Description */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="jobDescription" className="flex items-center gap-1">
                Job Description*
                {formData.jobDescription && formData.jobDescription.length >= 50 && (
                  <span className="ml-2 text-green-600 dark:text-green-400 text-xs font-normal">
                    <Check className="h-3.5 w-3.5 inline" /> {formData.jobDescription.length} characters
                  </span>
                )}
              </Label>
              <Button
                type="button"
                onClick={handlePasteJobDescription}
                variant="outline"
                size="sm"
                className="h-8 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1.5 px-3"
              >
                <CloudUpload className="h-3.5 w-3.5" />
                Paste from clipboard
              </Button>
            </div>
            <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden group">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={10}
                className={`block w-full pl-10 resize-y min-h-[200px] bg-white dark:bg-gray-800 ${
                  errors.jobDescription ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                }`}
                placeholder="Paste the job description here..."
              />
              <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 py-1 px-2 rounded-md">
                  {formData.jobDescription.length} characters
                </span>
              </div>
            </div>
            {errors.jobDescription && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.jobDescription}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please include the full job description to get the best results from our AI analysis
            </p>
          </div>
          
          {/* Detected Skills Section - kept but will only populate if API provides skills */}
          {detectedSkills.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detected Skills in Job Description</h4>
              <div className="flex flex-wrap gap-1.5">
                {detectedSkills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                These skills were automatically detected in the job description. Make sure your CV highlights these skills.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 pt-5">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="py-3 px-4 h-12 rounded-xl"
            >
              Back to CV
            </Button>
            
            <Button
              type="submit"
              className="py-3 px-4 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              Analyze Application
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}