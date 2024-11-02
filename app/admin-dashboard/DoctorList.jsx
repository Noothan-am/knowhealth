import React from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    experience: '15 years',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    specialty: 'Pediatrician',
    experience: '10 years',
    image: '/placeholder.svg?height=200&width=200',
  },
  // Add more doctors as needed
]

const DoctorList = () => {
  const handleDelete = (id) => {
    // add our delete functionality
    console.log(`Delete doctor with id: ${id}`)
  }

  return (
    <div className="grid gap-4">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={200}
            height={200}
            className="object-cover w-48 h-48"
          />
          <div className="flex-grow p-4">
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
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
  )
}

export default DoctorList