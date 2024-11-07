'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from 'lucide-react'

const packageSchema = z.object({
  name: z.string().min(2, "Package name must be at least 2 characters"),
  testCount: z.number().min(1, "Package must include at least one test"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().optional(),
  image: z.instanceof(FileList).optional(),
  specialities: z.array(z.string()).min(1, "Select at least one speciality"),
  tests: z.array(z.string()).min(1, "Enter at least one test"),
})

const AddPackageForm = ({ onClose, diagnosticCenterId }) => {
  const { toast } = useToast()
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
  }, [toast])

  const form = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      testCount: 1,
      price: 0,
      description: "",
      specialities: [],
      tests: [""],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tests"
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (values.image && values.image.length > 0) {
        formData.append('image', values.image[0]);
      }

      const payload = {
        diagnosticCenterId,
        package: {
          name: values.name,
          testCount: Number(values.testCount),
          price: Number(values.price),
          specialities: values.specialities,
          tests: values.tests.filter(test => test.trim() !== ""),
          ...(values.description ? { description: values.description } : {})
        }
      };

      formData.append('data', JSON.stringify(payload));

      const response = await fetch('/api/diagnosticcenter/package', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to add package`);
      }

      const data = await response.json();
      toast({
        title: data.message || `Package added successfully`,
        description: `${values.name} has been added to the diagnostic center.`,
      })
      onClose()
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to add package. Please try again.`,
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
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter package name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the package to be added.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="testCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Tests</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter number of tests" 
                  {...field}
                  value={field.value || ''}
                  onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : '')} 
                />
              </FormControl>
              <FormDescription>
                The number of tests included in this package.
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
                The price of the package in your local currency.
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
                <Textarea placeholder="Enter package description" {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the package.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialities"
          render={() => (
            <FormItem>
              <FormLabel>Specialities</FormLabel>
              <div className="space-y-2">
                {specialities.map((speciality) => (
                  <FormField
                    key={speciality}
                    control={form.control}
                    name="specialities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={speciality}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(speciality)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, speciality])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== speciality
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {speciality}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormDescription>
                Select the specialities associated with this package.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Tests</FormLabel>
          <div className="flex flex-wrap gap-2 mt-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`tests.${index}`}
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormControl>
                      <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                        <Input
                          {...field}
                          placeholder={`Test ${index + 1}`}
                          className="border-none bg-transparent focus:outline-none"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 p-0"
                          onClick={() => remove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => append("")}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Test
            </Button>
          </div>
          <FormDescription className="mt-2">
            Enter the names of the tests included in this package.
          </FormDescription>
          <FormMessage name="tests" />
        </div>
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
                  onChange={(e) => onChange(e.target.files)}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Upload an image for the package.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Package</Button>
        </div>
      </form>
    </Form>
  )
}

export default AddPackageForm