'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play, RefreshCw } from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  text: string;
  platform?: string;
  date?: string;
}

interface TestimonialsProps {
  data?: any[];
}

const Testimonials = ({ data }: TestimonialsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [liveGoogleReviews, setLiveGoogleReviews] = useState<Testimonial[]>([]);

  // Detect mobile screen size
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150); // 150ms debounce for resize
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Fetch live Google reviews on mount
  useEffect(() => {
    fetch('/api/reviews/google')
      .then(res => res.json())
      .then(data => {
        if (data.reviews?.length) {
          setLiveGoogleReviews(data.reviews);
        }
      })
      .catch(() => {}); // Silently fail - hardcoded reviews still show
  }, []);

  const reviewsPerPage = isMobile ? 4 : 9;

  // All 36 reviews - 16 Google + 20 Trustpilot mixed together
  const allReviews: Testimonial[] = [
    { name: 'Phill Ballard', rating: 5, text: 'Great service from beginning to end and at a great price. From Jon\'s initial visit through to install - Greenstar provided first rate service. Already self sufficient with excess sent to the grid!', platform: 'Google' },
    { name: 'Verified Customer', rating: 5, text: 'Fantastic experience from start to finish! Professional, friendly team. Excellent communication. Top-notch quality. Finished on time with no issues!', platform: 'Trustpilot' },
    { name: 'Steve Wolstenholme', rating: 5, text: '5 star treatment from start to finish, couldn\'t of asked for anything else.', platform: 'Google' },
    { name: 'Verified Customer', rating: 5, text: 'Greenstar were professional throughout. Kept us updated with the plan. Never put any pressure on us. Checked we are happy and helped set up the app.', platform: 'Trustpilot' },
    { name: 'Max Copeland', rating: 5, text: 'Very impressed with Greenstar Solar. Professional and efficient team. Installation was smooth and quick. Great price and couldn\'t be happier!', platform: 'Google' },
    { name: 'Kevin', rating: 5, text: 'Completely different from others - no hard sell! Speaking to knowledgeable technicians rather than salesmen. Installation in one day.', platform: 'Trustpilot' },
    { name: 'Martyn Brayshaw', rating: 5, text: 'Communication from start to finish has been exemplary. They explained everything in simple terms and made us feel confident.', platform: 'Google' },
    { name: 'Martyn and Ann', rating: 5, text: 'GreenStar Solar was superb. Explained processes clearly. Scaffolder and workmen all arrived on time. Completed within a day!', platform: 'Trustpilot' },
    { name: 'Jim Godfrey', rating: 5, text: 'Excellent service in all respects. Cost was less than expected. Only used less than a kilowatt of power since installation. Very pleased!', platform: 'Google' },
    { name: 'Ben', rating: 5, text: 'Great guys to deal with. Knowledgable and not a hard sell. System performed exactly as hoped. Install team were nice and tidy.', platform: 'Trustpilot' },
    { name: 'Simon Wright', rating: 5, text: 'Great experience working with Greenstar, good communication throughout and fitters were very clean and polite. Highly recommended.', platform: 'Google' },
    { name: 'Martin and Ann', rating: 5, text: 'Very smooth process from start to finish. Good advice, professional installation, very good communication throughout.', platform: 'Trustpilot' },
    { name: 'Daniel Blackman', rating: 5, text: 'Fantastic company! First class customer service continues after purchase. Big shout to Jack who is an absolute super star. Competitive pricing.', platform: 'Google' },
    { name: 'Olivia', rating: 5, text: 'As a business owner, switching to solar made sense. GreenStar made it easy. Already seeing benefits in reduced energy costs!', platform: 'Trustpilot' },
    { name: 'Yasmin Kingston', rating: 5, text: 'Had 6 quotes prior and this was the best by far! Already saving money in bills. 10/10 recommend. John and Jack are a great team!', platform: 'Google' },
    { name: 'Rikesh', rating: 5, text: 'Fair price, simple process. Jon explained everything clearly. Tobias kept things organized. Bills already dropping!', platform: 'Trustpilot' },
    { name: 'Ben Miles-Mathewson', rating: 5, text: 'Good comms throughout. Install team were really helpful and thorough. System working so well adding a second battery next week!', platform: 'Google' },
    { name: 'Meghan', rating: 5, text: 'Whole process was smooth and easy. Tobias and team were patient with our many questions and very reassuring. Don\'t hesitate!', platform: 'Trustpilot' },
    { name: 'David Payne', rating: 5, text: 'Absolutely first class from start to finish. Better than large nationals. Installation outperformed expectations. No hesitation in recommending!', platform: 'Google' },
    { name: 'Sri', rating: 5, text: 'Very professional service. Knowledgeable team that listened to our circumstances and needs. Extremely good value for money.', platform: 'Trustpilot' },
    { name: 'Tony Hamlett', rating: 5, text: 'First class service with no pressure sales. Installation completed in one day. System has been superb for one month now.', platform: 'Google' },
    { name: 'Verified Customer', rating: 5, text: 'They did such a good job! Great professional team, worked hard to get the job completed in a timely manner and efficiently.', platform: 'Trustpilot' },
    { name: 'Mark Diaper', rating: 5, text: 'Not the cheapest of 5 quotes but best value. Excellent equipment and aftercare. Installers were tidy and any snags resolved immediately.', platform: 'Google' },
    { name: 'Jim', rating: 5, text: 'Excellent explanation of system. Quote adjusted to my needs. Install was quick and well done. Already saving money!', platform: 'Trustpilot' },
    { name: 'Vulcan XH558', rating: 5, text: 'Jack, John, Tobias and engineers were brilliant. Professional with advice pre and post installation. Smooth and painless from start to finish.', platform: 'Google' },
    { name: 'Andy', rating: 5, text: 'Jack, John, Tobias and engineers were brilliant. Professional with advice pre and post installation. Smooth and painless!', platform: 'Trustpilot' },
    { name: 'Oliver', rating: 5, text: 'Excellent customer service. Jack and John were quick to respond and courteous. Any concerns resolved quickly and professionally.', platform: 'Google' },
    { name: 'Verified Customer', rating: 5, text: 'Found Alex really easy to deal with. No pushy tactics. Knows his stuff, seamless installation process and quality work all round.', platform: 'Trustpilot' },
    { name: 'Peter Lucas', rating: 5, text: 'Absolutely great company! 22 panel system installed in 2 days. Team were punctual, knowledgeable, polite and cleaned up everything.', platform: 'Google' },
    { name: 'Phill', rating: 5, text: 'Great price! Spoke to several companies - chose Greenstar as no1. Tom, Anthony and Ben completed first rate install. Self sufficient now!', platform: 'Trustpilot' },
    { name: 'Peter Lucas', rating: 5, text: 'Faultless installation. Small issue sorted immediately. Clean, tidy and professional. If I could give more stars I would!', platform: 'Trustpilot' },
    { name: 'Denise', rating: 5, text: 'Competitive quote, high standard work. Scaffolding removed in days not months! Already noticing significant energy savings.', platform: 'Trustpilot' },
    { name: 'Tony', rating: 5, text: 'Honest experienced local company with no pressure. Professional and straightforward. After a month I am delighted!', platform: 'Trustpilot' },
    { name: 'Leanne', rating: 5, text: 'Jon made sure I was comfortable with every decision. Tobias kept me updated from start to finish. Highly recommended!', platform: 'Trustpilot' },
    { name: 'Nigel', rating: 4, text: 'Very pleased with the product. Communication and face to face visits made the whole process easy. No hesitation to recommend.', platform: 'Trustpilot' },
  ];

  // Merge live Google reviews at the top, skip duplicates (match by name)
  const hardcodedNames = new Set(allReviews.map(r => r.name.toLowerCase()));
  const newLiveReviews = liveGoogleReviews.filter(
    r => !hardcodedNames.has(r.name.toLowerCase())
  );
  const mixedReviews = [...newLiveReviews, ...allReviews];
  const totalPages = Math.ceil(mixedReviews.length / reviewsPerPage);
  const currentReviews = mixedReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  // Auto-scroll through pages every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // Change page every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section ref={ref} id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent"></div>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent font-semibold text-sm uppercase tracking-[0.2em]">
              Testimonials
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent"></div>
          </motion.div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our{' '}
            <span className="bg-gradient-to-r from-accent via-primary-light to-accent bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            Real reviews from real homeowners who have made the switch with Green Star Solar
          </p>

          {/* Trust Badges */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white/80 font-semibold text-sm md:text-base">5.0 on Google</span>
                {liveGoogleReviews.length > 0 && (
                  <span className="flex items-center gap-1 bg-primary/20 text-primary text-[9px] font-semibold px-1.5 py-0.5 rounded-full border border-primary/30">
                    <RefreshCw className="w-2.5 h-2.5" />
                    LIVE
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-white/80 font-semibold text-sm md:text-base">4.8 on Trustpilot</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid - 2x2 on mobile, 3x3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {currentReviews.map((review, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg hover:shadow-[0_20px_50px_rgba(140,198,63,0.4)] transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

                {/* Quote icon - hidden on mobile for space */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity hidden md:flex">
                  <Quote className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex space-x-0.5 md:space-x-1 mb-2 md:mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3 md:line-clamp-4 group-hover:text-white transition-colors">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="pt-3 md:pt-4 border-t border-white/10">
                    <div className="font-semibold text-white text-xs md:text-sm mb-1">
                      {review.name}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/60 flex items-center gap-1 md:gap-2 flex-wrap">
                      <span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-medium ${
                        review.platform === 'Google'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {review.platform}
                      </span>
                      <a
                        href={review.platform === 'Google'
                          ? 'https://share.google/roGnZCbpn66Cm8GEX'
                          : 'https://www.trustpilot.com/review/greenstarsolar.co.uk'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[8px] md:text-[9px] text-white/40 hover:text-primary transition-colors underline"
                      >
                        View on {review.platform}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevPage}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 border-white/20 hover:border-primary/50 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page indicator */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all ${
                  index === currentPage
                    ? 'w-8 h-2 bg-gradient-to-r from-primary to-primary-light shadow-lg'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                } rounded-full`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAutoPlay}
            className={`backdrop-blur-xl text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 shadow-lg ${
              isAutoPlaying
                ? 'bg-primary/20 border-primary/50 hover:bg-primary/30'
                : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-primary/50'
            }`}
            title={isAutoPlaying ? 'Pause auto-scroll' : 'Resume auto-scroll'}
          >
            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextPage}
            className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all border-2 border-white/20 hover:border-primary/50 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { value: '55+', label: 'Verified Reviews' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '100%', label: 'Would Recommend' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-3">
                {stat.value}
              </div>
              <div className="text-white/70 text-xs md:text-sm font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
