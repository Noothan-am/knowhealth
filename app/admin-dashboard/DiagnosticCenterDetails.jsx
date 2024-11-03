'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import AddTestForm from './add-test'
import AddPackageForm from './add-package'

const DiagnosticCenterDetails = ({ centerId, onBack }) => {
  const [center, setCenter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('test')

  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const response = await fetch('/api/get-diagnosticcenter/id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ centerId }),
        })
        if (response.ok) {
          const data = await response.json()
          setCenter(data)
        } else {
          console.error('Failed to fetch diagnostic center details')
        }
      } catch (error) {
        console.error('Error fetching diagnostic center details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCenterDetails()
  }, [centerId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!center) {
    return <div>Center not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex space-x-2">
          <Button onClick={() => {
            setFormType('test')
            setShowForm(true)
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Test
          </Button>
          <Button onClick={() => {
            setFormType('package')
            setShowForm(true)
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start space-x-6">
          {center.image && (
            <Image
              src={center.image}
              alt={center.name}
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{center.name}</h1>
            <p className="text-gray-600 mt-2">{center.address}, {center.city}, {center.state} - {center.pincode}</p>
            <p className="text-gray-600">Email: {center.email}</p>
            <p className="text-gray-600">Phone: {center.phoneNo.value}</p>
            <p className="text-gray-600">Rating: {center.rating}/5</p>
            
            <div className="mt-4">
              <h3 className="font-semibold">Services:</h3>
              <div className="flex space-x-4 mt-1">
                {center.services.homeSampleCollection && (
                  <Badge>Home Sample Collection</Badge>
                )}
                {center.services.onlineReports && (
                  <Badge>Online Reports</Badge>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold">Specialities:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {center.specialities.map((speciality, index) => (
                  <Badge key={index} variant="secondary">{speciality}</Badge>
                ))}
              </div>
            </div>

            {center.certifications?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Certifications:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {center.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline">{cert}</Badge>
                  ))}
                </div>
              </div>
            )}

            {center.accreditations?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Accreditations:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {center.accreditations.map((accr, index) => (
                    <Badge key={index} variant="outline">{accr}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {center.tests.map((test) => (
              <div key={test.id} className="bg-gray-50 rounded-lg p-4">
                {test.image && (
                  <Image
                    src={test.image}
                    alt={test.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover mb-2"
                  />
                )}
                <h3 className="font-semibold">{test.name}</h3>
                <p className="text-gray-600">Price: ₹{test.price}</p>
                {test.description && (
                  <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                )}
                {test.speciality && (
                  <Badge className="mt-2" variant="secondary">{test.speciality}</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {center.packages.map((pkg) => (
              <div key={pkg.id} className="bg-gray-50 rounded-lg p-4">
                {pkg.image && (
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover mb-2"
                  />
                )}
                <h3 className="font-semibold">{pkg.name}</h3>
                <p className="text-gray-600">Price: ₹{pkg.price}</p>
                <p className="text-gray-600">Tests Included: {pkg.testCount}</p>
                {pkg.description && (
                  <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>
                )}
                {pkg.specialities?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pkg.specialities.map((spec, index) => (
                      <Badge key={index} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add {formType.charAt(0).toUpperCase() + formType.slice(1)} to {center.name}
            </h2>
            {formType === 'test' ? (
              <AddTestForm onClose={() => setShowForm(false)} diagnosticCenterId={centerId} />
            ) : (
              <AddPackageForm onClose={() => setShowForm(false)} diagnosticCenterId={centerId} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiagnosticCenterDetails
