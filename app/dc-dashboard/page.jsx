"use client";
import { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Beaker, FileText, Users, Search, Download } from "lucide-react";

// WhiteCard component
function WhiteCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg  shadow-md p-6  ${className}`}>
      {children}
    </div>
  );
}

// Mock data (you should replace this with your actual data fetching logic)
const centerInfo = {
  name: "HealthFirst Diagnostics",
  address: "123 Main St, Cityville, State 12345",
  contact: "+1 (555) 123-4567",
  email: "info@healthfirst.com",
};

const tests = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    price: 50,
    turnaroundTime: "24 hours",
  },
  { id: 2, name: "Lipid Panel", price: 75, turnaroundTime: "48 hours" },
  {
    id: 3,
    name: "Thyroid Function Test",
    price: 100,
    turnaroundTime: "72 hours",
  },
  { id: 4, name: "COVID-19 PCR Test", price: 150, turnaroundTime: "24 hours" },
  { id: 5, name: "Vitamin D Test", price: 80, turnaroundTime: "48 hours" },
];

const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    test: "Complete Blood Count (CBC)",
    date: "2023-05-15",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    test: "Lipid Panel",
    date: "2023-05-16",
    time: "11:30 AM",
    status: "Scheduled",
  },
  {
    id: 3,
    patientName: "Alice Johnson",
    test: "Thyroid Function Test",
    date: "2023-05-17",
    time: "09:15 AM",
    status: "In Progress",
  },
  {
    id: 4,
    patientName: "Bob Williams",
    test: "COVID-19 PCR Test",
    date: "2023-05-18",
    time: "02:00 PM",
    status: "Scheduled",
  },
  {
    id: 5,
    patientName: "Eva Brown",
    test: "Vitamin D Test",
    date: "2023-05-19",
    time: "10:45 AM",
    status: "Scheduled",
  },
];

const reports = [
  {
    id: 1,
    patientName: "John Doe",
    test: "Complete Blood Count (CBC)",
    date: "2023-05-15",
    status: "Ready",
  },
  {
    id: 2,
    patientName: "Mary Johnson",
    test: "Lipid Panel",
    date: "2023-05-14",
    status: "Ready",
  },
  {
    id: 3,
    patientName: "Alice Johnson",
    test: "Thyroid Function Test",
    date: "2023-05-17",
    status: "Processing",
  },
  {
    id: 4,
    patientName: "Robert Smith",
    test: "COVID-19 PCR Test",
    date: "2023-05-16",
    status: "Ready",
  },
  {
    id: 5,
    patientName: "Eva Brown",
    test: "Vitamin D Test",
    date: "2023-05-19",
    status: "Pending",
  },
];

export default function DashboardWithCard() {
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.test.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = reports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.test.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WhiteCard className="max-w-6xl m-5 mx-auto">
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {centerInfo.name}
          </h1>
          <p className="text-gray-600 my-1 dark:text-gray-300">
            {centerInfo.address}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {centerInfo.contact} | {centerInfo.email}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <Beaker className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Today's Appointments"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  appointments.filter(
                    (a) => a.date === new Date().toISOString().split("T")[0]
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reports.filter((r) => r.status !== "Ready").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tests" className="space-y-4">
            <h2 className="text-2xl mt-8 font-semibold">Available Tests</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Turnaround Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>${test.price}</TableCell>
                    <TableCell>{test.turnaroundTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mt-8 font-semibold">Appointments</h2>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    {date ? date.toDateString() : "Select a date"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${appointment.patientName}`}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>
                                  {appointment.patientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{appointment.patientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{appointment.test}</TableCell>
                          <TableCell>{appointment.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                appointment.status === "Completed"
                                  ? "secondary"
                                  : appointment.status === "In Progress"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mt-8 font-semibold">Reports</h2>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {report.patientName}
                    </TableCell>
                    <TableCell>{report.test}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === "Ready"
                            ? "secondary"
                            : report.status === "Processing"
                            ? "default"
                            : "outline"
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {report.status === "Ready" && (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </WhiteCard>
  );
}
