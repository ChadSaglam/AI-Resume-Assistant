'use client';
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { User, Upload } from 'lucide-react';
import { PersonalInfo } from '@/types/cv-types';

interface PersonalSectionProps {
  data: PersonalInfo;
  profileImage: string | null;
  onImageChange: (image: string | null) => void;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalSection({ 
  data, 
  profileImage, 
  onImageChange, 
  onChange 
}: PersonalSectionProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };
  
  const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hobbiesStr = e.target.value;
    const hobbies = hobbiesStr.split(',').map(hobby => hobby.trim());
    onChange({
      ...data,
      hobbies
    });
  };
  
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const imageDataUrl = event.target.result;
          onImageChange(imageDataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeProfileImage = () => {
    onImageChange(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Image Upload */}
        <div className="relative group w-fit">
          <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <label 
            htmlFor="profile-upload" 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            <Upload className="w-6 h-6 text-white" />
          </label>
          <input 
            id="profile-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleProfileImageUpload}
          />
          
          {profileImage && (
            <button 
              onClick={removeProfileImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Software Engineer"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={data.summary}
              onChange={handleChange}
              placeholder="A brief summary of your professional background and key strengths"
              rows={5}
            />
          </div>
        </div>
      </div>
      
      <Card className="p-4 space-y-4">
        <h3 className="font-medium text-lg">Additional Personal Details</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              name="nationality"
              value={data.nationality}
              onChange={handleChange}
              placeholder="e.g. Swiss"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={handleChange}
              placeholder="DD.MM.YYYY"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Input
              id="maritalStatus"
              name="maritalStatus"
              value={data.maritalStatus}
              onChange={handleChange}
              placeholder="e.g. Married, 2 children"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hobbies">Hobbies (comma separated)</Label>
            <Input
              id="hobbies"
              name="hobbies"
              value={data.hobbies.join(', ')}
              onChange={handleHobbiesChange}
              placeholder="e.g. Reading, Hiking, Photography"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}