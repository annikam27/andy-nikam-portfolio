# Soccer Page Image Carousel Setup

Complete guide for integrating soccer images into a scrollable carousel on the Soccer page.

---

## 📦 What's Been Created

### Component
- ✅ `src/components/SoccerImageCarousel.tsx` - Fully functional carousel component
  - Uses `embla-carousel-react` (already installed)
  - Supports infinite loop scrolling
  - Arrow button navigation
  - Dot indicator navigation
  - Framer Motion animations
  - Responsive design

---

## 🎯 Soccer Images You Provided

5 action photos to display in carousel:
1. Two players defending/dribbling (maroon vs blue)
2. Two players dribbling (light gray vs blue)
3. Team photo - full squad in red
4. Multiple players in action (red/white)
5. Two players (red #9 vs pink/yellow)

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Add Images to Directory

```bash
# Images will go here (you provided them - just need to copy)
# Assuming you have them in a folder
cp ~/path/to/soccer-images/* public/images/soccer/

# Or add them individually with proper names:
# public/images/soccer/soccer-match-1.jpg
# public/images/soccer/soccer-match-2.jpg
# public/images/soccer/soccer-team-photo.jpg
# public/images/soccer/soccer-match-3.jpg
# public/images/soccer/soccer-match-4.jpg
```

### Step 2: Update image-paths.ts

```typescript
// Add to src/lib/image-paths.ts in the soccer section:

soccer: {
  hero: '/images/soccer/soccer-hero.png',
  heroDark: '/images/soccer/soccer-hero-dark.png',
  leagueChampions: '/images/soccer/achievement-league-champions.jpg',
  topScorer: '/images/soccer/achievement-top-scorer.jpg',
  mvpAward: '/images/soccer/achievement-mvp-award.jpg',
  // NEW - Carousel images
  match1: '/images/soccer/soccer-match-1.jpg',
  match2: '/images/soccer/soccer-match-2.jpg',
  teamPhoto: '/images/soccer/soccer-team-photo.jpg',
  match3: '/images/soccer/soccer-match-3.jpg',
  match4: '/images/soccer/soccer-match-4.jpg',
},
```

### Step 3: Add Carousel to Soccer.tsx

```typescript
// In src/pages/Soccer.tsx, add this import:
import SoccerImageCarousel from '@/components/SoccerImageCarousel';
import { IMAGE_PATHS } from '@/lib/image-paths';

// Then add this component in the page (suggested: after achievements section):
<Section background="subtle">
  <SoccerImageCarousel
    title="Match Highlights"
    subtitle="Action shots from recent games and team moments"
    images={[
      {
        id: 'match-1',
        alt: 'Player dribbling against defender',
        src: IMAGE_PATHS.soccer.match1,
      },
      {
        id: 'match-2',
        alt: 'Two players competing for the ball',
        src: IMAGE_PATHS.soccer.match2,
      },
      {
        id: 'team-photo',
        alt: 'Full squad team photo',
        src: IMAGE_PATHS.soccer.teamPhoto,
      },
      {
        id: 'match-3',
        alt: 'Multiple players in action',
        src: IMAGE_PATHS.soccer.match3,
      },
      {
        id: 'match-4',
        alt: 'Player with ball number 9',
        src: IMAGE_PATHS.soccer.match4,
      },
    ]}
  />
</Section>
```

---

## 🎨 Updated SoccerImageCarousel Component (With Real Images)

Here's the enhanced version that actually displays your images:

```typescript
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  id: string;
  alt: string;
  src: string;
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
                    {/* Image Container */}
                    <div className="relative w-full aspect-video overflow-hidden bg-muted">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Overlay gradient for text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
                    </div>

                    {/* Image Description/Caption */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                      <p className="text-foreground font-semibold text-lg">
                        {image.description || image.alt}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group-hover:opacity-100 opacity-0 md:opacity-100 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group-hover:opacity-100 opacity-0 md:opacity-100 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border text-sm text-muted-foreground">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-primary w-8'
                  : 'bg-border hover:bg-muted w-2'
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SoccerImageCarousel;
```

---

## 📋 Integration Checklist

### Setup
- [ ] Create `public/images/soccer/` directory (if not exists)
- [ ] Add 5 soccer images with proper names
- [ ] Update `src/lib/image-paths.ts` with new image paths
- [ ] Import carousel component in Soccer.tsx
- [ ] Add carousel to page with image array

### Testing
- [ ] Carousel displays first image on load
- [ ] Click left arrow navigates to previous image
- [ ] Click right arrow navigates to next image
- [ ] Click dots navigates to specific image
- [ ] Infinite loop works (wraps from last to first)
- [ ] Images load with correct aspect ratio
- [ ] Works on mobile (dots visible, arrows hidden by default)
- [ ] Works on tablet
- [ ] Works on desktop (arrows visible on hover)
- [ ] Image counter shows correct count
- [ ] Alt text is descriptive
- [ ] No console errors

### Optimization
- [ ] Images compressed before adding
- [ ] All images under 200KB each
- [ ] Using appropriate format (JPG for photos)
- [ ] Responsive image sizes (optional srcset)

---

## 🎯 Image Naming Convention

For consistency, name your soccer images:
```
soccer-match-1.jpg      (Player 1v1 action)
soccer-match-2.jpg      (Two players competing)
soccer-team-photo.jpg   (Full squad photo)
soccer-match-3.jpg      (Multiple players action)
soccer-match-4.jpg      (Player #9 with ball)
```

---

## 🎨 Customization Options

### Change Carousel Speed
```typescript
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  align: 'center',
  duration: 50, // Add this (default is 25)
});
```

### Change Auto-Scroll Behavior
```typescript
import Autoplay from 'embla-carousel-autoplay';

const [emblaRef, emblaApi] = useEmblaCarousel(
  {
    loop: true,
    align: 'center',
  },
  [Autoplay({ delay: 5000 })] // Auto-scroll every 5 seconds
);
```

### Hide Dots
```typescript
{/* Remove this section to hide dots */}
<div className="flex justify-center gap-2 mt-6">
  {/* ... dots ... */}
</div>
```

### Change Aspect Ratio
```typescript
// In component, change:
<div className="relative w-full aspect-video overflow-hidden">
// To:
<div className="relative w-full aspect-[16/9] overflow-hidden">
// Or:
<div className="relative w-full aspect-square overflow-hidden">
```

---

## 📐 File Size Guidelines

| Image | Format | Max Size | Quality |
|-------|--------|----------|---------|
| Match photos | JPG | 200KB | 85% |
| Team photo | JPG | 250KB | 90% |
| All images | WebP (optional) | 100KB | full |

---

## 🐛 Troubleshooting

### Images Not Showing?
```typescript
// Check 1: Verify paths in image-paths.ts
console.log(IMAGE_PATHS.soccer.match1);

// Check 2: Verify files exist
// ls public/images/soccer/soccer-match-*.jpg

// Check 3: Check alt text
alt={image.alt}
```

### Carousel Not Scrolling?
```typescript
// Check emblaApi is initialized
console.log(emblaApi); // Should not be null

// Check images array is not empty
console.log(images.length); // Should be > 0
```

### Buttons Not Working?
```typescript
// Check disabled state is updating
console.log(prevBtnDisabled, nextBtnDisabled);

// Verify onClick handlers
onClick={scrollPrev}
onClick={scrollNext}
```

---

## 🎯 Where to Add in Soccer.tsx

**Suggested placement:**

```typescript
<Layout>
  {/* Hero Section */}
  <section>...</section>

  {/* Stats Section */}
  <Section background="subtle">...</Section>

  {/* Achievements Section */}
  <Section>...</Section>

  {/* ← ADD CAROUSEL HERE */}
  <Section background="subtle">
    <SoccerImageCarousel ... />
  </Section>

  {/* PM Parallels Section */}
  <Section background="subtle">...</Section>

  {/* Current Team Section */}
  <Section>...</Section>
</Layout>
```

---

## 📚 Dependencies Already Installed

✅ `embla-carousel-react` - Carousel library
✅ `framer-motion` - Animations
✅ `lucide-react` - Icons (ChevronLeft, ChevronRight)

No additional packages needed!

---

## 🚀 Next Steps

1. **Add images**: Copy 5 soccer images to `public/images/soccer/`
2. **Update paths**: Add 5 new paths to `image-paths.ts`
3. **Integrate**: Add carousel component to Soccer.tsx
4. **Test**: Verify carousel works on mobile/tablet/desktop
5. **Optimize**: Compress images and check file sizes
6. **Deploy**: Push updated files

---

## 💡 Pro Tips

✨ Use JPG for action photos (better compression)
📦 Keep images under 200KB each
🎨 Use consistent aspect ratio (16:9 works well)
♿ Always include descriptive alt text
⚡ Use `loading="lazy"` for performance
🎯 Test carousel navigation on all devices
📊 Monitor image load times in DevTools

---

**Ready to add your soccer images to the carousel?** Start with Step 1! 🎯
