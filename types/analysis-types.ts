/**
 * CV analysis result
 */
export interface CVAnalysisResult {
  matchScore: number;
  strengths: string[];
  improvementAreas: string[];  // This should be used instead of 'weaknesses'
  keywordsMissing: string[];
  suggestedImprovements: string[];
}
  
  /**
   * Keyword match detail
   */
  export interface KeywordMatchDetail {
    keyword: string;
    found: boolean;
    importance: "critical" | "high" | "medium" | "low";
    suggestion: string;
  }
  
  /**
   * Analysis progress status
   */
  export interface AnalysisProgress {
    status: 'idle' | 'extracting' | 'analyzing' | 'matching' | 'scoring' | 'complete';
    progress: number;
    message?: string;
  }
  
  /**
   * Matched skill result
   */
  export interface MatchedSkill {
    skill: string;
    foundInCV: boolean;
    importance: 'high' | 'medium' | 'low';
    confidence: number;
    context?: string;
  }