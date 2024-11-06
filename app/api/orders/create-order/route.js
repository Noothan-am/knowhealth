import { NextResponse } from 'next/server'
import Order from '@/models/orders'
import dbConnect from "@/config/dbconnect";

export async function POST(req) {
  try {
    await dbConnect()

    const data = await req.json()

    // Create order object matching schema
    const orderData = {
      userId: data.userId,
      diagnosticCenterId: data.diagnosticCenterId,
      item: {
        type: 'test',
        id: data.test.id,
        name: data.test.name,
        price: data.test.price
      },
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      appointmentDate: data.appointmentDate,
      isHomeSampleCollection: data.isHomeSampleCollection,
      address: data.isHomeSampleCollection ? data.address : null,
      patientName: data.patientName,
      patientAge: data.patientAge,
      patientPhoneNumber: data.patientPhoneNumber
    }

    const order = await Order.create(orderData)

    return NextResponse.json({ 
      success: true,
      data: order
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to create order'
    }, { status: 500 })
  }
}
