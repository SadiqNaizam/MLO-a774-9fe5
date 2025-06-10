import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import CuisineFilterTag from '@/components/CuisineFilterTag';
import RestaurantCard from '@/components/RestaurantCard';
import { Carousel as ShadcnCarousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Renamed to avoid conflict with custom Carousel
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const initialRestaurants = [
  { id: '1', name: 'Pizza Heaven', imageUrl: 'https://source.unsplash.com/random/400x300?pizza', cuisine: ['Italian', 'Pizza'], rating: 4.5, deliveryTime: '25-35 min' },
  { id: '2', name: 'Burger Palace', imageUrl: 'https://source.unsplash.com/random/400x300?burger', cuisine: ['American', 'Burgers'], rating: 4.2, deliveryTime: '20-30 min' },
  { id: '3', name: 'Sushi World', imageUrl: 'https://source.unsplash.com/random/400x300?sushi', cuisine: ['Japanese', 'Sushi'], rating: 4.8, deliveryTime: '30-40 min' },
  { id: '4', name: 'Taco Town', imageUrl: 'https://source.unsplash.com/random/400x300?taco', cuisine: ['Mexican'], rating: 4.3, deliveryTime: '20-30 min' },
  { id: '5', name: 'Curry House', imageUrl: 'https://source.unsplash.com/random/400x300?curry', cuisine: ['Indian'], rating: 4.6, deliveryTime: '35-45 min' },
  { id: '6', name: 'Pasta Place', imageUrl: 'https://source.unsplash.com/random/400x300?pasta', cuisine: ['Italian', 'Pasta'], rating: 4.4, deliveryTime: '25-35 min' },
];

const carouselSlides = [
  { id: 'promo1', imageUrl: 'https://source.unsplash.com/random/1200x400?food-banner,discount', title: 'Get 20% Off Your First Order!', description: 'Use code NEWUSER20 at checkout.' },
  { id: 'promo2', imageUrl: 'https://source.unsplash.com/random/1200x400?food-delivery,fast', title: 'Lightning Fast Delivery', description: 'Your favorite meals, delivered quicker than ever.' },
  { id: 'promo3', imageUrl: 'https://source.unsplash.com/random/1200x400?healthy-food,salad', title: 'Healthy Options Available', description: 'Discover fresh and nutritious meals.' },
];

const cuisineTypes = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Indian', 'Pizza', 'Burgers'];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCuisine, setActiveCuisine] = useState('All');
  const navigate = useNavigate();

  console.log('HomePage loaded');

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurant/${id}`);
  };

  const filteredRestaurants = initialRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCuisine === 'All' || restaurant.cuisine.includes(activeCuisine))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Carousel Section */}
        <section className="mb-12">
          <ShadcnCarousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {carouselSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative h-[250px] md:h-[400px] w-full">
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex flex-col justify-end p-6">
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{slide.title}</h2>
                      <p className="text-sm md:text-lg text-gray-200">{slide.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </ShadcnCarousel>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-8 p-6 bg-white rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-grow w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search for restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base py-3"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-base py-3">Search</Button>
          </div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter by Cuisine</h3>
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex space-x-2">
              {cuisineTypes.map(cuisine => (
                <CuisineFilterTag
                  key={cuisine}
                  cuisine={cuisine}
                  isActive={activeCuisine === cuisine}
                  onClick={() => setActiveCuisine(cuisine)}
                />
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* Restaurant Listing Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {activeCuisine === 'All' ? 'Popular Restaurants' : `${activeCuisine} Restaurants`}
          </h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No restaurants found matching your criteria. Try a different search or filter!</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;