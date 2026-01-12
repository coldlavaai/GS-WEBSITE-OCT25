'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useIsTouch } from '@/hooks/useMediaQuery';

interface FooterData {
  _id?: string;
  _type?: string;
  title?: string;
  companyDescription?: string;
  copyright?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}

interface FooterProps {
  data?: FooterData;
}

const Footer = ({ data }: FooterProps) => {
  const isTouch = useIsTouch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Our Process', href: '/#process' },
      { name: 'Testimonials', href: '/#testimonials' },
      { name: 'Contact', href: '/#contact' },
    ],
    systems: [
      { name: 'Solar Panels for Home', href: '/solar-panels-home' },
      { name: 'Battery Storage for Home', href: '/battery-storage-home' },
      { name: 'Solar Panels for Business', href: '/solar-panels-business' },
      { name: 'Battery Storage for Business', href: '/battery-storage-business' },
      { name: 'EV Charging', href: '/ev-charging' },
    ],
    resources: [
      { name: 'Gallery', href: '/gallery' },
      { name: 'Systems Overview', href: '/#systems' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  };

  // Icon mapping for social platforms
  const iconMap: Record<string, any> = {
    Facebook: Facebook,
    Instagram: Instagram,
    Twitter: Instagram, // fallback
    LinkedIn: Instagram, // fallback
  };

  const socialLinks = data?.socialLinks?.map(link => ({
    icon: iconMap[link.platform] || Facebook,
    href: link.url,
    label: link.platform,
  })) || [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61572185340265', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/greenstar_solar/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <a href="#home" className="inline-block mb-6">
                <img
                  src="https://irp.cdn-website.com/8f142869/dms3rep/multi/Greenstar_Solar_Logo_WHITE.TAG_HZ-3x.png"
                  alt="Greenstar Solar"
                  className="h-12 w-auto"
                />
              </a>
              <p
                className="text-gray-400 mb-6 leading-relaxed text-left"
                data-sanity={data?._id ? `${data._id}.companyDescription` : undefined}
              >
                {data?.companyDescription || 'Leading the way in renewable energy solutions. We help homes and businesses transition to clean, sustainable solar power.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-left">
                <motion.a
                  href="tel:02382123763"
                  className="flex items-center space-x-3 text-gray-400 hover:text-[#8cc63f] transition-all duration-300 group relative overflow-hidden rounded-lg p-2 -ml-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="absolute inset-0 bg-[#8cc63f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Phone className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">023 8212 3763</span>
                </motion.a>
                <motion.a
                  href="mailto:info@greenstarsolar.co.uk"
                  className="flex items-center space-x-3 text-gray-400 hover:text-[#8cc63f] transition-all duration-300 group relative overflow-hidden rounded-lg p-2 -ml-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="absolute inset-0 bg-[#8cc63f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Mail className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">info@greenstarsolar.co.uk</span>
                </motion.a>
                <motion.div
                  className="flex items-center space-x-3 text-gray-400 relative overflow-hidden rounded-lg p-2 -ml-2 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="absolute inset-0 bg-[#8cc63f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <MapPin className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Greenstar Solar, 8 Barnes Wallis Rd, Fareham PO15 5TU</span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, type: 'spring', stiffness: 200 }}
                    whileHover={!isTouch ? { scale: 1.15, y: -5, rotate: [0, -10, 10, 0] } : {}}
                    whileTap={!isTouch ? { scale: 0.9 } : {}}
                    className="relative bg-white/10 hover:bg-[#8cc63f] w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group overflow-hidden"
                    style={{
                      minWidth: '44px',
                      minHeight: '44px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    aria-label={social.label}
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8cc63f] to-[#7ab52f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    <social.icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-left"
          >
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-all duration-300 inline-block hover:translate-x-2 transform link-underline group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">›</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Systems Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left"
          >
            <h3 className="text-lg font-bold mb-4">Systems</h3>
            <ul className="space-y-3">
              {footerLinks.systems.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-all duration-300 inline-block hover:translate-x-2 transform link-underline group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">›</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-left"
          >
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-all duration-300 inline-block hover:translate-x-2 transform link-underline group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">›</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-left"
          >
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#8cc63f] transition-all duration-300 inline-block hover:translate-x-2 transform link-underline group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">›</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col justify-center items-center space-y-3">
            <div
              className="text-gray-400 text-sm text-center"
              data-sanity={data?._id ? `${data._id}.copyright` : undefined}
            >
              {data?.copyright || `© ${new Date().getFullYear()} Greenstar Solar · Company No. 16038912 · All rights reserved.`}
            </div>
            <a
              href="https://coldlavaai.github.io/home"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-500 hover:text-[#8cc63f] transition-colors text-xs group"
            >
              <span>Powered by</span>
              <img
                src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/Full_logo_White_text_no_logo_glow.png?v=1761221158"
                alt="ColdLava"
                className="h-5 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button - Hidden (conflicts with chat widget) */}
      {/* <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-[#8cc63f] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:bg-[#7ab52f] transition-colors z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button> */}
    </footer>
  );
};

export default Footer;
