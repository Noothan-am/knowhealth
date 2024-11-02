import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { StarRating } from "@/components/ui/star-rating"// Assuming you have a StarRating component
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
    timings: z.object({}).optional(),
});

const AddDiagnosticCenterForm = ({ onClose }) => {
  const [image, setImage] = useState(null);

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
      timings: {},
    },
    mode: 'onChange'
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
        <Label htmlFor="specialities">Specialities (comma-separated)</Label>
        <Input id="specialities" {...register("specialities")} />
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
      <div>
        <Label htmlFor="timings">Timings (JSON format)</Label>
        <Textarea 
          id="timings" 
          {...register("timings")}
          onChange={(e) => {
            try {
              const parsedTimings = JSON.parse(e.target.value);
              setValue("timings", parsedTimings);
              trigger("timings");
            } catch (error) {
              console.error('Invalid JSON for timings');
            }
          }} 
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Diagnostic Center</Button>
      </div>
    </form>
  )
}

export default AddDiagnosticCenterForm