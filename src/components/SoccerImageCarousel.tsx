import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  id: string;
  alt: string;
  description?: string;
}

interface SoccerImageCarouselProps {
  images: CarouselImage[];
  title?: string;
  subtitle?: string;
}

export const SoccerImageCarousel = ({
  images,
  title,
  subtitle,
}: SoccerImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedIndex());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Header */}
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative group">
        {/* Embla Carousel */}
        <div className="overflow-hidden rounded-2xl shadow-card bg-card border border-border">
          <div ref={emblaRef}>
            <div className="flex">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="flex-[0_0_100%] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full"
                  >
                    {/* Placeholder for image - you'll add actual images */}
                    <div className="relative w-full aspect-video bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                      {/* Image will be added here */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-muted-foreground font-medium">
                            {image.alt}
                          </p>
                          {image.description && (
                            <p className="text-sm text-muted-foreground/75 mt-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Image Description Overlay */}
                    {image.description && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent p-6">
                        <p className="text-white font-medium">{image.description}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group-hover:opacity-100 opacity-0 md:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group-hover:opacity-100 opacity-0 md:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-border hover:bg-muted'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SoccerImageCarousel;
