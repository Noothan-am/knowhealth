"use client";
import { useState, useContext } from "react";
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
import { Toaster, toast } from "sonner";
import { useAllUsersData } from "@/app/context/userDataContext";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("consumer");
  const [loginError, setLoginError] = useState(null);
  const { setUser } = useAllUsersData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    const formData = new FormData(e.target);
    formData.append("activeTab", activeTab);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.error) {
        toast.error("invalid credentials");
        setLoginError(data.error);
      } else {
        toast.success("login successful");
        setUser({ ...data.user, role: activeTab });
        localStorage.clear();
        localStorage.setItem("role", activeTab);
        localStorage.setItem(
          "Data",
          JSON.stringify({ ...data.user, role: activeTab })
        );
        window.location.href = "/";
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="container mx-auto px-4 py-8 min-w-80 flex justify-center items-center min-h-screen">
        <Card className="w-3/6">
          <CardHeader>
            <CardTitle>Login to Know My Health</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="consumer">Consumer</TabsTrigger>
                <TabsTrigger value="doctor">Doctor</TabsTrigger>
                <TabsTrigger value="diagnostics-admin">
                  Diagnostics Admin
                </TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="consumer">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="consumer-email">Email</Label>
                      <Input
                        id="consumer-email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        name="email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consumer-password">Password</Label>
                      <Input
                        id="consumer-password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        name="password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Consumer
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="doctor">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="doctor-email">Email</Label>
                      <Input
                        id="doctor-email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        name="email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctor-password">Password</Label>
                      <Input
                        id="doctor-password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        name="password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Doctor
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="diagnostics-admin">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="diagnostics-email">Email</Label>
                      <Input
                        id="diagnostics-email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        name="email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="diagnostics-password">Password</Label>
                      <Input
                        id="diagnostics-password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        name="password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Diagnostics Lab Admin
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        name="email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        name="password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Login as Admin
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>
              {" "}
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
