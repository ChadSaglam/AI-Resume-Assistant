import { NextRequest, NextResponse } from 'next/server';
import { analyzeCV } from '@/lib/ai/analyze-cv';
import { CVAnalysisResult } from '@/types/analysis-types';
import { JobDetailsData } from '@/types/job-types';

interface AnalysisRequest {
  cvText: string;
  jobDetails: JobDetailsData;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as AnalysisRequest;
    const { cvText, jobDetails } = body;
    
    // Validate input
    if (!cvText || !jobDetails || !jobDetails.jobDescription) {
      return NextResponse.json(
        { error: 'CV text and job details are required' },
        { status: 400 }
      );
    }
    
    // For demonstration purposes, we'll simulate a varying score response
    // In production, this would use your actual AI analysis logic
    const demoScoreValues = [74, 82, 95];
    const scoreIndex = Math.floor(Math.random() * demoScoreValues.length);
    const demoScore = demoScoreValues[scoreIndex];
    
    // Create a demo response
    const demoAnalysisResult: CVAnalysisResult = {
      matchScore: demoScore,
      strengths: [
        "Strong technical background in software development",
        "Experience with JavaScript and TypeScript",
        "Familiar with modern web frameworks",
        "Team collaboration experience"
      ],
      gaps: [
        "No explicit experience with the required backend technology (Node.js)",
        "Missing specific cloud deployment experience (AWS)",
        "No mention of experience with Agile/Scrum methodologies",
        "Lacks quantifiable achievements related to project deliverables"
      ],
      suggestions: "Your CV needs optimization to better match this role. Add specific keywords like 'Node.js', 'AWS', and 'Agile' that appear in the job description. Quantify your achievements with metrics showing impact. Reorganize skills section to prioritize those mentioned in the job description. Consider adding a brief summary that specifically addresses the job requirements.",
      readyToGenerate: demoScore >= 90,
      keywordMatchDetails: [
        {
          keyword: "JavaScript",
          found: true,
          importance: "critical",
          suggestion: "Good match, consider highlighting projects with complex JavaScript implementations"
        },
        {
          keyword: "TypeScript",
          found: true,
          importance: "critical",
          suggestion: "Already present, but emphasize TypeScript project scale or complexity"
        },
        {
          keyword: "Node.js",
          found: false,
          importance: "critical",
          suggestion: "Add Node.js to your skills section and mention any related experience even if minimal"
        },
        {
          keyword: "AWS",
          found: false,
          importance: "high",
          suggestion: "Include AWS in your skills section and any relevant cloud experience"
        },
        {
          keyword: "Agile",
          found: false,
          importance: "medium",
          suggestion: "Add Agile/Scrum methodology experience to your professional experience section"
        }
      ]
    };
    
    // Return the analysis results
    return NextResponse.json(demoAnalysisResult);
  } catch (error) {
    console.error('Error analyzing CV:', error);
    return NextResponse.json(
      { error: 'Failed to analyze CV' },
      { status: 500 }
    );
  }
}