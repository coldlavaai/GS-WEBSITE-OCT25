'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

interface AboutData {
  _id?: string;
  _type?: string;
  heading?: string;
  content?: string;
  stats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
}

interface AboutProps {
  data?: AboutData;
}

const About = ({ data }: AboutProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const iconMap: Record<string, any> = {
    award: Award,
    users: Users,
    trending: TrendingUp,
    shield: Shield,
  };

  const stats = data?.stats?.map(stat => ({
    icon: iconMap[stat.icon] || Award,
    value: stat.value,
    label: stat.label,
  })) || [
    { icon: Award, value: '20+', label: 'Years Experience' },
    { icon: Users, value: '450+', label: 'Happy Customers' },
    { icon: TrendingUp, value: '1,750,000', label: 'Generated in 2025', unit: 'kWh' },
    { icon: Shield, value: '100%', label: 'Satisfaction Rate' },
  ];

  return (
    <section id="about" ref={ref} className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-8 md:px-12">
        <div className="grid lg:grid-cols-2 gap-14 md:gap-20 items-center">
          {/* Left Content - Stats Grid (appears second on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 md:gap-6 max-w-full order-2 lg:order-1"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                className="p-3 md:p-6 rounded-xl md:rounded-2xl border border-white/10 shadow-lg hover:shadow-[0_20px_60px_rgba(140,198,63,0.4)] hover:border-[#8cc63f]/50 w-full max-w-full overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.12) 100%), rgba(18, 18, 18, 0.75)',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div className="bg-[#8cc63f]/20 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-3">
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-[#8cc63f]" />
                </div>
                <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                  {stat.value}
                  {(stat as any).unit && (
                    <span className="text-sm md:text-lg font-semibold text-[#8cc63f] ml-1 md:ml-2">
                      {(stat as any).unit}
                    </span>
                  )}
                </div>
                <div className="text-white/70 font-medium text-[10px] md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Content - Text (appears first on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="text-[#8cc63f] font-semibold text-[10px] md:text-xs uppercase tracking-wider"
            >
              About Greenstar Solar
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 md:mt-4 mb-4 md:mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
              data-sanity={data?._id ? `${data._id}.heading` : undefined}
            >
              {data?.heading || 'Expert Advice And'}<br />
              <span className="text-[#8cc63f]">Outstanding Service</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="text-xs md:text-sm text-white/80 mb-4 md:mb-6 leading-relaxed"
              data-sanity={data?._id ? `${data._id}.content` : undefined}
            >
              {data?.content || "At Greenstar Solar, we're committed to making solar energy accessible and affordable for everyone. With over 20 years of experience, we've helped hundreds of homes and businesses transition to clean, renewable energy."}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="text-xs md:text-sm text-white/80 mb-6 md:mb-8 leading-relaxed"
            >
              We take a highly personalised approach with face to face consultations and ongoing support. Our goal is to design and install solar energy systems that perfectly match your unique energy needs, maximise efficiency, and deliver exceptional savings while minimising environmental impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              {[
                'Premium quality solar panels and equipment',
                'Comprehensive warranty and support',
                'Tailored solutions for your energy goals',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-1.5 h-1.5 bg-[#8cc63f] rounded-full"></div>
                  <span className="text-white/80 text-xs md:text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
