/**
 * Job details data structure for form input
 */
export interface JobDetailsData {
    companyName: string;
    jobTitle: string;
    hiringManager: string;
    companyAddress?: string;
    jobDescription: string;
  }
  
  /**
   * Job analysis parameters
   */
  export interface JobAnalysisParams {
    cvText: string;
    jobDetails: JobDetailsData;
  }
  
  /**
   * Job application metadata
   */
  export interface JobApplicationMeta {
    createdAt: string;
    updatedAt: string;
    userName: string;
  }