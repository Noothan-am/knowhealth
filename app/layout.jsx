"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import {
  MapPin,
  User,
  Bell,
  Search,
  Menu,
  Home,
  Compass,
  Info,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  const [location, setLocation] = useState("Fetching location...");
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.city || data.locality || "Unknown City";
              const country =
                data.countryName || data.country || "Unknown Country";
              setLocation(`${city}, ${country}`);
            })
            .catch(() => {
              setError("Error fetching location data");
              setLocation("Location not available");
            });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
          }
          setLocation("Location not available");
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);

  const metadata = {
    title: "Know My Health",
    description: "Your trusted healthcare platform",
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${inter.className} ${poppins.variable} min-h-screen flex flex-col`}
      >
        <header className="bg-gradient-custom shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 pr-2 flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="flex items-center pl-4 pr-2 flex-shrink-0">
                  <Image
                    src="/iconfinale-removebg.png"
                    alt="Kmh Logo"
                    width={200}
                    height={200}
                    className="mb-1"
                  />
                </div>
              </Link>

              <nav className="hidden md:flex items-center">
                <div className="flex space-x-6">
                  <Link
                    href="/"
                    className="text-black hover:text-gray-800 font-poppins font-normal text-sm transition-colors duration-200 ease-in-out hover:font-bold flex flex-col items-center justify-center w-24"
                  >
                    <Home className="w-5 h-5 mb-1" />
                    Home
                  </Link>
                  <Link
                    href="/#explore-services"
                    className="text-black hover:text-gray-800 font-poppins font-normal text-sm transition-colors duration-200 ease-in-out hover:font-bold flex flex-col items-center justify-center w-40"
                  >
                    <Compass className="w-5 h-5 mb-1" />
                    Explore Services
                  </Link>
                  <Link
                    href="/about"
                    className="text-black hover:text-gray-800 font-poppins font-normal text-sm transition-colors duration-200 ease-in-out hover:font-bold flex flex-col items-center justify-center w-24"
                  >
                    <Info className="w-5 h-5 mb-1" />
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="text-black hover:text-gray-800 font-poppins font-normal text-sm transition-colors duration-200 ease-in-out hover:font-bold flex flex-col items-center justify-center w-28"
                  >
                    <PhoneCall className="w-5 h-5 mb-1" />
                    Contact Us
                  </Link>
                </div>
              </nav>

              <div className="flex items-center space-x-6">
                <button className="p-2 rounded-full hover:bg-gray-200">
                  <Bell className="w-6 h-6 text-black" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <User className="h-6 w-6 text-black" />
                      <span className="sr-only">Account menu</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/login" className="flex items-center w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/signup" className="flex items-center w-full">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  className="md:hidden p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg">
              <nav className="flex flex-col py-2">
                <Link
                  href="/"
                  className="px-4 py-2 text-black hover:bg-gray-100 font-poppins font-thin flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </Link>
                <Link
                  href="#explore-services"
                  className="px-4 py-2 text-black hover:bg-gray-100 font-poppins font-thin flex items-center"
                >
                  <Compass className="w-5 h-5 mr-2" />
                  Explore Services
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-black hover:bg-gray-100 font-poppins font-thin flex items-center"
                >
                  <Info className="w-5 h-5 mr-2" />
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-black hover:bg-gray-100 font-poppins font-thin flex items-center"
                >
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* Search bar and location */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div
                  className={`relative flex items-center w-full h-12 rounded-lg transition-all duration-300 ease-in-out ${
                    isFocused
                      ? "bg-[rgba(191,210,240,1)] shadow-lg"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center flex-shrink-0 px-4 border-r border-gray-300 h-full">
                    <MapPin className="h-6 w-6 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700 whitespace-nowrap">
                      {error ? error : location}
                    </span>
                  </div>
                  <div className="relative flex-grow flex items-stretch h-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      className="block w-full pl-12 pr-4 py-2 text-lg bg-transparent border-0 focus:outline-none focus:ring-0"
                      placeholder="Search for healthcare services..."
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-grow bg-gray-100">{children}</main>

        <footer className="bg-gradient-custom text-black py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Consultations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Lab Tests
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Diagnostics
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Surgery Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gray-300">
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center">
              <p>&copy; 2024 Know My Health. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
