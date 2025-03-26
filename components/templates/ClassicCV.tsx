import React from 'react';
import { User } from 'lucide-react';
import { CVData } from '@/types/cv-types';

interface ClassicCVPreviewProps {
  cvData: CVData;
  profileImage: string | null;
}

export default function ClassicCVPreview({ cvData, profileImage }: ClassicCVPreviewProps) {
  return (
    <div className="cv-preview-classic bg-white font-serif rounded-lg border border-gray-200 overflow-hidden print:border-none">
      {/* Header */}
      <div className="text-center p-4 sm:p-6 border-b border-gray-200 relative">
        {/* Profile image (centered above name in classic style) */}
        <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-gray-500" />
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">{cvData.personalInfo.fullName}</h1>
        <p className="text-lg text-gray-700 mt-1">{cvData.personalInfo.title}</p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs sm:text-sm text-gray-600">
          <div>{cvData.contactInfo.email}</div>
          <div>{cvData.contactInfo.phone}</div>
          <div>{cvData.contactInfo.address}</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Summary */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Professional Summary</h2>
          <div className="h-px bg-gray-300 mb-2"></div>
          <p className="text-gray-700 text-sm">{cvData.personalInfo.summary}</p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-5">
          {/* Experience */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Work Experience</h2>
            <div className="h-px bg-gray-300 mb-2"></div>
            
            <div className="space-y-4">
              {cvData.experiences.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{exp.position}</div>
                      <div className="text-gray-700 text-xs">{exp.company}, {exp.location}</div>
                    </div>
                    <div className="text-gray-600 text-xs mt-1 md:mt-0">{exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}</div>
                  </div>
                  <p className="text-gray-700 mt-2 text-xs">{exp.description}</p>
                  
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 text-xs">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
              <div className="h-px bg-gray-300 mb-2"></div>
              
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{edu.degree} in {edu.fieldOfStudy}</div>
                        <div className="text-gray-700 text-xs">{edu.institution}</div>
                      </div>
                      <div className="text-gray-600 text-xs mt-1 md:mt-0">{edu.startDate} - {edu.endDate}</div>
                    </div>
                    {edu.description && <p className="text-gray-700 mt-2 text-xs">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
            {/* Skills & Expertise */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Skills & Expertise</h2>
              <div className="h-px bg-gray-300 mb-2"></div>
              
              <div className="space-y-3">
                {cvData.expertise.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="font-bold text-gray-900 mb-1 text-sm">{exp.category}</div>
                    <div className="text-gray-700 text-xs">{exp.skills.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Languages */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Languages</h2>
              <div className="h-px bg-gray-300 mb-2"></div>
              
              <div className="space-y-1 mb-4">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="mb-1 text-gray-700 text-xs">
                    {lang.name}: {lang.proficiency}
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Certificates</h2>
              <div className="h-px bg-gray-300 mb-2"></div>

              <div className="space-y-2">
                {cvData.certificates.map((cert) => (
                  <div key={cert.id} className="mb-2 text-gray-700">
                    <div className="font-medium text-xs">{cert.name}</div>
                    <div className="text-xs">{cert.issuer}, {cert.date}</div>
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