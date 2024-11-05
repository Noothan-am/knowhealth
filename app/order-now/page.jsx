'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StarRating } from "@/components/ui/star-rating"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, CreditCard, Home, Building } from 'lucide-react'
import Image from 'next/image'

export default function OrderNowPage() {
  const [test, setTest] = useState(null)
  const [center, setCenter] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [collectionType, setCollectionType] = useState('center')
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In real app, fetch test and center details based on URL params
    const fetchDetails = async () => {
      try {
        // Simulated data - replace with actual API calls
        const testData = {
          id: '123',
          name: 'Complete Blood Count',
          price: 999,
          description: 'Comprehensive blood test that measures different components of blood',
          preparationInstructions: '12 hours fasting required',
          reportTime: '24 hours'
        }

        const centerData = {
          id: '456', 
          name: 'HealthLab Diagnostics',
          address: '123 Healthcare Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          rating: 4.5,
          image: '/placeholder.svg',
          services: {
            homeSampleCollection: true,
            onlineReports: true
          },
          timings: '7:00 AM - 9:00 PM'
        }

        setTest(testData)
        setCenter(centerData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching details:', error)
        setLoading(false)
      }
    }

    fetchDetails()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const orderData = {
      testId: test.id,
      diagnosticCenterId: center.id,
      appointmentDate: selectedDate,
      isHomeSampleCollection: collectionType === 'home',
      address: collectionType === 'home' ? address : null,
      paymentMethod,
      totalAmount: test.price
    }

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        // Handle successful order creation
        // Redirect to payment/confirmation page
      }
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Test & Center Details */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{test.name}</h2>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="flex items-center text-lg font-semibold mb-4">
              Price: ₹{test.price}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>Report Time: {test.reportTime}</span>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Preparation Instructions:</h4>
                <p className="text-gray-600">{test.preparationInstructions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={center.image}
                  alt={center.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{center.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    {center.address}, {center.city}, {center.state} - {center.pincode}
                  </span>
                </div>
                <StarRating value={center.rating} readOnly={true} />
                <div className="mt-2 text-gray-600">
                  <Clock className="h-4 w-4 inline mr-2" />
                  {center.timings}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Appointment Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  minDate={new Date()}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Sample Collection</h3>
                <RadioGroup value={collectionType} onValueChange={setCollectionType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="center" id="center" />
                    <Label htmlFor="center">
                      <Building className="h-4 w-4 inline mr-2" />
                      Visit Diagnostic Center
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home">
                      <Home className="h-4 w-4 inline mr-2" />
                      Home Sample Collection
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {collectionType === 'home' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Address Details</h3>
                  <Input
                    placeholder="Street Address"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                  />
                  <Input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                  <Input
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({...address, state: e.target.value})}
                  />
                  <Input
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">
                      <CreditCard className="h-4 w-4 inline mr-2" />
                      Online Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Pay at Center</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
