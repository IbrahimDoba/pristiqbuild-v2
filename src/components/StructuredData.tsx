import Script from 'next/script';

export default function StructuredData() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PristiqBuild',
    legalName: 'PristiqBuild Nigeria Limited',
    url: 'https://www.pristiqbuild.com',
    logo: 'https://www.pristiqbuild.com/optimized/Pristiq Build blacktext.webp',
    foundingDate: '2020',
    description:
      "Building Nigeria's future, one module at a time. PristiqBuild delivers precision, sustainability, and cutting-edge technology in modular construction using light steel gauge framing.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Murjanatu House, 1 Zambezi Crescent',
      addressLocality: 'Wuse',
      addressRegion: 'FCT',
      addressCountry: 'NG',
      postalCode: '900001',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+234-813-027-2706',
        contactType: 'customer service',
        email: 'info@pristiqbuild.com',
        areaServed: 'NG',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+234-813-027-2706',
        contactType: 'sales',
        email: 'info@pristiqbuild.com',
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
      'Modular Construction',
      'Light Gauge Steel',
      'Steel Frame Construction',
      'Prefabricated Buildings',
      'Sustainable Construction',
      'Smart Buildings',
      'AR/VR Construction Technology',
      'Green Building',
      'Fast Construction',
    ],
    award: [
      'Leading Modular Construction Company Nigeria',
      'Innovation in Construction Technology',
    ],
  };

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.pristiqbuild.com/#business',
    name: 'PristiqBuild',
    image: 'https://www.pristiqbuild.com/optimized/Pristiq Build blacktext.webp',
    telephone: '+234-813-027-2706',
    email: 'info@pristiqbuild.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Murjanatu House, 1 Zambezi Crescent',
      addressLocality: 'Wuse',
      addressRegion: 'Abuja FCT',
      postalCode: '900001',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '9.0765',
      longitude: '7.3986',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PristiqBuild',
    url: 'https://www.pristiqbuild.com',
    description:
      "Nigeria's leading modular construction company specializing in light gauge steel framing and sustainable building solutions.",
    publisher: {
      '@type': 'Organization',
      name: 'PristiqBuild',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pristiqbuild.com/optimized/Pristiq Build blacktext.webp',
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
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
