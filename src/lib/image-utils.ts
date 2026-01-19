/**
 * Image Optimization Utilities
 * Helps use optimized images throughout the app
 */

/**
 * Get the optimized image path
 * Automatically returns WebP version from /optimized folder
 * Falls back to original if optimized doesn't exist
 */
export function getOptimizedImage(path: string, useWebP: boolean = true): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (useWebP) {
    // Replace extension with .webp
    const webpPath = cleanPath.replace(/\.(jpe?g|png)$/i, '.webp');
    return `/optimized/${webpPath}`;
  }

  // Return optimized version in original format
  return `/optimized/${cleanPath}`;
}

/**
 * Get both WebP and fallback image sources for <picture> tag
 */
export function getImageSources(path: string) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const webpPath = cleanPath.replace(/\.(jpe?g|png)$/i, '.webp');

  return {
    webp: `/optimized/${webpPath}`,
    fallback: `/optimized/${cleanPath}`,
    original: `/${cleanPath}`,
  };
}

/**
 * Responsive image sizes for common use cases
 */
export const imageSizes = {
  thumbnail: '(max-width: 768px) 100vw, 256px',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  fullWidth: '100vw',
  gallery: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px',
};
