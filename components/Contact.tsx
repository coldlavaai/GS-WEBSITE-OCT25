'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
  consent: boolean;
}

interface ContactData {
  _id?: string;
  _type?: string;
  heading?: string;
  subheading?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ContactProps {
  data?: ContactData;
}

const Contact = ({ data }: ContactProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Prevent double submissions
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error submitting your form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: data?.phone || '023 8212 3763',
      link: `tel:${(data?.phone || '02382123763').replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Email',
      content: data?.email || 'info@greenstarsolar.co.uk',
      link: `mailto:${data?.email || 'info@greenstarsolar.co.uk'}`,
    },
    {
      icon: MapPin,
      title: 'Location',
      content: data?.address || 'United Kingdom',
      link: '#',
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Get In Touch
            </span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
            data-sanity={data?._id ? `${data._id}.heading` : undefined}
          >
            {data?.heading || 'Book Your'}{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Free Survey</span>
          </h2>
          <p
            className="text-xs md:text-sm lg:text-base text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4"
            data-sanity={data?._id ? `${data._id}.subheading` : undefined}
          >
            {data?.subheading || 'Ready to make the switch to solar? Contact us today for a free consultation and site assessment'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Let's Start Your <span className="text-[#8cc63f]">Solar Journey</span>
              </h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 font-light">
                Our team of experts is ready to help you transition to clean, renewable energy. Get in touch for a free, no-obligation consultation.
              </p>
            </div>

            {/* Contact Cards - Premium styling */}
            <div className="space-y-3 md:space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-3 md:space-x-5 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-[0_20px_60px_rgba(140,198,63,0.3)] hover:border-primary/50 transition-all border border-white/10"
                >
                  <div className="bg-gradient-to-br from-accent/20 to-primary/20 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-white/50 font-medium uppercase tracking-wider">{info.title}</div>
                    <div className="text-white font-semibold text-xs md:text-sm">{info.content}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Benefits List - Premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary via-primary-dark to-primary rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 relative z-10" style={{ fontFamily: 'var(--font-heading)' }}>Why Choose Us?</h4>
              <ul className="space-y-3 md:space-y-4 relative z-10">
                {[
                  'Free site assessment & consultation',
                  'Transparent pricing with no hidden costs',
                  '25 year warranty on all installations',
                  'Expert advice & ongoing support',
                ].map((benefit, idx) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-start space-x-2 md:space-x-3 text-xs md:text-sm font-light"
                  >
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {/* Form Description */}
            <div className="mb-6 md:mb-8">
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Fill out the form below and someone from our team will get back to you within 24 hours.
                Just give us your details and a little bit of information about how we can help you with your solar journey.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 flex-grow">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/30 outline-none transition-all text-white placeholder:text-white/40"
                      placeholder="John Smith"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/30 outline-none transition-all text-white placeholder:text-white/40"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/30 outline-none transition-all text-white placeholder:text-white/40"
                      placeholder="07123 456789"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Postcode Field */}
                  <div>
                    <label htmlFor="postcode" className="block text-sm font-semibold text-white mb-2">
                      Postcode *
                    </label>
                    <input
                      {...register('postcode', { required: 'Postcode is required' })}
                      type="text"
                      id="postcode"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/30 outline-none transition-all text-white placeholder:text-white/40"
                      placeholder="SW1A 1AA"
                    />
                    {errors.postcode && (
                      <p className="mt-1 text-sm text-red-400">{errors.postcode.message}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                      Message
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/30 outline-none transition-all resize-none text-white placeholder:text-white/40"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* GDPR Consent Checkbox */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <input
                        {...register('consent', {
                          required: 'You must agree to the Privacy Policy to submit this form'
                        })}
                        type="checkbox"
                        className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/10 text-[#8cc63f] focus:ring-2 focus:ring-[#8cc63f]/30 cursor-pointer flex-shrink-0"
                        style={{
                          accentColor: '#8cc63f'
                        }}
                      />
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                        I agree to the{' '}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8cc63f] hover:underline font-semibold"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Privacy Policy
                        </a>{' '}
                        and consent to Greenstar Solar processing my personal data to respond to my enquiry. *
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-2 text-sm text-red-400 ml-8">{errors.consent.message}</p>
                    )}
                  </div>

                  {/* Submit Button - Premium glassmorphism styling with instant feedback */}
                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 12px 48px rgba(140, 198, 63, 0.3)' } : {}}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-ripple w-full py-3 md:py-4 rounded-xl font-semibold text-xs md:text-sm transition-all duration-150 flex items-center justify-center space-x-2 md:space-x-3 relative overflow-hidden group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    style={{
                      background: 'rgba(140, 198, 63, 0.15)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(140, 198, 63, 0.3)',
                      boxShadow: '0 8px 32px rgba(140, 198, 63, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                    )}
                    <motion.span
                      className="relative z-10 tracking-wide text-white drop-shadow-lg"
                      initial={false}
                      animate={{ opacity: isSubmitting ? 0.7 : 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.span>
                    {!isSubmitting && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Send className="w-4 h-4 md:w-5 md:h-5 relative z-10 text-white drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    )}
                    {isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"
                      />
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-20 h-20 bg-[#8cc63f] rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Thank You!</h3>
                  <p className="text-white/80">
                    We've received your message and will get back to you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
