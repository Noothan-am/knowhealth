"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, View } from "lucide-react";
import DoctorList from "@/app/admin-dashboard/DoctorList";
import DiagnosticCenterList from "@/app/admin-dashboard/DiagnosticCenterList";
import AddTestSpecialityList from "@/app/admin-dashboard/Addspecialitylist";
import AddDoctorForm from "@/app/admin-dashboard/AddDoctorForm";
import AddDiagnosticCenterForm from "@/app/admin-dashboard/AddDiagnosticCenterForm";
import DiagnosticCenterDetails from "@/app/admin-dashboard/DiagnosticCenterDetails";
import PrescriptionList from "@/app/view-prescription/page";
import ViewOrder from "@/app/admin-dashboard/ViewOrder";
import OrderList from "@/app/admin-dashboard/OrderList";

const AdminDashboard = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddDiagnosticCenter, setShowAddDiagnosticCenter] = useState(false);
  const [selectedCenterId, setSelectedCenterId] = useState(null);
  const [showAddTestSpeciality, setShowAddTestSpeciality] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/api/get-doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostic Centers</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Doctors</h2>
            {/* <Button onClick={() => setShowAddDoctor(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Doctor
            </Button> */}
          </div>
          {showAddDoctor ? (
            <AddDoctorForm onClose={() => setShowAddDoctor(false)} />
          ) : (
            <DoctorList doctors={doctors} />
          )}
        </TabsContent>
        <TabsContent value="diagnostics">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Diagnostic Centers</h2>
            <div className="space-x-2">
              <Button onClick={() => setShowAddTestSpeciality(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Test name/Speciality
              </Button>
              <Button onClick={() => setShowAddDiagnosticCenter(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Diagnostic Center
              </Button>
            </div>
          </div>
          {showAddDiagnosticCenter ? (
            <AddDiagnosticCenterForm
              onClose={() => setShowAddDiagnosticCenter(false)}
            />
          ) : showAddTestSpeciality ? (
            <AddTestSpecialityList
              onClose={() => setShowAddTestSpeciality(false)}
            />
          ) : selectedCenterId ? (
            <DiagnosticCenterDetails
              centerId={selectedCenterId}
              onBack={() => setSelectedCenterId(null)}
            />
          ) : (
            <DiagnosticCenterList
              onSelectCenter={(centerId) => setSelectedCenterId(centerId)}
            />
          )}
        </TabsContent>
        <TabsContent value="records">
          <PrescriptionList />
        </TabsContent>
        <TabsContent value="orders">
          {selectedOrderId ? (
            <ViewOrder
              orderId={selectedOrderId}
              onBack={() => setSelectedOrderId(null)}
            />
          ) : (
            <OrderList onSelectOrder={setSelectedOrderId} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
