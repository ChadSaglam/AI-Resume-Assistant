import { CVAnalysisResult, MatchedSkill } from '@/types/analysis-types';
import { JobDetailsData } from '@/types/job-types';
import { fetchAIResponse } from '@/lib/providers/openai';

/**
 * Analyze CV text against job description using AI
 */
export async function analyzeCV(cvText: string, jobDetails: JobDetailsData): Promise<CVAnalysisResult> {
  try {
    const prompt = `
    You are an expert HR AI agent specialized in ATS (Applicant Tracking System) optimization and CV analysis.
    
    # TASK
    Analyze the CV text against the job description to determine ATS compatibility, keyword matching, and provide detailed feedback.
    
    # INPUT
    ## CV Text:
    ${cvText}
    
    ## Job Details:
    - Job Title: ${jobDetails.jobTitle}
    - Company Name: ${jobDetails.companyName}
    - Job Description:
    ${jobDetails.jobDescription}
    
    # REQUIRED OUTPUT FORMAT (JSON)
    {
      "matchScore": number, // Score from 0-100 representing overall match quality
      "strengths": string[], // List of candidate strengths matching the job requirements
      "gaps": string[], // List of job requirements not addressed in CV
      "suggestions": string, // Detailed recommendations to improve the CV
      "readyToGenerate": boolean, // Whether the CV is good enough to proceed (score >= 90)
      "keywordMatchDetails": [ // Detailed keyword matching analysis
        {
          "keyword": string, // Job keyword/skill
          "found": boolean, // Whether it's in the CV
          "importance": "critical" | "high" | "medium" | "low", // How important is this for the job
          "suggestion": string // How to add/improve this in the CV
        }
      ]
    }
    
    # ANALYSIS INSTRUCTIONS
    1. Extract key requirements, skills, and qualifications from the job description
    2. Check for these keywords and concepts in the CV (exact and semantic matches)
    3. Assign a match score (0-100) based on:
       - Presence of critical keywords (50%)
       - Experience level match (20%)
       - Education requirements match (15%)
       - Overall CV format and content relevance (15%)
    4. A score of 100 means the CV is perfectly optimized for the ATS system and job
    5. A score under 90 means significant improvements are needed
    6. For each gap or missing keyword, provide specific, actionable suggestions
    
    # IMPORTANT RULES
    - Be extremely thorough and critical - real ATS systems miss candidates for minor omissions
    - For scores under 100, provide clear, actionable feedback focused on ATS optimization
    - Focus on keyword optimization, formatting, quantifiable achievements, and relevance
    - Do NOT be lenient - real recruitment processes aren't
    - Provide feedback as if you are a senior HR professional with 15+ years of experience
    `;

    // In a real implementation, this would call an AI API
    // For demonstration, I'll mock a function that would call the OpenAI API
    const response = await fetchAIResponse(prompt);
    
    // Parse the response as JSON
    return JSON.parse(response) as CVAnalysisResult;
  } catch (error) {
    console.error('Error analyzing CV:', error);
    throw new Error('Failed to analyze CV against job description');
  }
}