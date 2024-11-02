import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { z } from "zod"

const createDiagnosticCenterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNo: z.object({
        value: z.string().regex(/^[789]\d{9}$/, "Invalid phone number"),
        isVerified: z.boolean().default(false),
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    address: z.string().min(2, "Address must be at least 2 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5").default(0),
    certifications: z.array(z.string()).default([]),
    accreditations: z.array(z.string()).default([]),
    services: z.object({
        homeSampleCollection: z.boolean(),
        onlineReports: z.boolean(),
    }).default({ homeSampleCollection: false, onlineReports: false }),
    specialities: z.array(z.string()).default([]),
    timings: z.object({}).optional(),
});

const AddDiagnosticCenterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: { value: '', isVerified: false },
    password: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rating: 0,
    certifications: [],
    accreditations: [],
    services: { homeSampleCollection: false, onlineReports: false },
    specialities: [],
    timings: {},
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validatedData = createDiagnosticCenterSchema.parse(formData);
      
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(validatedData));
      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await fetch('/api/diagnosticcenter', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Diagnostic Center added successfully');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error adding Diagnostic Center:', errorData.error);
      }
    } catch (error) {
      console.error('Validation error:', error.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phoneNo">Phone Number</Label>
        <Input id="phoneNo" name="phoneNo.value" value={formData.phoneNo.value} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="pincode">Pincode</Label>
        <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input id="image" name="image" type="file" onChange={handleImageChange} />
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          id="homeSampleCollection" 
          name="services.homeSampleCollection"
          checked={formData.services.homeSampleCollection}
          onCheckedChange={(checked) => setFormData(prev => ({...prev, services: {...prev.services, homeSampleCollection: checked}}))}
        />
        <Label htmlFor="homeSampleCollection">Home Sample Collection</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          id="onlineReports" 
          name="services.onlineReports"
          checked={formData.services.onlineReports}
          onCheckedChange={(checked) => setFormData(prev => ({...prev, services: {...prev.services, onlineReports: checked}}))}
        />
        <Label htmlFor="onlineReports">Online Reports</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Diagnostic Center</Button>
      </div>
    </form>
  )
}

export default AddDiagnosticCenterForm