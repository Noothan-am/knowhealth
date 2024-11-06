"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Calendar as CalendarIcon,
  FileText,
  Pill,
  ChevronRight,
  Video,
  Microscope,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const [diagnosticAppointments, setDiagnosticAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reports, setReports] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role != "consumer") {
      window.location.href = "/login";
    }
    const details = JSON.parse(localStorage.getItem("Data"));
    console.log(details.id);

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/get-orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: details.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
        setDiagnosticAppointments(data);
      } catch (err) {
        setOrderError(err.message);
        setError(err.message);
      } finally {
        setOrderLoading(false);
        setLoading(false);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports/get-reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: details.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      } finally {
        setReportLoading(false);
      }
    };

    fetchOrders();
    fetchReports();
  }, []);

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      date: "2023-06-15",
      time: "10:00 AM",
      type: "In-person",
    },
    {
      id: 2,
      doctor: "Dr. Johnson",
      specialty: "Dermatologist",
      date: "2023-06-18",
      time: "2:30 PM",
      type: "Video",
    },
    {
      id: 3,
      doctor: "Dr. Williams",
      specialty: "Neurologist",
      date: "2023-06-22",
      time: "11:15 AM",
      type: "In-person",
    },
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    {
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
    },
  ];

  const testResults = [
    { name: "Complete Blood Count", date: "2023-05-20", status: "Normal" },
    { name: "Lipid Panel", date: "2023-05-20", status: "Abnormal" },
    { name: "Thyroid Function", date: "2023-05-20", status: "Pending" },
  ];

  const handleViewMedicalRecords = () => {
    window.location.href = "/user-record";
  };

  const handleViewOrder = (orderId) => {
    router.push(`/view-order?orderId=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Patient Dashboard
          </h1>
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
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between py-4 border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.specialty}
                        </p>
                        <p className="text-sm">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            appointment.type === "Video"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {appointment.type === "Video" ? (
                            <Video className="mr-1 h-3 w-3" />
                          ) : (
                            <CalendarIcon className="mr-1 h-3 w-3" />
                          )}
                          {appointment.type}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">
                            View appointment details
                          </span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Appointments
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Upcoming Diagnostic Appointments and Lab Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  {loading ? (
                    <p>Loading diagnostic appointments...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    diagnosticAppointments.length != 0 &&
                    diagnosticAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between py-4 border-b last:border-b-0"
                      >
                        <div>
                          <p className="font-medium">{appointment.item.name}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.diagnosticCenterId}
                          </p>
                          <p className="text-sm">
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(
                              appointment.appointmentDate
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline">
                            <Microscope className="mr-1 h-3 w-3" />
                            Diagnostic
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewOrder(appointment.id)}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">
                              View diagnostic appointment details
                            </span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Diagnostic Appointments
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {orderLoading || reportLoading ? (
                    <p>Loading test results...</p>
                  ) : orderError ? (
                    <p>Error: {orderError}</p>
                  ) : (
                    orders.map((order) => {
                      const report = reports.find(r => r.orderId === order.id);
                      return (
                        <div
                          key={order.id}
                          className="flex items-center justify-between py-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium">{order.item.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.appointmentDate).toLocaleDateString()}
                            </p>
                          </div>
                          {report ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/view-report?reportId=${report.id}`)}
                            >
                              View Report
                            </Button>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </div>
                      );
                    })
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Results
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <Button className="flex flex-col mt-2 items-center justify-center h-full w-80">
                  <CalendarIcon className="h-6 w-6 mb-2" />
                  Book Appointment
                </Button>
                <Button
                  className="flex flex-col mt-4 items-center justify-center h-full w-80"
                  onClick={handleViewMedicalRecords}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  View Medical Records
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
