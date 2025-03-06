import { JobDetailsData } from '@/types/job-types';
import { LetterGenerationResult } from '@/types/letter-types';

/**
 * Generate a mock motivation letter based on template and job details
 */
export async function getMockLetter(
  templateType: string, 
  jobDetails: JobDetailsData
): Promise<LetterGenerationResult> {
  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { companyName, jobTitle, hiringManager } = jobDetails;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Base template with placeholders
  let letter = `${currentDate}

${hiringManager}
${companyName}

Dear ${hiringManager},

`;

  // Add body content based on template type
  switch (templateType) {
    case 'professional':
      letter += professionalTemplate(jobTitle, companyName);
      break;
    case 'enthusiastic':
      letter += enthusiasticTemplate(jobTitle, companyName);
      break;
    case 'creative':
      letter += creativeTemplate(jobTitle, companyName);
      break;
    case 'balanced':
    default:
      letter += balancedTemplate(jobTitle, companyName);
      break;
  }
  
  // Add closing
  letter += `\nThank you for considering my application. I look forward to the opportunity to discuss how my skills and experience can benefit ${companyName}.

Sincerely,

[Your Name]
[Your Phone Number]
[Your Email]`;

  return { letter };
}

// Professional template
function professionalTemplate(jobTitle: string, companyName: string): string {
  return `I am writing to express my interest in the ${jobTitle} position at ${companyName}. With a solid background in software development and a proven track record of delivering high-quality solutions, I am confident in my ability to make significant contributions to your team.

Throughout my career, I have developed expertise in full-stack development, with particular focus on creating scalable, maintainable applications. My experience includes leading development teams, architecting complex systems, and implementing best practices that improve both product quality and team efficiency.

My technical skills align well with the requirements outlined in your job description. I have extensive experience with JavaScript, React, and Node.js, as well as working with RESTful APIs and microservices architectures. Additionally, my background in cloud services and database technologies would allow me to hit the ground running at ${companyName}.

What particularly attracts me to ${companyName} is your reputation for innovation and your focus on delivering exceptional solutions to clients across multiple industries. I am excited by the prospect of contributing my technical expertise to help solve complex challenges and drive business growth.`;
}

// Enthusiastic template
function enthusiasticTemplate(jobTitle: string, companyName: string): string {
  return `I am thrilled to apply for the ${jobTitle} position at ${companyName}! As soon as I saw this opportunity, I knew it was the perfect match for my skills, experience, and passion for technology.

My journey in software development has been driven by a genuine enthusiasm for creating exceptional digital experiences. I've had the incredible opportunity to lead development teams, architect innovative solutions, and mentor junior developers – all experiences that I'm excited to bring to your team at ${companyName}.

The technology stack you're working with aligns perfectly with my expertise in JavaScript, React, and Node.js. I've successfully implemented microservices architectures and RESTful APIs that have significantly improved system performance and user experience. The prospect of applying these skills to the challenges at ${companyName} is incredibly exciting!

I've been following ${companyName}'s growth and am particularly impressed by your commitment to innovation and excellence. The opportunity to be part of a forward-thinking team that's making a real difference in how businesses approach their digital transformation is exactly what I'm looking for in my next role.`;
}

// Creative template
function creativeTemplate(jobTitle: string, companyName: string): string {
  return `Imagine a developer who doesn't just write code, but crafts digital experiences that transform how users interact with technology. Someone who sees beyond the immediate task to envision scalable, elegant solutions that stand the test of time. This is the perspective I hope to bring to the ${jobTitle} role at ${companyName}.

My development journey has been one of continuous exploration and growth. From architecting microservices that process millions of requests to creating intuitive user interfaces that delight customers, I've embraced each challenge as an opportunity to expand my technical artistry.

When I discovered this opportunity at ${companyName}, I was struck by how perfectly it aligns with my professional path. Your commitment to innovation and your approach to solving complex challenges resonates deeply with my own philosophy about technology.

The technical skills you're seeking – JavaScript mastery, React components that sing, and Node.js services that hum – are the very tools I've sharpened throughout my career. But beyond the code, I bring a creative problem-solving mindset and a passion for building technology that makes a difference.`;
}

// Balanced template
function balancedTemplate(jobTitle: string, companyName: string): string {
  return `I am writing to apply for the ${jobTitle} position at ${companyName}. With over 8 years of experience in software development and a passion for creating efficient, user-focused applications, I believe I would be a valuable addition to your team.

My professional background includes leading development efforts for SaaS products, implementing microservices architectures, and mentoring junior developers. I've consistently delivered solutions that not only meet technical requirements but also drive business growth and improve user satisfaction.

The technical requirements in your job description align well with my expertise. I bring strong proficiency in JavaScript/TypeScript, React, and Node.js, along with extensive experience developing RESTful APIs and working with both SQL and NoSQL databases. My background in cloud services would also allow me to contribute immediately to your infrastructure needs.

What particularly attracts me to ${companyName} is your reputation for innovation and your focus on creating solutions that genuinely help businesses transform their digital presence. I am excited by the prospect of joining a team that values both technical excellence and impactful outcomes.`;
}