import React from 'react';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Language } from '@/types/cv-types';
import { Plus, Trash } from 'lucide-react';

interface LanguageSectionProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

const proficiencyLevels = [
  { value: 'Native', label: 'Native' },
  { value: 'C2', label: 'C2 - Proficient' },
  { value: 'C1', label: 'C1 - Advanced' },
  { value: 'B2', label: 'B2 - Upper Intermediate' },
  { value: 'B1', label: 'B1 - Intermediate' },
  { value: 'A2', label: 'A2 - Elementary' },
  { value: 'A1', label: 'A1 - Beginner' },
];

export default function LanguageSection({ languages, onChange }: LanguageSectionProps) {
  const handleAddLanguage = () => {
    onChange([...languages, { name: '', proficiency: 'B2' }]);
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    onChange(updatedLanguages);
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = languages.map((lang, i) => {
      if (i === index) {
        return { ...lang, [field]: value };
      }
      return lang;
    });
    onChange(updatedLanguages);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Languages</h3>
        <Button 
          onClick={handleAddLanguage}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Language
        </Button>
      </div>
      
      {languages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No languages added. Click "Add Language" to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Language</TableHead>
              <TableHead className="w-[30%]">Proficiency Level</TableHead>
              <TableHead className="w-[10%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {languages.map((language, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={language.name}
                    onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                    placeholder="e.g., English, German, French"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={language.proficiency}
                    onValueChange={(value) => handleLanguageChange(index, 'proficiency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLanguage(index)}
                  >
                    <Trash size={16} className="text-gray-500 hover:text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}