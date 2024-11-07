"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  User,
  CreditCard,
  Clock,
  Home,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ViewOrder({ orderId, onBack }) {
  const [order, setOrder] = useState(null);
  const [center, setCenter] = useState(null);

  useEffect(() => {
    const fetchOrderAndCenter = async () => {
      try {
        const orderResponse = await fetch("/api/orders/all-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!orderResponse.ok) {
          throw new Error("Failed to fetch order");
        }

        const orderData = await orderResponse.json();
        console.log({ orderData });

        const currentOrder = orderData.find((order) => order.id === orderId);
        setOrder(currentOrder);

        const centerResponse = await fetch("/api/get-diagnosticcenter/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ centerId: currentOrder.diagnosticCenterId }),
        });

        if (!centerResponse.ok) {
          throw new Error("Failed to fetch diagnostic center details");
        }

        const centerData = await centerResponse.json();
        setCenter(centerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (orderId) {
      fetchOrderAndCenter();
    }
  }, [orderId]);

  if (!order || !center) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-gray-800">
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-lg">Order ID: {order.id}</p>
            <Badge
              variant={
                order.status === "completed"
                  ? "success"
                  : order.status === "confirmed"
                  ? "info"
                  : order.status === "cancelled"
                  ? "destructive"
                  : "default"
              }
            >
              {order.status.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Patient Details</p>
                <p className="text-sm text-gray-600">
                  {order.patientName}, {order.patientAge} years
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.patientPhoneNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Appointment Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.appointmentDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Test Details</p>
                <p className="text-sm text-gray-600">{order.item.name}</p>
                <p className="text-sm text-gray-600">
                  Price: ₹{order.item.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Diagnostic Center Details</p>
                <p className="text-sm text-gray-600">{center.name}</p>
                <p className="text-sm text-gray-600">
                  {center.address}, {center.city}, {center.state} -{" "}
                  {center.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {center.phoneNo.value}
                </p>
                <p className="text-sm text-gray-600">Email: {center.email}</p>
              </div>
            </div>

            {order.isHomeSampleCollection ? (
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Home Sample Collection</p>
                  <p className="text-sm text-gray-600">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state} - {order.address.pincode}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Center Visit</p>
                  <p className="text-sm text-gray-600">
                    Please visit the diagnostic center at the scheduled time
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Payment Details</p>
                <p className="text-sm text-gray-600">
                  Amount: ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Method: {order.paymentMethod.toUpperCase()}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Status: {order.paymentStatus.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={() => window.print()}>Print Details</Button>
            <Button variant="outline" onClick={onBack}>
              Back to Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
