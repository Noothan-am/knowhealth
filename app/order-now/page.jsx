"use client";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/ui/star-rating";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Clock,
  CreditCard,
  Home,
  Building,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");
  const diagnosticCenterId = searchParams.get("diagnosticCenterId");

  const [test, setTest] = useState(null);
  const [center, setCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [collectionType, setCollectionType] = useState("center");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  // const [userId] = useState("9d3e6c23-8bed-44ea-af69-aa6f831e7dd3");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role != "consumer") {
      window.location.href = "/login";
    }
    const fetchDetails = async () => {
      try {
        const centerResponse = await fetch("/api/get-diagnosticcenter/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ centerId: diagnosticCenterId }),
        });

        if (!centerResponse.ok) {
          throw new Error("Failed to fetch diagnostic center details");
        }

        const centerData = await centerResponse.json();
        setCenter(centerData);

        const testData = centerData.tests.find((test) => test.id === testId);
        if (!testData) {
          throw new Error("Test not found in the diagnostic center");
        }
        setTest(testData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching details:", error);
        setLoading(false);
      }
    };

    if (testId && diagnosticCenterId) {
      fetchDetails();
    }
  }, [testId, diagnosticCenterId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("Data"));

    console.log("Submitting with userId:", data.id);

    const orderData = {
      userId: data.id,
      diagnosticCenterId: diagnosticCenterId,
      test: {
        type: "test",
        id: testId,
        name: test.name,
        price: test.price,
      },
      totalAmount: test.price,
      paymentMethod: paymentMethod,
      appointmentDate: selectedDate,
      isHomeSampleCollection: collectionType === "home",
      address: collectionType === "home" ? address : null,
      paymentMethod: paymentMethod,
      totalAmount: test.price,
      patientName: patientName,
      patientAge: parseInt(patientAge),
      patientPhoneNumber: patientPhoneNumber,
    };

    try {
      const response = await fetch("/api/orders/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/confirmation?orderId=${data.data.id}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleContinue = () => {
    const role = localStorage.getItem("role");
    if (role === null || role != "consumer") {
      window.location.href = "/login";
    } else {
      setShowOrderForm(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Test & Center Details */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{test.name}</h2>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="flex items-center text-lg font-semibold mb-4">
              Price: ₹{test.price}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span>Speciality: {test.speciality}</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={center.image}
                  alt={center.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{center.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">
                    {center.address}, {center.city}, {center.state} -{" "}
                    {center.pincode}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{center.phoneNo.value}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{center.email}</span>
                </div>
                <StarRating value={center.rating} readOnly={true} />
                <div className="mt-2 text-gray-600">
                  <Clock className="h-4 w-4 inline mr-2" />
                  {center.timings}
                </div>

                {center.certifications?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold mb-1">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {center.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {center.accreditations?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold mb-1">Accreditations</h4>
                    <div className="flex flex-wrap gap-2">
                      {center.accreditations.map((accr, index) => (
                        <span
                          key={index}
                          className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
                        >
                          {accr}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {center.specialities?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold mb-1">Specialities</h4>
                    <div className="flex flex-wrap gap-2">
                      {center.specialities.map((speciality, index) => (
                        <span
                          key={index}
                          className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded"
                        >
                          {speciality}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3">
                  <h4 className="font-semibold mb-1">Services</h4>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span
                      className={
                        center.services.homeSampleCollection
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {center.services.homeSampleCollection ? "✓" : "✗"} Home
                      Collection
                    </span>
                    <span
                      className={
                        center.services.onlineReports
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {center.services.onlineReports ? "✓" : "✗"} Online Reports
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {!showOrderForm && (
            <Button onClick={handleContinue} className="w-full">
              Continue
            </Button>
          )}
        </div>

        {/* Order Form */}
        {showOrderForm && (
          <div className="space-y-6">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Patient Details</h3>
                  <Input
                    placeholder="Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Patient Age"
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Patient Phone Number"
                    value={patientPhoneNumber}
                    onChange={(e) => setPatientPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Select Appointment Date
                  </h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    minDate={new Date()}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Sample Collection
                  </h3>
                  <RadioGroup
                    value={collectionType}
                    onValueChange={setCollectionType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="center" id="center" />
                      <Label htmlFor="center">
                        <Building className="h-4 w-4 inline mr-2" />
                        Visit Diagnostic Center
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home">
                        <Home className="h-4 w-4 inline mr-2" />
                        Home Sample Collection
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {collectionType === "home" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address Details</h3>
                    <Input
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                    <Input
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                    />
                    <Input
                      placeholder="State"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">
                        <CreditCard className="h-4 w-4 inline mr-2" />
                        Online Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Pay at Center</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full">
                  Proceed to Confirmation
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderNowPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <OrderFormContent />
    </Suspense>
  );
}
