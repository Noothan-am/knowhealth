import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const AddDiagnosticCenterForm = ({ onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Implement form submission logic here
    console.log('Form submitted')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" required />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" required />
      </div>
      <div>
        <Label htmlFor="availability">Availability</Label>
        <Input id="availability" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" required />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="isAvailable" />
        <Label htmlFor="isAvailable">Currently Available</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Diagnostic Center</Button>
      </div>
    </form>
  )
}

export default AddDiagnosticCenterForm