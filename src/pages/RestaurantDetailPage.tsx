import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import DishCard from '@/components/DishCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Clock, MapPin, Phone, Info, Utensils, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


// Mock data - in a real app, this would come from an API
const mockRestaurantData = {
  '1': {
    name: 'Pizza Heaven',
    imageUrl: 'https://source.unsplash.com/random/1200x500?pizza,restaurant-interior',
    logoUrl: 'https://source.unsplash.com/random/100x100?pizza-logo',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.5,
    reviewsCount: 120,
    deliveryTime: '25-35 min',
    address: '123 Pizza St, Food City',
    phone: '555-123-4567',
    openingHours: '11:00 AM - 10:00 PM',
    description: 'Serving the best authentic Italian pizzas in town. Fresh ingredients, traditional recipes.',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 12.99, imageUrl: 'https://source.unsplash.com/random/300x200?margherita-pizza' },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni', price: 14.99, imageUrl: 'https://source.unsplash.com/random/300x200?pepperoni-pizza' },
      { id: 'm3', name: 'Garlic Bread', description: 'With cheese and herbs', price: 5.99, imageUrl: 'https://source.unsplash.com/random/300x200?garlic-bread' },
      { id: 'm4', name: 'Coke', description: 'Chilled soft drink', price: 2.50, imageUrl: 'https://source.unsplash.com/random/300x200?coke-can' },
    ],
    userReviews: [
        { id: 'r1', user: 'Alice', rating: 5, comment: 'Best pizza ever!', date: '2024-07-15' },
        { id: 'r2', user: 'Bob', rating: 4, comment: 'Good, but a bit pricey.', date: '2024-07-10' },
    ]
  },
  // Add more restaurants if needed for testing other IDs
};

type DishType = { id: string | number; name: string; description?: string; price: number; imageUrl?: string; };
type ReviewType = { id: string; user: string; rating: number; comment: string; date: string;};
type RestaurantType = {
    name: string; imageUrl: string; logoUrl: string; cuisine: string[]; rating: number; reviewsCount: number; deliveryTime: string;
    address: string; phone: string; openingHours: string; description: string; menu: DishType[]; userReviews: ReviewType[];
};


const RestaurantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<DishType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('RestaurantDetailPage loaded for ID:', id);
    if (id && mockRestaurantData[id as keyof typeof mockRestaurantData]) {
      setRestaurant(mockRestaurantData[id as keyof typeof mockRestaurantData]);
    } else {
      // Handle restaurant not found, e.g., redirect or show error
      console.error('Restaurant not found for ID:', id);
    }
  }, [id]);

  const handleAddToCart = (dishId: string | number) => {
    const dish = restaurant?.menu.find(d => d.id === dishId);
    console.log('Adding to cart:', dish?.name);
    toast({
        title: "Item Added to Cart!",
        description: `${dish?.name} has been successfully added to your cart.`,
        variant: "default", // "success" is not a default variant for shadcn toast
    });
  };

  const handleCustomizeDish = (dishId: string | number) => {
    const dish = restaurant?.menu.find(d => d.id === dishId);
    setSelectedDish(dish || null);
    setIsDialogOpen(true);
    console.log('Customizing dish:', dish?.name);
  };

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationMenu />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <p className="text-xl text-gray-600">Loading restaurant details or restaurant not found...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-white py-3 border-b">
            <div className="container mx-auto px-4">
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    {/* Potentially link to a restaurants list page if exists */}
                    <BreadcrumbLink asChild><Link to="/">Restaurants</Link></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>

        {/* Restaurant Header Image */}
        <section className="relative h-64 md:h-96 w-full">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </section>

        {/* Restaurant Info Section */}
        <section className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-10">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md">
                    <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
                    <AvatarFallback>{restaurant.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{restaurant.name}</h1>
                    <p className="text-gray-600 mt-1">{restaurant.cuisine.join(', ')}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor"/> {restaurant.rating} ({restaurant.reviewsCount} reviews)
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1"/> {restaurant.deliveryTime}
                        </div>
                    </div>
                </div>
                <Button variant="outline" className="mt-4 md:mt-0">Order Now</Button> {/* Example Action */}
            </div>
        </section>

        {/* Tabs for Menu, Reviews, Info */}
        <section className="container mx-auto px-4 py-8">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="menu" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"><Utensils className="h-4 w-4 mr-2 inline-block"/>Menu</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"><MessageSquare className="h-4 w-4 mr-2 inline-block"/>Reviews</TabsTrigger>
              <TabsTrigger value="info" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"><Info className="h-4 w-4 mr-2 inline-block"/>Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="menu" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Full Menu</h2>
              <ScrollArea className="h-[600px] pr-4"> {/* Adjust height as needed */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurant.menu.map(dish => (
                    <DishCard
                      key={dish.id}
                      {...dish}
                      onAddToCart={handleAddToCart}
                      onCustomize={handleCustomizeDish}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Customer Reviews</h2>
              {restaurant.userReviews.length > 0 ? (
                <div className="space-y-4">
                    {restaurant.userReviews.map(review => (
                        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-center mb-2">
                                <Avatar className="h-10 w-10 mr-3">
                                    <AvatarFallback>{review.user.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-gray-800">{review.user}</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                                <span className="ml-auto text-xs text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet for this restaurant.</p>
              )}
            </TabsContent>

            <TabsContent value="info" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Restaurant Information</h2>
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <p className="text-gray-700"><strong className="font-medium">Description:</strong> {restaurant.description}</p>
                <p className="text-gray-700"><strong className="font-medium"><MapPin className="inline h-4 w-4 mr-1"/>Address:</strong> {restaurant.address}</p>
                <p className="text-gray-700"><strong className="font-medium"><Phone className="inline h-4 w-4 mr-1"/>Phone:</strong> {restaurant.phone}</p>
                <p className="text-gray-700"><strong className="font-medium"><Clock className="inline h-4 w-4 mr-1"/>Hours:</strong> {restaurant.openingHours}</p>
                <div>
                    <strong className="font-medium">Cuisines:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {restaurant.cuisine.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
                    </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Dish Customization Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Customize {selectedDish?.name}</DialogTitle>
              <DialogDescription>
                Make changes to your selection here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {/* Placeholder for customization options */}
              <p>Customization options for {selectedDish?.name} would go here (e.g., size, toppings, quantity).</p>
              <p className="mt-2">Price: ${selectedDish?.price.toFixed(2)}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => { 
                  if(selectedDish) handleAddToCart(selectedDish.id);
                  setIsDialogOpen(false); 
                }}>Save and Add to Cart</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;