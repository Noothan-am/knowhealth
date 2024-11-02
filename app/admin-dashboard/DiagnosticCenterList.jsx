import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const diagnosticCenters = [
  {
    id: 1,
    name: 'HealthCare Diagnostics',
    location: 'New York, NY',
    availability: 'Open 24/7',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'City Medical Lab',
    location: 'Los Angeles, CA',
    availability: 'Mon-Fri: 8AM-8PM',
    isAvailable: false,
  },
  // Add more diagnostic centers as needed
]

const DiagnosticCenterList = () => {
  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Delete diagnostic center with id: ${id}`)
  }

  return (
    <div className="grid gap-4">
      {diagnosticCenters.map((center) => (
        <div key={center.id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
          <div>
            <h3 className="text-lg font-semibold">{center.name}</h3>
            <p className="text-gray-600">{center.location}</p>
            <p className="text-gray-600">{center.availability}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={center.isAvailable ? "success" : "destructive"}>
              {center.isAvailable ? "Available" : "Unavailable"}
            </Badge>
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
    </div>
  )
}

export default DiagnosticCenterList