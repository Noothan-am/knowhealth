'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'
import DoctorList from './DoctorList.jsx'
import DiagnosticCenterList from './DiagnosticCenterList.jsx'
import BannerManagement from './BannerManagement.jsx'
import AddDoctorForm from './AddDoctorForm.jsx'
import AddDiagnosticCenterForm from './AddDiagnosticCenterForm.jsx'
import DiagnosticCenterDetails from './DiagnosticCenterDetails.jsx'
import AddTestSpecialityList from './addtestspecialitylist.jsx'

const AdminDashboard = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false)
  const [showAddDiagnosticCenter, setShowAddDiagnosticCenter] = useState(false)
  const [showAddTestSpeciality, setShowAddTestSpeciality] = useState(false)
  const [selectedCenterId, setSelectedCenterId] = useState(null)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostic Centers</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Doctors</h2>
            <Button onClick={() => setShowAddDoctor(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Doctor
            </Button>
          </div>
          {showAddDoctor ? (
            <AddDoctorForm onClose={() => setShowAddDoctor(false)} />
          ) : (
            <DoctorList />
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
            <AddDiagnosticCenterForm onClose={() => setShowAddDiagnosticCenter(false)} />
          ) : showAddTestSpeciality ? (
            <AddTestSpecialityList onClose={() => setShowAddTestSpeciality(false)} />
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
        <TabsContent value="banners">
          <BannerManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard