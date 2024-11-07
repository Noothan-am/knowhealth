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
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProvider } from "@/app/context/userDataContext";

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

  const navItems = [
    { href: "/", icon: Home, text: "Home" },
    { href: "/#explore-services", icon: Compass, text: "Explore Services" },
    { href: "/about", icon: Info, text: "About Us" },
    { href: "/contact", icon: PhoneCall, text: "Contact Us" },
  ];

  return (
    <UserProvider>
      <html lang="en">
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body
          className={`${inter.className} ${poppins.variable} min-h-screen flex flex-col`}
        >
          <header className="shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-4 pr-2 flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <div className="flex items-center pl-4 pr-2 flex-shrink-0">
                    <Image
                      src="/iconfinale1.png"
                      alt="Company logo"
                      width={200}
                      height={200}
                      className="mb-1"
                    />
                  </div>
                </Link>

                {/* Desktop Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-10">
                  <div className="flex space-x-10">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-[#2e6da5] hover:text-[#2e6da5] font-poppins font-normal text-sm transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-auto"
                      >
                        <item.icon className="w-5 h-5 mr-2" strokeWidth={1.5} />
                        <span className="text-[15px]">{item.text}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Notification Bell */}
                  <button className="p-2 rounded-full hover:bg-gray-200">
                    <Bell
                      className="w-6 h-6 text-[#2e6da5] hover:text-[#2e6da5]"
                      strokeWidth={1.5}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-full hover:bg-gray-200">
                        <User
                          className="h-6 w-6 text-[#2e6da5] hover:text-[#2e6da5]"
                          strokeWidth={1.5}
                        />
                        <span className="sr-only">Account menu</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link
                          href="/login"
                          className="flex items-center w-full"
                        >
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/signup"
                          className="flex items-center w-full"
                        >
                          Sign Up
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                  <button
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {isMenuOpen ? (
                      <X
                        className="w-6 h-6 text-[#2e6da5] hover:text-[#2e6da5]"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Menu
                        className="w-6 h-6 text-[#2e6da5] hover:text-[#2e6da5]"
                        strokeWidth={1.5}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden bg-white shadow-lg">
                <nav className="flex flex-col py-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-[#2e6da5] hover:text-[#2e6da5] hover:bg-gray-100 font-poppins font-normal flex items-center text-[15px]"
                    >
                      <item.icon className="w-5 h-5 mr-2" strokeWidth={1.5} />
                      {item.text}
                    </Link>
                  ))}
                  <button className="px-4 py-2 text-[#2e6da5] hover:text-[#2e6da5] hover:bg-gray-100 font-poppins font-normal flex items-center text-[15px] w-full">
                    <Bell className="w-5 h-5 mr-2" strokeWidth={1.5} />
                    Notifications
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-4 py-2 text-[#2e6da5] hover:text-[#2e6da5] hover:bg-gray-100 font-poppins font-normal flex items-center text-[15px] w-full">
                        <User className="w-5 h-5 mr-2" strokeWidth={1.5} />
                        Account
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href="/login"
                          className="flex items-center w-full"
                        >
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href="/signup"
                          className="flex items-center w-full"
                        >
                          Sign Up
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
              </div>
            )}
          </header>

          {/* Search bar and location */}
          <div className="bg-white text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between ">
                <div className="flex-1">
                  <div
                    className={`relative flex items-center w-full h-10 rounded-lg transition-all duration-300 ease-in-out 
            ${
              isFocused
                ? "bg-[#8fa5cc] shadow-lg border-none text-white"
                : "bg-white border border-[#012b6d] text-gray-300"
            }
            hover:shadow-lg hover:border-[#012b6d]`}
                  >
                    <div className="flex items-center flex-shrink-0 px-4 border-r border-gray-500 h-full">
                      <MapPin
                        className="h-6 w-6 text-gray-500 mr-2"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-gray-700 whitespace-nowrap">
                        {error ? error : location}
                      </span>
                    </div>
                    <div className="relative flex-grow flex items-stretch h-full">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search
                          className="h-6 w-6 text-gray-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full pl-12 pr-4 py-2 text-lg bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-sm"
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

          <footer className="bg-[#f2fbff] text-[#2e6da5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#012b6d] mb-4">
                    About Us
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Team
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Press
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#012b6d] mb-4">
                    Services
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Consultations
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Lab Tests
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Diagnostics
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Surgery Support
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#012b6d] mb-4">
                    Support
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        FAQs
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#012b6d] mb-4">
                    Connect
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Facebook
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Twitter
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        Instagram
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-[#012b6d]">
                        LinkedIn
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t-2 border-[#012b6d] pt-8 text-center">
                <p className="text-[#012b6d]">
                  &copy; 2024 Know My Health. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </UserProvider>
  );
}
