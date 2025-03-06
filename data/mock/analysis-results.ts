import { CVAnalysisResult } from '@/types/analysis-types';

/**
 * Sample analysis results for development and testing
 */
export const ANALYSIS_RESULTS: Record<string, CVAnalysisResult> = {
  high_match: {
    matchScore: 95,
    strengths: [
      "Strong experience with required technologies (JavaScript, React, Node.js)",
      "Extensive background in software development (8+ years)",
      "Experience mentoring junior developers",
      "Proven track record of improving system performance",
      "Experience with microservices architecture"
    ],
    gaps: [
      "No explicit mention of experience with GraphQL",
      "Limited detail about CI/CD pipeline experience"
    ],
    suggestions: "Your CV is extremely well-matched to this position. To further strengthen your application, consider adding more details about any experience with GraphQL and CI/CD pipelines, even if it's limited. Also, quantify your achievements with specific metrics where possible to demonstrate your impact.",
    readyToGenerate: true,
    keywordMatchDetails: [
      {
        keyword: "JavaScript",
        found: true,
        importance: "critical",
        suggestion: "Well highlighted in your CV"
      },
      {
        keyword: "React",
        found: true,
        importance: "critical",
        suggestion: "Well highlighted in your CV"
      },
      {
        keyword: "Node.js",
        found: true,
        importance: "critical",
        suggestion: "Well highlighted in your CV"
      },
      {
        keyword: "GraphQL",
        found: false,
        importance: "medium",
        suggestion: "Add any experience or knowledge you have with GraphQL"
      },
      {
        keyword: "CI/CD",
        found: true,
        importance: "medium",
        suggestion: "Consider adding more details about specific CI/CD tools or processes you've worked with"
      }
    ]
  },
  
  medium_match: {
    matchScore: 82,
    strengths: [
      "Experience with data analysis and visualization",
      "Strong SQL skills mentioned",
      "Background in creating reports and dashboards",
      "Experience automating data processes",
      "Good educational background in statistics"
    ],
    gaps: [
      "Limited experience with Power BI (job specifically requests this)",
      "No mention of experience in the finance industry",
      "Missing specific achievements related to business decision making",
      "No explicit mention of documentation creation"
    ],
    suggestions: "Your CV shows good overall qualifications but needs better alignment with this specific role. Add more details about any experience with Power BI or similar business intelligence tools. Highlight any finance industry exposure, even if minor. Quantify how your data analyses have directly impacted business decisions. Include examples of documentation you've created for data processes.",
    readyToGenerate: false,
    keywordMatchDetails: [
      {
        keyword: "SQL",
        found: true,
        importance: "critical",
        suggestion: "Well highlighted in your CV"
      },
      {
        keyword: "Tableau",
        found: true,
        importance: "high",
        suggestion: "Well highlighted, but consider emphasizing specific Tableau projects"
      },
      {
        keyword: "Power BI",
        found: false,
        importance: "high",
        suggestion: "Add any experience or knowledge you have with Power BI"
      },
      {
        keyword: "Python",
        found: true,
        importance: "medium",
        suggestion: "Well highlighted in your CV"
      },
      {
        keyword: "Finance",
        found: false,
        importance: "medium",
        suggestion: "Add any experience or projects related to the finance industry"
      }
    ]
  },
  
  low_match: {
    matchScore: 65,
    strengths: [
      "Strong programming skills in Python",
      "Experience with data visualization",
      "Good educational background",
      "Some analytical experience",
      "Experience working with stakeholders"
    ],
    gaps: [
      "Insufficient SQL experience for this role",
      "No mention of Power BI or Tableau experience",
      "Missing business intelligence project experience",
      "Lack of experience creating dashboards for management",
      "No mention of working with large datasets"
    ],
    suggestions: "Your CV needs significant revisions to better match this role. Focus on highlighting any SQL experience you have, even if it's from academic projects. Add details about any experience with business intelligence or data visualization tools, particularly Tableau or Power BI. Provide specific examples of how you've translated data insights into business recommendations. Consider acquiring some basic Power BI skills before applying if possible.",
    readyToGenerate: false,
    keywordMatchDetails: [
      {
        keyword: "SQL",
        found: false,
        importance: "critical",
        suggestion: "Add SQL to your skills section and highlight any SQL experience in your work or projects"
      },
      {
        keyword: "Power BI",
        found: false,
        importance: "high",
        suggestion: "Add any experience with Power BI, even if it's from self-learning or coursework"
      },
      {
        keyword: "Tableau",
        found: false,
        importance: "high",
        suggestion: "Add any experience with Tableau or similar visualization tools"
      },
      {
        keyword: "Business Intelligence",
        found: false,
        importance: "high",
        suggestion: "Highlight any experience with BI tools or projects in your work history"
      },
      {
        keyword: "Dashboards",
        found: false,
        importance: "medium",
        suggestion: "Add details about any dashboards you've created or maintained"
      }
    ]
  }
};