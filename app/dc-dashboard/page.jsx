"use client";
import { ReactNode, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Beaker, FileText, Users, Search, Download, Plus } from "lucide-react";
import Image from "next/image";
import AddTestForm from "../admin-dashboard/add-test";
import AddPackageForm from "../admin-dashboard/add-package";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ViewOrder from "../admin-dashboard/ViewOrder";
import { useRouter } from "next/navigation";

// WhiteCard component
function WhiteCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg  shadow-md p-6  ${className}`}>
      {children}
    </div>
  );
}

export default function DashboardWithCard() {
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("test");
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportError, setReportError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role != "diagnostics-admin") {
      window.location.href = "/login";
    }
    const fetchCenterDetails = async () => {
      const data = JSON.parse(localStorage.getItem("Data"));

      try {
        const response = await fetch("/api/get-diagnosticcenter/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            centerId: data.id,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setCenter(data);
        } else {
          console.error("Failed to fetch diagnostic center details");
        }
      } catch (error) {
        console.error("Error fetching diagnostic center details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterDetails();
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role != "diagnostics-admin") {
      window.location.href = "/login";
    }
    const fetchOrders = async () => {
      const data = JSON.parse(localStorage.getItem("Data"));
      try {
        const response = await fetch("/api/orders/get-orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diagnosticCenterId: data.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setOrderError(err.message);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports/get-reports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diagnosticCenterId: "58bf0384-33a5-4059-9cfd-68a274a25716",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }

        const data = await response.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
        // We're not setting an error state here, as we want to show the create report option for orders without reports
      } finally {
        setReportLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!center) {
    return <div>Center not found</div>;
  }

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleCreateReport = (orderId) => {
    router.push(`/dc-dashboard/report?orderId=${orderId}`);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "success";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPaymentStatusBadgeVariant = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <WhiteCard className="max-w-6xl m-5 mx-auto">
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {center.name}
          </h1>
          <p className="text-gray-600 my-1 dark:text-gray-300">
            {center.address}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {center.phoneNo.value} | {center.email}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <Beaker className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{center.tests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {"Today's Appointments"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {center.appointments
                  ? center.appointments.filter(
                      (a) => a.date === new Date().toISOString().split("T")[0]
                    ).length
                  : 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {center.reports
                  ? center.reports.filter((r) => r.status !== "Ready").length
                  : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Center Details</h2>
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                setFormType("test");
                setShowForm(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Test
            </Button>
            <Button
              onClick={() => {
                setFormType("package");
                setShowForm(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Services:</h3>
          <div className="flex space-x-4">
            {center.services.homeSampleCollection && (
              <Badge>Home Sample Collection</Badge>
            )}
            {center.services.onlineReports && <Badge>Online Reports</Badge>}
          </div>
        </div>

        {center.certifications?.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Certifications:</h3>
            <div className="flex flex-wrap gap-2">
              {center.certifications.map((cert, index) => (
                <Badge key={index} variant="outline">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {center.accreditations?.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Accreditations:</h3>
            <div className="flex flex-wrap gap-2">
              {center.accreditations.map((accr, index) => (
                <Badge key={index} variant="outline">
                  {accr}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="tests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tests" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Available Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {center.tests.map((test) => (
                <div key={test.id} className="bg-gray-50 rounded-lg p-4">
                  {test.image && (
                    <Image
                      src={test.image}
                      alt={test.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover mb-2"
                    />
                  )}
                  <h3 className="font-semibold">{test.name}</h3>
                  <p className="text-gray-600">Price: ₹{test.price}</p>
                  {test.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {test.description}
                    </p>
                  )}
                  {test.speciality && (
                    <Badge className="mt-2" variant="secondary">
                      {test.speciality}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="packages" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Available Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {center.packages.map((pkg) => (
                <div key={pkg.id} className="bg-gray-50 rounded-lg p-4">
                  {pkg.image && (
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover mb-2"
                    />
                  )}
                  <h3 className="font-semibold">{pkg.name}</h3>
                  <p className="text-gray-600">Price: ₹{pkg.price}</p>
                  <p className="text-gray-600">
                    Tests Included: {pkg.testCount}
                  </p>
                  {pkg.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {pkg.description}
                    </p>
                  )}
                  {pkg.specialities?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pkg.specialities.map((spec, index) => (
                        <Badge key={index} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="orders" className="space-y-4">
            {orderLoading ? (
              <div>Loading...</div>
            ) : orderError ? (
              <div>Error: {orderError}</div>
            ) : selectedOrderId ? (
              <ViewOrder
                orderId={selectedOrderId}
                onBack={() => setSelectedOrderId(null)}
              />
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.patientName}</TableCell>
                        <TableCell>{order.item.name}</TableCell>
                        <TableCell>₹{order.totalAmount}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getPaymentStatusBadgeVariant(
                              order.paymentStatus
                            )}
                          >
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.appointmentDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            {orderLoading || reportLoading ? (
              <div>Loading...</div>
            ) : orderError ? (
              <div>Error: {orderError}</div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Report Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => {
                      const report = reports.find(
                        (r) => r.orderId === order.id
                      );
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.patientName}</TableCell>
                          <TableCell>{order.item.name}</TableCell>
                          <TableCell>
                            {new Date(
                              order.appointmentDate
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {report ? (
                              <Badge variant="success">Created</Badge>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {report ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  router.push(
                                    `/dc-dashboard/view-report/?reportId=${report.id}`
                                  )
                                }
                              >
                                View Report
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCreateReport(order.id)}
                              >
                                Create Report
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add {formType.charAt(0).toUpperCase() + formType.slice(1)} to{" "}
              {center.name}
            </h2>
            {formType === "test" ? (
              <AddTestForm
                onClose={() => setShowForm(false)}
                diagnosticCenterId={center.id}
              />
            ) : (
              <AddPackageForm
                onClose={() => setShowForm(false)}
                diagnosticCenterId={center.id}
              />
            )}
          </div>
        </div>
      )}
    </WhiteCard>
  );
}
