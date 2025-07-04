import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  image: string;
  title: string;
//   description: string;
}

interface CarouselProps {
  items: CarouselItem[];
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ items, interval = 3000 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToItem = (index: number) => {
    const container = containerRef.current;
    const item = itemRefs.current[index];
    if (container && item) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const offset = itemRect.left - containerRect.left - (container.offsetWidth / 2 - item.offsetWidth / 2);
  
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  };
  

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    scrollToItem(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    scrollToItem(prevIndex);
  };

  // Autoscroll
  useEffect(() => {
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  return (
    <div className="relative w-full">
      {/* Left button */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow md:inline hidden"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scrollable carousel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-4 scrollbar-hide"
      >
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className="w-64 flex-shrink-0 snap-center rounded-xl overflow-hidden shadow bg-white mx-2"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-3">
              <h3 className="text-base font-semibold">{item.title}</h3>
              {/* <p className="text-xs text-gray-500">{item.description}</p> */}
            </div>
          </div>
        ))}
      </div>

      {/* Right button */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow md:inline hidden"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Carousel;
