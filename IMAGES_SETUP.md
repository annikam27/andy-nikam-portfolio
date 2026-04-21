# Image Asset Setup Guide

Complete setup for managing images in the Andy Nikam portfolio website.

## 📁 Directory Structure Created

```
project/
├── public/images/              # All image assets
│   ├── hero/                   # Landing page images (3 files)
│   ├── projects/               # Project previews & mockups (9 files)
│   ├── icons/                  # Custom SVG icons (9 files)
│   ├── illustrations/          # Branded illustrations (4 files)
│   ├── backgrounds/            # Background patterns (4 files)
│   ├── diagrams/               # Flow & process diagrams (4 files)
│   ├── testimonials/           # Avatar images (4 files)
│   ├── portfolio/              # Portfolio page assets (4 files)
│   ├── README.md               # Asset organization guide
│   └── ASSETS.md               # Complete asset manifest
│
├── src/
│   ├── lib/
│   │   └── image-paths.ts      # Image path constants (type-safe)
│   └── components/
│       └── ImageExample.tsx    # Implementation examples (delete after reviewing)
│
└── IMAGES_SETUP.md             # This file
```

## 🚀 Quick Start

### 1. Understand the Structure
```bash
# View the image organization guide
cat public/images/README.md

# View the asset manifest tracking
cat public/images/ASSETS.md
```

### 2. Use Images in Components

#### Option A: Type-Safe Path Constants (Recommended)
```typescript
import { IMAGE_PATHS, ALT_TEXT } from '@/lib/image-paths';

export const MyComponent = () => {
  return (
    <img
      src={IMAGE_PATHS.hero.main}
      alt={ALT_TEXT.hero.main}
      className="w-full h-auto"
    />
  );
};
```

#### Option B: Direct Path
```typescript
<img
  src="/images/hero/hero-main.png"
  alt="Hero section image"
  className="w-full h-auto"
/>
```

### 3. Review Implementation Examples
```bash
# Review the ImageExample.tsx component for 10 different patterns
# Then delete the file
rm src/components/ImageExample.tsx
```

## 📊 Asset Checklist

### Tier 1 Priority (Immediate - Before Launch)
- [ ] `public/images/hero/hero-main.png` - Hero section image
- [ ] `public/images/icons/icon-*.svg` (6x) - Flow diagram icons
- [ ] `public/images/projects/*-preview.png` (3x) - Project card images
- [ ] `public/images/backgrounds/bg-gradient-mesh-blue.svg` - Main background

### Tier 2 Priority (Important - Week 1-2)
- [ ] `public/images/illustrations/illustration-chaos-to-clarity.svg`
- [ ] `public/images/projects/*-flow.svg` (3x)
- [ ] `public/images/projects/*-mockup.png` (3x)

### Tier 3 Priority (Enhancement - Week 2+)
- [ ] Remaining illustrations, diagrams, testimonials
- [ ] Dark mode image variants

## 🛠️ How to Add Images

### Step 1: Prepare the Image
```bash
# Optimize before adding (use TinyPNG, ImageOptim, or Squoosh)
# Naming: kebab-case-descriptor.format
# Example: hero-main.png, icon-analysis-md.svg, flowpay-preview.png
```

### Step 2: Place in Correct Directory
```bash
# Copy to appropriate subdirectory
cp ~/Downloads/my-hero-image.png public/images/hero/hero-main.png
```

### Step 3: Update Type-Safe Paths (if new category)
```typescript
// In src/lib/image-paths.ts, add to IMAGE_PATHS object:
export const IMAGE_PATHS = {
  // ... existing paths ...
  newCategory: {
    newImage: '/images/new-category/new-image.png',
  },
};
```

### Step 4: Update Asset Manifest
```bash
# Edit public/images/ASSETS.md
# Change status from 🔴 to 🟢 (Ready)
# Add file size
# Update the summary table at bottom
```

### Step 5: Use in Component
```typescript
import { IMAGE_PATHS, ALT_TEXT } from '@/lib/image-paths';

<img
  src={IMAGE_PATHS.newCategory.newImage}
  alt="Descriptive alt text"
  className="w-full h-auto"
/>
```

### Step 6: Mark as Implemented
```bash
# Update public/images/ASSETS.md
# Change status from 🟢 to 🔵 (Implemented)
# Note which component uses it
```

## 📋 File Size Guidelines

Keep your images lean for fast loading:

| Type | Max Size | Format |
|------|----------|--------|
| Photos/Screenshots | 200KB | WebP (.webp) or JPG (.jpg) |
| Illustrations | 100KB | SVG (.svg) preferred, PNG (.png) fallback |
| Icons | 20KB | SVG (.svg) |
| Backgrounds | 150KB | SVG (.svg) or WebP (.webp) |
| Diagrams | 100KB | SVG (.svg) |
| Avatars | 50KB | JPG (.jpg) or WebP (.webp) |

## 🎨 Optimization Tools

### Online Tools (No Installation)
- **TinyPNG** - https://tinypng.com (PNG/JPG compression)
- **Squoosh** - https://squoosh.app (Interactive compression)
- **CloudConvert** - Convert to WebP format

### CLI Tools (Recommended)
```bash
# macOS - Install ImageOptim
brew install imageoptim

# Optimize SVGs
npm install -g svgo
svgo --optimize public/images/icons/icon-*.svg

# Batch convert to WebP
brew install webp
cwebp -q 80 input.jpg -o output.webp
```

### Figma/Designer
- Export icons at 2x resolution for retina displays
- Export SVGs with optimized settings (remove metadata)
- Use "Export for web" settings

## 🔧 Component Migration Guide

### Updating ProjectCard Component
```typescript
import { IMAGE_PATHS } from '@/lib/image-paths';

// Replace:
// image?: string;

// With:
export interface ProjectCardProps {
  // ... existing props ...
  imageProject?: keyof typeof IMAGE_PATHS.projects;
}

// Usage:
<ProjectCard
  title="AI Financial Fitness Coach"
  imageProject="financialFitnessCoach"
  // ... other props
/>
```

### Updating InteractiveFlowDiagram Component
```typescript
import { IMAGE_PATHS } from '@/lib/image-paths';

// Instead of emoji icons:
const nodes = [
  { 
    id: 'chaos', 
    icon: IMAGE_PATHS.icons.flowDiagram.problem,
    label: 'Complex Problem' 
  },
  // ... etc
];

// Render:
<img
  src={node.icon}
  alt={node.label}
  className="w-8 h-8"
/>
```

### Updating Hero Section
```typescript
import { IMAGE_PATHS } from '@/lib/image-paths';

<section className="relative min-h-[90vh]">
  <img
    src={IMAGE_PATHS.hero.main}
    alt={ALT_TEXT.hero.main}
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Content overlay */}
</section>
```

## ✅ Testing Checklist

Before launching with images:

- [ ] All required images are present (Tier 1)
- [ ] Images are optimized (under max file size)
- [ ] All images have descriptive alt text
- [ ] Images load on mobile (test on 5G throttle)
- [ ] Images work in dark mode (if applicable)
- [ ] Responsive images display correctly (test 3 breakpoints)
- [ ] SVG icons render crisply at all sizes
- [ ] No console errors about missing images
- [ ] ASSETS.md manifest is up to date

## 🐛 Troubleshooting

### Image Not Showing?
```typescript
// Check these in order:
1. File exists: ls public/images/category/filename
2. Path is correct: IMAGE_PATHS.category.image
3. Alt text present: alt="description"
4. File format supported: .png, .jpg, .svg, .webp
5. Case-sensitive filename matches
```

### SVG Not Rendering?
```bash
# Check SVG is valid XML
xmllint --noout public/images/icons/icon.svg

# Check for issues
svgo --validate public/images/icons/icon.svg
```

### Performance Issues?
```bash
# Check image sizes
du -sh public/images/*/

# Find oversized files
find public/images -size +200k -type f

# Optimize all images
cd public/images && find . -name "*.png" -o -name "*.jpg" | xargs imageoptim
```

## 📚 Reference Files

| File | Purpose |
|------|---------|
| `public/images/README.md` | Asset organization guidelines |
| `public/images/ASSETS.md` | Complete inventory & tracking |
| `src/lib/image-paths.ts` | Type-safe path constants |
| `src/components/ImageExample.tsx` | 10 implementation patterns |

## 🎯 Next Steps

1. **Review** `public/images/README.md` for organization guidelines
2. **Check** `public/images/ASSETS.md` for what's needed
3. **Study** `src/components/ImageExample.tsx` for implementation patterns
4. **Start Adding** Tier 1 assets (hero, icons, project previews)
5. **Delete** `ImageExample.tsx` once you understand the patterns
6. **Update Components** to use new image assets
7. **Test** across mobile and desktop

## 💡 Pro Tips

- Use `loading="lazy"` for images below the fold
- Add `decoding="async"` for non-critical images
- SVGs are perfect for icons (scalable, tiny file size)
- Create 2x versions of icons for retina displays
- Use WebP with JPG fallback for photos
- Group related images in subdirectories for clarity
- Update ASSETS.md as you add images (good practice)

---

**Questions?** Review the examples in `ImageExample.tsx` or check `public/images/README.md` for detailed guidelines.
