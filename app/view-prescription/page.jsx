"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  User,
  Phone,
  Mail,
  Eye,
  FileText,
  Download,
} from "lucide-react";

export default function PrescriptionList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [allPrescriptions, setAllPrescriptions] = useState([]);

  const filteredPrescriptions = allPrescriptions.filter(
    (prescription) =>
      prescription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("/api/prescription");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("kjsdf");

        setAllPrescriptions(data);
        console.log("sdf", data[0].image);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Prescriptions</h1>
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search prescriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrescriptions.map((prescription) => (
          <Card
            key={prescription.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPrescription(prescription)}
          >
            <CardHeader>
              <CardTitle>{prescription.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{prescription.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedPrescription}
        onOpenChange={() => setSelectedPrescription(null)}
      >
        <DialogContent className="max-w-6xl h-5/6 overflow-auto">
          <div className="container mx-auto p-4 max-w-4xl">
            <DialogTitle>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Prescription Details</h1>
              </div>
            </DialogTitle>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">
                          {selectedPrescription?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 text-muted-foreground">🎂</span>
                      <div>
                        <p className="text-sm text-muted-foreground">Age</p>
                        <p className="font-medium">
                          {selectedPrescription?.age}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Phone Number
                        </p>
                        <p className="font-medium">
                          {selectedPrescription?.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">
                          {selectedPrescription?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prescription Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-muted">
                      {selectedPrescription?.image ? (
                        <Image
                          src={selectedPrescription?.image}
                          alt="Medical Report"
                          className="object-cover"
                          fill
                        />
                      ) : null}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => setShowReport(true)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Full Report
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">MRI_Report_123.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Dialog open={showReport} onOpenChange={setShowReport}>
              <DialogContent className="max-w-7xl">
                <DialogHeader>
                  <DialogTitle>Medical Report</DialogTitle>
                </DialogHeader>
                <div className="relative aspect-[9/16] overflow-hidden rounded-lg">
                  {selectedPrescription?.image ? (
                    <Image
                      src={selectedPrescription?.image}
                      alt="Full Medical Report"
                      className="object-contain"
                      fill
                    />
                  ) : null}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
