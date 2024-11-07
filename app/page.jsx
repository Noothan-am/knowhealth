"use client";

import { useState, useEffect } from "react";
import {
  Stethoscope,
  Microscope,
  FileText,
  Scissors,
  LayoutDashboard,
  Clock,
  Shield,
  CreditCard,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const partneredLabs = [
    { name: "HealthLab", logo: "/placeholder.svg?height=100&width=100" },
    { name: "MediTest", logo: "/placeholder.svg?height=100&width=100" },
    { name: "BioAnalytics", logo: "/placeholder.svg?height=100&width=100" },
    { name: "GenomeX", logo: "/placeholder.svg?height=100&width=100" },
  ];

  const banners = [
    { src: "/banners/banner1.jpg", alt: "Banner 1" },
    { src: "/banners/banner2.png", alt: "Banner 2" },
    { src: "/banners/banner3.jpg", alt: "Banner 3" },
  ];

  return (
    <div className="bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <section className="mb-12 relative">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {banners.map((banner, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    width={1200}
                    height={400}
                    className="w-full h-64 sm:h-96 object-cover"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-[2px] ${
                  currentBanner === index ? "bg-gray-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </section>

        <section
          id="explore-services"
          className="mb-12 p-8 rounded-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(221,229,244,1) 0%, rgba(193,206,233,1) 52%, rgba(191,210,240,1) 100%)",
          }}
        >
          <h2 className="text-3xl text-gray-800 font-semibold mb-2 text-center">
            Explore Our Services
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Comprehensive healthcare solutions at your fingertips
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center">
            {[
              {
                title: "Consult a Doctor",
                icon: Stethoscope,
                color: "#4CAF50",
                link: "/doctor-dashboard",
              },
              {
                title: "Diagnostics & Lab tests",
                icon: Microscope,
                color: "#2196F3",
                link: "/diagnostics",
              },
              {
                title: "Upload a Prescription",
                icon: FileText,
                color: "#FFC107",
                link: "/upload-a-prescription",
              },
              {
                title: "Surgery Support",
                icon: Scissors,
                color: "#9C27B0",
                link: "/admin_dashboard",
              },
              {
                title: "Patient Dashboard",
                icon: LayoutDashboard,
                color: "#FF5722",
                link: "/patient-dashboard",
              },
            ].map((option, index) => (
              <Link
                href={option.link}
                key={index}
                className="bg-white rounded-lg shadow-md p-3 flex flex-col items-center justify-center transition-transform hover:scale-105"
              >
                <div
                  className="flex-shrink-0 mb-2"
                  style={{ color: option.color }}
                >
                  <option.icon className="w-8 h-8" />
                </div>
                <h3
                  className="font-medium text-sm text-center"
                  style={{ color: option.color }}
                >
                  {option.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="mb-12 bg-white p-4 rounded-lg shadow-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(221,229,244,1) 0%, rgba(193,206,233,1) 52%, rgba(191,210,240,1) 100%)",
          }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: User,
                title: "Expert Doctors",
                description:
                  "Access to a network of experienced healthcare professionals",
                bgColor: "bg-blue-100",
                textColor: "text-blue-600",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description:
                  "Round-the-clock assistance for all your healthcare needs",
                bgColor: "bg-green-100",
                textColor: "text-green-600",
              },
              {
                icon: CreditCard,
                title: "Affordable Care",
                description:
                  "Quality healthcare services at competitive prices",
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-600",
              },
              {
                icon: Shield,
                title: "Privacy & Security",
                description:
                  "Your health information is protected with state-of-the-art security measures",
                bgColor: "bg-purple-100",
                textColor: "text-purple-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md hover:bg-white max-w-sm mx-auto"
              >
                <div
                  className={`mb-3 inline-flex p-2 rounded-full ${item.bgColor}`}
                >
                  <item.icon className={`w-6 h-6 ${item.textColor}`} />
                </div>
                <h3 className="text-md font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mb-12 p-4 rounded-lg shadow-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(221,229,244,1) 0%, rgba(193,206,233,1) 52%, rgba(191,210,240,1) 100%)",
          }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Our Partnered Labs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "HealthLab",
                logo: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "MediTest",
                logo: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "BioAnalytics",
                logo: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "GenomeX",
                logo: "/placeholder.svg?height=100&width=100",
              },
            ].map((lab, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
              >
                <Image
                  src={lab.logo}
                  alt={lab.name}
                  width={80}
                  height={80}
                  className="mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  {lab.name}
                </h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
