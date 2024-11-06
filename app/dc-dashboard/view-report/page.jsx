"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ViewReport() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get('reportId');
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('/api/reports/get-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reportId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }

        const data = await response.json();
        setReport(data);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Report not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Test Report</CardTitle>
            <Badge variant="outline" className="text-sm">
              {new Date(report.date).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {report.name}</p>
                <p><span className="font-medium">Age:</span> {report.age}</p>
                <p><span className="font-medium">Phone:</span> {report.phoneNumber}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Test Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Test Name:</span> {report.testName}</p>
                <p><span className="font-medium">Order ID:</span> {report.orderId}</p>
                <p><span className="font-medium">Test ID:</span> {report.testId}</p>
              </div>
            </div>
          </div>

          {report.comments && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <p className="text-gray-700 dark:text-gray-300">{report.comments}</p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Report File</h3>
            <div className="border rounded-lg p-4">
              <iframe
                src={report.reportFile}
                className="w-full h-[600px]"
                title="Report PDF"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
