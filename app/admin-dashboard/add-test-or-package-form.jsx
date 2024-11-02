'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Test name must be at least 2 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  speciality: z.string().optional(),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
})

const specialities = [
  "Hematology",
  "Biochemistry",
  "Microbiology",
  "Cardiology",
  "Radiology",
  "Endocrinology",
  "Ophthalmology",
  "Pulmonology",
  "Immunology",
  "Genetics"
]

const AddTestOrPackageForm = ({ type = 'test', onClose }) => {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      speciality: undefined,
    },
  })

  const onSubmit = (values) => {
    // Simulate API call
    console.log(values)
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
      description: `${values.name} has been added to the diagnostic center.`,
    })
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{type.charAt(0).toUpperCase() + type.slice(1)} Name</FormLabel>
              <FormControl>
                <Input placeholder={`Enter ${type} name`} {...field} />
              </FormControl>
              <FormDescription>
                The name of the {type} to be added.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter price" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>
                The price of the {type} in your local currency.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder={`Enter ${type} description`} {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the {type}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speciality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speciality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a speciality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {specialities.map((speciality) => (
                    <SelectItem key={speciality} value={speciality}>
                      {speciality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The medical speciality associated with this {type}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Upload an image for the {type}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add {type.charAt(0).toUpperCase() + type.slice(1)}</Button>
        </div>
      </form>
    </Form>
  )
}

export default AddTestOrPackageForm