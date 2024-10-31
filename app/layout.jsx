import "./globals.css";
import { Inter } from "next/font/google";
import { MapPin, User, ShoppingCart, Bell, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Know My Health",
  description: "Your trusted healthcare platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg"
                  alt="KH Logo"
                  width={100}
                  height={100}
                  className="mr-4"
                />
                <div className="flex flex-col">
                  <h1
                    className="text-4xl font-bold"
                    style={{ color: "#98c964" }}
                  >
                    know my
                  </h1>
                  <h1
                    className="text-4xl font-bold"
                    style={{ color: "#336666" }}
                  >
                    Health
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <User className="h-6 w-6 text-gray-600" />
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
                <button className="p-2 rounded-full hover:bg-gray-200 relative">
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-full max-w-lg mb-4">
                <input
                  type="text"
                  placeholder="Search for healthcare services..."
                  className="w-full pl-10 pr-4 py-2 rounded-full text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#98c964] focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Your Location</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow bg-gray-100">{children}</main>

        <footer className="bg-gray-800 text-white py-8">
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
