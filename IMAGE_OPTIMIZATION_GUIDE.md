# Image Optimization Guide

## Overview
This project uses optimized WebP images for better performance. All images are automatically converted to WebP format with significant file size reduction (73% on average).

## Optimization Results
- **Original size:** 92.40 MB
- **Optimized size:** 24.94 MB
- **Savings:** 73.0%
- **Format:** WebP + original format fallback

## How to Use Optimized Images

### Method 1: Direct Path (Recommended)
Use the optimized WebP version directly:

```tsx
import Image from "next/image";

<Image
  src="/optimized/your-folder/image-name.webp"
  alt="Description"
  width={800}
  height={600}
/>
```

### Method 2: Using Helper Utilities
Use the image utilities for automatic path resolution:

```tsx
import Image from "next/image";
import { getOptimizedImage, imageSizes } from "@/lib/image-utils";

<Image
  src={getOptimizedImage("/your-folder/image.jpg")}
  alt="Description"
  width={800}
  height={600}
  sizes={imageSizes.card}
/>
```

### Method 3: Picture Element (Best Browser Support)
For maximum compatibility with fallback:

```tsx
import { getImageSources } from "@/lib/image-utils";

const sources = getImageSources("/your-folder/image.jpg");

<picture>
  <source srcSet={sources.webp} type="image/webp" />
  <source srcSet={sources.fallback} type="image/jpeg" />
  <img src={sources.original} alt="Description" />
</picture>
```

## Directory Structure
```
public/
├── optimized/          # Optimized images (auto-generated)
│   ├── LGS/
│   │   ├── image.webp  # WebP version
│   │   └── image.jpg   # Optimized original format
│   ├── founders/
│   ├── maitama/
│   └── ...
├── LGS/               # Original images (backup)
├── founders/
└── ...
```

## Adding New Images

1. **Add image to /public folder** in appropriate directory
2. **Run optimization script:**
   ```bash
   pnpm run optimize-images
   ```
3. **Use optimized version** in your components:
   ```tsx
   <Image src="/optimized/folder-name/image-name.webp" ... />
   ```

## Next.js Image Config

The project is configured to:
- Prefer WebP and AVIF formats
- Cache images for 1 year
- Support multiple device sizes
- Automatically optimize images at build time

See `next.config.ts` for full configuration.

## Responsive Image Sizes

Use these predefined sizes for consistent responsive behavior:

```tsx
import { imageSizes } from "@/lib/image-utils";

// Thumbnail (256px max)
sizes={imageSizes.thumbnail}

// Card (400px max)
sizes={imageSizes.card}

// Gallery (600px max)
sizes={imageSizes.gallery}

// Hero (1200px max)
sizes={imageSizes.hero}

// Full width
sizes={imageSizes.fullWidth}
```

## Best Practices

1. **Always use Next.js Image component** for automatic optimization
2. **Provide width & height** to prevent layout shift
3. **Use WebP versions** from `/optimized/` folder
4. **Add descriptive alt text** for accessibility
5. **Use appropriate sizes prop** for responsive images
6. **Re-run optimization** after adding new images

## Performance Tips

- **Priority loading:** Use `priority` prop for above-the-fold images
  ```tsx
  <Image src="..." priority />
  ```

- **Lazy loading:** Default for below-the-fold images (automatic)

- **Blur placeholder:** Add for better UX while loading
  ```tsx
  <Image src="..." placeholder="blur" blurDataURL="..." />
  ```

## File Size Comparisons

| Image Type | Original | Optimized | Savings |
|------------|----------|-----------|---------|
| PNG (Renders) | 3-5 MB | 200-800 KB | 85-94% |
| Large JPEGs | 9-10 MB | 3-4 MB | 66% |
| Medium JPEGs | 200-900 KB | 100-400 KB | 40-70% |
| Logos (PNG) | 15 KB | 6 KB | 62% |

## Troubleshooting

**Images not loading?**
- Check the file path includes `/optimized/` prefix
- Verify WebP file exists in `/public/optimized/` folder
- Run `pnpm run optimize-images` again

**Need to re-optimize?**
- Delete `/public/optimized/` folder
- Run `pnpm run optimize-images`

**Adding images in bulk?**
- Add all images to `/public/` folders
- Run optimization script once
- Script processes all images in batches

## Maintenance

- Run `pnpm run optimize-images` whenever adding new images
- Original images are preserved in `/public/` folders
- Optimized versions are in `/public/optimized/`
- Safe to delete `/public/optimized/` and regenerate anytime
