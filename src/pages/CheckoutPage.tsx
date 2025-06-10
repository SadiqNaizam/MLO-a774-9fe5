import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  phoneNumber: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid phone number"),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(["creditCard", "paypal", "cod"], { required_error: "Please select a payment method"}),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === "creditCard") {
        return !!data.cardNumber && /^\d{16}$/.test(data.cardNumber) &&
               !!data.expiryDate && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate) &&
               !!data.cvv && /^\d{3,4}$/.test(data.cvv);
    }
    return true;
}, {
    message: "Invalid credit card details",
    path: ["cardNumber"], // Path helps to show error at specific field or globally
});

const checkoutFormSchema = z.object({
  address: addressSchema,
  payment: paymentSchema,
  specialInstructions: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
});

// Mock order summary data (in a real app, this would come from cart state)
const mockOrderSummary = {
  items: [
    { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
    { name: 'Garlic Bread', quantity: 2, price: 5.99 },
  ],
  subtotal: 24.97,
  deliveryFee: 5.00,
  taxes: 2.00,
  total: 31.97,
};


const CheckoutPage = () => {
  const [formStep, setFormStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: { fullName: '', streetAddress: '', city: '', state: '', zipCode: '', phoneNumber: '' },
      payment: { paymentMethod: undefined },
      specialInstructions: '',
      termsAccepted: false,
    },
  });

  console.log('CheckoutPage loaded, current step:', formStep);

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log('Checkout form submitted:', values);
    setShowSuccessAlert(true);
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your order. You will be redirected to order history.",
    });
    // In a real app, clear cart, save order, etc.
    setTimeout(() => {
      navigate('/orders'); // Redirect to order history page
    }, 3000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/cart">Cart</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

        {showSuccessAlert && (
          <Alert variant="default" className="mb-6 bg-green-100 border-green-500 text-green-700"> {/* "success" is not a default variant */}
            <AlertTitle className="font-bold">Order Placed!</AlertTitle>
            <AlertDescription>
              Your order has been placed successfully. We're preparing your food! You'll be redirected to your order history shortly.
            </AlertDescription>
          </Alert>
        )}

        {!showSuccessAlert && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Fields Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Delivery Address Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                    <CardDescription>Enter your shipping information.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField control={form.control} name="address.fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name="address.streetAddress" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="address.city" render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="address.state" render={({ field }) => (
                        <FormItem>
                            <FormLabel>State / Province</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger></FormControl>
                                <SelectContent>
                                <SelectItem value="NY">New York</SelectItem>
                                <SelectItem value="CA">California</SelectItem>
                                <SelectItem value="TX">Texas</SelectItem>
                                {/* Add more states */}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="address.zipCode" render={({ field }) => (
                        <FormItem>
                            <FormLabel>ZIP / Postal Code</FormLabel>
                            <FormControl><Input placeholder="12345" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="address.phoneNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>

                {/* Payment Method Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose how you'd like to pay.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField control={form.control} name="payment.paymentMethod" render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="creditCard" /></FormControl>
                                <FormLabel className="font-normal">Credit / Debit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="paypal" /></FormControl>
                                <FormLabel className="font-normal">PayPal</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="cod" /></FormControl>
                                <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    {form.watch("payment.paymentMethod") === "creditCard" && (
                        <div className="space-y-4 mt-4">
                            <FormField control={form.control} name="payment.cardNumber" render={({ field }) => (
                                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="payment.expiryDate" render={({ field }) => (
                                    <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="payment.cvv" render={({ field }) => (
                                    <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        </div>
                    )}
                  </CardContent>
                </Card>

                {/* Special Instructions */}
                 <Card>
                    <CardHeader>
                        <CardTitle>Special Instructions</CardTitle>
                        <CardDescription>Any specific requests for your order?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField control={form.control} name="specialInstructions" render={({ field }) => (
                            <FormItem>
                                <FormControl><Textarea placeholder="e.g., No onions, extra spicy, call upon arrival." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                 </Card>

                {/* Terms and Conditions */}
                <FormField control={form.control} name="termsAccepted" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>I accept the <Link to="/terms" className="text-orange-600 hover:underline">terms and conditions</Link>.</FormLabel>
                        <FormMessage />
                    </div>
                    </FormItem>
                )} />
              </div>

              {/* Order Summary Section */}
              <aside className="lg:col-span-1">
                <Card className="sticky top-24 p-6 shadow-lg"> {/* Sticky summary */}
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    {mockOrderSummary.items.map(item => (
                      <div key={item.name} className="flex justify-between text-sm text-gray-600">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator className="my-3" />
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>${mockOrderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Fee</span>
                      <span>${mockOrderSummary.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Taxes</span>
                      <span>${mockOrderSummary.taxes.toFixed(2)}</span>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${mockOrderSummary.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <Button type="submit" className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-lg py-3">
                    Place Order
                  </Button>
                </Card>
              </aside>
            </form>
          </Form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;