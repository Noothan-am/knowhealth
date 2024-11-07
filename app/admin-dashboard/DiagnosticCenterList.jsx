"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddTestForm from "@/app/admin-dashboard/add-test";
import AddPackageForm from "@/app/admin-dashboard/add-package";
import Image from "next/image";

const DiagnosticCenterList = ({ onSelectCenter }) => {
  const [diagnosticCenters, setDiagnosticCenters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("test");
  const [selectedCenterId, setSelectedCenterId] = useState(null);

  useEffect(() => {
    fetchDiagnosticCenters();
  }, []);

  const fetchDiagnosticCenters = async () => {
    try {
      const response = await fetch("/api/diagnosticcenter");
      if (response.ok) {
        const data = await response.json();
        setDiagnosticCenters(data);
      } else {
        console.error("Failed to fetch diagnostic centers");
      }
    } catch (error) {
      console.error("Error fetching diagnostic centers:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/diagnosticcenter", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Remove the deleted center from the state
        setDiagnosticCenters((prevCenters) =>
          prevCenters.filter((center) => center.id !== id)
        );
        console.log("Diagnostic center deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete diagnostic center:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting diagnostic center:", error);
    }
  };

  const handleAddTest = (id) => {
    setSelectedCenterId(id);
    setFormType("test");
    setShowForm(true);
  };

  const handleAddPackage = (id) => {
    setSelectedCenterId(id);
    setFormType("package");
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCenterId(null);
  };

  return (
    <div className="grid gap-4">
      {diagnosticCenters.map((center) => (
        <div
          key={center.id}
          className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelectCenter(center.id)}
        >
          <div className="flex items-center">
            <div className="mr-4">
              {center.image && (
                <Image
                  src={center.image}
                  alt={center.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{center.name}</h3>
              <p className="text-gray-600">
                {center.address}, {center.city}, {center.state} -{" "}
                {center.pincode}
              </p>
              <p className="text-gray-600">Phone: {center.phoneNo.value}</p>
              <p className="text-gray-600">Rating: {center.rating}/5</p>
              <p className="text-gray-600">
                Services:
                {center.services.homeSampleCollection
                  ? " Home Sample Collection"
                  : ""}
                {center.services.onlineReports ? " Online Reports" : ""}
              </p>
              <div className="mt-2">
                <p className="text-gray-600 font-semibold">Specialities:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {center.specialities.map((speciality, index) => (
                    <Badge key={index} variant="secondary">
                      {speciality}
                    </Badge>
                  ))}
                  {center.tests &&
                    center.tests.map(
                      (test, index) =>
                        test.speciality && (
                          <Badge key={`test-${index}`} variant="secondary">
                            {test.speciality}
                          </Badge>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex items-center space-x-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-green-500 hover:text-green-700"
              onClick={() => handleAddTest(center.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Test
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleAddPackage(center.id)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(center.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add {formType.charAt(0).toUpperCase() + formType.slice(1)} to{" "}
              {diagnosticCenters.find((c) => c.id === selectedCenterId)?.name}
            </h2>
            {formType === "test" ? (
              <AddTestForm
                onClose={handleCloseForm}
                diagnosticCenterId={selectedCenterId}
              />
            ) : (
              <AddPackageForm
                onClose={handleCloseForm}
                diagnosticCenterId={selectedCenterId}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticCenterList;
