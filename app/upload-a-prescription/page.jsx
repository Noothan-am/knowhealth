'use client'

import React, { useState, useContext, createContext } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Calendar, Clock, X } from 'lucide-react'

// Create a context for the toast
const ToastContext = createContext()

// Custom Toast component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
    <div className="flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={18} />
      </button>
    </div>
  </div>
)

// Toast provider component
const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  )
}

// Custom hook to use the toast
const useToast = () => useContext(ToastContext)

const UploadPrescriptionPage = () => {
  const [file, setFile] = useState(null)
  const { showToast } = useToast()

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      showToast("Please upload a PDF file.", "error")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    showToast("Your prescription has been successfully uploaded.")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Upload Your Prescription</CardTitle>
            <CardDescription>Please fill in the details and upload your prescription</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="123-456-7890" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <Label>Preferred Contact Method</Label>
                <RadioGroup defaultValue="phone">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone-contact" />
                    <Label htmlFor="phone-contact">Phone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-contact" />
                    <Label htmlFor="email-contact">Email</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-category">Lab Test Category</Label>
                <Select>
                  <SelectTrigger id="test-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood">Blood Tests</SelectItem>
                    <SelectItem value="urine">Urine Tests</SelectItem>
                    <SelectItem value="imaging">Imaging Tests</SelectItem>
                    <SelectItem value="cardio">Cardiovascular Tests</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea id="additional-info" placeholder="Any specific instructions or concerns?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescription">Upload Prescription (PDF only)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="prescription"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('prescription')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <span className="text-sm text-gray-500">
                    {file ? file.name : "No file chosen"}
                  </span>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Submit Prescription
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Wrap the component with the ToastProvider
const WrappedUploadPrescriptionPage = () => (
  <ToastProvider>
    <UploadPrescriptionPage />
  </ToastProvider>
)

export default WrappedUploadPrescriptionPage