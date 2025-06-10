import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import OrderProgressIndicator from '@/components/OrderProgressIndicator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Package, History, Receipt, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Preparing' | 'Out for Delivery';
  items: OrderItem[];
  progressSteps?: { id: string; name: string; isCompleted: boolean; isCurrent: boolean; }[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2024-07-20',
    total: 31.97,
    status: 'Out for Delivery',
    items: [
      { id: 'p1', name: 'Margherita Pizza', quantity: 1, price: 12.99, imageUrl: 'https://source.unsplash.com/random/100x100?margherita-pizza' },
      { id: 'p2', name: 'Garlic Bread', quantity: 2, price: 5.99, imageUrl: 'https://source.unsplash.com/random/100x100?garlic-bread' },
    ],
    progressSteps: [
      { id: 'Step 1', name: 'Order Placed', isCompleted: true, isCurrent: false },
      { id: 'Step 2', name: 'Preparing', isCompleted: true, isCurrent: false },
      { id: 'Step 3', name: 'Out for Delivery', isCompleted: false, isCurrent: true },
      { id: 'Step 4', name: 'Delivered', isCompleted: false, isCurrent: false },
    ]
  },
  {
    id: 'ORD002',
    date: '2024-07-15',
    total: 45.50,
    status: 'Delivered',
    items: [
      { id: 'b1', name: 'Deluxe Burger', quantity: 2, price: 15.00, imageUrl: 'https://source.unsplash.com/random/100x100?burger' },
      { id: 's1', name: 'Large Fries', quantity: 1, price: 5.50, imageUrl: 'https://source.unsplash.com/random/100x100?fries' },
    ],
     progressSteps: [
      { id: 'Step 1', name: 'Order Placed', isCompleted: true, isCurrent: false },
      { id: 'Step 2', name: 'Preparing', isCompleted: true, isCurrent: false },
      { id: 'Step 3', name: 'Out for Delivery', isCompleted: true, isCurrent: false },
      { id: 'Step 4', name: 'Delivered', isCompleted: true, isCurrent: false },
    ]
  },
   {
    id: 'ORD003',
    date: '2024-06-10',
    total: 18.75,
    status: 'Cancelled',
    items: [
      { id: 'c1', name: 'Chicken Tacos (3)', quantity: 1, price: 10.75, imageUrl: 'https://source.unsplash.com/random/100x100?tacos' },
    ],
  },
];

const getStatusBadgeVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Delivered': return 'default'; // Using 'default' for success-like green (assuming primary is green)
    case 'Out for Delivery':
    case 'Shipped':
    case 'Preparing':
    case 'Processing': return 'secondary'; // Yellowish/Blueish based on theme
    case 'Cancelled': return 'destructive'; // Red
    default: return 'outline';
  }
};

const OrderHistoryPage = () => {
  console.log('OrderHistoryPage loaded');

  const currentOrders = mockOrders.filter(order => order.status === 'Processing' || order.status === 'Preparing' || order.status === 'Shipped' || order.status === 'Out for Delivery');
  const pastOrders = mockOrders.filter(order => order.status === 'Delivered' || order.status === 'Cancelled');

  const renderOrderList = (orders: Order[]) => {
    if (orders.length === 0) {
      return <p className="text-center text-gray-500 py-8">No orders found in this category.</p>;
    }
    return (
      <Accordion type="single" collapsible className="w-full space-y-4">
        {orders.map(order => (
          <AccordionItem value={order.id} key={order.id} className="bg-white rounded-lg shadow-sm border">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex flex-wrap justify-between items-center w-full">
                <div className="flex items-center space-x-3">
                    <Package className="h-6 w-6 text-orange-500" />
                    <div>
                        <span className="font-semibold text-gray-800">Order ID: {order.id}</span>
                        <p className="text-xs text-gray-500">Date: {order.date}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-gray-700">${order.total.toFixed(2)}</p>
                    <Badge variant={getStatusBadgeVariant(order.status)} className="mt-1">{order.status}</Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 border-t">
              {order.progressSteps && (order.status === 'Processing' || order.status === 'Preparing' || order.status === 'Shipped' || order.status === 'Out for Delivery') && (
                <div className="mb-6">
                  <h4 className="text-md font-semibold mb-2 text-gray-700">Order Progress</h4>
                  <OrderProgressIndicator steps={order.progressSteps} />
                </div>
              )}
              <h4 className="text-md font-semibold mb-3 text-gray-700">Items in this order:</h4>
              <div className="space-y-3 mb-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                        {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded mr-3"/>}
                        <div>
                            <p className="text-sm font-medium text-gray-700">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity} - Price: ${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" size="sm"><Receipt className="h-4 w-4 mr-1.5"/>View Invoice</Button>
                {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                  <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600"><ShoppingBag className="h-4 w-4 mr-1.5"/>Reorder</Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Orders</h1>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-200 p-1 rounded-lg">
            <TabsTrigger value="current" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white py-2"><Package className="h-5 w-5 mr-2 inline-block"/>Current Orders</TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white py-2"><History className="h-5 w-5 mr-2 inline-block"/>Past Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <ScrollArea className="h-auto max-h-[calc(100vh-250px)]"> {/* Adjust max height as needed */}
              {renderOrderList(currentOrders)}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="past">
            <ScrollArea className="h-auto max-h-[calc(100vh-250px)]"> {/* Adjust max height as needed */}
              {renderOrderList(pastOrders)}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;