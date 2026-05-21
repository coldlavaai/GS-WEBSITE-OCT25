'use client';

import { motion } from 'framer-motion';
import { TrendingDown, Shield, Zap, Home, Clock, Power, Moon, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Contact from '@/components/Contact';
import BatteryIcon from '@/components/icons/BatteryIcon';

export default function BatteryStorageHome() {


  const benefits = [
    {
      icon: BatteryIcon,
      title: 'Store Excess Energy',
      description: 'Capture surplus solar energy during the day and use it when you need it most',
    },
    {
      icon: TrendingDown,
      title: 'Maximize Savings',
      description: 'Reduce grid dependence and avoid peak electricity rates with stored power',
    },
    {
      icon: Moon,
      title: 'Power at Night',
      description: 'Use your stored solar energy throughout the evening and night',
    },
    {
      icon: Shield,
      title: 'Backup Power',
      description: 'Keep essential appliances running during power outages',
    },
    {
      icon: Power,
      title: 'Energy Independence',
      description: 'Take control of your energy supply and reduce grid reliance',
    },
    {
      icon: Zap,
      title: 'Smart Management',
      description: 'Intelligent system optimizes when to store and when to use power',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Energy Assessment',
      description: 'We analyze your energy usage patterns and solar generation to size the perfect battery',
    },
    {
      number: '02',
      title: 'System Design',
      description: 'Custom battery solution designed to integrate seamlessly with your solar panels',
    },
    {
      number: '03',
      title: 'Expert Installation',
      description: 'Professional installation by certified technicians with minimal disruption',
    },
    {
      number: '04',
      title: 'Smart Setup',
      description: 'Configure intelligent charging and usage patterns for maximum savings',
    },
  ];

  const faqs = [
    {
      question: 'How much does a home battery storage system cost?',
      answer: 'Home battery systems typically range from £4,000-£8,000 depending on capacity. Most customers see payback within 10-15 years through energy savings and avoiding peak rates.',
    },
    {
      question: 'How long do solar batteries last?',
      answer: 'Modern lithium-ion batteries typically last 10-15 years with a warranty of 10 years. They maintain 70-80% capacity after this period.',
    },
    {
      question: 'Can I add battery storage to my existing solar panels?',
      answer: 'Yes! Battery storage can be retrofitted to most existing solar panel systems. We assess your current setup and recommend compatible battery solutions.',
    },
    {
      question: 'Will a battery power my whole home during an outage?',
      answer: 'Battery capacity varies, but most systems can power essential appliances for several hours to days. We help you prioritize which circuits to backup based on your needs.',
    },
  ];

  return (
    <PageWrapper>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 flex items-center overflow-hidden pt-32 bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <BatteryIcon className="w-8 h-8 text-primary" />
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Residential Battery Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-white">Battery Storage</span>
              <span className="block bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                for Your Home
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto font-light space-y-4"
            >
              <p>
                Store the energy your solar panels generate during the day and use it whenever you need it, even after the sun goes down. With intelligent battery storage, you can power your home using your own renewable energy around the clock and significantly reduce your reliance on the grid.
              </p>
              <p>
                There has never been a better time to invest in battery storage. Modern systems now allow you to take advantage of off-peak tariffs, charging your batteries at cheaper night-time rates and using that energy during the day. This means you can save money even in the winter months when sunlight hours are shorter.
              </p>
              <p>
                Our battery systems are designed for efficiency, safety, and long term performance, giving you complete control over how and when you use your energy. Paired with our advanced hybrid inverters from Hanchu, Fox ESS, EcoFlow, and Sigenergy, you can monitor, manage, and optimise your usage directly from your app for maximum savings and independence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="group relative px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base overflow-hidden"
                style={{
                  background: 'rgba(140, 198, 63, 0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(140, 198, 63, 0.3)',
                  boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center space-x-2 md:space-x-3">
                  <span className="tracking-wide text-white drop-shadow-lg">Get Free Quote</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300 text-white drop-shadow-lg" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Add Battery{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Storage</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Unlock the full potential of your solar energy system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed font-light">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Installation{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Seamless integration with your existing or new solar system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Battery Provider Cards Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-6">
                <BatteryIcon className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  Complete Energy Solutions
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Power Your{' '}
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Independence
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                We pair these panels with hybrid inverters and battery systems from Hanchu, Fox ESS, EcoFlow, and Sigenergy, creating powerful, future ready energy solutions that allow you to generate, store, and manage your own clean energy with ease.
              </p>
            </div>

            {/* Brand Partners Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  description: 'AI-empowered energy storage solutions with integrated hybrid inverters and battery systems for residential and commercial applications, delivering backup power and renewable energy optimization.',
                  logo: '/hanchu-logo.png',
                  url: 'https://www.hanchuess.com/',
                },
                {
                  description: 'Global leader in solar inverters and lithium battery storage systems, providing high-performance solutions for residential, commercial, and industrial energy needs worldwide.',
                  logo: '/foxess-logo.png',
                  url: 'https://www.fox-ess.com/',
                },
                {
                  description: 'World\'s leading portable power station and home battery storage specialist, offering solutions from compact emergency backup to complete off-grid energy systems.',
                  logo: '/ecoflow-logo-white.png',
                  url: 'https://www.ecoflow.com/',
                },
                {
                  description: '5-in-one energy storage system integrating solar inverter, EV charger, battery management, and AI optimization for next-generation home and business energy solutions.',
                  logo: '/sigenergy-logo-red.png',
                  url: 'https://www.sigenergy.com/en',
                },
              ].map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all"
                >
                  <div className="mb-6 h-24 flex items-center justify-center relative">
                    <Image
                      src={brand.logo}
                      alt="Brand logo"
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed font-light mb-6">
                    {brand.description}
                  </p>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-light text-sm font-medium transition-colors group"
                  >
                    <span>Visit Website</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {faq.question}
                </h3>
                <p className="text-white/70 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Store Your Energy?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                Get a free assessment and discover how battery storage can maximize your solar investment
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <Contact />

      <Footer />
    </PageWrapper>
  );
}
