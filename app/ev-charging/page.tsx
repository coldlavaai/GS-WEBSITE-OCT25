'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingDown, Shield, Home, CheckCircle, ArrowRight, Plug, Award, Leaf, Sun } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Contact from '@/components/Contact';
import BatteryIcon from '@/components/icons/BatteryIcon';

export default function EVCharging() {


  return (
    <PageWrapper>
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 flex items-center overflow-hidden pt-32 bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-3 mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Plug className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Smart EV Charging Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-white">EV Charging</span>
              <span className="block bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Powered by Solar
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-4xl mx-auto mb-10"
            >
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                Charge your electric vehicle with free solar energy. Our smart EV charging solutions integrate seamlessly with your solar and battery system, prioritising solar power to charge your car for pennies instead of pounds.
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

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/#systems"
                className="backdrop-blur-xl bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-base border-2 border-white/20 hover:border-primary/50 transition-all shadow-xl"
              >
                ← Back to Systems
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Charger Showcase */}
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Premium Charger Feature */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 p-12 md:p-16">
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div className="inline-flex items-center space-x-2 mb-6">
                      <Award className="w-6 h-6 text-primary" />
                      <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                        Intelligent Solar Charging
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      Zappi{' '}
                      <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                        Smart EV Charger
                      </span>
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
                      Our installations feature the Zappi smart EV charger, the UK's leading solar-compatible home charging solution. The Zappi intelligently monitors your solar generation and diverts excess energy to charge your electric vehicle, maximising the use of free solar power and minimising grid consumption.
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                      Available in both <span className="text-primary font-semibold">tethered and untethered</span> options with charging speeds up to <span className="text-primary font-semibold">7.4kW</span>, the Zappi works seamlessly with your existing solar and battery system to deliver the greenest, most cost-effective charging experience possible.
                    </p>
                  </motion.div>
                </div>

                {/* Specs Highlight */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col justify-center space-y-6"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-xl rounded-2xl p-8 border border-primary/20">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Zap className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          7.4kW
                        </div>
                        <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                          Fast Charging
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Charge your EV up to 4x faster than a standard plug
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Sun className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          100%
                        </div>
                        <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                          Solar Compatible
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Intelligently uses your solar generation to charge your car
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Shield className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          3 Year
                        </div>
                        <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
                          Warranty
                        </div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Full manufacturer warranty with expert support
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
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
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-6">
                <Leaf className="w-6 h-6 text-primary" />
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  Solar-Powered Transport
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Drive on{' '}
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Sunshine
                </span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                Combining solar panels, battery storage, and smart EV charging creates the ultimate sustainable transport solution. Generate your own electricity, store it for later, and use it to power your journeys—all while saving money and reducing your carbon footprint.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingDown,
                  title: 'Massive Savings',
                  description: 'Charge your EV for as little as 2p per mile using free solar energy instead of expensive grid electricity',
                },
                {
                  icon: Sun,
                  title: 'Solar Priority',
                  description: 'Zappi automatically prioritises solar power, only using grid electricity when solar isn\'t available',
                },
                {
                  icon: BatteryIcon,
                  title: 'Battery Integration',
                  description: 'Works seamlessly with home batteries to charge your car overnight using stored solar energy',
                },
                {
                  icon: Zap,
                  title: 'Fast & Flexible',
                  description: 'Charge at speeds up to 7.4kW with three modes: Fast, Eco, and Eco+',
                },
                {
                  icon: Home,
                  title: 'Smart Home Ready',
                  description: 'Monitor and control charging via the myenergi app from anywhere',
                },
                {
                  icon: Leaf,
                  title: 'Zero Carbon',
                  description: 'Drive completely emission-free by powering your EV with 100% renewable solar energy',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all hover:shadow-[0_20px_60px_rgba(140,198,63,0.3)]"
                >
                  <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                How{' '}
                <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  It Works
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  number: '01',
                  title: 'Solar Generation',
                  description: 'Your solar panels generate electricity throughout the day',
                },
                {
                  number: '02',
                  title: 'Smart Diversion',
                  description: 'Zappi monitors your solar production and home consumption in real-time',
                },
                {
                  number: '03',
                  title: 'Automatic Charging',
                  description: 'Excess solar energy is automatically diverted to charge your EV',
                },
                {
                  number: '04',
                  title: 'Battery Backup',
                  description: 'When the sun sets, your home battery can continue charging your car overnight',
                },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
                >
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-bold w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl">
                    <span>{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      {step.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Ready to charge your EV with{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                free solar energy?
              </span>
            </h2>
            <p className="text-xl text-white/70 mb-10 font-light leading-relaxed">
              Get a free quote for a complete solar, battery, and EV charging system tailored to your needs
            </p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-block relative px-6 py-3 md:px-12 md:py-5 rounded-full font-semibold text-sm md:text-lg overflow-hidden"
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
                <span className="tracking-wide text-white drop-shadow-lg">Book Your Free Survey</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <Contact />

      <Footer />
    </PageWrapper>
  );
}
