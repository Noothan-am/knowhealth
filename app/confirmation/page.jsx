'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Phone, CreditCard, Clock, Home, Building, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null);
  const [center, setCenter] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [userId] = useState("9d3e6c23-8bed-44ea-af69-aa6f831e7dd3");

  useEffect(() => {
    const fetchOrderAndCenter = async () => {
      try {
        const orderResponse = await fetch('/api/orders/get-orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (!orderResponse.ok) {
          throw new Error('Failed to fetch order');
        }

        const orderData = await orderResponse.json();
        const currentOrder = orderData.find(order => order.id === orderId);
        setOrder(currentOrder);

        // Fetch center details
        const centerResponse = await fetch('/api/get-diagnosticcenter/id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ centerId: currentOrder.diagnosticCenterId }),
        });

        if (!centerResponse.ok) {
          throw new Error('Failed to fetch diagnostic center details');
        }

        const centerData = await centerResponse.json();
        setCenter(centerData);
      } catch (error) {
        console.error('Error fetching order and center:', error);
      }
    };

    if (orderId) {
      fetchOrderAndCenter();
    }
  }, [orderId, userId]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Make API call to create Razorpay order
    const data = await fetch('/api/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: order.id,
        amount: order.totalAmount * 100, // Razorpay expects amount in paise
      }),
    }).then((t) => t.json());

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Changed to NEXT_PUBLIC_
      name: "MedTech Diagnostics",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: `Payment for ${order.item.name}`,
      handler: async function (response) {
        // Handle successful payment
        try {
          const verificationData = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: order.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }).then(t => t.json());

          if (verificationData.success) {
            setPaymentStatus('paid');
          } else {
            alert('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: order.patientName,
        email: order.patientEmail,
        contact: order.patientPhoneNumber,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!order || !center) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-600">
            {order.paymentMethod === 'cod' ? 'Booking Confirmed!' : paymentStatus === 'paid' ? 'Booking Confirmed!' : 'Complete Your Payment'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-lg">Order ID: {order.id}</p>
            <p className="text-sm text-gray-600">Please save this for future reference</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Patient Details</p>
                <p className="text-sm text-gray-600">{order.patientName}, {order.patientAge} years</p>
                <p className="text-sm text-gray-600">Phone: {order.patientPhoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Appointment Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Test Details</p>
                <p className="text-sm text-gray-600">{order.item.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Diagnostic Center Details</p>
                <p className="text-sm text-gray-600">{center.name}</p>
                <p className="text-sm text-gray-600">{center.address}, {center.city}, {center.state} - {center.pincode}</p>
                <p className="text-sm text-gray-600">Phone: {center.phoneNo.value}</p>
                <p className="text-sm text-gray-600">Email: {center.email}</p>
              </div>
            </div>

            {order.isHomeSampleCollection ? (
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Home Sample Collection</p>
                  <p className="text-sm text-gray-600">
                    {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Center Visit</p>
                  <p className="text-sm text-gray-600">Please visit the diagnostic center at the scheduled time</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <p className="font-medium">Payment Details</p>
                <p className="text-sm text-gray-600">
                  Amount: ₹{order.totalAmount} • Status: {paymentStatus}
                </p>
              </div>
            </div>
          </div>

          {paymentStatus === 'pending' ? (
            <div className="flex justify-center pt-4">
              <Button onClick={makePayment}>
                Pay Now
              </Button>
            </div>
          ) : (
            <div className="flex justify-center gap-4 pt-4">
              <Button onClick={() => window.print()}>
                Print Details
              </Button>
              <Button variant="outline" onClick={() => router.push('/user-record')}>
                View All Orders
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
