import React from 'react';
import { cn } from '@/lib/utils'; // For utility class merging
import { Badge } from '@/components/ui/badge'; // Use shadcn Badge for base styling

interface CuisineFilterTagProps {
  cuisine: string;
  isActive?: boolean;
  onClick: (cuisine: string) => void;
  className?: string;
}

const CuisineFilterTag: React.FC<CuisineFilterTagProps> = ({ cuisine, isActive, onClick, className }) => {
  console.log("Rendering CuisineFilterTag:", cuisine, "isActive:", isActive);
  return (
    <Badge
      variant={isActive ? 'default' : 'outline'}
      onClick={() => onClick(cuisine)}
      className={cn(
        "cursor-pointer transition-all hover:bg-orange-100 dark:hover:bg-orange-800 py-1.5 px-3 text-sm",
        isActive ? "bg-orange-500 text-white hover:bg-orange-600" : "border-orange-300 text-orange-700",
        className
      )}
    >
      {cuisine}
    </Badge>
  );
};

export default CuisineFilterTag;