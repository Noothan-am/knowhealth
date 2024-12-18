'use client'

import React, { useState, useEffect } from 'react'
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

const testSchema = z.object({
  name: z.string().min(2, "Test name must be at least 2 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().optional(),
  speciality: z.string(),
  image: z.any().optional(),
})

const AddTestForm = ({ onClose, diagnosticCenterId }) => {
  const { toast } = useToast()
  const [specialities, setSpecialities] = useState([])
  const [tests, setTests] = useState([])

  const form = useForm({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      speciality: "",
    },
  })

  const handleFileInput = (e) => {
    if (typeof window === 'undefined') return null;
    const files = e.target.files;
    if (!files || files.length === 0) return null;
    return files;
  };

  useEffect(() => {
    const fetchSpecialitiesAndTests = async () => {
      try {
        const response = await fetch('/api/testspeciality')
        if (response.ok) {
          const data = await response.json()
          setSpecialities(data.map(item => item.specialities.name))
          const allTests = data.flatMap(speciality => 
            speciality.specialities.tests.map(test => ({
              name: test.name,
              speciality: speciality.specialities.name
            }))
          )
          setTests(allTests)
        } else {
          console.error('Failed to fetch specialities and tests')
          toast({
            title: "Error",
            description: "Failed to fetch specialities and tests",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Error fetching specialities and tests:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to fetch specialities and tests",
          variant: "destructive", 
        })
      }
    }

    fetchSpecialitiesAndTests()
  }, [toast])

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (values.image && values.image.length > 0) {
        formData.append('image', values.image[0]);
      }

      const payload = {
        diagnosticCenterId,
        test: {
          name: values.name,
          price: Number(values.price),
          speciality: values.speciality,
          ...(values.description ? { description: values.description } : {})
        }
      };

      formData.append('data', JSON.stringify(payload));

      const response = await fetch('/api/diagnosticcenter/test', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to add test`);
      }

      const data = await response.json();
      toast({
        title: data.message || `Test added successfully`,
        description: `${values.name} has been added to the diagnostic center.`,
      })
      onClose()
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to add test. Please try again.`,
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-h-[80vh] overflow-y-auto p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Name</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  const selectedTest = tests.find(test => test.name === value)
                  if (selectedTest) {
                    form.setValue('speciality', selectedTest.speciality)
                  }
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a test" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tests.map((test) => (
                    <SelectItem key={test.name} value={test.name}>
                      {test.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the test to be added.
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
                <Input 
                  type="number" 
                  placeholder="Enter price" 
                  {...field}
                  value={field.value || ''}
                  onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : '')} 
                />
              </FormControl>
              <FormDescription>
                The price of the test in your local currency.
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
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter test description" {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the test.
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
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>
                The medical speciality associated with this test.
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
              <FormLabel>Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = handleFileInput(e);
                    if (files) {
                      onChange(files);
                    }
                  }}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Upload an image for the test.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Test</Button>
        </div>
      </form>
    </Form>
  )
}

export default AddTestForm