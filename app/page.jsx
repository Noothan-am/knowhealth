'use client'

import { useState, useEffect } from 'react'
import { Stethoscope, Microscope, TestTube, FileText, Scissors, LayoutDashboard, Clock, Shield, CreditCard, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const explorerOptions = [
    { title: 'Consult a Doctor', icon: Stethoscope, color: '#2C3E50', image: '/placeholder.svg?height=80&width=80', link: '/Healthconsultation' },
    { title: 'Diagnostics & Lab tests', icon: Microscope, color: '#2C3E50', image: '/placeholder.svg?height=80&width=80', link: '/diagnostics' },
    { title: 'Upload a Prescription', icon: FileText, color: '#2C3E50', image:'/placeholder.svg?height=80&width=80', link: '/upload-a-prescription'},
    { title: 'Surgery Support', icon: Scissors, color: '#2C3E50', image: '/placeholder.svg?height=80&width=80', link: '#' },
    { title: 'Patient Dashboard', icon: LayoutDashboard, color: '#2C3E50', image:'/placeholder.svg?height=80&width=80', link: '#' },
  ];

  const partneredLabs = [
    { name: 'HealthLab', logo: '/placeholder.svg?height=100&width=100' },
    { name: 'MediTest', logo: '/placeholder.svg?height=100&width=100' },
    { name: 'BioAnalytics', logo: '/placeholder.svg?height=100&width=100' },
    { name: 'GenomeX', logo: '/placeholder.svg?height=100&width=100' },
  ];

  return (
    <div className="bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section className="mb-12 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={`/placeholder.svg?height=300&width=800&text=Banner+${index}`}
                    alt={`Banner ${index}`}
                    width={800}
                    height={300}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentBanner === index ? 'bg-white' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl text-gray-700 font-semibold mb-6 flex items-center justify-center">
            <Stethoscope className="w-8 h-8 mr-2 text-[#98c964]" />
            Explore Our Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {explorerOptions.map((option, index) => (
              <Link href={option.link} key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-transform hover:scale-105 aspect-square">
                <div className="flex-shrink-0 mb-2">
                  <Image
                    src={option.image}
                    alt={option.title}
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className="font-medium text-sm text-center" style={{ color: option.color }}>{option.title}</h3>
              </Link>
            ))}
          </div>
        </section>
        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#98c964]">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-white">
              <div className="mb-4 inline-flex p-3 rounded-full bg-blue-100">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Doctors</h3>
              <p className="text-gray-600">Access to a network of experienced healthcare professionals</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-white">
              <div className="mb-4 inline-flex p-3 rounded-full bg-green-100">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for all your healthcare needs</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-white">
              <div className="mb-4 inline-flex p-3 rounded-full bg-yellow-100">
                <CreditCard className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Affordable Care</h3>
              <p className="text-gray-600">Quality healthcare services at competitive prices</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-white">
              <div className="mb-4 inline-flex p-3 rounded-full bg-purple-100">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy & Security</h3>
              <p className="text-gray-600">Your health information is protected with state-of-the-art security measures</p>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl text-gray-700 font-semibold mb-6 text-center">Our Partnered Labs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partneredLabs.map((lab, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                <Image
                  src={lab.logo}
                  alt={lab.name}
                  width={80}
                  height={80}
                  className="mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{lab.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
    
  )
}