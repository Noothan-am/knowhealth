'use client'

import React, { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AddTestOrPackageForm from './add-test-or-package-form.jsx'

const diagnosticCenters = [
  {
    id: '1234-5678-9012-3456',
    name: 'HealthCare Diagnostics',
    email: 'info@healthcarediagnostics.com',
    phoneNo: { value: '9876543210', isVerified: true },
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    pincode: '100001',
    rating: 4.5,
    certifications: ['ISO 9001', 'NABL'],
    accreditations: ['CAP', 'JCI'],
    services: {
      homeSampleCollection: true,
      onlineReports: true,
    },
    specialities: ['Pathology', 'Radiology'],
    image: 'https://example.com/image1.jpg',
    timings: { 
      day: "Mon-sat",
      time: "08:00 AM - 08:00 PM"
    },
  },
  {
    id: '2345-6789-0123-4567',
    name: 'City Medical Lab',
    email: 'contact@citymedicallab.com',
    phoneNo: { value: '9876543211', isVerified: true },
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    pincode: '900001',
    rating: 4.2,
    certifications: ['ISO 15189'],
    accreditations: ['COLA'],
    services: {
      homeSampleCollection: false,
      onlineReports: true,
    },
    specialities: ['Hematology', 'Biochemistry'],
    image: 'https://example.com/image2.jpg',
    timings: {
      day: "Mon-sat",
      time: "07:00 AM - 07:00 PM"
    },
  },
]

const DiagnosticCenterList = () => {
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('test')
  const [selectedCenterId, setSelectedCenterId] = useState(null)

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Delete diagnostic center with id: ${id}`)
  }

  const handleAddTest = (id) => {
    setSelectedCenterId(id)
    setFormType('test')
    setShowForm(true)
  }

  const handleAddPackage = (id) => {
    setSelectedCenterId(id)
    setFormType('package')
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedCenterId(null)
  }

  return (
    <div className="grid gap-4">
      {diagnosticCenters.map((center) => (
        <div key={center.id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
          <div>
            <h3 className="text-lg font-semibold">{center.name}</h3>
            <p className="text-gray-600">{center.address}, {center.city}, {center.state} - {center.pincode}</p>
            <p className="text-gray-600">Phone: {center.phoneNo.value}</p>
            <p className="text-gray-600">Rating: {center.rating}/5</p>
            <p className="text-gray-600">Services: 
              {center.services.homeSampleCollection ? ' Home Sample Collection' : ''}
              {center.services.onlineReports ? ' Online Reports' : ''}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              {center.specialities.join(', ')}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="text-green-500 hover:text-green-700"
              onClick={() => handleAddTest(center.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Test
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleAddPackage(center.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(center.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add {formType.charAt(0).toUpperCase() + formType.slice(1)} to {diagnosticCenters.find(c => c.id === selectedCenterId)?.name}
            </h2>
            <AddTestOrPackageForm type={formType} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  )
}

export default DiagnosticCenterList