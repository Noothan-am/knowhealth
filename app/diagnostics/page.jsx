'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Droplet, Beaker, Cookie, Heart, Brain, Syringe, Apple, Zap, Activity, Microscope, Stethoscope, Thermometer, Eye, Ear, Bone, Shield, Microchip, Scales, Search } from "lucide-react"
import Image from 'next/image'
import { StarRating } from "@/components/ui/star-rating"
import { useRouter } from 'next/navigation'

export default function MedicalDiagnosticsPage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [diagnosticCategories, setDiagnosticCategories] = useState([])
  const [selectedSpeciality, setSelectedSpeciality] = useState(null)
  const [selectedTest, setSelectedTest] = useState(null)
  const [testResults, setTestResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const scrollRef = useRef(null)
  const router = useRouter()

  const banners = [
    "Comprehensive Health Screenings",
    "State-of-the-Art Laboratory",
    "Expert Medical Professionals",
    "Quick and Accurate Results",
    "Personalized Health Insights"
  ]

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await fetch('/api/testspeciality')
        if (response.ok) {
          const data = await response.json()
          setDiagnosticCategories(data)
        } else {
          console.error('Failed to fetch specialities')
        }
      } catch (error) {
        console.error('Error fetching specialities:', error)
      }
    }

    fetchSpecialities()
  }, [])
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  useEffect(() => {
    if (diagnosticCategories.length > 0) {
      setSelectedSpeciality(diagnosticCategories[0].specialities)
    }
  }, [diagnosticCategories])

  const handleBannerChange = (index) => {
    setCurrentBanner(index)
  }

  const handleSpecialityClick = (speciality) => {
    setSelectedSpeciality(speciality)
    setSelectedTest(null) 
    setTestResults([])
    setSearchTerm('')
  }

  const handleTestClick = async (test) => {
    setSelectedTest(test)
    try {
      const response = await fetch('/api/get-diagnosticcenter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: test.name
        }),
      })
      if (response.ok) {
        const data = await response.json()
        setTestResults(data)
      } else {
        console.error('Failed to fetch test results')
      }
    } catch (error) {
      console.error('Error fetching test results:', error)
    }
  }

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredTests = searchTerm
    ? diagnosticCategories.flatMap(category =>
        category.specialities.tests.map(test => ({
          ...test,
          speciality: category.specialities.name
        })).filter(test =>
          test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          test.speciality.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : selectedSpeciality
      ? selectedSpeciality.tests
      : []

  const handleBookNow = (testId, diagnosticCenterId) => {
    router.push(`/order-now?testId=${testId}&diagnosticCenterId=${diagnosticCenterId}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-64 bg-primary text-primary-foreground overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              currentBanner === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="text-4xl font-bold text-center">{banner}</h2>
          </div>
        ))}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`w-1 h-1 p-1 rounded ${
                currentBanner === index ? 'bg-primary-foreground' : 'bg-transparent'
              }`}
              onClick={() => handleBannerChange(index)}
            />
          ))}
        </div>
      </section>

      {/* Specialities Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Specialities</h2>
          <div className="relative max-w-3xl mx-auto">
            <Button
              variant="ghost" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              onClick={() => handleScroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
              ref={scrollRef}
              className="scrollable-area flex overflow-x-auto space-x-4 py-4 px-8 scroll-smooth">
              {diagnosticCategories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedSpeciality === category.specialities ? "default" : "outline"}
                  className="flex-shrink-0"
                  onClick={() => handleSpecialityClick(category.specialities)}
                >
                  {category.specialities.name}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={() => handleScroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tests Section */}
      {selectedSpeciality && (
        <section className="py-12 bg-muted">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">
              {selectedSpeciality.name} Tests
            </h3>
            <div className="mb-4 flex justify-center">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTests.map((test, index) => (
                <Card key={index} className="overflow-hidden">
                  <Button
                    variant="ghost"
                    className="w-full h-full p-0 flex items-stretch"
                    onClick={() => handleTestClick(test)}
                  >
                    <div className="w-2/5 relative ">
                      {test.image ? (
                        <Image 
                          src={test.image} 
                          alt={test.name} 
                          layout='fill'
                          objectFit='cover'
                        />
                      ) : (
                        <Activity className="h-12 w-12 text-primary animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-center">{test.name}</span>
                  </Button>
                  {selectedTest === test && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      {test.description}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Test Results Section */}
      {testResults.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Available Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testResults.map((result, index) => (
                <Card key={index} className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{result.name}</h4>
                  <p className="text-sm mb-2">Center: {result.diagnosticCenter.name}</p>
                  <p className="text-sm mb-2">Price: ₹{result.price}</p>
                  <div className="mb-4">
                    <StarRating value={result.diagnosticCenter.rating || 0} readOnly={true} />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleBookNow(result.id, result.diagnosticCenter.id)}
                  >
                    Book Now
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
