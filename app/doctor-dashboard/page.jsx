"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Video,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const appointments = [
  { id: 1, patient: "John Doe", time: "09:00 AM", type: "Video" },
  { id: 2, patient: "Jane Smith", time: "10:30 AM", type: "In-person" },
  { id: 3, patient: "Bob Johnson", time: "02:00 PM", type: "Video" },
];

const recentPatients = [
  { id: 1, name: "Alice Brown", lastVisit: "2023-05-15", condition: "Flu" },
  {
    id: 2,
    name: "Charlie Davis",
    lastVisit: "2023-05-10",
    condition: "Annual Checkup",
  },
  { id: 3, name: "Eva White", lastVisit: "2023-05-05", condition: "Migraine" },
];

const NavItem = ({ name, icon, isActive, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-2 mt-1 text-sm ${
      isActive ? "text-blue-600 bg-blue-100" : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="mx-4">{name}</span>
  </button>
);

const StatCard = ({ title, value, subtext, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="flex items-center text-sm font-medium space-x-2">
        <span className="mr-2">{icon}</span>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </CardContent>
  </Card>
);

const AppointmentItem = ({ patient, time, type }) => (
  <div className="flex items-center justify-between border-b pb-2">
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarFallback>{patient[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{patient}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
    <Badge variant={type === "Video" ? "secondary" : "outline"}>{type}</Badge>
  </div>
);

const PatientItem = ({ name, lastVisit, condition }) => (
  <div className="flex items-center justify-between border-b pb-2">
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">Last visit: {lastVisit}</p>
      </div>
    </div>
    <Badge variant="outline">{condition}</Badge>
  </div>
);

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabSelect = (name) => {
    if (name == "Add Prescriptions") {
      console.log("Tab selected: ", name);
      window.location.href = "/prescription";
    }
    setActiveTab(name.toLowerCase());
  };

  const navItems = [
    { name: "Dashboard", icon: <Calendar className="w-5 h-5" /> },
    { name: "Appointments", icon: <Clock className="w-5 h-5" /> },
    { name: "Patients", icon: <Users className="w-5 h-5" /> },
    { name: "Consultations", icon: <Video className="w-5 h-5" /> },
    { name: "Add Prescriptions", icon: <FileText className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Dr. Dashboard</h2>
        </div>
        <nav className="mt-6 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              isActive={activeTab === item.name.toLowerCase()}
              onClick={() => handleTabSelect(item.name)}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome, Dr. Smith
            </h1>
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Quick Lookup</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-4">
                    {navItems.map((item) => (
                      <NavItem
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                        isActive={activeTab === item.name.toLowerCase()}
                        onClick={() => setActiveTab(item.name.toLowerCase())}
                      />
                    ))}
                    <NavItem
                      name="Logout"
                      icon={<LogOut className="w-5 h-5" />}
                      isActive={false}
                      onClick={handleLogout}
                    />
                  </nav>
                </SheetContent>
              </Sheet>
              <Button
                variant="outline"
                className="hidden md:flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Appointments"
              value="12"
              subtext="Today"
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="New Patients"
              value="+3"
              subtext="This week"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Consultation Hours"
              value="24.5"
              subtext="This week"
              icon={<Video className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Appointments */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                You have {appointments.length} appointments scheduled for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentItem
                    key={appointment.id}
                    patient={appointment.patient}
                    time={appointment.time}
                    type={appointment.type}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>
                Quick overview of recent patient visits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <PatientItem
                    key={patient.id}
                    name={patient.name}
                    lastVisit={patient.lastVisit}
                    condition={patient.condition}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
