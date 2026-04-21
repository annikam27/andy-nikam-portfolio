# Quick Image Reference Card

Keep this open while implementing images. Bookmark it!

---

## 🚀 One-Line Image Usage

### For Developers
```typescript
// Import constants
import { IMAGE_PATHS, ALT_TEXT } from '@/lib/image-paths';

// Use in component
<img src={IMAGE_PATHS.projects.flowpay.preview} alt={ALT_TEXT.hero.main} />
```

### For Direct Paths
```html
<img src="/images/hero/hero-main.png" alt="Hero section" />
```

---

## 📁 Where Does Each Image Go?

| Component | Image File | Directory |
|-----------|-----------|-----------|
| Hero section | `hero-main.png` | `hero/` |
| Project cards | `{project}-preview.png` | `projects/` |
| Flow diagram icons | `icon-*.svg` | `icons/` |
| Hero illustration | `illustration-*.svg` | `illustrations/` |
| Section backgrounds | `bg-*.svg` | `backgrounds/` |
| Process diagrams | `diagram-*.svg` | `diagrams/` |
| Testimonials | `avatar-*.jpg` | `testimonials/` |
| Case studies | `case-study-*.png` | `portfolio/` |

---

## ✏️ File Naming Pattern

```
[type]-[description]-[variant].[extension]

Examples:
✓ hero-main.png
✓ icon-analysis-md.svg
✓ flowpay-preview.png
✓ bg-gradient-mesh-blue.svg
✓ avatar-john.jpg
```

---

## 📊 File Size Limits

| Type | Max | Example |
|------|-----|---------|
| Photos | 200KB | hero-main.png |
| SVG Icons | 20KB | icon-analysis-md.svg |
| Illustrations | 100KB | illustration-chaos.svg |
| Diagrams | 100KB | diagram-flow.svg |
| Avatars | 50KB | avatar-john.jpg |

---

## 🎯 Tier 1 Assets (Do These First)

```
Absolute Must-Have:
□ hero/hero-main.png              (Hero section)
□ icons/icon-problem-md.svg       (Flow diagram)
□ icons/icon-analysis-md.svg      (Flow diagram)
□ icons/icon-strategy-md.svg      (Flow diagram)
□ icons/icon-build-md.svg         (Flow diagram)
□ icons/icon-measure-md.svg       (Flow diagram)
□ icons/icon-success-md.svg       (Flow diagram)
□ projects/financial-*.preview.png (Project card)
□ projects/flowpay-preview.png    (Project card)
□ projects/webex-*.preview.png    (Project card)
□ backgrounds/bg-gradient-mesh-blue.svg (Background)
```

---

## 🔐 Type-Safe Path Examples

```typescript
// Hero
IMAGE_PATHS.hero.main
IMAGE_PATHS.hero.illustration

// Projects
IMAGE_PATHS.projects.financialFitnessCoach.preview
IMAGE_PATHS.projects.flowpay.flow
IMAGE_PATHS.projects.webexChatbot.mockup

// Icons
IMAGE_PATHS.icons.flowDiagram.problem
IMAGE_PATHS.icons.flowDiagram.analysis
IMAGE_PATHS.icons.features.ai

// Illustrations
IMAGE_PATHS.illustrations.chaosToClarity
IMAGE_PATHS.illustrations.dataFlow

// Backgrounds
IMAGE_PATHS.backgrounds.gradientMesh
IMAGE_PATHS.backgrounds.grid

// Testimonials
IMAGE_PATHS.testimonials.avatars.john
IMAGE_PATHS.testimonials.avatars.jane
```

---

## ♿ Alt Text Quick Rules

```
✓ Descriptive and meaningful
✓ Under 125 characters
✓ Include context when needed
✓ Don't start with "Image of" or "Picture of"
✓ For diagrams: "Diagram showing X and Y"
✓ For icons: The concept they represent

Examples:
✓ "AI Financial Fitness Coach interface"
✓ "Arrow pointing right showing strategy flow"
✓ "John Smith, Product Manager testimonial"
```

---

## 📋 Step-by-Step Add New Image

1. **Optimize** image (TinyPNG, ImageOptim, Squoosh)
2. **Name** with pattern: `type-description.ext`
3. **Place** in `/public/images/{category}/`
4. **Check** `src/lib/image-paths.ts` - add path if new
5. **Use** in component: `IMAGE_PATHS.category.name`
6. **Update** `public/images/ASSETS.md` - mark as 🟢→🔵
7. **Test** on mobile + desktop

---

## 🐛 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Image not showing | Check file exists: `ls public/images/category/file` |
| Path error | Verify: `IMAGE_PATHS.category.name` in `image-paths.ts` |
| Slow loading | Compress: check < max size, use WebP |
| Blurry on retina | Create 2x version or use SVG |
| SVG not rendering | Validate XML: `xmllint --noout file.svg` |

---

## 📚 Documentation Files

```
public/images/
├── README.md           ← Detailed guidelines
└── ASSETS.md           ← What's needed + status

src/lib/
└── image-paths.ts      ← All paths (bookmarkmark this!)

Root:
├── IMAGES_SETUP.md     ← Getting started guide
└── IMAGE_ASSET_STRUCTURE.md ← Full reference
```

---

## 🛠️ Useful Commands

```bash
# Check file size
ls -lh public/images/hero/hero-main.png

# Find oversized files
find public/images -size +200k -type f

# Validate SVG
xmllint --noout public/images/icons/icon-*.svg

# Batch optimize PNG (macOS)
imageoptim public/images/**/*.png

# View directory tree
tree public/images -L 2
```

---

## ✅ Pre-Deployment Checklist

```
□ All Tier 1 images created and optimized
□ All images have alt text
□ Image paths in type-safe constants (image-paths.ts)
□ Components updated to use new images
□ Responsive on mobile (test at 640px width)
□ Responsive on desktop (test at 1280px width)
□ Dark mode tested (if applicable)
□ No console errors about missing images
□ ASSETS.md manifest up to date
□ All files compressed under max size
□ Ready for production!
```

---

## 💬 Need Help?

1. Check the 10 examples in `src/components/ImageExample.tsx`
2. Read guidelines in `public/images/README.md`
3. Track progress in `public/images/ASSETS.md`
4. Reference full structure in `IMAGE_ASSET_STRUCTURE.md`

---

**Pro Tip**: Open `image-paths.ts` in IDE with autocomplete for instant suggestions! 🎯
