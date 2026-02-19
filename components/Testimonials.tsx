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

  // All reviews - newest first. Google reviews also added automatically from live feed; archived here so they're never lost.
  const allReviews: Testimonial[] = [
    // --- Feb 2026 ---
    { name: 'Ashley Pentney', rating: 5, text: 'What a refreshing change to find a company who understand the importance of customer care, professionalism and communication! When we started on our solar journey we knew very little about it all but fortunately we found ourselves in the hands of Greenstar Solar. They were immediately very helpful and informative but with never a hint of hard sell. On the first visit, by Jon, we were given a detailed explanation of current solar technology, how it could benefit us and what our options were. The installation went really well and we now have a 16 panel system with 8kW battery storage. A great investment that cost less than we\'d expected. Our sincere thanks to Tobias, Craig, Jon, Jack and in particular to Anthony and Arthur. 10 out of 10 Greenstar – well deserved.', platform: 'Google', date: 'Feb 2026' },
    { name: 'Jennifer Abunaw', rating: 5, text: 'This November, Greenstar put in our solar panels, inverter, a pair of 5kWh batteries, and an EV charger. The whole process was outstanding. From the beginning to the end, Jack and Jon were impressively thorough, open, and helpful. They provided clear explanations about what the installation entailed and the expected performance. We encountered an unexpected challenge with the number of panels that could fit on our shared semidetached roof. Nevertheless, the team handled it quickly and professionally, suggesting an increase in battery capacity to balance the reduced energy generation. The installation, completed in just one day, was executed to a very high standard, leaving everything neat and tidy. Since becoming operational, our daily electricity expenses have significantly decreased. I highly recommend Greenstar for anyone thinking about solar.', platform: 'Trustpilot', date: 'Feb 2026' },
    { name: 'Duncan Hedges', rating: 5, text: 'I had a solar system installed by Greenstar in December 2025. The service prior to installation was top class with Greenstar doing what they said they were going to do when they said they would do it. On the day of installation everything went to plan and the whole system was installed in one day by a very efficient and friendly team. I noticed that the Battery was not performing as it should. Greenstar were able to monitor the performance and when they were unable to fix it remotely, they arranged to send one of their team around to get it sorted out. I am very impressed indeed with the service from Greenstar — the aftersales service being as good as the sales. Thank you Greenstar!', platform: 'Trustpilot', date: 'Feb 2026' },
    // --- Jan 2026 ---
    { name: 'I Nwachuku', rating: 5, text: 'Just a truly brilliant service. I had 3 quotes for solar panels however John from Greenstar solar just made the most sense for my house and system. The start up information John gave me was just what I needed to know and empowered me to completely challenge and then discard the other quotes. I now have a super 22 panel system and sigenergy battery working to perfection. Tom and the lads that came to install everything were brilliant. Also the aftercare support from Jack, Tobias and Craig made me feel very happy and supported. Well done Greenstar solar. Exemplary set up from start to finish.', platform: 'Trustpilot', date: 'Jan 2026' },
    { name: 'di b', rating: 5, text: 'Everyone in this company we have had contact with have been very professional, polite and very knowledgeable. We have had 21 solar panels and a battery fitted and have been supported all the way. Any pre or post installation queries we may have had, have been dealt with very promptly. We would definitely recommend this company. No hard sell involved. They aren\'t the cheapest company, but their passion and knowledge for the product has been outstanding and very reassuring.', platform: 'Trustpilot', date: 'Jan 2026' },
    { name: 'Paul C', rating: 5, text: 'Really clear no nonsense pre-sale. Clear updates running up to the installation. Professional installation and after sales care.', platform: 'Trustpilot', date: 'Jan 2026' },
    { name: 'John B', rating: 5, text: 'Greenstar provided a thoroughly professional service, focused on customer care. They took us through the process of installing and operating our new solar/battery system step by step, making the whole process smooth and easy to understand.', platform: 'Trustpilot', date: 'Jan 2026' },
    { name: 'Nina', rating: 5, text: 'Very good service, very happy with solar installation done.', platform: 'Trustpilot', date: 'Jan 2026' },
    { name: 'Michael Richards', rating: 5, text: 'All good from start to finish. Initial proposal was clear and informative. The pros and cons explained and the advantages of different options, technology, and equipment, all clearly set out. Having decided to go ahead — the process was clearly explained, and we felt fully supported. Communication was first class. The install and commissioning was faultless. A great on-site team. Professional, tidy and very respectful. I never give 5 stars. Over 40 odd years I cannot remember the last time. I am either going soft or I am extremely impressed. I suspect it is the latter. Greenstar solar are very, very good. If I were to do it all again I would — in a shot.', platform: 'Trustpilot', date: 'Jan 2026' },
    // --- Dec 2025 ---
    { name: 'David Milligan', rating: 5, text: 'For a start, Greenstar beat any other quote I received. I was not pressurised into buying anything and was given very good advice on what to buy and what I did not need. They only sold me items that would benefit my needs. I found the company both very professional and competent. The installation took 7 hours for a 24 panel system with battery/iBoost and emergency back up. The install crew were very good, clean tidy and friendly. The final handover was excellent and the whole system explained in great detail. Aftercare is a must for me and they have also been excellent in this department, no query or message has gone unanswered. I would highly recommend this company.', platform: 'Google', date: 'Dec 2025' },
    { name: 'Graham Poyser', rating: 5, text: 'Great service from Greenstar Solar! From consultation to installation, the whole process was smooth and professional. The team were knowledgeable, friendly, and explained everything clearly — including helping us choose the best energy tariff to maximise savings with our solar and battery system. Installation was quick, tidy, and on time. Highly recommend Greenstar Solar for anyone considering solar and battery storage!', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Nick Fry', rating: 5, text: 'Very confident and competitive company. Very easy people to deal with and honest on all levels. Jon was a very easy to talk to guy and explained everything to us even with the silly questions we asked. The fitting guys turned up on the day and got started straight away and to our amazement were done the same day. Very nice guys all of them. Jon came out later to show us how to use the app and set it up and explained that he will keep an eye on it all in case things change. Would highly recommend this company for their knowledge and professionalism.', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Ollie', rating: 5, text: 'Great service. Right through to the first consultation, through to install. Would recommend if you are looking for solar and battery storage.', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Iheanyi Nwachuku', rating: 5, text: 'Had a great experience with the team. They did a very professional job. I was very happy with the work, and I would certainly use them again.', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Anonymous', rating: 5, text: 'Great work delivered by Greenstar Solar. If it wasn\'t for their ability to think out of the box we couldn\'t have reached such a high quality level on the final result. Quite impressed.', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Koushik Chakrabarti', rating: 5, text: 'Greenstar team installed our solar panels, inverter, 2x 5kWh batteries and EV charger this November. The entire experience has been excellent. Jack and Jon were incredibly detailed, transparent and supportive from start to finish. They clearly explained what would be included in the installation and what performance to expect. The installation was complete within a day to a very high standard, with everything left clean and tidy. Since going live, our daily electricity costs have dropped significantly. Highly recommend Greenstar to anyone considering solar.', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Duncan Hedges', rating: 5, text: 'A truly inspiring experience! From the outset, the information given was clear and with no pressure. When they said they were going to do something they did it. Very efficient! The installation team were outstanding. The logistics, scaffolding, parts delivery etc, were all on time and enabled a seamless chain of events to get our system installed. All this for a very competitive price. The service level is worth more for peace of mind. Thank you Greenstar! I am already singing your praises.', platform: 'Trustpilot', date: 'Dec 2025' },
    { name: 'Peter Morris', rating: 5, text: 'Having made a decision to have solar panels installed and after researching providers I came across the Greenstar Solar website and made the initial enquiry by telephone. During the site visit all aspects of the solar panels, inverter and battery were clearly explained. Nothing was too much bother. Installation was seamless. The installation team led by Tom were brilliant. They knew their job and just got on with it. Would I recommend Greenstar Solar? Yes, without a doubt. They were clear in what they were doing, precise, concise, tidy and above all very professional.', platform: 'Trustpilot', date: 'Dec 2025' },
    // --- Nov 2025 ---
    { name: 'Nigel Bird', rating: 5, text: 'We used this company because of the way everything was presented to us, straight forward and very clearly laid out as to what we would be getting and what to expect once everything was up and running.', platform: 'Trustpilot', date: 'Nov 2025' },
    { name: 'Steven Kattenhorn', rating: 5, text: 'From start to finish, the experience with Greenstar was faultless. Jon, Jack, and the rest of the team were knowledgeable, friendly, and efficient. I\'m over the moon with the solar system installation.', platform: 'Trustpilot', date: 'Nov 2025' },
    { name: 'Mike Aiton', rating: 5, text: 'Greenstar Solar have completed my solar PV installation. John from Greenstar was fabulous to deal with. He very quickly understood my rationale and reasoning and spoke to me in the brief, clear and well argued science that I required. No hard sell, no pressure — just good engineering. The installation went very well, their crew were fast, tidy and a nice bunch of helpful chaps. Jack the office manager was always friendly and efficient. My neighbour (a very particular aerospace engineer) and I are very happy campers. A reasonably priced, efficient, knowledgeable and trustworthy company. Very happy to recommend highly.', platform: 'Trustpilot', date: 'Nov 2025' },
    { name: 'Paul Redding', rating: 5, text: 'Greenstar were excellent from start to finish. They were prompt in their responses and explained all details of the installation to me. They were the only company to actually visit my home as part of their quoting service and when asked questions they were quick and informative in their answers. They provided details of other customers that I could talk to. The installation was done and operating within a couple of hours. I would have no hesitation in recommending Greenstar.', platform: 'Trustpilot', date: 'Nov 2025' },
    // --- Oct 2025 ---
    { name: 'Bob & Lucy', rating: 5, text: 'Greenstar Solar was very competitive on price and their advice in person (rather than just by phone!) about the installation details and operation of the system was very clear and most helpful. At no time did we feel pressurised to accept their contract. Once installation was agreed the whole team — sales, scaffolders, installers and commissioning — was extremely professional and courteous and the workmanship and timeliness to the highest of standards. The team always explained everything very clearly without any jargon. We thoroughly recommend Greenstar Solar.', platform: 'Trustpilot', date: 'Oct 2025' },
    { name: 'David Cook', rating: 5, text: 'The whole experience with Greenstar Solar was simple and easy. Jon was great at the initial discussion about what we could achieve at our property. The installation team were faultless and everyone knew their job to a T. When we did have a small issue Tom was round the same night to resolve it. They provided a review of the system performance post installation and Jon explained the app setup for our SigGen system and created the program to suit our needs. His knowledge of everything to do with rates, providers, system requirements was second to none. Our system is great and I would certainly recommend them to anyone looking for a quality solar installation package.', platform: 'Trustpilot', date: 'Oct 2025' },
    { name: 'Anonymous', rating: 5, text: 'We have had our system since middle of February and could not be happier with the results so far. From the initial contact from Jon through to the installation and setup the whole team were so professional. I am writing this review now because I reached out to them today with a query and the response was almost immediate. I would have no hesitation in recommending them as the attention to detail was second to none. Other quotes we received were from suppliers who did not even visit the property!', platform: 'Trustpilot', date: 'Oct 2025' },
    { name: 'Mark Collins', rating: 5, text: 'A pleasure to deal with. All the staff were friendly, knowledgeable and helpful throughout the process from initial enquiry to installation and final handover. We are delighted with the system and seeing major savings already even before being paid for exporting energy.', platform: 'Trustpilot', date: 'Oct 2025' },
    { name: 'Barbara Hutchins', rating: 5, text: 'Nice people who gave good advice and at a reasonable price. I\'m very happy with my installation.', platform: 'Trustpilot', date: 'Oct 2025' },
    { name: 'Debbie Urquhart', rating: 5, text: 'We were wanting panels for a while, but never got around to it as we didn\'t want to sit with a company for hours and listen. From the start Greenstar were great, communication was prompt, explanation of how it all works, and led us all the way step by step. When the fitters arrived they were amazing, they knew their business and were happy to find solutions. They worked long days and were polite and friendly. All in all a very pleasant experience and would recommend the company.', platform: 'Trustpilot', date: 'Oct 2025' },
    { name: 'Alan', rating: 5, text: 'I had been exploring Solar Installation for many months and experienced so many hard sells. My first call with Jack and Jon at Greenstar was completely different. It was clear from the outset that Greenstar was different — speaking to knowledgeable technicians rather than salesmen. They quoted for a much better system at a very reasonable price. From this moment to installation was seamless. Everything went exactly as they told me. The tradesmen that did the installation in just one day were equally dependable, polite and efficient. Jack contacted me after installation and assured me that he was available if I needed any post installation advice. I very highly recommend Greenstar to anyone interested in Solar installation.', platform: 'Trustpilot', date: 'Oct 2025' },
    // --- Existing reviews (Aug–Oct 2025) ---
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
    // --- Jun–Aug 2025 ---
    { name: 'Aaron R', rating: 5, text: 'Absolutely brilliant service from the guys on the team! Thank you!', platform: 'Trustpilot', date: 'Jun 2025' },
    // --- Apr 2025 ---
    { name: 'Paul Gregory', rating: 5, text: 'An incredible company to do business with. Their word is their bond. From the discussion of the best system needed based on energy usage to installation and then the aftercare — every step without exception has been first class.', platform: 'Trustpilot', date: 'Apr 2025' },
    // --- Mar 2025 ---
    { name: 'Brenda', rating: 5, text: 'If you are thinking about having Solar then look no further. Their service before installation was excellent — kept you informed of what was happening. On installation day the three installers we had were extremely polite and helpful young men. When it was finished they left everywhere spotless. So far the after care has been excellent. Would definitely recommend the company without any hesitation.', platform: 'Trustpilot', date: 'Mar 2025' },
    { name: 'Ronnie', rating: 5, text: 'Greenstar Solar has provided excellent consultancy advice in providing us the best option for installing solar specifically based on our property. They have managed the entire installation, and we have been very impressed with their work and the way they go about dealing with us in terms of keeping us updated all the time. The time-frame of the enabling solar has been done very smoothly and quickly without sacrificing quality. Highly recommended. Thanks Greenstar Solar!', platform: 'Trustpilot', date: 'Mar 2025' },
    { name: 'Daniel Blackman', rating: 5, text: 'Fantastic company and couldn\'t rate highly enough. I wasn\'t sure what solar plan I was after but the helpful team at Greenstar provided great expertise and knowledge to deliver a solution that I\'m delighted with. The customer service is first class — with other companies the service decreases once you\'ve made a purchase but Greenstar are fantastic and always very responsive. Big shout to Jack who is an absolute super star. If you\'re thinking of getting solar then go with Greenstar, couldn\'t be happier and competitive pricing.', platform: 'Trustpilot', date: 'Mar 2025' },
    // --- Dec 2024 ---
    { name: 'Tom Gannaway', rating: 5, text: 'I recently had solar panels installed by Greenstar Solar, and I\'m extremely impressed with their service. The team was professional, efficient, and took the time to explain all my options. The installation was quick and clean, and I\'ve already noticed a significant drop in my energy bills. Their customer service has been excellent, and I highly recommend Greenstar to anyone considering solar energy!', platform: 'Trustpilot', date: 'Dec 2024' },
    // --- Nov 2024 ---
    { name: 'Sarah P', rating: 5, text: 'Greenstar has been excellent from start to finish. Jon provided a very informative consultation and exceptional aftercare service, guiding us on how to use the app and assisting with any technical questions we had. Tom and the installation team were polite, professional, and maintained clear communication throughout the entire process, ensuring everything went smoothly. We are extremely pleased and would highly recommend Greenstar as a company that truly goes the extra mile.', platform: 'Trustpilot', date: 'Nov 2024' },
  ];

  // Merge live Google reviews at the top, skip duplicates (match by name + first 30 chars of text)
  const hardcodedKeys = new Set(allReviews.map(r => r.name.toLowerCase() + r.text.slice(0, 30).toLowerCase()));
  const newLiveReviews = liveGoogleReviews.filter(
    r => !hardcodedKeys.has(r.name.toLowerCase() + r.text.slice(0, 30).toLowerCase())
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
