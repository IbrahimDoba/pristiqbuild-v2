import JsonLd from '@/components/seo/JsonLd';
import { EMAIL, PHONE_E164 } from '@/lib/site-config';

/*
 * These three used to render through next/script, which defaults to the
 * afterInteractive strategy and therefore injects client-side. The result was
 * that none of this markup existed in the served HTML: verified by fetching the
 * homepage and finding zero application/ld+json script tags, while /faq (using
 * the plain-script JsonLd component) emitted two.
 *
 * Structured data has to be in the initial response. Switched to JsonLd.
 */

export default function StructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PristiqBuild',
    legalName: 'PristiqBuild Nigeria Limited',
    url: 'https://www.pristiqbuild.com',
    logo: 'https://www.pristiqbuild.com/logo-dark.png',
    foundingDate: '2023',
    description:
      "LGS roofing, steel-frame construction and modular buildings, delivered through engineering, fabrication and controlled site execution by a team based in Maitama, Abuja.",
    // Area only. The site publishes "Maitama, Abuja", not a street address,
    // so the markup does not claim one either.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maitama, Abuja',
      addressRegion: 'FCT',
      addressCountry: 'NG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        email: EMAIL,
        areaServed: 'NG',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'sales',
        email: EMAIL,
        areaServed: 'NG',
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61565826015488',
      'https://www.instagram.com/pristiqbuild/',
      'https://ng.linkedin.com/company/pristiqbuild',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '9.0765',
        longitude: '7.3986',
      },
      geoRadius: '1000000', // Coverage across Nigeria
    },
    knowsAbout: [
      'LGS Roofing',
      'Light Gauge Steel',
      'Steel Frame Construction',
      'Structural Steel',
      'Modular Construction',
    ],
    // No `award` list. The previous one named awards nobody had given.
  };

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.pristiqbuild.com/#business',
    name: 'PristiqBuild',
    image: 'https://www.pristiqbuild.com/logo-dark.png',
    telephone: PHONE_E164,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maitama, Abuja',
      addressRegion: 'FCT',
      addressCountry: 'NG',
    },
    url: 'https://www.pristiqbuild.com',
    priceRange: '₦₦₦',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    // No aggregateRating here on purpose. The previous build published
    // "4.9 from 150 reviews" with no review system anywhere on the site.
    // Unverifiable review markup risks a manual action, and misrepresents
    // ratings to anyone reading the search result.
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PristiqBuild',
    url: 'https://www.pristiqbuild.com',
    description:
      "Engineered LGS roofing and steel-frame construction, based in Maitama, Abuja.",
    publisher: {
      '@type': 'Organization',
      name: 'PristiqBuild',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pristiqbuild.com/logo-dark.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.pristiqbuild.com/blog?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd id="organization-schema" data={organizationData} />
      <JsonLd id="local-business-schema" data={localBusinessData} />
      <JsonLd id="website-schema" data={websiteData} />
    </>
  );
}
