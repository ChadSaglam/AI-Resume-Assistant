/**
 * Prompt template for generating motivation/cover letters
 */
export function createLetterGenerationPrompt(
    cvText: string, 
    jobDetails: any, 
    analysisResult: any,
    template: string,
    customInstructions?: string
  ): string {
    return `
      You are an expert career coach specialized in writing exceptional motivation letters (cover letters).
      
      # TASK
      Write a personalized motivation letter based on the candidate's CV and the job description.
      
      # INPUT
      ## CV Text:
      ${cvText}
      
      ## Job Details:
      - Job Title: ${jobDetails.jobTitle}
      - Company Name: ${jobDetails.companyName}
      - Hiring Manager: ${jobDetails.hiringManager}
      - Company Address: ${jobDetails.companyAddress || ''}
      - Job Description:
      ${jobDetails.jobDescription}
      
      ## CV Analysis Results:
      - Match Score: ${analysisResult.matchScore}/100
      - Strengths: ${analysisResult.strengths.join(', ')}
      - Gaps: ${analysisResult.gaps.join(', ')}
      
      ## Letter Style: ${template}
      ${customInstructions ? `## Custom Instructions: ${customInstructions}` : ''}
      
      # LETTER FORMAT
      1. Use proper business letter format
      2. Start with the current date
      3. Include hiring manager's name and company information
      4. Use appropriate greeting
      5. 3-4 compelling paragraphs
      6. Professional closing
      7. Leave space for signature and typed name
      
      # LETTER STYLE GUIDANCE
      ${getStyleGuidance(template)}
      
      # CONTENT INSTRUCTIONS
      1. Highlight the candidate's strengths that match the job requirements
      2. Address any obvious gaps indirectly by emphasizing transferable skills
      3. Show knowledge of the company and why the candidate is interested
      4. Keep the letter concise (300-400 words)
      5. Include specific achievements relevant to the position
      6. Make it personal and tailored to this specific job
      7. Avoid generic statements that could apply to any job
      
      # OUTPUT
      Return only the complete letter text without any explanations, notes, or additional formatting.
    `;
  }
  
  function getStyleGuidance(template: string): string {
    switch (template) {
      case 'professional':
        return `
          - Formal, straightforward language
          - Conservative structure and tone
          - Emphasis on qualifications and experience
          - Limited personal details
          - Focus on facts and achievements
        `;
      case 'enthusiastic':
        return `
          - Energetic, passionate tone
          - Show genuine excitement for the role and company
          - More personal connection
          - Still professional but with enthusiasm
          - Conversational yet respectful language
        `;
      case 'creative':
        return `
          - Unique opening that captures attention
          - More storytelling approach
          - Showcase personality and creative thinking
          - Can use metaphors or creative framing
          - Still maintain professionalism while being original
        `;
      case 'balanced':
      default:
        return `
          - Mix of professional and personable elements
          - Friendly yet respectful tone
          - Balance between qualifications and cultural fit
          - Some personality while maintaining professionalism
          - Conventional structure with personal touches
        `;
    }
  }