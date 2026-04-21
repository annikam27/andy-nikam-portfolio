/**
 * IMAGE IMPLEMENTATION EXAMPLES
 *
 * This file demonstrates best practices for using images throughout the project.
 * Delete this file once you understand the patterns and integrate images into components.
 */

import { IMAGE_PATHS, ALT_TEXT } from '@/lib/image-paths';
import { motion } from 'framer-motion';

// ============================================================================
// EXAMPLE 1: Simple Image Import (for static assets)
// ============================================================================
export const SimpleImageExample = () => {
  return (
    <img
      src={IMAGE_PATHS.hero.main}
      alt={ALT_TEXT.hero.main}
      className="w-full h-auto rounded-lg"
    />
  );
};

// ============================================================================
// EXAMPLE 2: SVG Illustration with Animation
// ============================================================================
export const AnimatedSVGExample = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl"
    >
      <img
        src={IMAGE_PATHS.illustrations.chaosToClarity}
        alt={ALT_TEXT.diagrams.flowHowIWork}
        className="w-full h-auto"
      />
    </motion.div>
  );
};

// ============================================================================
// EXAMPLE 3: Project Card with Image
// ============================================================================
interface ProjectCardImageProps {
  projectType: 'financialFitnessCoach' | 'flowpay' | 'webexChatbot';
  title: string;
}

export const ProjectCardImageExample = ({ projectType, title }: ProjectCardImageProps) => {
  const project = IMAGE_PATHS.projects[projectType];

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all">
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <img
          src={project.preview}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 4: Responsive Image with Picture Element
// ============================================================================
export const ResponsiveImageExample = () => {
  return (
    <picture>
      {/* Small screens */}
      <source
        media="(max-width: 640px)"
        srcSet={`${IMAGE_PATHS.hero.main}?w=640`}
      />
      {/* Medium screens */}
      <source
        media="(max-width: 1024px)"
        srcSet={`${IMAGE_PATHS.hero.main}?w=1024`}
      />
      {/* Large screens */}
      <img
        src={IMAGE_PATHS.hero.main}
        alt={ALT_TEXT.hero.main}
        className="w-full h-auto"
      />
    </picture>
  );
};

// ============================================================================
// EXAMPLE 5: Icon with Fallback
// ============================================================================
interface IconProps {
  type: 'problem' | 'analysis' | 'strategy' | 'build' | 'measure' | 'success';
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export const IconExample = ({ type, label, size = 'md' }: IconProps) => {
  const iconPath = IMAGE_PATHS.icons.flowDiagram[type];
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={iconPath}
        alt={label}
        className={`${sizeClasses[size]} text-foreground`}
      />
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

// ============================================================================
// EXAMPLE 6: Background Image
// ============================================================================
export const BackgroundImageExample = () => {
  return (
    <div
      className="relative w-full h-96 rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url('${IMAGE_PATHS.backgrounds.gradientMesh}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
        <h2 className="text-3xl font-bold text-white p-6">Section Title</h2>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 7: Lazy Loading Images
// ============================================================================
export const LazyLoadImageExample = () => {
  return (
    <img
      src={IMAGE_PATHS.projects.financialFitnessCoach.preview}
      alt="Financial Fitness Coach"
      className="w-full h-auto rounded-lg"
      loading="lazy"
      decoding="async"
    />
  );
};

// ============================================================================
// EXAMPLE 8: Responsive Image with Nextgen Format (WebP)
// ============================================================================
export const ModernImageExample = () => {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${IMAGE_PATHS.hero.main.replace(/\.[^.]+$/, '')}.webp`}
      />
      <img
        src={IMAGE_PATHS.hero.main}
        alt={ALT_TEXT.hero.main}
        className="w-full h-auto"
      />
    </picture>
  );
};

// ============================================================================
// EXAMPLE 9: Avatar with Fallback Color
// ============================================================================
export const AvatarExample = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex-shrink-0">
        <img
          src={IMAGE_PATHS.testimonials.avatars.john}
          alt="John Doe"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-foreground">John Doe</p>
        <p className="text-sm text-muted-foreground">Product Manager</p>
      </div>
    </div>
  );
};

// ============================================================================
// EXAMPLE 10: Image Gallery
// ============================================================================
export const ImageGalleryExample = () => {
  const projects = [
    {
      src: IMAGE_PATHS.projects.financialFitnessCoach.preview,
      alt: 'Financial Fitness Coach',
    },
    {
      src: IMAGE_PATHS.projects.flowpay.preview,
      alt: 'FlowPay Platform',
    },
    {
      src: IMAGE_PATHS.projects.webexChatbot.preview,
      alt: 'WebEx Chatbot',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-shadow"
        >
          <img
            src={project.src}
            alt={project.alt}
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// IMPLEMENTATION CHECKLIST
// ============================================================================
/*
When adding images to a component:

1. ✓ Import IMAGE_PATHS and ALT_TEXT from '@/lib/image-paths'
2. ✓ Use IMAGE_PATHS to reference image URL (type-safe)
3. ✓ Always include alt text from ALT_TEXT or meaningful description
4. ✓ Add loading="lazy" for below-fold images
5. ✓ Add decoding="async" for non-critical images
6. ✓ Implement hover effects and animations (if applicable)
7. ✓ Test on mobile and desktop
8. ✓ Update ASSETS.md manifest with status 🔵 (Implemented)

RESPONSIVE IMAGES:
- Use <picture> element for multiple formats
- Provide srcset for different screen sizes
- Include both WebP and fallback formats

PERFORMANCE:
- Compress images before adding to /public/images
- Use SVG for icons, diagrams, and illustrations
- Use JPG/WebP for photos and mockups
- Max sizes: Photos 200KB, Icons 20KB, Diagrams 100KB

ACCESSIBILITY:
- Always include descriptive alt text
- Never use alt="" for decorative images
- Consider text content in alt descriptions
*/
