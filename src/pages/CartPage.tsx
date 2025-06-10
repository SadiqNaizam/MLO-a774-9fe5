import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import DishCard from '@/components/DishCard'; // Using as a display, can be a simplified version
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
}

const initialCartItems: CartItem[] = [
  { id: 'm1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/150x100?margherita-pizza', description: 'Classic cheese and tomato' },
  { id: 'm3', name: 'Garlic Bread', price: 5.99, quantity: 2, imageUrl: 'https://source.unsplash.com/random/150x100?garlic-bread', description: 'With cheese and herbs' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('CartPage loaded');

  const updateQuantity = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string | number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({ title: "Item Removed", description: "The item has been removed from your cart."});
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example tax rate
  const total = subtotal + deliveryFee + taxes;

  const handleApplyPromo = () => {
    if(promoCode.toUpperCase() === "SAVE10"){
        toast({ title: "Promo Applied!", description: "10% discount applied to your order."});
        // Actual discount logic would go here
    } else {
        toast({ title: "Invalid Promo Code", description: "The promo code entered is not valid.", variant: "destructive"});
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Your Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
              <Button asChild><Link to="/">Continue Shopping</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <section className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow-sm hover:shadow-md transition-shadow">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-full sm:w-24 h-24 sm:h-auto object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"/>
                  )}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-md font-medium text-orange-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 my-3 sm:my-0 sm:mx-4">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={item.quantity} readOnly className="w-12 text-center appearance-none" />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-lg font-semibold w-24 text-center sm:text-right text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button variant="ghost" size="icon" className="ml-2 text-red-500 hover:text-red-700" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </section>

            {/* Order Summary Section */}
            <aside className="lg:col-span-1">
              <Card className="p-6 shadow-lg">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes (8%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Promotional Code</label>
                    <div className="flex space-x-2">
                      <Input 
                        type="text" 
                        id="promoCode" 
                        placeholder="Enter promo code" 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                        className="flex-grow"
                      />
                      <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3" onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;