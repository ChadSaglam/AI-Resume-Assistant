import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/Select';
import { Experience } from '@/types/cv-types';
import { ChevronDown, ChevronUp, Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export default function ExperienceSection({ experiences, onChange }: ExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences.length > 0 ? experiences[0].id : null
  );

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
      achievements: [''],
    };
    
    const updatedExperiences = [...experiences, newExperience];
    onChange(updatedExperiences);
    setExpandedId(newExperience.id);
  };

  const handleRemoveExperience = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    onChange(updatedExperiences);
    
    // If we're removing the expanded one, expand the first in the list
    if (expandedId === id && updatedExperiences.length > 0) {
      setExpandedId(updatedExperiences[0].id);
    }
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: any) => {
    const updatedExperiences = experiences.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange(updatedExperiences);
  };

  const handleAddAchievement = (experienceId: string) => {
    const updatedExperiences = experiences.map(exp => {
      if (exp.id === experienceId) {
        return {
          ...exp,
          achievements: [...exp.achievements, ''],
        };
      }
      return exp;
    });
    onChange(updatedExperiences);
  };

  const handleRemoveAchievement = (experienceId: string, index: number) => {
    const updatedExperiences = experiences.map(exp => {
      if (exp.id === experienceId) {
        const updatedAchievements = [...exp.achievements];
        updatedAchievements.splice(index, 1);
        return {
          ...exp,
          achievements: updatedAchievements,
        };
      }
      return exp;
    });
    onChange(updatedExperiences);
  };

  const handleAchievementChange = (experienceId: string, index: number, value: string) => {
    const updatedExperiences = experiences.map(exp => {
      if (exp.id === experienceId) {
        const updatedAchievements = [...exp.achievements];
        updatedAchievements[index] = value;
        return {
          ...exp,
          achievements: updatedAchievements,
        };
      }
      return exp;
    });
    onChange(updatedExperiences);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button 
          onClick={handleAddExperience}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Experience
        </Button>
      </div>
      
      {experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No work experience added. Click "Add Experience" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <Card key={experience.id} className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(experience.id)}>
                <div>
                  <h4 className="font-medium">
                    {experience.position || 'New Position'} 
                    {experience.company && ` at ${experience.company}`}
                  </h4>
                  <div className="text-sm text-gray-500">
                    {experience.startDate && `${experience.startDate} - `}
                    {experience.isCurrentRole ? 'Present' : experience.endDate}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExperience(experience.id);
                    }}
                  >
                    <Trash size={16} className="text-gray-500 hover:text-red-500" />
                  </Button>
                  {expandedId === experience.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === experience.id && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`position-${experience.id}`}>Position/Title</Label>
                      <Input
                        id={`position-${experience.id}`}
                        value={experience.position}
                        onChange={(e) => handleExperienceChange(experience.id, 'position', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`company-${experience.id}`}>Company</Label>
                      <Input
                        id={`company-${experience.id}`}
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(experience.id, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`location-${experience.id}`}>Location</Label>
                      <Input
                        id={`location-${experience.id}`}
                        value={experience.location}
                        onChange={(e) => handleExperienceChange(experience.id, 'location', e.target.value)}
                        placeholder="Zurich, Switzerland"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                        <Input
                          id={`startDate-${experience.id}`}
                          value={experience.startDate}
                          onChange={(e) => handleExperienceChange(experience.id, 'startDate', e.target.value)}
                          placeholder="MM/YYYY"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                        <Input
                          id={`endDate-${experience.id}`}
                          value={experience.endDate}
                          onChange={(e) => handleExperienceChange(experience.id, 'endDate', e.target.value)}
                          placeholder="MM/YYYY"
                          disabled={experience.isCurrentRole}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`currentRole-${experience.id}`}
                      checked={experience.isCurrentRole}
                      onCheckedChange={(checked) => handleExperienceChange(experience.id, 'isCurrentRole', Boolean(checked))}
                    />
                    <Label htmlFor={`currentRole-${experience.id}`}>This is my current role</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                    <Textarea
                      id={`description-${experience.id}`}
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                      placeholder="Describe your role and responsibilities"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Key Achievements</Label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleAddAchievement(experience.id)}
                        className="flex items-center gap-1 h-8"
                      >
                        <Plus size={14} />
                        Add
                      </Button>
                    </div>
                    
                    {experience.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={achievement}
                          onChange={(e) => handleAchievementChange(experience.id, index, e.target.value)}
                          placeholder={`Achievement ${index + 1}`}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveAchievement(experience.id, index)}
                          disabled={experience.achievements.length <= 1}
                        >
                          <Trash size={16} className="text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                    ))}
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