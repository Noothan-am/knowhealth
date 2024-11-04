import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorList = ({ doctors }) => {
  const handleDelete = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(`/api/doctor`, {
        method: "DELETE",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to delete doctor");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="grid gap-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="flex items-center bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={200}
            height={200}
            className="object-cover w-48 h-48"
          />
          <div className="flex-grow p-2">
            <h3 className="text-lg font-semibold">
              Doctors Name: {doctor.name}
            </h3>
            <p className="text-gray-600 my-2">Specialty: {doctor.speciality}</p>
            <p className="text-gray-600">Experience: {doctor.experience}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 text-red-500 hover:text-red-700"
            onClick={() => handleDelete(doctor.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
