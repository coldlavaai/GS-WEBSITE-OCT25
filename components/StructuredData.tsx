const SITE_URL = 'https://greenstarsolar.co.uk'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Greenstar Solar',
  legalName: 'Greenstar Solar Ltd',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    'Leading UK solar energy company. MCS-accredited expert installation of solar panels, battery storage and EV charging for homes and businesses.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
    addressRegion: 'Hampshire',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+44-23-8212-3763',
    email: 'info@greenstarsolar.co.uk',
    contactType: 'Customer Service',
    availableLanguage: 'English',
    areaServed: 'GB',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61572185340265',
    'https://www.instagram.com/greenstar_solar/',
  ],
  knowsAbout: [
    'Solar Panel Installation',
    'Battery Storage',
    'EV Charging',
    'Renewable Energy',
    'Smart Export Guarantee',
    'MCS Certified Solar',
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Greenstar Solar',
  description:
    'MCS-accredited solar panel, battery storage and EV charging installation across the UK for residential and commercial customers.',
  url: SITE_URL,
  telephone: '+44-23-8212-3763',
  email: 'info@greenstarsolar.co.uk',
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/og-image.png`,
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
    addressRegion: 'Hampshire',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Solar & Energy Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Solar Panels — Home',
          description: 'Residential solar panel design and installation, MCS-certified.',
          url: `${SITE_URL}/solar-panels-home`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Solar Panels — Business',
          description: 'Commercial-scale solar PV systems for businesses.',
          url: `${SITE_URL}/solar-panels-business`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Battery Storage — Home',
          description: 'Residential battery storage to maximise solar self-consumption.',
          url: `${SITE_URL}/battery-storage-home`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Battery Storage — Business',
          description: 'Commercial battery storage and load-shifting solutions.',
          url: `${SITE_URL}/battery-storage-business`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'EV Charging',
          description: 'EV charger installation for home and commercial premises.',
          url: `${SITE_URL}/ev-charging`,
        },
      },
    ],
  },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'MCS Certified' },
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Greenstar Solar',
  description: 'Premium Solar Panel and Battery Storage Solutions UK',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ],
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
