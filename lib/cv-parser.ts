import { CVData, Experience, Education, ExpertiseCategory, Language, Certificate } from '@/types/cv-types';

// Function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Function to parse plain text CV into structured data
export function parseCVText(text: string): CVData {
  const sections: Record<string, string> = {};
  let currentSection = '';
  let currentContent = '';

  // Split the text into lines
  const lines = text.split('\n');

  // Iterate through the lines to identify sections
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Section titles are in UPPERCASE
    if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 0 && !/^[•-]/.test(trimmedLine) && !trimmedLine.startsWith('  ')) {
      // Save the previous section if there is one
      if (currentSection && currentContent) {
        sections[currentSection] = currentContent.trim();
      }
      
      // Start a new section
      currentSection = trimmedLine;
      currentContent = '';
    } else if (trimmedLine === '---------' || trimmedLine === '-------' || trimmedLine === '--------------') {
      // Skip separator lines
      continue;
    } else {
      // Add to the current section's content
      currentContent += line + '\n';
    }
  }
  
  // Save the last section
  if (currentSection && currentContent) {
    sections[currentSection] = currentContent.trim();
  }
  
  // Parse each section into structured data
  const result: CVData = {
    personalInfo: {
      fullName: 'Chad Saglam',
      title: 'Data Scientist & Software Developer',
      summary: sections['ABOUT ME'] || '',
      nationality: '',
      dateOfBirth: '',
      maritalStatus: '',
      hobbies: []
    },
    contactInfo: {
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      website: ''
    },
    experiences: [],
    education: [],
    expertise: [],
    languages: [],
    certificates: []
  };
  
  // Parse contact information
  if (sections['CONTACT']) {
    const contactLines = sections['CONTACT'].split('\n');
    for (const line of contactLines) {
      if (line.startsWith('Email:')) {
        result.contactInfo.email = line.replace('Email:', '').trim();
      } else if (line.startsWith('Phone:')) {
        result.contactInfo.phone = line.replace('Phone:', '').trim();
      } else if (line.startsWith('Address:')) {
        result.contactInfo.address = line.replace('Address:', '').trim();
      } else if (line.startsWith('LinkedIn:')) {
        result.contactInfo.linkedIn = line.replace('LinkedIn:', '').trim();
      } else if (line.startsWith('Website:')) {
        result.contactInfo.website = line.replace('Website:', '').trim();
      }
    }
  }
  
  // Parse work experience
  if (sections['WORK EXPERIENCE']) {
    const experienceText = sections['WORK EXPERIENCE'];
    const experienceBlocks = experienceText.split('\n\n');
    
    for (const block of experienceBlocks) {
      if (!block.trim()) continue;
      
      const lines = block.split('\n');
      const firstLine = lines[0];
      
      // Extract position, company, location, dates
      const positionMatch = firstLine.match(/(.*?)\s+\|\s+(.*?)\s+\|\s+(.*?)$/);
      
      if (positionMatch) {
        const [_, position, company, dateLocation] = positionMatch;
        
        // Split dateLocation into dates and location
        const dateLocationParts = dateLocation.split(',');
        const dates = dateLocationParts.pop()?.trim() || '';
        const location = dateLocationParts.join(',').trim();
        
        // Split dates into start and end
        const dateMatch = dates.match(/([\d\/]+)\s*[–-]\s*([\d\/]+|Present)/);
        const startDate = dateMatch ? dateMatch[1].trim() : '';
        const endDate = dateMatch ? dateMatch[2].trim() : '';
        const isCurrentRole = endDate === 'Present';
        
        // Extract description and achievements
        const description = lines[1] ? lines[1].trim() : '';
        const achievements = lines.slice(2).filter(line => line.trim().startsWith('•')).map(line => line.replace('•', '').trim());
        
        const experience: Experience = {
          id: generateId(),
          position,
          company,
          location,
          startDate,
          endDate,
          isCurrentRole,
          description,
          achievements
        };
        
        result.experiences.push(experience);
      }
    }
  }
  
  // Parse education
  if (sections['EDUCATION']) {
    const educationText = sections['EDUCATION'];
    const educationBlocks = educationText.split('\n\n');
    
    for (const block of educationBlocks) {
      if (!block.trim()) continue;
      
      const lines = block.split('\n');
      const firstLine = lines[0];
      
      // Extract degree, institution, dates
      const degreeMatch = firstLine.match(/(.*?)\s+\|\s+(.*?)\s+\|\s+(.*?)$/);
      
      if (degreeMatch) {
        const [_, degree, institution, dates] = degreeMatch;
        
        // Split degree into degree and field of study
        const degreeFieldMatch = degree.match(/(.*?)\s+in\s+(.*)/);
        const actualDegree = degreeFieldMatch ? degreeFieldMatch[1].trim() : degree;
        const fieldOfStudy = degreeFieldMatch ? degreeFieldMatch[2].trim() : '';
        
        // Split dates into start and end
        const dateMatch = dates.match(/([\d-]+)-([\d-]+)/);
        const startDate = dateMatch ? dateMatch[1].trim() : '';
        const endDate = dateMatch ? dateMatch[2].trim() : '';
        
        // Extract description (if available)
        const description = lines[1] ? lines[1].trim() : '';
        
        const education: Education = {
          id: generateId(),
          degree: actualDegree,
          fieldOfStudy,
          institution,
          startDate,
          endDate,
          description
        };
        
        result.education.push(education);
      }
    }
  }
  
  // Parse expertise
  if (sections['EXPERTISE']) {
    const expertiseText = sections['EXPERTISE'];
    const expertiseLines = expertiseText.split('\n');
    
    let currentCategory = 'General';
    const expertiseMap: Record<string, string[]> = {};
    
    for (const line of expertiseLines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.endsWith(':')) {
        // This is a category
        currentCategory = trimmedLine.slice(0, -1).trim();
        expertiseMap[currentCategory] = [];
      } else if (trimmedLine.startsWith('•')) {
        // This is a skill point
        const skill = trimmedLine.replace('•', '').trim();
        if (skill) {
          if (!expertiseMap[currentCategory]) {
            expertiseMap[currentCategory] = [];
          }
          
          // Split by commas to get individual skills
          const skills = skill.split(',').map(s => s.trim());
          expertiseMap[currentCategory].push(...skills);
        }
      }
    }
    
    // Convert the map to the expected format
    for (const [category, skills] of Object.entries(expertiseMap)) {
      if (skills.length > 0) {
        const expertiseCategory: ExpertiseCategory = {
          id: generateId(),
          category,
          skills
        };
        
        result.expertise.push(expertiseCategory);
      }
    }
  }
  
  // Parse languages
  if (sections['LANGUAGES']) {
    const languageText = sections['LANGUAGES'];
    const languageLines = languageText.split('\n');
    
    for (const line of languageLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•')) {
        const langMatch = trimmedLine.match(/• (.*?) \((.*?)\)/);
        if (langMatch) {
          const language: Language = {
            id: generateId(),
            name: langMatch[1].trim(),
            proficiency: langMatch[2].trim()
          };
          
          result.languages.push(language);
        } else {
          // In case there's no proficiency level in parentheses
          const simpleLang = trimmedLine.replace('•', '').trim();
          if (simpleLang) {
            const language: Language = {
              id: generateId(),
              name: simpleLang,
              proficiency: ''
            };
            
            result.languages.push(language);
          }
        }
      }
    }
  }
  
  // Parse certificates
  if (sections['CERTIFICATES']) {
    const certificateText = sections['CERTIFICATES'];
    const certificateLines = certificateText.split('\n');
    
    for (const line of certificateLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•')) {
        const certMatch = trimmedLine.match(/• (.*?) \| (.*?) \| ([\d-]+)/);
        if (certMatch) {
          const certificate: Certificate = {
            id: generateId(),
            name: certMatch[1].trim(),
            issuer: certMatch[2].trim(),
            date: certMatch[3].trim()
          };
          
          result.certificates.push(certificate);
        } else {
          // In case the format is different
          const simpleCert = trimmedLine.replace('•', '').trim();
          if (simpleCert) {
            const certificate: Certificate = {
              id: generateId(),
              name: simpleCert,
              issuer: '',
              date: ''
            };
            
            result.certificates.push(certificate);
          }
        }
      }
    }
  }
  
  // Parse personal information
  if (sections['PERSONAL']) {
    const personalText = sections['PERSONAL'];
    const personalLines = personalText.split('\n');
    
    for (const line of personalLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('Nationality:')) {
        result.personalInfo.nationality = trimmedLine.replace('Nationality:', '').trim();
      } else if (trimmedLine.startsWith('Date of Birth:')) {
        result.personalInfo.dateOfBirth = trimmedLine.replace('Date of Birth:', '').trim();
      } else if (trimmedLine.startsWith('Marital Status:')) {
        result.personalInfo.maritalStatus = trimmedLine.replace('Marital Status:', '').trim();
      } else if (trimmedLine.startsWith('Hobbies:')) {
        const hobbies = trimmedLine.replace('Hobbies:', '').trim();
        result.personalInfo.hobbies = hobbies.split(',').map(h => h.trim());
      }
    }
  }
  
  return result;
}

// Function to generate CV text from structured data
export function generateCVText(data: CVData): string {
  let text = '';
  
  // Personal Info & Summary
  text += 'ABOUT ME\n---------\n';
  text += data.personalInfo.summary + '\n\n';
  
  // Contact Info
  text += 'CONTACT\n-------\n';
  text += `Email: ${data.contactInfo.email}\n`;
  text += `Phone: ${data.contactInfo.phone}\n`;
  text += `Address: ${data.contactInfo.address}\n`;
  if (data.contactInfo.linkedIn) text += `LinkedIn: ${data.contactInfo.linkedIn}\n`;
  if (data.contactInfo.website) text += `Website: ${data.contactInfo.website}\n\n`;
  
  // Work Experience
  text += 'WORK EXPERIENCE\n--------------\n';
  data.experiences.forEach((exp, index) => {
    text += `${exp.position} | ${exp.company} | ${exp.startDate} – ${exp.isCurrentRole ? 'Present' : exp.endDate}\n`;
    text += exp.description + '\n';
    exp.achievements.forEach(achievement => {
      text += `• ${achievement}\n`;
    });
    if (index < data.experiences.length - 1) text += '\n';
  });
  text += '\n';
  
  // Education
  text += 'EDUCATION\n---------\n';
  data.education.forEach((edu, index) => {
    text += `${edu.degree} in ${edu.fieldOfStudy} | ${edu.institution} | ${edu.startDate}-${edu.endDate}\n`;
    if (edu.description) text += edu.description + '\n';
    if (index < data.education.length - 1) text += '\n';
  });
  text += '\n';
  
  // Expertise
  text += 'EXPERTISE\n---------\n';
  data.expertise.forEach((exp, index) => {
    text += `${exp.category}:\n`;
    exp.skills.forEach(skill => {
      text += `• ${skill}\n`;
    });
    if (index < data.expertise.length - 1) text += '\n';
  });
  text += '\n';
  
  // Languages
  text += 'LANGUAGES\n---------\n';
  data.languages.forEach(lang => {
    text += `• ${lang.name} (${lang.proficiency})\n`;
  });
  text += '\n';
  
  // Certificates
  text += 'CERTIFICATES\n---------\n';
  data.certificates.forEach(cert => {
    text += `• ${cert.name} | ${cert.issuer} | ${cert.date}\n`;
  });
  text += '\n';
  
  // Personal
  text += 'PERSONAL\n--------\n';
  text += `Nationality: ${data.personalInfo.nationality}\n`;
  text += `Date of Birth: ${data.personalInfo.dateOfBirth}\n`;
  text += `Marital Status: ${data.personalInfo.maritalStatus}\n`;
  text += `Hobbies: ${data.personalInfo.hobbies.join(', ')}\n`;
  
  return text;
}