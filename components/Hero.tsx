'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sun, Zap, Sparkles, Plug } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import BatteryIcon from '@/components/icons/BatteryIcon';
import { useIsMobile, useIsTouch, useReducedMotion } from '@/hooks/useMediaQuery';

interface HeroData {
  _id?: string;
  _type?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: any;
  stats?: Array<{
    _key?: string;
    value: string;
    label: string;
  }>;
}

interface HeroProps {
  data?: HeroData;
}

const Hero = ({ data }: HeroProps) => {
  const ref = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const isTouch = useIsTouch();
  const reduceMotion = useReducedMotion();

  // Disable parallax on mobile for performance
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: Sun, text: 'Solar Panels', color: 'from-orange-400 to-yellow-500' },
    { icon: BatteryIcon, text: 'Battery Storage', color: 'from-[#8cc63f] to-[#7ab52f]' },
    { icon: Plug, text: 'EV Charging', color: 'from-green-400 to-emerald-500' },
  ];

  // Use stats from CMS or fallback to default
  const stats = data?.stats || [
    { value: '20+', label: 'Years Experience' },
    { value: '450+', label: 'Happy Customers' },
  ];

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16 md:pt-24">
      {/* Very subtle text shadow overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none"></div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="container mx-auto px-8 md:px-12 relative z-10 mt-0 md:mt-16">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-28 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-white max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.4 : 0.8 }}
              className="inline-flex items-center space-x-2 md:space-x-3 mb-6 md:mb-8"
            >
              <motion.div
                animate={!isMobile && !reduceMotion ? { rotate: [0, 360] } : {}}
                transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em]">
                Premium Solar Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.1 : 0.2, duration: isMobile ? 0.4 : 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight"
              data-sanity={data?._id ? `${data._id}.heading` : undefined}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {data?.heading || 'Smart Energy Solutions'}<br />
              <motion.span
                className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={!isMobile && !reduceMotion ? { backgroundPosition: ['0% center', '200% center'] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={isMobile ? {} : { textShadow: '0 0 80px rgba(140, 199, 64, 0.3)' }}
              >
                Designed Around You
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm md:text-base lg:text-lg text-gray-200 mb-6 md:mb-8 leading-relaxed font-light"
              data-sanity={data?._id ? `${data._id}.subheading` : undefined}
            >
              {data?.subheading || 'Bespoke solar energy systems designed to perfectly match your unique requirements. Save money, reduce your carbon footprint, and achieve true energy independence.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10"
            >
              <motion.a
                whileHover={!isTouch ? { scale: 1.02, boxShadow: '0 12px 48px rgba(140, 198, 63, 0.3)' } : {}}
                whileTap={{ scale: 0.98 }}
                href={data?.ctaLink || "#contact"}
                className="btn-ripple group relative px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs md:text-sm overflow-hidden"
                style={{
                  background: 'rgba(140, 198, 63, 0.15)',
                  backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                  WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                  border: '1px solid rgba(140, 198, 63, 0.3)',
                  boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
                data-sanity={data?._id ? `${data._id}.ctaText` : undefined}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="tracking-wide text-white drop-shadow-lg">{data?.ctaText || 'Get Free Survey'}</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300 text-white drop-shadow-lg" />
                </span>
              </motion.a>

              <motion.a
                whileHover={!isTouch ? {
                  scale: 1.05,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderColor: 'rgba(140,198,63,0.8)',
                  boxShadow: '0 20px 40px rgba(140,198,63,0.3)',
                } : {}}
                whileTap={{ scale: 0.95 }}
                href={data?.secondaryCtaLink || "#systems"}
                className="btn-ripple group relative bg-white/5 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs md:text-sm border-2 border-white/20 transition-all shadow-xl overflow-hidden"
                style={{
                  backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                  WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                }}
                data-sanity={data?._id ? `${data._id}.secondaryCtaText` : undefined}
              >
                <span className="flex items-center space-x-2 relative z-10">
                  <span className="tracking-wide">{data?.secondaryCtaText || 'Explore Systems'}</span>
                  <motion.span
                    animate={!isMobile && !reduceMotion ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sun className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>

            {/* Features with premium animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-2 md:gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isMobile ? 0.3 + index * 0.05 : 0.9 + index * 0.1 }}
                  whileHover={!isTouch ? {
                    y: -6,
                    scale: 1.03,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  } : {}}
                  className="group relative cursor-pointer"
                >
                  <div
                    className="relative bg-white/5 border border-white/10 p-2 md:p-4 rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(140,198,63,0.3)] hover:border-[#8cc63f]/50"
                    style={{
                      backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                      WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                    }}
                  >
                    {/* Gradient glow effect on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 rounded-lg md:rounded-xl blur-xl transition-opacity duration-300`}
                    />

                    <div className={`relative bg-gradient-to-br ${feature.color} p-1.5 md:p-2.5 rounded-md md:rounded-lg mb-1 md:mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-4 h-4 md:w-6 md:h-6 text-white" style={{ fill: 'white', strokeWidth: 2 }} />
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                      {feature.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Premium 3D Card Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={!reduceMotion ? {
                y: [0, -20, 0],
                rotateY: [0, 5, 0],
              } : {}}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-[400px] mx-auto"
            >
              {/* Main Image Card with 3D effect */}
              <div
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 w-full"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
                data-sanity={data?._id ? `${data._id}.backgroundImage` : undefined}
              >
                {data?.backgroundImage ? (
                  <Image
                    src={urlFor(data.backgroundImage).width(1200).quality(90).url()}
                    alt="Greenstar Solar Installation"
                    fill
                    priority
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                ) : (
                  <Image
                    src="/images/hero-house.webp"
                    alt="Greenstar Solar Installation"
                    fill
                    priority
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8cc63f]/30 via-transparent to-[#8cc63f]/30 z-10" />
              </div>

              {/* Floating Stats Cards with premium effects */}
              {stats.map((stat, index) => (
                <motion.div
                  key={stat._key || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={!reduceMotion ? { scale: 1.1, y: -10 } : {}}
                  className={`absolute ${index === 0 ? 'top-10 -left-10' : 'bottom-10 -right-10'} p-5 rounded-2xl border border-white/20 shadow-2xl hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] cursor-pointer`}
                  style={{
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%), rgba(18, 18, 18, 0.85)',
                  }}
                  data-sanity={data?._id && stat._key ? `${data._id}.stats[_key=="${stat._key}"]` : undefined}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white font-semibold">{stat.label}</div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] opacity-0 hover:opacity-20 rounded-3xl blur transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Scroll Indicator - hides when scrolled */}
      {!scrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/5">
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-[#8cc63f] to-white rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] opacity-50 blur-xl animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
