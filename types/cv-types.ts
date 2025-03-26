// CV data types

export interface PersonalInfo {
  fullName: string;
  title: string;
  summary: string;
  nationality: string;
  dateOfBirth: string;
  maritalStatus: string;
  hobbies: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  website: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExpertiseCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  experiences: Experience[];
  education: Education[];
  expertise: ExpertiseCategory[];
  languages: Language[];
  certificates: Certificate[];
}