import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlusCircle } from 'lucide-react';

interface DishCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (dishId: string | number) => void;
  onCustomize?: (dishId: string | number) => void; // Optional: for opening a customization dialog
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  onCustomize,
}) => {
  console.log("Rendering DishCard:", name);

  const handleAction = () => {
    if (onCustomize) {
      onCustomize(id);
    } else {
      onAddToCart(id);
    }
  };

  return (
    <Card className="w-full flex flex-col sm:flex-row overflow-hidden transition-shadow duration-300 hover:shadow-md">
      {imageUrl && (
        <div className="sm:w-1/3 flex-shrink-0">
          <AspectRatio ratio={4/3} className="sm:h-full">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
            />
          </AspectRatio>
        </div>
      )}
      <div className="flex-1 flex flex-col justify-between">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base font-semibold line-clamp-1">{name}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-2 pt-0">
          {description && <p className="text-xs text-gray-500 line-clamp-2">{description}</p>}
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-2 flex justify-between items-center">
          <span className="text-sm font-semibold text-orange-600">${price.toFixed(2)}</span>
          <Button size="sm" variant="outline" onClick={handleAction} className="text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700">
            <PlusCircle className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{onCustomize ? 'Customize' : 'Add'}</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default DishCard;