"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ViewOrder from "@/app/admin-dashboard/ViewOrder";

export default function OrderList({ onSelectOrder }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/all-orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
    onSelectOrder(orderId);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (selectedOrderId) {
    return (
      <ViewOrder
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
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
              <TableCell className="font-medium">{order.id}</TableCell>
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
                  variant={getPaymentStatusBadgeVariant(order.paymentStatus)}
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
  );
}
