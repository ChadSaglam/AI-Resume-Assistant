import { NextRequest, NextResponse } from 'next/server';
import { generateLetter } from '@/lib/ai/generate-letter';
import { getMockLetter } from '@/data/mock/letter-templates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cvText, jobDetails, analysisResult, template, customInstructions } = body;
    
    // Validate input
    if (!cvText || !jobDetails || !template) {
      return NextResponse.json(
        { error: 'CV text, job details, and template are required' },
        { status: 400 }
      );
    }
    
    // In production, you'd use the actual AI service
    // const result = await generateLetter(cvText, jobDetails, analysisResult, template, customInstructions);
    
    // For development, use mock data
    const result = await getMockLetter(template, jobDetails);
    
    // Return the generated letter
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating letter:', error);
    return NextResponse.json(
      { error: 'Failed to generate letter' },
      { status: 500 }
    );
  }
}