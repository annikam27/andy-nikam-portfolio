# Image Assets Structure

## Directory Organization

```
images/
├── hero/                  # Hero section images (landing page)
├── projects/             # Project screenshot/preview images
├── portfolio/            # Portfolio page images
├── icons/                # Custom SVG icons & icon sets
├── illustrations/        # Branded illustrations & graphics
├── backgrounds/          # Background patterns & textures
├── diagrams/             # Flow diagrams, process visuals
└── testimonials/         # User testimonials, avatars
```

## Naming Conventions

### File Naming Rules
- **Format**: `kebab-case-descriptor.format`
- **Pattern**: `[category]-[type]-[version].[ext]`
- **Examples**:
  - `ai-financial-coach-mockup-v1.png`
  - `flow-diagram-how-i-work.svg`
  - `icon-analysis-blue.svg`
  - `hero-main-light.png`

### Naming by Directory

#### `/hero`
- `hero-main.{png|jpg}` - Primary hero image
- `hero-main-dark.{png|jpg}` - Dark mode variant
- `hero-illustration.svg` - Hero graphic/illustration

#### `/projects`
- `{project-name}-preview.{png|jpg}` - Project screenshot
- `{project-name}-mockup.png` - Device mockup
- `{project-name}-flow.svg` - Process diagram
- Examples:
  - `financial-fitness-coach-preview.png`
  - `flowpay-mockup.png`
  - `webex-chatbot-flow.svg`

#### `/portfolio`
- Page-specific images for portfolio subsections
- `{page-name}-hero.png`
- `{page-name}-banner.svg`

#### `/icons`
- `icon-{name}-{size}.svg` (size: sm, md, lg)
- `icon-set-{category}.svg` - Grouped icon files
- Examples:
  - `icon-analysis-md.svg`
  - `icon-strategy-md.svg`
  - `icon-set-flow-diagram.svg`

#### `/illustrations`
- `illustration-{concept}-{style}.{png|svg}`
- Examples:
  - `illustration-scale-abstract.svg`
  - `illustration-chaos-to-clarity.png`
  - `illustration-data-flow.svg`

#### `/backgrounds`
- `bg-{type}-{variant}.{png|svg}`
- Examples:
  - `bg-gradient-mesh-blue.svg`
  - `bg-grid-pattern.svg`
  - `bg-noise-texture.png`

#### `/diagrams`
- `diagram-{name}-{type}.svg`
- Examples:
  - `diagram-flow-how-i-work.svg`
  - `diagram-product-ecosystem.svg`
  - `diagram-user-journey.svg`

#### `/testimonials`
- `avatar-{name}.{jpg|png}` - User/client photos
- `testimonial-{name}.png` - Full testimonial cards

## File Formats & Optimization

| Type | Format | Max Size | Quality |
|------|--------|----------|---------|
| Photos/Screenshots | `.webp`, `.jpg` (fallback) | 200KB | 80-85% quality |
| Illustrations | `.svg` (preferred), `.png` | 100KB | Full quality |
| Icons | `.svg` | 20KB | Full quality |
| Backgrounds | `.svg` (patterns), `.webp` (photos) | 150KB | 75% quality |
| Diagrams | `.svg` | 100KB | Full quality |
| Avatars | `.jpg`, `.webp` | 50KB | 85% quality |

## Using Images in Components

### Next.js/React with Vite
```typescript
// Import and use
import heroImage from '@/public/images/hero/hero-main.png';

<img src={heroImage} alt="Hero section" />
```

### Using Relative Paths (Vite)
```typescript
<img src="/images/hero/hero-main.png" alt="Hero section" />
```

### SVG Images
```typescript
import { ReactComponent as FlowDiagram } from '@/public/images/diagrams/diagram-flow.svg';

<FlowDiagram className="w-full h-auto" />
```

### In Tailwind CSS
```css
.hero-section {
  background-image: url('/images/backgrounds/bg-gradient-mesh-blue.svg');
}
```

## Asset Checklist

### Required Assets
- [ ] Hero main image & dark variant
- [ ] Hero illustration/graphic
- [ ] Project preview images (3x)
- [ ] Project flow diagrams (3x)
- [ ] Flow diagram icons (6x for "How I Work")
- [ ] Section divider graphics (3x)
- [ ] Background patterns (2-3x)

### Optional but Recommended
- [ ] Testimonial avatars
- [ ] Tech stack illustrations
- [ ] Case study infographics
- [ ] Custom SVG animations
- [ ] Dark mode image variants

## Responsive Image Strategy

### Breakpoints
- **Mobile (sm)**: 640px - Use compressed assets
- **Tablet (md)**: 768px - Medium quality
- **Desktop (lg)**: 1024px+ - Full quality
- **Large (xl)**: 1280px+ - High resolution

### Implementation Example
```html
<picture>
  <source media="(max-width: 640px)" srcset="/images/hero/hero-main-sm.jpg">
  <source media="(max-width: 1024px)" srcset="/images/hero/hero-main-md.jpg">
  <img src="/images/hero/hero-main.jpg" alt="Hero">
</picture>
```

## Performance Guidelines

1. **Lazy Load** - Use `loading="lazy"` for below-fold images
2. **Optimize** - Run all images through TinyPNG, ImageOptim, or Squoosh
3. **Modern Formats** - Use `.webp` with `.jpg`/`.png` fallbacks
4. **SVG Preferred** - Use SVG for icons and diagrams (scalable, tiny file size)
5. **Responsive** - Create multiple sizes (1x, 2x for retina)

## Tools for Asset Optimization

- **TinyPNG** - lossy compression
- **ImageOptim** (Mac) - batch optimization
- **Squoosh** (online) - interactive optimization
- **SVGO** (CLI) - SVG optimization
- **Figma** - export at multiple scales

## Adding New Assets

1. Save to appropriate `/images/` subdirectory
2. Follow naming convention
3. Optimize file size
4. Update [ASSETS.md](./ASSETS.md) manifest
5. Add to component with proper alt text
6. Test on mobile & desktop

## Asset Manifest

See `ASSETS.md` for complete inventory of all assets, their status, and usage locations.
