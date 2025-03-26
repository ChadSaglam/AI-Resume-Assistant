import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Expertise } from '@/types/cv-types';
import { ChevronDown, ChevronUp, Plus, Trash, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ExpertiseSectionProps {
  expertise: Expertise[];
  onChange: (expertise: Expertise[]) => void;
}

export default function ExpertiseSection({ expertise, onChange }: ExpertiseSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    expertise.length > 0 ? expertise[0].id : null
  );

  const handleAddExpertise = () => {
    const newExpertise: Expertise = {
      id: uuidv4(),
      category: '',
      skills: [],
    };
    
    const updatedExpertise = [...expertise, newExpertise];
    onChange(updatedExpertise);
    setExpandedId(newExpertise.id);
  };

  const handleRemoveExpertise = (id: string) => {
    const updatedExpertise = expertise.filter(exp => exp.id !== id);
    onChange(updatedExpertise);
    
    // If we're removing the expanded one, expand the first in the list
    if (expandedId === id && updatedExpertise.length > 0) {
      setExpandedId(updatedExpertise[0].id);
    }
  };

  const handleExpertiseChange = (id: string, field: keyof Expertise, value: any) => {
    const updatedExpertise = expertise.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange(updatedExpertise);
  };

  const handleAddSkill = (expertiseId: string, skill: string = '') => {
    const updatedExpertise = expertise.map(exp => {
      if (exp.id === expertiseId) {
        return {
          ...exp,
          skills: [...exp.skills, skill],
        };
      }
      return exp;
    });
    onChange(updatedExpertise);
  };

  const handleRemoveSkill = (expertiseId: string, index: number) => {
    const updatedExpertise = expertise.map(exp => {
      if (exp.id === expertiseId) {
        const updatedSkills = [...exp.skills];
        updatedSkills.splice(index, 1);
        return {
          ...exp,
          skills: updatedSkills,
        };
      }
      return exp;
    });
    onChange(updatedExpertise);
  };

  const handleSkillChange = (expertiseId: string, index: number, value: string) => {
    const updatedExpertise = expertise.map(exp => {
      if (exp.id === expertiseId) {
        const updatedSkills = [...exp.skills];
        updatedSkills[index] = value;
        return {
          ...exp,
          skills: updatedSkills,
        };
      }
      return exp;
    });
    onChange(updatedExpertise);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // For skill input
  const [newSkill, setNewSkill] = useState<string>('');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Professional Expertise</h3>
        <Button 
          onClick={handleAddExpertise}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Category
        </Button>
      </div>
      
      {expertise.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No expertise categories added. Click "Add Category" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {expertise.map((exp) => (
            <Card key={exp.id} className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(exp.id)}>
                <div>
                  <h4 className="font-medium">
                    {exp.category || 'New Category'}
                  </h4>
                  <div className="text-sm text-gray-500">
                    {exp.skills.length} skills
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExpertise(exp.id);
                    }}
                  >
                    <Trash size={16} className="text-gray-500 hover:text-red-500" />
                  </Button>
                  {expandedId === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === exp.id && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`category-${exp.id}`}>Category Name</Label>
                    <Input
                      id={`category-${exp.id}`}
                      value={exp.category}
                      onChange={(e) => handleExpertiseChange(exp.id, 'category', e.target.value)}
                      placeholder="Programming Languages, Tools, Frameworks, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Skills</Label>
                    
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white dark:bg-gray-800 min-h-[80px]">
                      {exp.skills.map((skill, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                        >
                          <span>{skill}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-5 h-5 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
                            onClick={() => handleRemoveSkill(exp.id, index)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newSkill.trim()) {
                            handleAddSkill(exp.id, newSkill.trim());
                            setNewSkill('');
                            e.preventDefault();
                          }
                        }}
                      />
                      <Button 
                        variant="outline"
                        onClick={() => {
                          if (newSkill.trim()) {
                            handleAddSkill(exp.id, newSkill.trim());
                            setNewSkill('');
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Press Enter to add multiple skills quickly</p>
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