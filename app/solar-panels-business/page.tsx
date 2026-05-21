'use client';

import { motion } from 'framer-motion';
import { Building2, TrendingDown, Shield, Zap, Target, Award, Leaf, Users, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Contact from '@/components/Contact';

export default function SolarPanelsBusiness() {


  const benefits = [
    {
      icon: TrendingDown,
      title: 'Reduce Operating Costs',
      description: 'Cut electricity bills by up to 75% and improve your bottom line with commercial solar',
    },
    {
      icon: Target,
      title: 'Achieve Sustainability Goals',
      description: 'Meet corporate sustainability targets and reduce your carbon footprint significantly',
    },
    {
      icon: Award,
      title: 'Enhanced Brand Value',
      description: 'Demonstrate environmental leadership and attract eco-conscious customers',
    },
    {
      icon: Shield,
      title: 'Energy Price Protection',
      description: 'Lock in energy costs and protect against rising electricity prices',
    },
    {
      icon: Users,
      title: 'Tax Incentives',
      description: 'Benefit from accelerated capital allowances and business energy schemes',
    },
    {
      icon: Zap,
      title: 'Scalable Solutions',
      description: 'Flexible systems that grow with your business needs and energy demands',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Business Consultation',
      description: 'We analyze your energy consumption, costs, and facility to design the optimal system',
    },
    {
      number: '02',
      title: 'Custom Proposal',
      description: 'Detailed ROI analysis, financing options, and system specifications tailored to your business',
    },
    {
      number: '03',
      title: 'Professional Installation',
      description: 'Minimal disruption to operations with scheduled installation by certified commercial teams',
    },
    {
      number: '04',
      title: 'Monitoring & Maintenance',
      description: 'Ongoing performance monitoring and maintenance to maximize your investment',
    },
  ];

  const faqs = [
    {
      question: 'What is the typical ROI for commercial solar?',
      answer: 'Most businesses see a return on investment within 5-8 years. With 25+ year system lifespans, this means 15-20 years of significant energy savings.',
    },
    {
      question: 'How much roof space do I need?',
      answer: 'A typical 50kW commercial system requires approximately 250-300 square meters. We can design systems for various roof sizes and configurations, including ground-mounted options.',
    },
    {
      question: 'Will installation disrupt business operations?',
      answer: 'We schedule installations to minimize disruption, often working outside business hours or in phases. Most installations are completed within 1-4 weeks depending on system size.',
    },
    {
      question: 'What financing options are available?',
      answer: 'We offer multiple financing options including outright purchase, business loans, and Power Purchase Agreements (PPAs) where we install at no upfront cost and you buy the power.',
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
              <Building2 className="w-8 h-8 text-primary" />
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
                Commercial Solar Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-white">Solar Panels</span>
              <span className="block bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                for Your Business
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto font-light space-y-4"
            >
              <p>
                Power your business with clean, renewable energy and take control of rising electricity costs. Our commercial solar systems are designed to deliver long term savings, strengthen your sustainability credentials, and enhance energy independence.
              </p>
              <p>
                We work with businesses of all sizes to create tailored systems that reduce operating expenses and protect against unpredictable energy prices. Each installation is engineered for efficiency, reliability, and return on investment, helping you turn unused roof space into a valuable financial asset.
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
                  <span className="tracking-wide text-white drop-shadow-lg">Get Free Assessment</span>
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
              Why Businesses Choose{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Solar Energy</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Strategic investment that delivers immediate and long-term value
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
              Our Commercial{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
              Streamlined approach designed for business efficiency
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
                Transform Your Business Energy
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                Schedule a free commercial energy assessment and discover your savings potential
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-flex items-center space-x-3 bg-white text-primary px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                <span>Request Consultation</span>
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
