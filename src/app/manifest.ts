import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PristiqBuild · LGS Roofing & Steel-Frame Construction',
    short_name: 'PristiqBuild',
    description: 'LGS roofing, steel-frame construction and modular buildings, delivered through engineering, fabrication and controlled site execution, by a team based in Maitama, Abuja.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#24597A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      // The mark sits inside a 56% safe zone on a solid ground, so Android can
      // crop it to any shape without clipping the glyph.
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['business', 'construction', 'technology'],
    orientation: 'portrait-primary',
  };
}
