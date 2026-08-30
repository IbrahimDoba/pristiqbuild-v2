import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traced, self-contained server build for the Docker image. Without this
  // the container has to carry all of node_modules.
  output: "standalone",

  /**
   * Security headers. The site previously sent none.
   *
   * No Content-Security-Policy yet on purpose: a useful one has to enumerate
   * the Google Analytics and Maps origins the pages actually load, and getting
   * that wrong silently breaks the page rather than failing loudly. It lands
   * with the analytics work, once the real origin list is known.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Two years, so the domain qualifies for HSTS preloading later.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Clickjacking. Blocks the site being framed to overlay fake CTAs.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stops the browser second-guessing declared content types.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send the origin cross-site, the full path same-site. Keeps
          // internal referrer attribution working without leaking query
          // strings to third parties.
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Nothing on this site needs these.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Lead submissions must never be cached by a CDN or a shared proxy.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'buildsteel.org',
      },
      {
        protocol: 'https',
        hostname: 'www.insaatdunyasi.com.tr',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.scottsdalesteelframes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.deepbluehome.com',
      },
      {
        protocol: 'https',
        hostname: 'www.howickltd.com',
      },
      {
        protocol: 'https',
        hostname: 'steelframeswa.com.au',
      },
      {
        protocol: 'https',
        hostname: 'framecad.com',
      },
      {
        protocol: 'https',
        hostname: 'usframefactory.com',
      },
      {
        protocol: 'https',
        hostname: 'images.rawpixel.com',
      },
      {
        protocol: 'https',
        hostname: 'steelnetwork.com',
      },
      {
        protocol: 'https',
        hostname: 'sheffieldmetals.com',
      },
      {
        protocol: 'https',
        hostname: 'www.steelcobuildings.com',
      },
      {
        protocol: 'https',
        hostname: 'module-t.com',
      },
      {
        protocol: 'https',
        hostname: 'roxboxcontainers.com',
      },
      {
        protocol: 'https',
        hostname: 'unbakmachinery.com',
      },
      {
        protocol: 'https',
        hostname: 'mexisteel.com',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'http',
        hostname: 'myowntinyhome.com',
      },
      {
        protocol: 'https',
        hostname: 's3da-design.com',
      },
      {
        protocol: 'https',
        hostname: 'ccssteelframing.com',
      },
      {
        protocol: 'https',
        hostname: 'cf-images.us-east-1.prod.boltdns.net',
      },
      {
        protocol: 'https',
        hostname: 'www.tremcoroofing.com',
      },
      {
        protocol: 'https',
        hostname: 'dam.thdstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'setupspace.co',
      },
      {
        protocol: 'https',
        hostname: 'www.lgsti.com',
      },
      {
        protocol: 'https',
        hostname: 'www.wikihow.com',
      },
      {
        protocol: 'https',
        hostname: 'www.xazent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.herocont.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.zyrosite.com',
      },
      {
        protocol: 'https',
        hostname: 'image.made-in-china.com',
      },
      {
        protocol: 'https',
        hostname: 'img5.grofrom.com',
      },
      {
        protocol: 'https',
        hostname: 'ecocraft-homes.com',
      },
    ],
  },
};

export default nextConfig;
