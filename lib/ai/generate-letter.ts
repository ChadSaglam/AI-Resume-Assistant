import { JobDetailsData } from '@/types/job-types';
import { CVAnalysisResult } from '@/types/analysis-types';
import { LetterGenerationResult } from '@/types/letter-types';
import { fetchAIResponse } from '@/lib/providers/openai';
import { createLetterGenerationPrompt } from '@/lib/prompts/letter-generation-prompt';

/**
 * Generate a motivation letter using AI based on CV, job details, and analysis
 */
export async function generateLetter(
  cvText: string,
  jobDetails: JobDetailsData,
  analysisResult: CVAnalysisResult,
  template: string,
  customInstructions?: string
): Promise<LetterGenerationResult> {
  try {
    // Create the prompt for the AI
    const prompt = createLetterGenerationPrompt(
      cvText, 
      jobDetails, 
      analysisResult, 
      template, 
      customInstructions
    );
    
    // In a real implementation, this would call the OpenAI API
    const response = await fetchAIResponse(prompt);
    
    return { 
      letter: response 
    };
  } catch (error) {
    console.error('Error generating letter:', error);
    throw new Error('Failed to generate motivation letter');
  }
}