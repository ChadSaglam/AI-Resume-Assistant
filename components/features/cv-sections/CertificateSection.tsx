import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Certificate } from '@/types/cv-types';
import { ChevronDown, ChevronUp, Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface CertificateSectionProps {
  certificates: Certificate[];
  onChange: (certificates: Certificate[]) => void;
}

export default function CertificateSection({ certificates, onChange }: CertificateSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    certificates.length > 0 ? certificates[0].id : null
  );

  const handleAddCertificate = () => {
    const newCertificate: Certificate = {
      id: uuidv4(),
      name: '',
      issuer: '',
      date: '',
    };
    
    const updatedCertificates = [...certificates, newCertificate];
    onChange(updatedCertificates);
    setExpandedId(newCertificate.id);
  };

  const handleRemoveCertificate = (id: string) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== id);
    onChange(updatedCertificates);
    
    // If we're removing the expanded one, expand the first in the list
    if (expandedId === id && updatedCertificates.length > 0) {
      setExpandedId(updatedCertificates[0].id);
    }
  };

  const handleCertificateChange = (id: string, field: keyof Certificate, value: string) => {
    const updatedCertificates = certificates.map(cert => {
      if (cert.id === id) {
        return { ...cert, [field]: value };
      }
      return cert;
    });
    onChange(updatedCertificates);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Certifications</h3>
        <Button 
          onClick={handleAddCertificate}
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Certificate
        </Button>
      </div>
      
      {certificates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No certificates added. Click "Add Certificate" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(cert.id)}>
                <div>
                  <h4 className="font-medium">
                    {cert.name || 'New Certificate'}
                  </h4>
                  <div className="text-sm text-gray-500">
                    {cert.issuer && `Issued by ${cert.issuer}`} {cert.date && `(${cert.date})`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCertificate(cert.id);
                    }}
                  >
                    <Trash size={16} className="text-gray-500 hover:text-red-500" />
                  </Button>
                  {expandedId === cert.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedId === cert.id && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${cert.id}`}>Certificate Name</Label>
                    <Input
                      id={`name-${cert.id}`}
                      value={cert.name}
                      onChange={(e) => handleCertificateChange(cert.id, 'name', e.target.value)}
                      placeholder="Azure Data Scientist Associate, AWS Solutions Architect, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${cert.id}`}
                      value={cert.issuer}
                      onChange={(e) => handleCertificateChange(cert.id, 'issuer', e.target.value)}
                      placeholder="Microsoft, AWS, Google, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`date-${cert.id}`}>Date Issued</Label>
                    <Input
                      id={`date-${cert.id}`}
                      value={cert.date}
                      onChange={(e) => handleCertificateChange(cert.id, 'date', e.target.value)}
                      placeholder="MM/YYYY"
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