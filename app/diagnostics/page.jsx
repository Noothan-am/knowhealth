'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Droplet, Beaker, Cookie, Heart, Brain, Syringe, Apple, Zap, Activity, Microscope, Stethoscope, Thermometer, Eye, Ear, Bone, Shield, Microchip, Scales } from "lucide-react"

export default function MedicalDiagnosticsPage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [selectedSpeciality, setSelectedSpeciality] = useState(null)
  const [selectedTest, setSelectedTest] = useState(null)
  const [testResults, setTestResults] = useState([])
  const scrollRef = useRef(null)

  const banners = [
    "Comprehensive Health Screenings",
    "State-of-the-Art Laboratory",
    "Expert Medical Professionals",
    "Quick and Accurate Results",
    "Personalized Health Insights"
  ]

  const diagnosticCategories = [
    {
      name: "Hematology",
      tests: [
        { name: "Complete Blood Count (CBC)", icon: Droplet, description: "Measures various components and features of blood." },
        { name: "Hemoglobin A1C", icon: Cookie, description: "Provides information about average blood sugar levels." },
        { name: "Iron Studies", icon: Zap, description: "Assesses iron stores and metabolism in the body." },
        { name: "Coagulation Profile", icon: Droplet, description: "Evaluates blood clotting function." },
        { name: "Platelet Count", icon: Droplet, description: "Measures the number of platelets in the blood." },
        { name: "Reticulocyte Count", icon: Droplet, description: "Measures immature red blood cells to assess bone marrow function." }
      ]
    },
    {
      name: "Biochemistry",
      tests: [
        { name: "Lipid Profile", icon: Heart, description: "Measures different types of fats in the blood." },
        { name: "Liver Function Test (LFT)", icon: Beaker, description: "Assesses liver health and function." },
        { name: "Kidney Function Test", icon: Beaker, description: "Evaluates kidney health and function." },
        { name: "Electrolyte Panel", icon: Zap, description: "Measures levels of important electrolytes in the blood." },
        { name: "Glucose Test", icon: Droplet, description: "Measures blood sugar levels." },
        { name: "Total Protein Test", icon: Beaker, description: "Measures the total amount of protein in the blood." }
      ]
    },
    {
      name: "Microbiology",
      tests: [
        { name: "Urinalysis", icon: Beaker, description: "Analyzes urine for various health indicators." },
        { name: "Stool Culture", icon: Microscope, description: "Detects presence of harmful bacteria in stool." },
        { name: "Throat Swab Culture", icon: Microscope, description: "Identifies bacterial infections in the throat." },
        { name: "Blood Culture", icon: Droplet, description: "Detects presence of bacteria or fungi in the blood." },
        { name: "Sputum Culture", icon: Microscope, description: "Analyzes mucus for pathogens." },
        { name: "Wound Culture", icon: Microscope, description: "Identifies infections in wounds." }
      ]
    },
    {
      name: "Cardiology",
      tests: [
        { name: "Electrocardiogram (ECG/EKG)", icon: Heart, description: "Records electrical activity of the heart." },
        { name: "Echocardiogram", icon: Heart, description: "Uses sound waves to produce images of the heart." },
        { name: "Stress Test", icon: Activity, description: "Evaluates heart function during physical activity." },
        { name: "Holter Monitor", icon: Activity, description: "Continuously records heart rhythm for 24-48 hours." },
        { name: "Lipid Panel", icon: Heart, description: "Measures cholesterol and triglyceride levels." },
        { name: "Coronary Angiogram", icon: Heart, description: "Imaging test to see heart arteries." }
      ]
    },
    {
      name: "Radiology",
      tests: [
        { name: "X-Ray", icon: Bone, description: "Produces images of structures inside the body." },
        { name: "Magnetic Resonance Imaging (MRI)", icon: Brain, description: "Uses magnetic fields to create detailed images." },
        { name: "Computed Tomography (CT) Scan", icon: Brain, description: "Combines X-ray images from different angles." },
        { name: "Ultrasound", icon: Zap, description: "Uses sound waves to produce images of organs and structures." },
        { name: "Mammography", icon: Bone, description: "X-ray exam of the breast." },
        { name: "Fluoroscopy", icon: Zap, description: "Real-time moving images of the interior of the body." }
      ]
    },
    {
      name: "Endocrinology",
      tests: [
        { name: "Thyroid Function Test", icon: Thermometer, description: "Assesses thyroid gland function." },
        { name: "Cortisol Test", icon: Syringe, description: "Measures levels of the stress hormone cortisol." },
        { name: "Testosterone Level", icon: Syringe, description: "Measures testosterone hormone levels." },
        { name: "Insulin Level", icon: Syringe, description: "Measures insulin hormone levels in the blood." },
        { name: "Growth Hormone Test", icon: Syringe, description: "Assesses growth hormone levels." },
        { name: "Fasting Blood Sugar", icon: Droplet, description: "Measures blood sugar after fasting." }
      ]
    },
    {
      name: "Ophthalmology",
      tests: [
        { name: "Visual Acuity Test", icon: Eye, description: "Measures sharpness of vision." },
        { name: "Tonometry", icon: Eye, description: "Measures intraocular pressure." },
        { name: "Retinal Imaging", icon: Eye, description: "Captures detailed images of the retina." },
        { name: "Visual Field Test", icon: Eye, description: "Assesses peripheral vision." },
        { name: "Color Vision Test", icon: Eye, description: "Evaluates color perception." },
        { name: "Ocular Coherence Tomography (OCT)", icon: Eye, description: "Provides cross-sectional images of the retina." }
      ]
    },
    {
      name: "Pulmonology",
      tests: [
        { name: "Spirometry", icon: Stethoscope, description: "Measures lung function and capacity." },
        { name: "Chest X-Ray", icon: Bone, description: "Produces images of the chest, lungs, and heart." },
        { name: "Bronchoscopy", icon: Stethoscope, description: "Examines the airways of the lungs." },
        { name: "Sleep Study", icon: Thermometer, description: "Evaluates sleep patterns and disorders." },
        { name: "Lung Diffusion Test", icon: Stethoscope, description: "Measures how well oxygen passes from the lungs to the blood." },
        { name: "Peak Flow Measurement", icon: Stethoscope, description: "Measures the maximum speed of expiration." }
      ]
    },
    {
      name: "Immunology",
      tests: [
        { name: "Allergy Testing", icon: Shield, description: "Identifies allergens affecting the patient." },
        { name: "Immunoglobulin Levels", icon: Shield, description: "Measures antibodies in the blood." },
        { name: "Autoantibody Tests", icon: Microchip, description: "Detects autoimmune diseases." },
        { name: "Vaccine Response Testing", icon: Shield, description: "Evaluates immune response to vaccinations." },
        { name: "HIV Test", icon: Microchip, description: "Detects the presence of HIV." },
        { name: "Tuberculosis Skin Test", icon: Microchip, description: "Screens for tuberculosis infection." }
      ]
    },
    {
      name: "MRI",
      tests: [
        { name: "Full Body MRI Scan", icon: Apple, description: "Identifies if a person carries a genetic disorder." },
        { name: "Prenatal Genetic Testing", icon: Apple, description: "Screens for genetic disorders in a fetus." },
        { name: "Whole Exome Sequencing", icon: Apple, description: "Analyzes the protein-coding regions of the genome." },
        { name: "Tumor Genetic Profiling", icon: Apple, description: "Assesses genetic mutations in tumors." },
        { name: "Pharmacogenomic Testing", icon: Apple, description: "Determines how genes affect individual responses to medications." },
        { name: "Newborn Screening", icon: Apple, description: "Tests for certain genetic disorders at birth." }
      ]
    },
  ]


  const popularTests = [
    { name: "Complete Blood Count (CBC)", icon: Droplet, description: "Measures various components and features of blood." },
    { name: "Lipid Profile", icon: Heart, description: "Measures different types of fats in the blood." },
    { name: "Brain CT Scan", icon: Beaker, description: "Analyzes urine for various health indicators." },
    { name: "Electrocardiogram (ECG/EKG)", icon: Heart, description: "Records electrical activity of the heart." },
    { name: "X-Ray", icon: Bone, description: "Produces images of structures inside the body." },
    { name: "Magnetic Resonance Imaging (MRI)", icon: Brain, description: "Uses magnetic fields to create detailed images." },
    { name: "Ultrasound", icon: Zap, description: "Uses sound waves to produce images of organs and structures." },
    { name: "Blood Glucose Test", icon: Droplet, description: "Measures the amount of glucose in the blood." },
    { name: "Thyroid Function Test", icon: Thermometer, description: "Assesses thyroid gland function." },
  ]

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setSelectedSpeciality({
      name: "Popular Tests",
      tests: popularTests
    })
  }, [])

  const handleBannerChange = (index) => {
    setCurrentBanner(index)
  }

  const handleSpecialityClick = (speciality) => {
    setSelectedSpeciality(speciality)
    setSelectedTest(null)
    setTestResults([])
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
          name: test.name,
          specialities: [selectedSpeciality.name],
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
              className={`w-1 h-2 p-1 rounded ${
                currentBanner === index ? 'bg-primary-foreground' : 'bg-transparent'
              }`}
              onClick={() => handleBannerChange(index)}
            />
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Take Control of Your Health Today</h2>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Schedule an Appointment
          </Button>
        </div>
      </section>

      {/* Specialities Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Specialities</h2>
          <div
            ref={scrollRef}
            className="scrollable-area flex overflow-x-auto space-x-4 py-4 max-w-3xl mx-auto">
            {diagnosticCategories.map((category, index) => (
              <Button
                key={index}
                variant={selectedSpeciality === category ? "default" : "outline"}
                className="flex-shrink-0"
                onClick={() => handleSpecialityClick(category)}
              >
                {category.name}
              </Button>
            ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSpeciality.tests.map((test, index) => (
                <Card key={index} className="p-4">
                  <Button
                    variant="ghost"
                    className="w-full h-auto py-4 px-3 flex flex-col items-center justify-start space-y-2"
                    onClick={() => handleTestClick(test)}
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <test.icon className="h-8 w-8 text-primary" />
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
                  <p className="text-sm mb-4">Rating: {result.diagnosticCenter.rating}</p>
                  <Button className="w-full">Book Now</Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
