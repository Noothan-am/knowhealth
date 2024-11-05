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
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const addSpecialitySchema = z.object({
  name: z.string().min(2, "Speciality name must be at least 2 characters"),
});

const addTestToSpecialitySchema = z.object({
  specialityName: z.string().min(2, "Speciality name must be at least 2 characters"),
  test: z.object({
    name: z.string().min(2, "Test name must be at least 2 characters"),
    description: z.string().min(2, "Description must be at least 2 characters")
  })
});

const AddTestSpecialityList = ({ onClose }) => {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("add-speciality")
  const [specialities, setSpecialities] = useState([])

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await fetch('/api/testspeciality/speciality')
        if (response.ok) {
          const data = await response.json()
          setSpecialities(data)
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch specialities",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error", 
          description: "Error fetching specialities",
          variant: "destructive",
        })
      }
    }

    fetchSpecialities()
  }, [toast])

  const specialityForm = useForm({
    resolver: zodResolver(addSpecialitySchema),
    defaultValues: {
      name: "",
    }
  })

  const testForm = useForm({
    resolver: zodResolver(addTestToSpecialitySchema),
    defaultValues: {
      specialityName: "",
      test: {
        name: "",
        description: ""
      }
    }
  })

  const onSubmitSpeciality = async (values) => {
    try {
      const response = await fetch('/api/testspeciality/speciality', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add speciality')
      }

      const data = await response.json()
      toast({
        title: "Success",
        description: data.message || "Speciality added successfully",
      })
      specialityForm.reset()
      // Refresh the specialities list
      const updatedSpecialities = await fetch('/api/testspeciality/speciality').then(res => res.json())
      setSpecialities(updatedSpecialities)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add speciality",
        variant: "destructive",
      })
    }
  }

  const onSubmitTest = async (values) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(values));
      if (testForm.getValues('image')) {
        formData.append('image', testForm.getValues('image')[0]);
      }
      console.log(formData);

      const response = await fetch('/api/testspeciality', {
        method: 'PUT',
        body: formData,
      })
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add test to speciality')
      }

      const data = await response.json()
      toast({
        title: "Success", 
        description: data.message || "Test added to speciality successfully",
      })
      testForm.reset()
      // Refresh the specialities list
      const updatedSpecialities = await fetch('/api/testspeciality/speciality').then(res => res.json())
      setSpecialities(updatedSpecialities)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add test to speciality",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <Card>
          <CardHeader>
            <CardTitle>Specialities and Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              {specialities.map((item) => (
                <div key={item.specialities.name} className="mb-4">
                  <h3 className="text-lg font-semibold">{item.specialities.name}</h3>
                  <ul className="list-disc list-inside">
                    {item.specialities.tests.map((test, index) => (
                      <li key={index}>{test.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 pl-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-speciality">Add Speciality</TabsTrigger>
            <TabsTrigger value="add-test">Add Test to Speciality</TabsTrigger>
          </TabsList>

          <TabsContent value="add-speciality">
            <Form {...specialityForm}>
              <form onSubmit={specialityForm.handleSubmit(onSubmitSpeciality)} className="space-y-8">
                <FormField
                  control={specialityForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speciality Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter speciality name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the new speciality to be added.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Speciality</Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="add-test">
            <Form {...testForm}>
              <form onSubmit={testForm.handleSubmit(onSubmitTest)} className="space-y-8">
                <FormField
                  control={testForm.control}
                  name="specialityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speciality Name</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a speciality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialities.map((item) => (
                            <SelectItem key={item.specialities.name} value={item.specialities.name}>
                              {item.specialities.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the speciality to add the test to.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={testForm.control}
                  name="test.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter test name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the test to be added.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={testForm.control}
                  name="test.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Description</FormLabel>
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
                  control={testForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Image</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                      </FormControl>
                      <FormDescription>
                        Upload an image for the test (optional).
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AddTestSpecialityList
