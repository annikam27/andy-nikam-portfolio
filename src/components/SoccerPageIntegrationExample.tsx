/**
 * SOCCER PAGE CAROUSEL INTEGRATION EXAMPLE
 *
 * Shows how to add the image carousel to the Soccer.tsx page
 * Copy this pattern into your Soccer.tsx file
 */

import { IMAGE_PATHS } from '@/lib/image-paths';
import { Section } from '@/components/Section';
import SoccerImageCarousel from '@/components/SoccerImageCarousel';

// ============================================================================
// EXAMPLE: How to Add Carousel to Soccer.tsx
// ============================================================================

/**
 * Add this to your Soccer.tsx page between the Achievements section
 * and the PM Parallels section
 */
export const SoccerCarouselExample = () => {
  // Define carousel images array
  const carouselImages = [
    {
      id: 'match-1',
      alt: 'Player defending against attacker',
      src: IMAGE_PATHS.soccer.match1,
      description: 'One-on-one defensive play',
    },
    {
      id: 'match-2',
      alt: 'Two players competing for the ball',
      src: IMAGE_PATHS.soccer.match2,
      description: 'Midfield battle and control',
    },
    {
      id: 'team-photo',
      alt: 'Full soccer team photo',
      src: IMAGE_PATHS.soccer.teamPhoto,
      description: 'Team squad photo 2024',
    },
    {
      id: 'match-3',
      alt: 'Multiple players in action',
      src: IMAGE_PATHS.soccer.match3,
      description: 'Dynamic game action',
    },
    {
      id: 'match-4',
      alt: 'Player number 9 with the ball',
      src: IMAGE_PATHS.soccer.match4,
      description: 'Ball control and dribbling',
    },
  ];

  return (
    <Section background="subtle">
      <SoccerImageCarousel
        title="Match Highlights"
        subtitle="Action shots from recent games and memorable team moments"
        images={carouselImages}
      />
    </Section>
  );
};

// ============================================================================
// CODE TO ADD TO Soccer.tsx
// ============================================================================

/**
 * 1. Add this import at the top of Soccer.tsx:
 *
 * import { IMAGE_PATHS } from '@/lib/image-paths';
 * import SoccerImageCarousel from '@/components/SoccerImageCarousel';
 *
 *
 * 2. Add this code after the Achievements section (around line 110):
 *
 *   {/* Match Highlights Carousel */}
 *   <Section background="subtle">
 *     <SoccerImageCarousel
 *       title="Match Highlights"
 *       subtitle="Action shots from recent games and memorable team moments"
 *       images={[
 *         {
 *           id: 'match-1',
 *           alt: 'Player defending against attacker',
 *           src: IMAGE_PATHS.soccer.match1,
 *           description: 'One-on-one defensive play',
 *         },
 *         {
 *           id: 'match-2',
 *           alt: 'Two players competing for the ball',
 *           src: IMAGE_PATHS.soccer.match2,
 *           description: 'Midfield battle and control',
 *         },
 *         {
 *           id: 'team-photo',
 *           alt: 'Full soccer team photo',
 *           src: IMAGE_PATHS.soccer.teamPhoto,
 *           description: 'Team squad photo 2024',
 *         },
 *         {
 *           id: 'match-3',
 *           alt: 'Multiple players in action',
 *           src: IMAGE_PATHS.soccer.match3,
 *           description: 'Dynamic game action',
 *         },
 *         {
 *           id: 'match-4',
 *           alt: 'Player number 9 with the ball',
 *           src: IMAGE_PATHS.soccer.match4,
 *           description: 'Ball control and dribbling',
 *         },
 *       ]}
 *     />
 *   </Section>
 *
 * 3. Done! The carousel will display with scroll controls
 */

// ============================================================================
// CAROUSEL FEATURES
// ============================================================================

/**
 * ✨ Carousel Features:
 *
 * ✓ Infinite loop scrolling
 * ✓ Mouse navigation (arrow buttons)
 * ✓ Touch navigation (swipe on mobile)
 * ✓ Dot indicators (click to jump to slide)
 * ✓ Slide counter (shows current/total)
 * ✓ Smooth animations with Framer Motion
 * ✓ Responsive (hides arrows on mobile, shows on hover desktop)
 * ✓ Lazy loading for performance
 * ✓ Automatic zoom on hover
 * ✓ Overlay gradients for text readability
 *
 * 🎯 Full Screen: aspect-video (16:9 ratio)
 * 🎨 Transitions: 500ms smooth zoom on hover
 * ♿ Accessible: Aria labels on buttons
 * 📱 Mobile: Touch swipe, dots always visible
 */

// ============================================================================
// PLACEMENT IN Soccer.tsx STRUCTURE
// ============================================================================

/**
 * Recommended page structure for Soccer.tsx:
 *
 * <Layout>
 *   {/* Hero Section */}
 *   <section className="relative py-24 md:py-32 dot-pattern">
 *     ... hero content ...
 *   </section>
 *
 *   {/* Stats Section */}
 *   <Section background="subtle">
 *     ... stats cards ...
 *   </Section>
 *
 *   {/* Achievements Section */}
 *   <Section>
 *     <SectionHeader title="Highlights" ... />
 *     ... achievement cards ...
 *   </Section>
 *
 *   {/* ← ADD CAROUSEL HERE ← */}
 *   <Section background="subtle">
 *     <SoccerImageCarousel ... />
 *   </Section>
 *
 *   {/* Soccer ↔ Product Management */}
 *   <Section background="subtle">
 *     ... PM parallels ...
 *   </Section>
 *
 *   {/* Current Team */}
 *   <Section>
 *     ... team content ...
 *   </Section>
 * </Layout>
 */

// ============================================================================
// IMAGE REQUIREMENTS
// ============================================================================

/**
 * Image Requirements:
 *
 * Format: JPG (for photos with people)
 * Aspect Ratio: 16:9 (landscape)
 * Max Size: 200KB per image
 * Quality: 85% JPG compression
 *
 * File Names:
 * - soccer-match-1.jpg
 * - soccer-match-2.jpg
 * - soccer-team-photo.jpg
 * - soccer-match-3.jpg
 * - soccer-match-4.jpg
 *
 * Location:
 * - public/images/soccer/soccer-*.jpg
 */

// ============================================================================
// TESTING CHECKLIST
// ============================================================================

/**
 * Test the carousel:
 *
 * Desktop (1280px):
 *   □ Left arrow visible on hover
 *   □ Right arrow visible on hover
 *   □ Click arrow navigates to next/previous
 *   □ Dots visible below carousel
 *   □ Click dot navigates to specific slide
 *   □ Image zooms on hover
 *   □ Slide counter shows (e.g., "2 / 5")
 *
 * Tablet (768px):
 *   □ Arrows still work
 *   □ Carousel responsive to width
 *   □ Touch swipe works
 *   □ Dots responsive
 *
 * Mobile (375px):
 *   □ Arrows hidden (but scroll still works)
 *   □ Touch swipe works
 *   □ Dots visible and clickable
 *   □ Full width with padding
 *   □ Portrait orientation works
 *
 * Dark Mode:
 *   □ Carousel visible
 *   □ Text readable
 *   □ Buttons visible
 *   □ No contrast issues
 *
 * Accessibility:
 *   □ Arrow buttons have aria-labels
 *   □ Dot buttons have aria-labels
 *   □ Images have alt text
 *   □ Keyboard navigation works (Tab key)
 */

// ============================================================================
// CUSTOMIZATION EXAMPLES
// ============================================================================

/**
 * 1. AUTO-SCROLL CAROUSEL
 *
 * Install: npm install embla-carousel-autoplay
 *
 * Then update SoccerImageCarousel.tsx:
 *
 * import Autoplay from 'embla-carousel-autoplay';
 *
 * const [emblaRef, emblaApi] = useEmblaCarousel(
 *   { loop: true, align: 'center' },
 *   [Autoplay({ delay: 5000 })]
 * );
 *
 *
 * 2. DIFFERENT ASPECT RATIO
 *
 * Change in SoccerImageCarousel.tsx:
 *
 * // From:
 * <div className="relative w-full aspect-video overflow-hidden">
 *
 * // To:
 * <div className="relative w-full aspect-square overflow-hidden">
 * // or
 * <div className="relative w-full aspect-[3/2] overflow-hidden">
 *
 *
 * 3. HIDE DOT INDICATORS
 *
 * Remove this section from SoccerImageCarousel.tsx:
 *
 * {/* Dot Indicators */}
 * <div className="flex justify-center gap-2 mt-6">
 *   {images.map((_, index) => (
 *     ...
 *   ))}
 * </div>
 *
 *
 * 4. SHOW IMAGE DESCRIPTIONS AS OVERLAY
 *
 * Already implemented! The description appears at bottom.
 * Just pass description prop:
 *
 * {
 *   id: 'match-1',
 *   alt: 'Player defending',
 *   src: IMAGE_PATHS.soccer.match1,
 *   description: 'One-on-one play' // ← Shows on image
 * }
 */

export default SoccerCarouselExample;
