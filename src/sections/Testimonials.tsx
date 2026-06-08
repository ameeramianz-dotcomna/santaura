import { motion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Alexander V.',
    role: 'Verified Collector',
    quote: 'SENTAURA is a masterwork. The opening pineapple is crisp and natural, transitioning into a smoky birch that commands absolute authority. The sillage is legendary.',
    rating: 5
  },
  {
    name: 'Eleanor K.',
    role: 'Fragrance Connoisseur',
    quote: 'Unlike other inspired blends, SENTAURA holds its ground with a heavy extrait concentration. It adapts beautifully to the skin, lingering past twelve hours easily.',
    rating: 5
  },
  {
    name: 'Marcus G.',
    role: 'Gentleman Buyer',
    quote: 'The atomizer dispersion is outstanding—delivering a micro-mist that feels incredibly premium. It is my absolute signature bottle for boardrooms and galas alike.',
    rating: 5
  }
];

export default function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section className="py-32 bg-black relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
            The Impressions
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide">
            Collector Feedback
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-charcoal/30 border border-white/5 p-8 rounded-lg flex flex-col justify-between space-y-8 relative hover:border-primary/20 transition-all duration-300"
            >
              <div className="space-y-4 text-left">
                {/* Rating stars */}
                <div className="flex text-primary">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary stroke-none" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-body text-xs md:text-sm font-light leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="text-left border-t border-white/5 pt-4 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-serif text-cream font-medium tracking-wide">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-muted tracking-wider uppercase font-sans">
                    {review.role}
                  </p>
                </div>
                <span className="text-[9px] text-primary font-sans font-bold tracking-widest uppercase">
                  VERIFIED BUYER
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
