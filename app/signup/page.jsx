"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState("consumer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("activeTab", activeTab);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      window.location.href = "/login";
      console.log(`${activeTab} signup submitted`, result);
    } catch (error) {
      console.error("There was a problem with the signup request:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up for Know My Health</CardTitle>
          <CardDescription>
            Create your account to start exploring our products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumer">Patient</TabsTrigger>
              <TabsTrigger value="seller">Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="consumer">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="consumer-name">Full Name</Label>
                    <Input
                      id="consumer-name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="consumer-email">Email</Label>
                    <Input
                      id="consumer-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="consumer-phone">phone</Label>
                    <Input
                      id="consumer-phone"
                      name="phone"
                      type="phone"
                      placeholder="Enter your phone"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="consumer-password">Password</Label>
                    <Input
                      id="consumer-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="consumer-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="consumer-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up as Customer
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="seller">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="doctor-name">Full Name</Label>
                    <Input
                      id="doctor-name"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input
                      id="doctor-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-phone">phone</Label>
                    <Input
                      id="doctor-phone"
                      name="phone"
                      type="number"
                      placeholder="Create a phone"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input
                      id="doctor-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="doctor-confirm-password">
                      Confirm Password
                    </Label>
                    <Input
                      id="doctor-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-specialization">
                      Specialization
                    </Label>
                    <Input
                      id="doctor-specialization"
                      name="specialization"
                      placeholder="Enter your specialization"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-experience">experience</Label>
                    <Input
                      id="doctor-experience"
                      name="experience"
                      type="number"
                      placeholder="Enter your experience"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-consultationFee">
                      consultationFee
                    </Label>
                    <Input
                      id="doctor-consultationFee"
                      name="consultationFee"
                      type="number"
                      placeholder="Enter your consultationFee"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up as Doctor
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
