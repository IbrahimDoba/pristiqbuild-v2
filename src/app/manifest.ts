import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PristiqBuild - Nigeria\'s Leading Modular Construction Innovator',
    short_name: 'PristiqBuild',
    description: 'Building Nigeria\'s future, one module at a time. PristiqBuild delivers precision, sustainability, and cutting-edge technology in modular construction using light steel gauge framing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1A5F7A',
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
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['business', 'construction', 'technology'],
    orientation: 'portrait-primary',
  };
}
