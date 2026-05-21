'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import { MapPin, Calendar, Zap } from 'lucide-react';

interface GalleryItem {
  _id: string;
  _type: string;
  title: string;
  location?: string;
  systemSize?: string;
  image?: any;
  category?: string;
  description?: string;
}

interface GalleryProps {
  data?: GalleryItem[];
}

const Gallery = ({ data }: GalleryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Hardcoded image URLs as fallbacks
  const imageMap: Record<string, string> = {
    'Residential Solar Installation': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    'Commercial Rooftop Array': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
    'Home Battery Storage': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_553388506--281-29.jpeg',
    'Office Building Solar': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/Blog_image_2.webp',
    'Warehouse Solar Installation': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_855615596.jpeg',
    'Farm Solar Project': 'https://irp.cdn-website.com/8f142869/dms3rep/multi/AdobeStock_586564893-0f77e5a0-84f93a01.jpeg',
  };

  // All 24 Greenstar Solar projects (with optional inverter property)
  const allProjects: Array<{
    image: string;
    title: string;
    location: string;
    capacity: string;
    date: string;
    systemDetails: string;
    panelCount: string;
    battery?: string;
    inverter?: string;
    performance: string;
    savings: string;
  }> = [
    { image: '/gallery/greenstar-1.jpg', title: 'Residential Solar + Battery', location: 'Alton, Hampshire', capacity: '7.2kW System', date: 'November 2024', systemDetails: 'Solar Panels + Battery Storage', panelCount: '16 x DMEG 450w Panels', battery: '10.36kWh FoxESS EP11 Battery', performance: 'Generating 7,200 kWh annually', savings: '92% bill reduction - £1,663 annual savings' },
    { image: '/gallery/greenstar-2.jpg', title: 'Premium Solar Installation', location: 'Farnborough, Hampshire', capacity: '8.55kW System', date: 'September 2025', systemDetails: 'Solar Panels + Battery Storage', panelCount: '18 x AIKO 475w Gen 3 Panels', battery: '11.52kWh FoxESS EP12 Plus Battery', performance: 'Generating 8,674 kWh annually', savings: '115% bill reduction - £2,140 annual savings' },
    { image: '/gallery/greenstar-3.jpg', title: 'In-Roof Solar System', location: 'Bournemouth, Hampshire', capacity: '5.22kW System', date: 'January 2025', systemDetails: 'In-Roof Solar + Battery', panelCount: '12 x AIKO 460w Gen 2 GSE In Roof Panels', battery: '8.06kWh Sigenergy 8.0 Battery', performance: 'Generating 4,802 kWh annually', savings: '72% bill reduction - £806 annual savings' },
    { image: '/gallery/greenstar-4.jpg', title: 'Residential Solar System', location: 'Guildford, Surrey', capacity: '5.92kW System', date: 'February 2025', systemDetails: 'Solar Panels + Battery Storage', panelCount: '13 x AIKO 455w Gen 2 Panels', battery: '5.1kWh Ecoflow Battery', performance: 'Generating 5,736 kWh annually', savings: '103% bill reduction - £1,085 annual savings' },
    { image: '/gallery/greenstar-5.jpg', title: 'Large-Scale Residential', location: 'Salisbury, Wiltshire', capacity: '12.35kW System', date: 'August 2025', systemDetails: 'Premium Solar + All-in-One Battery', panelCount: '26 x AIKO 475w Gen 3 Panels', battery: '10.24kWh FOX EVO All In One Battery', performance: 'Generating 12,498 kWh annually', savings: '134% bill reduction - £2,329 annual savings' },
    { image: '/gallery/greenstar-6.jpg', title: 'High-Capacity System', location: 'Brockenhurst, Hampshire', capacity: '9.5kW System', date: 'July 2025', systemDetails: 'Solar + Dual Battery Storage', panelCount: '20 x AIKO 475w Gen 3 Panels', battery: '23.04kWh FoxESS EP12 Plus x2 Battery', performance: 'Generating 9,810 kWh annually', savings: '164% bill reduction - £2,610 annual savings' },
    { image: '/gallery/greenstar-7.jpg', title: 'Dual Battery System', location: 'Hayling Island, Hampshire', capacity: '10.12kW System', date: 'December 2024', systemDetails: 'Solar + Dual Ecoflow Batteries', panelCount: '22 x AIKO 460w Gen 2 Panels', battery: '10.2kWh Ecoflow x2 Battery', performance: 'Generating 9,887 kWh annually', savings: '99% bill reduction - £2,160 annual savings' },
    { image: '/gallery/greenstar-8.jpg', title: 'Advanced Sigenergy System', location: 'Fareham, Hampshire', capacity: '9.66kW System', date: 'February 2025', systemDetails: 'Solar + Dual Sigenergy Batteries', panelCount: '21 x AIKO 460w Gen 2 Panels', battery: '16.12kWh Sigenergy 8.0 x2 Battery', performance: 'Generating 9,853 kWh annually', savings: '82% bill reduction - £2,387 annual savings' },
    { image: '/gallery/greenstar-9.jpg', title: 'Premium Large Installation', location: 'Wokingham, Berkshire', capacity: '17.86kW System', date: 'September 2025', systemDetails: 'Large-Scale Solar + Triple Battery', panelCount: '38 x AIKO 470w Gen 3 Panels', battery: '27.12kWh Sigenergy 10.0 x3 Battery', performance: 'Generating 16,090 kWh annually', savings: '92% bill reduction - £5,124 annual savings' },
    { image: '/gallery/greenstar-10.jpg', title: 'EV Charging Installation', location: 'Various Locations', capacity: 'EV Charger', date: '2024-2025', systemDetails: 'Zappi 7kW EV Charger All Black', panelCount: 'Professional EV charging solution', performance: 'Smart solar-integrated charging', savings: 'Free EV charging from solar power' },
    { image: '/gallery/greenstar-11.jpg', title: 'High-Efficiency System', location: 'Whiteley, Hampshire', capacity: '10.45kW System', date: 'June 2025', systemDetails: 'Solar + Sigenergy Battery', panelCount: '22 x AIKO 475w Gen 3 Panels', battery: '9.04kWh Sigenergy 10.0 Battery', performance: 'Generating 11,015 kWh annually', savings: '133% bill reduction - £1,930 annual savings' },
    { image: '/gallery/greenstar-12.jpg', title: 'Premium Large Installation', location: 'Wokingham, Berkshire', capacity: '17.86kW System', date: 'September 2025', systemDetails: 'Large-Scale Solar + Triple Battery', panelCount: '38 x AIKO 470w Gen 3 Panels', battery: '27.12kWh Sigenergy 10.0 x3 Battery', performance: 'Generating 16,090 kWh annually', savings: '92% bill reduction - £5,124 annual savings' },
    { image: '/gallery/greenstar-13.jpg', title: 'Large Residential System', location: 'Romsey, Hampshire', capacity: '17.1kW System', date: 'August 2025', systemDetails: 'Large Solar + Dual Battery Storage', panelCount: '36 x AIKO 475w Gen 3 Panels', battery: '23.04kWh FoxESS EP12 Plus x2 Battery', performance: 'Generating 18,008 kWh annually', savings: '125% bill reduction - £3,284 annual savings' },
    { image: '/gallery/greenstar-14.jpg', title: 'Advanced Sigenergy System', location: 'Fareham, Hampshire', capacity: '9.66kW System', date: 'February 2025', systemDetails: 'Solar + Dual Sigenergy Batteries', panelCount: '21 x AIKO 460w Gen 2 Panels', battery: '16.12kWh Sigenergy 8.0 x2 Battery', performance: 'Generating 9,853 kWh annually', savings: '82% bill reduction - £2,387 annual savings' },
    { image: '/gallery/greenstar-15.jpg', title: 'High-Performance System', location: 'Winchester, Hampshire', capacity: '10.01kW System', date: 'February 2025', systemDetails: 'Solar + Battery Storage', panelCount: '22 x AIKO 455w Gen 2 Panels', battery: '10.36kWh FoxESS EP11 Battery', performance: 'Generating 9,750 kWh annually', savings: '114% bill reduction - £2,268 annual savings' },
    { image: '/gallery/greenstar-16.jpg', title: 'Premium Installation', location: 'Ferndown, Dorset', capacity: '10.45kW System', date: 'February 2025', systemDetails: 'Solar + Battery Storage', panelCount: '22 x AIKO 475w Gen 3 Panels', battery: '11.52kWh FoxESS EP12 Plus Battery', performance: 'Generating 10,241 kWh annually', savings: '136% bill reduction - £1,995 annual savings' },
    { image: '/gallery/greenstar-17.jpg', title: 'All-in-One Solar System', location: 'Bishops Waltham, Hampshire', capacity: '7.05kW System', date: 'May 2025', systemDetails: 'Solar + All-in-One Battery', panelCount: '15 x AIKO 470w Gen 3 Panels', battery: '10.24kWh FOX EVO All In One Battery', performance: 'Generating 6,683 kWh annually', savings: '121% bill reduction - £1,371 annual savings' },
    { image: '/gallery/greenstar-18.jpg', title: 'Hybrid Battery System', location: 'Fareham, Hampshire', capacity: '9.5kW System', date: 'April 2025', systemDetails: 'Solar + Hybrid Battery Setup', panelCount: '20 x AIKO 475w Gen 3 Panels', battery: '10.36kWh FoxESS EP11 + 5.18kWh Fox EP5 Battery', performance: 'Generating 9,455 kWh annually', savings: '102% bill reduction - £1,405 annual savings' },
    { image: '/gallery/greenstar-19.jpg', title: 'Dual Ecoflow System', location: 'Cranleigh, Surrey', capacity: '9.025kW System', date: 'October 2025', systemDetails: 'Solar + Dual Ecoflow Batteries', panelCount: '19 x AIKO 475w Gen 3 Panels', battery: '10.2kWh Ecoflow x2 Battery', performance: 'Generating 8,890 kWh annually', savings: '127% bill reduction - £1,645 annual savings' },
    { image: '/gallery/greenstar-20.jpg', title: 'Premium Large Installation', location: 'Wokingham, Berkshire', capacity: '17.86kW System', date: 'September 2025', systemDetails: 'Large-Scale Solar + Triple Battery', panelCount: '38 x AIKO 470w Gen 3 Panels', battery: '27.12kWh Sigenergy 10.0 x3 Battery', performance: 'Generating 16,090 kWh annually', savings: '92% bill reduction - £5,124 annual savings' },
    { image: '/gallery/greenstar-21.jpg', title: 'Triple Battery System', location: 'Romsey, Hampshire', capacity: '15.47kW System', date: 'May 2025', systemDetails: 'Large Solar + Triple Sigenergy Batteries', panelCount: '34 x AIKO 455w Gen 2 Panels', battery: '24.18kWh Sigenergy 8.0 x3 Battery', performance: 'Generating 13,551 kWh annually', savings: '87% bill reduction - £4,115 annual savings' },
    { image: '/gallery/greenstar-22.jpg', title: 'Triple Battery System', location: 'Romsey, Hampshire', capacity: '15.47kW System', date: 'May 2025', systemDetails: 'Large Solar + Triple Sigenergy Batteries', panelCount: '34 x AIKO 455w Gen 2 Panels', battery: '24.18kWh Sigenergy 8.0 x3 Battery', performance: 'Generating 13,551 kWh annually', savings: '87% bill reduction - £4,115 annual savings' },
    { image: '/gallery/greenstar-23.jpg', title: 'Triple Battery System', location: 'Romsey, Hampshire', capacity: '15.47kW System', date: 'May 2025', systemDetails: 'Large Solar + Triple Sigenergy Batteries', panelCount: '34 x AIKO 455w Gen 2 Panels', battery: '24.18kWh Sigenergy 8.0 x3 Battery', performance: 'Generating 13,551 kWh annually', savings: '87% bill reduction - £4,115 annual savings' },
    { image: '/gallery/greenstar-24.jpg', title: 'Triple Battery System', location: 'Romsey, Hampshire', capacity: '15.47kW System', date: 'May 2025', systemDetails: 'Large Solar + Triple Sigenergy Batteries', panelCount: '34 x AIKO 455w Gen 2 Panels', battery: '24.18kWh Sigenergy 8.0 x3 Battery', performance: 'Generating 13,551 kWh annually', savings: '87% bill reduction - £4,115 annual savings' },
  ];

  // Pin 3 favorite projects and rotate the other 3 every 30 minutes
  const projects = useMemo(() => {
    // These are our 3 favorite "pride of place" projects - always shown
    const pinnedIndexes = [11, 14, 23]; // greenstar-12, greenstar-15, greenstar-24
    const pinnedProjects = pinnedIndexes.map(i => allProjects[i]);

    // Get remaining projects (excluding pinned ones)
    const remainingProjects = allProjects.filter((_, index) => !pinnedIndexes.includes(index));

    // Get current 30-minute interval for rotating the bottom 3
    const now = new Date();
    const thirtyMinuteInterval = Math.floor(now.getTime() / (30 * 60 * 1000));

    // Use interval as seed for deterministic randomization of remaining projects
    const seed = thirtyMinuteInterval;
    const shuffled = [...remainingProjects].sort((a, b) => {
      // Deterministic shuffle based on seed
      const hashA = (seed + remainingProjects.indexOf(a)) * 2654435761;
      const hashB = (seed + remainingProjects.indexOf(b)) * 2654435761;
      return (hashA % 100) - (hashB % 100);
    });

    // Return 3 pinned projects + 3 rotating projects
    return [...pinnedProjects, ...shuffled.slice(0, 3)];
  }, []);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
              Our Projects
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Recent{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Installations</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Explore our portfolio of successful solar installations across the UK
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => toggleCard(index)}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
              className="group cursor-pointer perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative aspect-[4/3] w-full"
                animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] border border-white/10 group-hover:border-[#8cc63f]/50"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70" />

                  {/* Location badge - bottom left */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                      <span className="text-white/90 text-xs font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" style={{ color: '#8CC63F' }} />
                        {project.location.split(',')[0]}
                      </span>
                    </div>
                  </div>
                  {/* Click prompt - bottom right */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-white text-xs font-medium">Tap to flip</span>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/30 overflow-hidden p-4"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-full flex flex-col text-white overflow-y-auto">
                    <div className="flex-1 overflow-y-auto">
                      <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        {project.title}
                      </h3>

                      {/* Basic Info */}
                      <div className="space-y-1.5 mb-3 text-xs">
                        <div className="flex items-center space-x-2 text-white/90">
                          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span>{project.location.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/90">
                          <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span>{project.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/90">
                          <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span>{project.date}</span>
                        </div>
                      </div>

                      {/* Key Metrics First - Savings & Performance */}
                      <div className="space-y-2 text-xs mb-3">
                        {project.savings && (
                          <div className="bg-primary/20 rounded-lg p-2 border border-primary/30">
                            <div className="text-primary/90 text-[10px] uppercase tracking-wider mb-0.5">Savings</div>
                            <div className="font-bold text-xs">{project.savings}</div>
                          </div>
                        )}
                        {project.performance && (
                          <div className="bg-primary/20 rounded-lg p-2 border border-primary/30">
                            <div className="text-primary/90 text-[10px] uppercase tracking-wider mb-0.5">Performance</div>
                            <div className="font-bold text-xs">{project.performance}</div>
                          </div>
                        )}
                      </div>

                      {/* System Details */}
                      <div className="space-y-2 text-xs">
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">System Type</div>
                          <div className="font-medium text-xs">{project.systemDetails || project.capacity}</div>
                        </div>
                        {project.panelCount && (
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">Panels</div>
                            <div className="font-medium text-xs">{project.panelCount}</div>
                          </div>
                        )}
                        {project.battery && (
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">Battery</div>
                            <div className="font-medium text-xs">{project.battery}</div>
                          </div>
                        )}
                        {project.inverter && (
                          <div className="bg-white/10 rounded-lg p-2">
                            <div className="text-primary/80 text-[10px] uppercase tracking-wider mb-0.5">Inverter</div>
                            <div className="font-medium text-xs">{project.inverter}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right mt-2 pt-2 border-t border-white/10 flex-shrink-0">
                      <span className="text-primary/80 text-[10px] font-medium">← Click to return</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/gallery"
              className="inline-block relative px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-lg overflow-hidden group"
              style={{
                background: 'rgba(212, 175, 55, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <span className="relative z-10 tracking-wide text-white drop-shadow-lg">View Full Gallery</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-block relative px-6 py-3 md:px-12 md:py-4 rounded-full font-semibold text-sm md:text-lg overflow-hidden group"
              style={{
                background: 'rgba(140, 198, 63, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(140, 198, 63, 0.3)',
                boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <span className="relative z-10 tracking-wide text-white drop-shadow-lg">Start Your Project</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
