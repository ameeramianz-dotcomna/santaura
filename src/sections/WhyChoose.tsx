import { motion, type Variants } from 'framer-motion';
import { Award, Zap, Compass, Heart } from 'lucide-react';

const VALUES = [
  {
    icon: Award,
    title: 'Extrait Concentration',
    description: 'Formulated at an exceptional 25% fragrance oil loading (Extrait de Parfum), ensuring a rich profile that adapts to skin chemistry.'
  },
  {
    icon: Zap,
    title: 'Extreme 12+ Hr Longevity',
    description: 'Engineered for exceptional performance. The base notes of Ambergris, Oakmoss, and Vanilla linger on skin and fabrics all day.'
  },
  {
    icon: Compass,
    title: 'Premium Sillage',
    description: 'Designed to project elegantly without overwhelming. Leaves a sophisticated scent trail that commands presence.'
  },
  {
    icon: Heart,
    title: 'Ethical Craftsmanship',
    description: 'We source only cruelty-free, sustainable fragrance oils, blending traditional French alchemy with modern clean science.'
  }
];

export default function WhyChoose() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="values" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-20">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              Uncompromising Quality
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide leading-tight">
              Why Choose <br />
              <span className="italic font-normal text-primary">SENTAURA</span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-body text-xs md:text-sm font-light leading-relaxed">
              Every detail of SENTAURA represents the pinnacle of luxury perfumery, combining hand-crafted precision with the world's most luxurious raw materials.
            </p>
          </div>
        </div>

        {/* Values Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VALUES.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                borderColor: 'rgba(212, 164, 74, 0.35)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
              }}
              className="bg-charcoal/50 backdrop-blur-sm p-8 border border-white/5 rounded-lg flex flex-col justify-between h-[320px] transition-all duration-300 group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded bg-primary/5 flex items-center justify-center border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <item.icon size={22} className="stroke-[1.5]" />
                </div>
                
                <h3 className="text-lg font-serif text-cream uppercase tracking-wide group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>

              <p className="text-muted text-xs md:text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
