/**
 * CV upload result
 */
export interface CVUploadResult {
    file: File;
    text: string;
    fileName: string;
    fileSize: number;
    pageCount?: number;
  }
  
  /**
   * CV processing status
   */
  export interface CVProcessingStatus {
    isProcessing: boolean;
    isComplete: boolean;
    error?: string;
  }