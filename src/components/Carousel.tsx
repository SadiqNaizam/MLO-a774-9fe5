import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CarouselSlide {
  id: string | number;
  content?: React.ReactNode; // For complex content
  imageUrl?: string;
  altText?: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, options, autoplayDelay = 4000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, ...options },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  console.log("Rendering Carousel with", slides.length, "slides.");

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0" key={slide.id}>
              <Card className="m-1 shadow-none border-none"> {/* Adjust margin/padding as needed */}
                <CardContent className="flex aspect-[16/7] items-center justify-center p-0 relative"> {/* Adjust aspect ratio */}
                  {slide.imageUrl ? (
                    <>
                      <img
                        src={slide.imageUrl}
                        alt={slide.altText || slide.title || `Slide ${slide.id}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                      />
                      {(slide.title || slide.description) && (
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                          {slide.title && <h3 className="text-white text-lg font-semibold">{slide.title}</h3>}
                          {slide.description && <p className="text-gray-200 text-sm mt-1">{slide.description}</p>}
                        </div>
                      )}
                    </>
                  ) : (
                    slide.content || <span className="text-xl font-semibold">Slide {slide.id}</span>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
    </div>
  );
};

export default Carousel;