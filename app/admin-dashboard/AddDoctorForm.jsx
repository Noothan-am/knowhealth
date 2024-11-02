import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const AddDoctorForm = ({ onClose }) => {
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
        <Label htmlFor="specialty">Specialty</Label>
        <Input id="specialty" required />
      </div>
      <div>
        <Label htmlFor="experience">Experience</Label>
        <Input id="experience" required />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" required />
      </div>
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <Input id="image" type="file" accept="image/*" required />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Doctor</Button>
      </div>
    </form>
  )
}

export default AddDoctorForm