"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { z } from "zod"
import { StarRating } from "@/components/ui/star-rating"// Assuming you have a StarRating component
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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
    certifications: z.string().optional(),
    accreditations: z.string().optional(),
    services: z.object({
        homeSampleCollection: z.boolean(),
        onlineReports: z.boolean(),
    }).default({ homeSampleCollection: false, onlineReports: false }),
    specialities: z.string().optional(),
    timings: z.object({
        type: z.enum(['24/7', 'custom']).optional(),
        startDay: z.string().optional(),
        endDay: z.string().optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }).optional(),
});

const AddDiagnosticCenterForm = ({ onClose }) => {
  const [image, setImage] = useState(null);

  const [specialities, setSpecialities] = useState([])

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await fetch('/api/testspeciality')
        if (response.ok) {
          const data = await response.json()
          const specialityNames = data.map(item => item.specialities.name)
          setSpecialities(specialityNames)
        } else {
          console.error('Failed to fetch specialities')
          toast({
            title: "Error",
            description: "Failed to fetch specialities",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Error fetching specialities:', error)
        toast({
          title: "Error", 
          description: error.message || "Failed to fetch specialities",
          variant: "destructive",
        })
      }
    }

    fetchSpecialities()
  }, [])

  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm({
    resolver: zodResolver(createDiagnosticCenterSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNo: { value: '', isVerified: false },
      password: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      rating: 0,
      certifications: '',
      accreditations: '',
      services: { homeSampleCollection: false, onlineReports: false },
      specialities: '',
      timings: {
        type: undefined,
        startDay: 'mon',
        endDay: 'sat',
        startTime: '',
        endTime: ''
      },
    },
    mode: 'onChange'
  });

  const handleImageChange = (e) => {
    if (typeof window === 'undefined') return;
    const files = handleFileInput(e);
    if (files) {
      setImage(files[0]);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Convert comma-separated strings to arrays
      const formattedData = {
        ...data,
        accreditations: data.accreditations ? data.accreditations.split(',').map(item => item.trim()) : [],
        certifications: data.certifications ? data.certifications.split(',').map(item => item.trim()) : [],
        specialities: data.specialities ? data.specialities.split(',').map(item => item.trim()) : [],
      };

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(formattedData));
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
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="phoneNo">Phone Number</Label>
        <Input id="phoneNo" {...register("phoneNo.value")} />
        {errors.phoneNo?.value && <p className="text-red-500">{errors.phoneNo.value.message}</p>}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" {...register("city")} />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input id="state" {...register("state")} />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>
      <div>
        <Label htmlFor="pincode">Pincode</Label>
        <Input id="pincode" {...register("pincode")} />
        {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <StarRating
          id="rating"
          value={watch("rating")}
          onChange={(value) => {
            setValue("rating", value);
            trigger("rating");
          }}
        />
        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
      </div>
      <div>
        <Label htmlFor="certifications">Certifications (comma-separated)</Label>
        <Input id="certifications" {...register("certifications")} />
      </div>
      <div>
        <Label htmlFor="accreditations">Accreditations (comma-separated)</Label>
        <Input id="accreditations" {...register("accreditations")} />
      </div>
      <div>
        <Label>Specialities</Label>
        <div className="space-y-2">
          {specialities.map((speciality) => (
            <div key={speciality} className="flex items-center space-x-2">
              <Checkbox
                id={speciality}
                checked={watch("specialities")?.includes(speciality)}
                onCheckedChange={(checked) => {
                  const currentSpecialities = watch("specialities") ? watch("specialities").split(',') : [];
                  let newSpecialities;
                  if (checked) {
                    newSpecialities = [...currentSpecialities, speciality];
                  } else {
                    newSpecialities = currentSpecialities.filter(s => s !== speciality);
                  }
                  setValue("specialities", newSpecialities.join(','));
                  trigger("specialities");
                }}
              />
              <Label htmlFor={speciality}>{speciality}</Label>
            </div>
          ))}
        </div>
        {errors.specialities && (
          <p className="text-red-500">{errors.specialities.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="image">Image (optional)</Label>
        <Input id="image" name="image" type="file" onChange={handleImageChange} />
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          id="homeSampleCollection" 
          checked={watch("services.homeSampleCollection")}
          onCheckedChange={(checked) => {
            setValue("services.homeSampleCollection", checked);
            trigger("services.homeSampleCollection");
          }}
        />
        <Label htmlFor="homeSampleCollection">Home Sample Collection</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch 
          id="onlineReports" 
          checked={watch("services.onlineReports")}
          onCheckedChange={(checked) => {
            setValue("services.onlineReports", checked);
            trigger("services.onlineReports");
          }}
        />
        <Label htmlFor="onlineReports">Online Reports</Label>
      </div>
      <div className="space-y-4">
        <Label>Center Timings</Label>
        <div className="flex items-center gap-4">
          <Label className="w-20">Type</Label>
          <Select
            onValueChange={(value) => {
              if (value === '24/7') {
                setValue('timings', { type: '24/7' });
              } else {
                setValue('timings', { 
                  type: 'custom', 
                  startDay: 'mon',
                  endDay: 'sat',
                  startTime: '',
                  endTime: ''
                });
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timing type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24/7">24/7</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {watch('timings')?.type === 'custom' && (
          <>
            <div className="flex items-center gap-4">
              <Label className="w-20">Days</Label>
              <div className="flex items-center gap-2">
                <Select
                  value={watch('timings')?.startDay}
                  onValueChange={(value) => {
                    setValue('timings', {
                      ...watch('timings'),
                      startDay: value
                    });
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Start day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mon">Mon</SelectItem>
                    <SelectItem value="tue">Tue</SelectItem>
                    <SelectItem value="wed">Wed</SelectItem>
                    <SelectItem value="thu">Thu</SelectItem>
                    <SelectItem value="fri">Fri</SelectItem>
                    <SelectItem value="sat">Sat</SelectItem>
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select
                  value={watch('timings')?.endDay}
                  onValueChange={(value) => {
                    setValue('timings', {
                      ...watch('timings'),
                      endDay: value
                    });
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="End day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mon">Mon</SelectItem>
                    <SelectItem value="tue">Tue</SelectItem>
                    <SelectItem value="wed">Wed</SelectItem>
                    <SelectItem value="thu">Thu</SelectItem>
                    <SelectItem value="fri">Fri</SelectItem>
                    <SelectItem value="sat">Sat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-20">Hours</Label>
              <Input
                type="time"
                value={watch('timings')?.startTime || ''}
                onChange={(e) => {
                  setValue('timings', {
                    ...watch('timings'),
                    startTime: e.target.value
                  });
                }}
              />
              <span>to</span>
              <Input
                type="time"
                value={watch('timings')?.endTime || ''}
                onChange={(e) => {
                  setValue('timings', {
                    ...watch('timings'),
                    endTime: e.target.value
                  });
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Diagnostic Center</Button>
      </div>
    </form>
  )
}

export default AddDiagnosticCenterForm