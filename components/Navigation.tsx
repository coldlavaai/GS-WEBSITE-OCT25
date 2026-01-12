'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile, useIsTouch } from '@/hooks/useMediaQuery';

interface NavigationData {
  _id?: string;
  _type?: string;
  title?: string;
  navItems?: Array<{
    label: string;
    href: string;
    order: number;
  }>;
  ctaButton?: {
    text: string;
    href: string;
  };
}

interface NavigationProps {
  data?: NavigationData;
}

const Navigation = ({ data }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const isTouch = useIsTouch();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 10); // 10ms debounce for smooth scrolling
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define desired order
  const desiredOrder = ['Home', 'Our Work', 'Systems', 'Contact'];

  // Map Sanity navItems to component structure, or use fallback
  const mappedItems = data?.navItems
    ?.filter(item => item.label !== 'Process') // Exclude Process completely
    ?.map(item => {
      // Replace Testimonials with Our Work dropdown
      if (item.label === 'Testimonials') {
        return {
          name: 'Our Work',
          href: '/#gallery',
          submenu: [
            { name: 'Process', href: '/#process' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Testimonials', href: '/#testimonials' },
          ],
        };
      }

      return {
        name: item.label,
        href: item.href,
        // Add submenu for Systems if this is the Systems item
        ...(item.label === 'Systems' && {
          submenu: [
            { name: 'Solar Panels for Home', href: '/solar-panels-home' },
            { name: 'Battery Storage for Home', href: '/battery-storage-home' },
            { name: 'Solar Panels for Business', href: '/solar-panels-business' },
            { name: 'Battery Storage for Business', href: '/battery-storage-business' },
            { name: 'EV Charging', href: '/ev-charging' },
          ],
        }),
      };
    }) || [
    { name: 'Home', href: '/' },
    {
      name: 'Our Work',
      href: '/#gallery',
      submenu: [
        { name: 'Process', href: '/#process' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Testimonials', href: '/#testimonials' },
      ],
    },
    {
      name: 'Systems',
      href: '/#systems',
      submenu: [
        { name: 'Solar Panels for Home', href: '/solar-panels-home' },
        { name: 'Battery Storage for Home', href: '/battery-storage-home' },
        { name: 'Solar Panels for Business', href: '/solar-panels-business' },
        { name: 'Battery Storage for Business', href: '/battery-storage-business' },
        { name: 'EV Charging', href: '/ev-charging' },
      ],
    },
    { name: 'Contact', href: '/#contact' },
  ];

  // Sort items according to desired order and filter out any items not in desired order
  const navItems = mappedItems
    .filter(item => desiredOrder.includes(item.name))
    .sort((a, b) => {
      const indexA = desiredOrder.indexOf(a.name);
      const indexB = desiredOrder.indexOf(b.name);
      return indexA - indexB;
    });

  const ctaButton = data?.ctaButton || { text: 'Get Free Quote', href: '/#contact' };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-black/80 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={!isTouch ? { scale: 1.05 } : {}}
            className="flex items-center"
          >
            <img
              src="https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png"
              alt="Greenstar Solar"
              className="h-12 md:h-16 w-auto"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="desktop-menu items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center space-x-1 font-medium text-white transition-colors hover:text-[#8cc63f]"
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </a>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-xl rounded-xl shadow-2xl py-2 border border-white/10"
                      >
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-3 text-white/80 hover:bg-[#8cc63f]/20 hover:text-[#8cc63f] transition-all duration-100 text-sm font-medium border-l-2 border-transparent hover:border-[#8cc63f]"
                          >
                            {subitem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <motion.a
              whileHover={!isTouch ? { scale: 1.05, boxShadow: '0 12px 40px rgba(140, 198, 63, 0.3)' } : {}}
              whileTap={!isTouch ? { scale: 0.95 } : {}}
              href={ctaButton.href}
              className="btn-ripple relative px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 overflow-hidden group"
              style={{
                background: 'rgba(140, 198, 63, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(140, 198, 63, 0.3)',
                boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
              <span className="relative z-10 drop-shadow-lg">{ctaButton.text}</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button p-3 rounded-lg transition-colors text-white hover:text-[#8cc63f]"
            style={{
              minWidth: '48px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="mobile-menu mt-4 rounded-lg shadow-xl overflow-hidden border border-white/10"
              style={{
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)'
              }}
            >
              {navItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block text-white transition-colors"
                    style={{
                      padding: isMobile ? '16px 20px' : '12px 16px',
                      minHeight: isMobile ? '56px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: isMobile ? '16px' : '14px'
                    }}
                    onMouseEnter={!isTouch ? (e) => {
                      e.currentTarget.style.background = 'rgba(140, 198, 63, 0.1)';
                      e.currentTarget.style.color = '#8cc63f';
                    } : undefined}
                    onMouseLeave={!isTouch ? (e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#ffffff';
                    } : undefined}
                    onClick={() => !item.submenu && setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.submenu && (
                    <div className="pl-4 bg-gradient-to-r from-[#8cc63f]/10 to-transparent border-l-2 border-[#8cc63f]/30">
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.name}
                          href={subitem.href}
                          className="block text-white/80 transition-all duration-200"
                          style={{
                            padding: isMobile ? '14px 16px' : '10px 12px',
                            minHeight: isMobile ? '52px' : 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: isMobile ? '15px' : '13px'
                          }}
                          onMouseEnter={!isTouch ? (e) => {
                            e.currentTarget.style.background = 'rgba(140, 198, 63, 0.1)';
                            e.currentTarget.style.color = '#8cc63f';
                          } : undefined}
                          onMouseLeave={!isTouch ? (e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                          } : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="p-4">
                <a
                  href={ctaButton.href}
                  className="block w-full text-white text-center rounded-full font-semibold transition-all duration-300 relative overflow-hidden"
                  style={{
                    padding: isMobile ? '16px 24px' : '12px 20px',
                    minHeight: isMobile ? '56px' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '16px' : '14px',
                    background: 'rgba(140, 198, 63, 0.15)',
                    backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                    WebkitBackdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                    border: '1px solid rgba(140, 198, 63, 0.3)',
                    boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <span className="relative z-10 drop-shadow-lg">{ctaButton.text}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
