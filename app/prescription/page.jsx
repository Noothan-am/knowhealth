"use client";

import React, { useState, useContext, useEffect, createContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, X } from "lucide-react";

const ToastContext = createContext();

const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    } text-white`}
  >
    <div className="flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={18} />
      </button>
    </div>
  </div>
);

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

const UploadPrescriptionPage = () => {
  const [file, setFile] = useState(null);
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState(""); // Added specialty state

  const [ageError, setAgeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { showToast } = useToast();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      showToast("Please upload a PDF file.", "error");
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 1 && value <= 110)) {
      setAgeError("");
    } else {
      setAgeError("Please enter a valid age between 1 and 110");
    }
    setAge(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (value === "" || (value.length <= 10 && regex.test(value))) {
      setPhoneError("");
    } else {
      setPhoneError("Please enter a valid 10-digit phone number");
    }
    setPhone(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value) || value === "") {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
    }
    setEmail(value);
  };

  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!age || ageError || !date || phoneError || emailError || !specialty) {
      showToast("Please fix the errors before submitting.", "error");
      return;
    }
    console.log(event.target);

    const formData = new FormData(event.target);
    formData.append("file", file);

    try {
      const response = await fetch("/api/prescription", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload prescription");
      }

      const data = await response.json();
      showToast("Your prescription has been successfully uploaded.");
    } catch (error) {
      console.error(error);
      showToast("Failed to upload prescription. Please try again.", "error");
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/prescription", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Upload Your Prescription
            </CardTitle>
            <CardDescription>
              Please fill in the details and upload your prescription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    required
                  />
                  {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="yourmail@email.com"
                  required
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Enter your Age:</Label>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={handleAgeChange}
                  min="1"
                  max="110"
                  placeholder="Enter your age"
                  required
                />
                {ageError && <p style={{ color: "red" }}>{ageError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Select Prescription Date:</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty:</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  value={specialty}
                  onChange={handleSpecialtyChange}
                  placeholder="Enter specialty"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  name="additional-info"
                  placeholder="Any specific instructions or concerns?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescription">
                  Upload Prescription (PDF only)
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="prescription"
                    name="prescription"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("prescription")?.click()
                    }
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
  );
};

const WrappedUploadPrescriptionPage = () => (
  <ToastProvider>
    <UploadPrescriptionPage />
  </ToastProvider>
);

export default WrappedUploadPrescriptionPage;
