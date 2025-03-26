import React from 'react';
import { Zap, PenTool } from 'lucide-react';
import { CVData } from '@/types/cv-types';

interface ModernCVPreviewProps {
  cvData: CVData;
  profileImage: string | null;
}

export default function ModernCVPreview({ cvData, profileImage }: ModernCVPreviewProps) {
  return (
    <div className="cv-preview-modern bg-white rounded-lg border border-gray-100 overflow-hidden print:border-none">
      {/* Header Section with accent color */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6 print:bg-blue-600">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          {/* Profile image */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center text-white border-4 border-white/30 text-2xl font-bold overflow-hidden">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              cvData.personalInfo.fullName.charAt(0)
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{cvData.personalInfo.fullName}</h1>
            <p className="text-lg md:text-xl text-blue-100 mt-1">{cvData.personalInfo.title}</p>
            
            <div className="flex flex-wrap gap-3 md:gap-4 mt-3 md:mt-4 text-xs sm:text-sm">
              <div>
                <div className="text-blue-200 font-medium">Email</div>
                <div>{cvData.contactInfo.email}</div>
              </div>
              <div>
                <div className="text-blue-200 font-medium">Phone</div>
                <div>{cvData.contactInfo.phone}</div>
              </div>
              <div>
                <div className="text-blue-200 font-medium">Location</div>
                <div>{cvData.contactInfo.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        {/* About Me */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{cvData.personalInfo.summary}</p>
        </div>
        
        {/* Work Experience */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-blue-500" />
            Work Experience
          </h2>
          
          <div className="space-y-5">
            {cvData.experiences.map((exp) => (
              <div key={exp.id} className="relative pl-5 border-l-2 border-gray-200">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5"></div>
                <div className="mb-1 font-bold text-gray-800">{exp.position}</div>
                <div className="text-blue-600 font-medium text-sm">{exp.company}</div>
                <div className="text-xs text-gray-600 mb-2">
                  {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate} | {exp.location}
                </div>
                <p className="text-gray-700 mb-2 text-sm">{exp.description}</p>
                
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Education */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Education
              </h2>
              
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="relative pl-5 border-l-2 border-gray-200">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5"></div>
                    <div className="mb-1 font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</div>
                    <div className="text-blue-600 font-medium text-sm">{edu.institution}</div>
                    <div className="text-xs text-gray-600 mb-2">{edu.startDate} - {edu.endDate}</div>
                    {edu.description && <p className="text-gray-700 text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Skills & Expertise */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Skills & Expertise
              </h2>
              
              <div className="space-y-4">
                {cvData.expertise.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <h3 className="font-medium text-gray-800 mb-2 text-sm">{exp.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Languages */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Languages
              </h2>
              
              <div className="space-y-2">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="text-gray-800 text-sm">{lang.name}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Certificates */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                Certificates
              </h2>
              
              <div className="space-y-3">
                {cvData.certificates.map((cert) => (
                  <div key={cert.id} className="text-gray-700">
                    <div className="font-medium text-sm">{cert.name}</div>
                    <div className="text-xs">{cert.issuer} | {cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}