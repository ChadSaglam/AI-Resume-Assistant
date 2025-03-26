import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Education } from '@/types/cv-types';
import { ChevronDown, ChevronUp, Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationSection({ education, onChange }: EducationSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    education.length > 0 ? education[0].id : null
  );

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    
    const updatedEducation = [...education, newEducation];
    onChange(updatedEducation);
    setExpandedId(newEducation.id);
  };

  const handleRemoveEducation = (id: string) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    onChange(updatedEducation);
    
    // If we're removing the expanded one, expand the first in the list
    if (expandedId === id && updatedEducation.length > 0) {
      setExpandedId(updatedEducation[0].id);
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = education.map(edu => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange(updatedEducation);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Education</h3>
        <Button 
          onClick={handleAddEducation}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Education
        </Button>
      </div>
      
      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No education added. Click "Add Education" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(edu.id)}>
                <div>
                  <h4 className="font-medium">
                    {edu.degree || 'New Degree'} 
                    {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  </h4>
                  <div className="text-sm text-gray-500">
                    {edu.institution} {edu.startDate && `(${edu.startDate} - ${edu.endDate})`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEducation(edu.id);
                    }}
                  >
                    <Trash size={16} className="text-gray-500 hover:text-red-500" />
                  </Button>
                  {expandedId === edu.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === edu.id && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${edu.id}`}>Institution/University</Label>
                      <Input
                        id={`institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor's, Master's, PhD"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`fieldOfStudy-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`fieldOfStudy-${edu.id}`}
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleEducationChange(edu.id, 'fieldOfStudy', e.target.value)}
                      placeholder="Computer Science, Engineering, etc."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${edu.id}`}
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                        placeholder="YYYY"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${edu.id}`}
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                        placeholder="YYYY or Present"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${edu.id}`}>Additional Information</Label>
                    <Textarea
                      id={`description-${edu.id}`}
                      value={edu.description}
                      onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                      placeholder="Describe your studies, achievements, thesis, etc."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}