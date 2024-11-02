import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from 'lucide-react';

function PatientPrescriptionCard({ person }) {
  const handleDownload = () => {
    // In a real application, you would implement the actual download logic here
    console.log('Downloading prescription:', person.prescriptionUrl);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={person.avatarUrl} alt={person.name} />
          <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{person.name}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{person.age} years</Badge>
            <Badge variant="secondary">{person.gender}</Badge>
            <Badge variant="secondary">Blood Type: {person.bloodType}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Prescription Date</h3>
          <p className="text-sm">{person.prescriptionDate}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Prescription PDF</h3>
          <div className="border rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <iframe 
              src={person.prescriptionUrl} 
              title="Prescription PDF"
              width="100%"
              height="100%"
              className="border-0"
            >
              Your browser does not support iframes.
            </iframe>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Prescription
        </Button>
      </CardFooter>
    </Card>
  );
}

// Example usage:
export function ExampleUsage() {
  const examplePerson = {
    name: "Jane Doe",
    age: 35,
    gender: "Female",
    bloodType: "A+",
    prescriptionDate: "2023-06-15",
    prescriptionUrl: "/path/to/prescription.pdf",
    avatarUrl: "https://example.com/avatar.jpg"
  };

  return <PatientPrescriptionCard person={examplePerson} />;
}

export default PatientPrescriptionCard;
