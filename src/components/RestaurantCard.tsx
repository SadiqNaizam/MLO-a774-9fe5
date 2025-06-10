import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisine: string[];
  rating: number; // e.g., 4.5
  deliveryTime: string; // e.g., "20-30 min"
  onClick?: (id: string | number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  onClick
}) => {
  console.log("Rendering RestaurantCard:", name);

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer" onClick={() => onClick?.(id)}>
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg font-semibold line-clamp-1">{name}</CardTitle>
        <div className="text-xs text-gray-500 line-clamp-1">
          {cuisine.join(', ')}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-gray-700">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-500 mr-1" />
          <span>{deliveryTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;