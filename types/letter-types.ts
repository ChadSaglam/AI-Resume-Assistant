/**
 * Letter template definition
 */
export interface LetterTemplate {
    id: string;
    name: string;
    description: string;
  }
  
  /**
   * Letter generation request
   */
  export interface LetterGenerationRequest {
    cvText: string;
    jobDetails: any;
    analysisResult: any;
    template: string;
    customInstructions?: string;
  }
  
  /**
   * Letter generation result
   */
  export interface LetterGenerationResult {
    letter: string;
    summary?: string;
  }