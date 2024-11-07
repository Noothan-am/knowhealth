"use client";
import { Suspense } from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";

const createReportSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  testId: z.string().min(1, "Test ID is required"), 
  userId: z.string().min(1, "User ID is required"),
  diagnosticCenterId: z.string().min(1, "Diagnostic Center ID is required"),
  testName: z.string().min(1, "Test name is required"),
  name: z.string().min(1, "Patient name is required"),
  age: z.number().min(0, "Age must be a positive number"),
  phoneNumber: z.string().regex(/^[789]\d{9}$/, "Invalid phone number"),
  comments: z.string().optional()
});

function ReportFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  const [formData, setFormData] = useState({
    orderId: "",
    testId: "",
    userId: "",
    diagnosticCenterId: "",
    testName: "",
    name: "",
    age: "",
    phoneNumber: "",
    comments: ""
  });
  const [reportFile, setReportFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch order details');
      }

      const orderData = await response.json();
      setOrderDetails(orderData);

      setFormData({
        orderId: orderData.id,
        testId: orderData.item.id,
        userId: orderData.userId,
        diagnosticCenterId: orderData.diagnosticCenterId,
        testName: orderData.item.name,
        name: orderData.patientName,
        age: orderData.patientAge,
        phoneNumber: orderData.patientPhoneNumber,
        comments: ""
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
      setErrors(prevErrors => ({ 
        ...prevErrors, 
        orderId: error.message || 'Failed to fetch order details' 
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    try {
      const validatedData = createReportSchema.parse(formData);

      if (!reportFile) {
        setErrors({ reportFile: "Report file is required" });
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('reportFile', reportFile);
      formDataToSend.append('data', JSON.stringify(validatedData));

      const response = await fetch('/api/reports/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create report');
      }

      // Report created successfully, navigate back
      router.push('/dc-dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {}));
      } else {
        console.error('Error creating report:', error);
        alert('Failed to create report');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => {
                if (key === 'diagnosticCenterId' || key === 'testId') {
                  return null; // Skip rendering these fields
                }
                if (key === 'userId' || key === 'orderId') {
                  return (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                      <Input
                        id={key}
                        name={key}
                        type="text"
                        value={value}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                  );
                }
                return (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                    {key === 'comments' ? (
                      <Textarea
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className={`min-h-[100px] ${errors[key] ? 'border-red-500' : ''}`}
                      />
                    ) : (
                      <Input
                        id={key}
                        name={key}
                        type={key === 'age' ? 'number' : 'text'}
                        value={value}
                        onChange={handleChange}
                        className={errors[key] ? 'border-red-500' : ''}
                        readOnly={key !== 'comments'}
                      />
                    )}
                    {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportFile">Report File</Label>
              <Input
                id="reportFile"
                name="reportFile"
                type="file"
                onChange={handleFileChange}
                className={errors.reportFile ? 'border-red-500' : ''}
              />
              {errors.reportFile && <p className="text-red-500 text-sm">{errors.reportFile}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Creating Report...' : 'Create Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportFormContent />
    </Suspense>
  );
}
