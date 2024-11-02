import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar as CalendarIcon, FileText, Pill, ChevronRight, Video, Microscope } from 'lucide-react'

export default function PatientDashboard() {
  const appointments = [
    { id: 1, doctor: "Dr. Smith", specialty: "Cardiologist", date: "2023-06-15", time: "10:00 AM", type: "In-person" },
    { id: 2, doctor: "Dr. Johnson", specialty: "Dermatologist", date: "2023-06-18", time: "2:30 PM", type: "Video" },
    { id: 3, doctor: "Dr. Williams", specialty: "Neurologist", date: "2023-06-22", time: "11:15 AM", type: "In-person" },
  ]

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime" },
  ]

  const testResults = [
    { name: "Complete Blood Count", date: "2023-05-20", status: "Normal" },
    { name: "Lipid Panel", date: "2023-05-20", status: "Abnormal" },
    { name: "Thyroid Function", date: "2023-05-20", status: "Pending" },
  ]

  const diagnosticAppointments = [
    { id: 1, test: "MRI Scan", location: "City Imaging Center", date: "2023-06-25", time: "9:00 AM" },
    { id: 2, test: "Echocardiogram", location: "Heart Diagnostics Lab", date: "2023-06-28", time: "11:30 AM" },
    { id: 3, test: "Bone Density Scan", location: "Orthopedic Center", date: "2023-07-02", time: "2:00 PM" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Patient Dashboard</h1>
          
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                        <p className="text-sm">{appointment.date} at {appointment.time}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={appointment.type === "Video" ? "secondary" : "outline"}>
                          {appointment.type === "Video" ? <Video className="mr-1 h-3 w-3" /> : <CalendarIcon className="mr-1 h-3 w-3" />}
                          {appointment.type}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View appointment details</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Appointments</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Diagnostic Appointments and Lab Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  {diagnosticAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{appointment.test}</p>
                        <p className="text-sm text-gray-500">{appointment.location}</p>
                        <p className="text-sm">{appointment.date} at {appointment.time}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline">
                          <Microscope className="mr-1 h-3 w-3" />
                          Diagnostic
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View diagnostic appointment details</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Diagnostic Appointments</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {testResults.map((test, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-gray-500">{test.date}</p>
                      </div>
                      <Badge variant={
                        test.status === "Normal" ? "success" :
                        test.status === "Abnormal" ? "destructive" : "secondary"
                      }>
                        {test.status}
                      </Badge>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Results</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 p-4 overflow-hidden">
                  <Button className="flex flex-col items-center justify-center h-full">
                    <CalendarIcon className="h-6 w-6 mb-2" />
                    Book Appointment
                  </Button>
                  <Button className="flex flex-col items-center justify-center h-full">
                    <FileText className="h-6 w-6 mb-2" />
                    View Medical Records
                  </Button>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {medications.map((medication, index) => (
                  <div key={index} className="flex items-start space-x-4 mb-4 last:mb-0">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Pill className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{medication.name}</p>
                      <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Manage Medications</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}