import React from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ContactInfo } from '@/types/cv-types';

interface ContactSectionProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export default function ContactSection({ data, onChange }: ContactSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="+41 78 123 45 67"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Street, City, Postal Code, Country"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedIn">LinkedIn Profile</Label>
          <Input
            id="linkedIn"
            name="linkedIn"
            value={data.linkedIn}
            onChange={handleChange}
            placeholder="linkedin.com/in/yourname"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Personal Website</Label>
          <Input
            id="website"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );
}