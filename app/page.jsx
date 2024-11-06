'use client'
import { FaHeart, FaMicroscope, FaFileAlt, FaTachometerAlt } from 'react-icons/fa';
import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart, Stethoscope, Microscope, Pill, Calendar, Clock, Phone,Scissors, UserCheck, ChartNoAxesCombined, Shield, PiggyBank } from 'lucide-react'
import {
  FileText,
  LayoutDashboard,
  CreditCard,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const images = [
  '/banner1.png?height=1080&width=1920',
  '/banner2.png?height=1080&width=1920&text=Image+2',
  '/banner3.png?height=1080&width=1920&text=Image+3',
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative bg-[#f2fbff]">
      {/* First banner section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Image sliding */}
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={src}
              alt={`Banner image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Left and Right Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center text-white px-4 sm:px-6 md:px-8 lg:px-16 z-10 space-y-4 sm:space-y-6 md:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Welcome to Our Website</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">Discover amazing features and services</p>
          <div className="space-x-2 sm:space-x-4">
            <Button
              variant="default"
              size="sm"
              className="text-xs sm:text-sm md:text-base py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6"
            >
              Get Started
            </Button>
            <Button
              variant="default"
              size="sm"
              className="text-xs sm:text-sm md:text-base py-1 px-2 sm:py-2 sm:px-4 md:py-3 md:px-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Overlapping section */}
      <div className="absolute top-[45vh] sm:top-[50vh] md:top-[70vh] lg:top-[75vh] left-1/2 transform -translate-x-1/2 z-30 w-11/12 sm:w-3/4">
  <div className="bg-[#f2fbff] rounded-lg shadow-xl p-4 sm:p-6">
    <div className="flex flex-nowrap justify-between items-center text-left space-x-4 overflow-x-auto">
      {[
        { icon: UserCheck, title: "Expert Doctors", subheading: "Qualified Professionals", color: "#FF6B6B" },
        { icon: Clock, title: "24/7 Support", subheading: "Available at All Times", color: "#4ECDC4" },
        { icon: PiggyBank, title: "Affordable Care", subheading: "Budget-Friendly", color: "#45B7D1" },
        { icon: Shield, title: "Privacy & Support", subheading: "Confidential Service", color: "#FFA07A" }
      ].map((item, index) => (
        <div key={index} className="flex items-center space-x-4 w-1/4 min-w-[250px] sm:w-1/4">
          <item.icon
            className="w-6 h-6 sm:w-8 sm:h-8 text-center"
            style={{ color: item.color }}
          />
          <div>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800">{item.title}</span>
            <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600">{item.subheading}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



      {/* Second banner section with content pushed to the right */}
      <div
        className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-cover bg-center bg-[#f2fbff]"
        style={{
          backgroundImage: "url('/banner6.png?height=1080&width=1920')",
          '@media (maxWidth: 640px)': {
            backgroundImage: "url('/banner5.png?height=1080&width=1920')"
          }
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
            <div className="flex items-center mb-1 sm:mb-2">
              <ChartNoAxesCombined className="mr-2 text-[#2e6da5] hover:text-[#1d4999]" />
              <Link href="#" className="text-[#2e6da5] hover:text-[#1d4999] text-xs sm:text-sm md:text-base font-semibold inline-block leading-relaxed">
                Explore Our Services
              </Link>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#012b6d] mb-2 sm:mb-4 leading-snug">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#2e6da5] mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              We provide a wide range of medical services to ensure your health and well-being.
            </p>

            <div className="bg-[#012b6d] rounded-lg shadow-xl p-6 md:p-8 mb-12">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    {[
      { icon: FaHeart, title: "Consult a Doctor", description: "Expert care for your good health", link: '/coming-soon' },
      { icon: FaMicroscope, title: "Diagnostic Tests", description: "Advanced diagnostic testing with affordability", link: "/diagnostics" },
      { icon: Scissors, title: "Surgery Support", description: "Affordable Surgery Support at your fingertips", link: "/prescription" },
      { icon: LayoutDashboard, title: "Dashboard", description: "Full-service Medication management", link: "/patient-dashboard" }
    ].map((item, index) => (
      <div key={index} className="flex items-start space-x-4 bubble-hover">
        <item.icon className="w-8 h-8 text-[#2e6da5] flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 leading-snug">{item.title}</h3>
          <p className="text-gray-300 leading-relaxed">{item.description}</p>
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-center">
    <Link href="/coming-soon"> {/* Replace '/coming-soon' with your desired link */}
      <a>
        <Button
          variant="default"
          size="lg"
          className="bg-[#2e6da5] hover:bg-[#1d4999] text-white font-semibold py-3 px-8 text-lg bubble-hover leading-relaxed"
        >
          Schedule an Appointment
        </Button>
      </a>
    </Link>
  </div>
</div>
          </div>
        </div>
      </div>


<div className="bg-[#2e6da5] py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-[#fefeff] mb-2 text-center flex items-center justify-center gap-2">
      <Stethoscope className="w-8 h-8 text-[#fefeff]" />
      Our Partnered Labs
    </h2>
    <p className="text-xl text-[#012b6d] mb-12 text-center">Collaborating with the best in medical diagnostics</p>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {[
        { name: "HealthTech Labs", description: "Cutting-edge diagnostic solutions" },
        { name: "BioCore Analytics", description: "Precision in molecular testing" },
        { name: "Vitality Diagnostics", description: "Comprehensive health screenings" },
        { name: "GenomeWise", description: "Advanced genetic testing services" }
      ].map((lab, index) => (
        <div key={index} className="bg-[#012b6d] shadow-lg overflow-hidden">
          <Image
            src={`/placeholder.svg?height=150&width=300&text=Lab+Image+${index + 1}`}
            alt={`${lab.name} image`}
            width={300}
            height={150}
            className="w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{lab.name}</h3>
            <p className="text-sm text-[#fefeff]">{lab.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
  )
}
