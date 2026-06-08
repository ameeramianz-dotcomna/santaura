import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section id="story" className="py-32 bg-black relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/3 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/3 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-24">
        
        {/* Story Intro Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              The Genesis
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-cream font-light uppercase tracking-wide leading-tight">
              Crafting the Essence of <br />
              <span className="italic font-normal text-primary">Absolute Sophistication</span>
            </h2>
            <div className="w-20 h-[1px] bg-primary" />
            <div className="space-y-4 text-body text-xs md:text-sm font-light leading-relaxed">
              <p>
                SENTAURA was born from a singular pursuit: to capture the ultimate projection of elegance and memory. Inspired by the legendary notes profiles that have defined generations, we sought to build a fragrance that represents the absolute apex of performance and olfactory art.
              </p>
              <p>
                Every single blend is curated and hand-bottled in limited batches, ensuring that the unique complexity of the crisp pineapple opening, warm birch core, and premium ambergris sillage remains pristine. SENTAURA is not merely a fragrance; it is a signature of authority.
              </p>
            </div>
          </div>

          {/* Model Image */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-primary/10 blur-[80px] pointer-events-none group-hover:bg-primary/15 transition-all duration-700" />
            
            <div className="relative aspect-[4/5] overflow-hidden border border-white/5 bg-charcoal rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
              <motion.img
                initial={{ scale: 1.05, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                src="/model/p4.png"
                alt="SENTAURA Brand Model Portrait"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 z-20 text-left">
                <span className="text-[10px] font-sans tracking-[0.2em] text-primary font-bold uppercase">
                  SENTAURA Homme
                </span>
                <h4 className="text-lg font-serif text-cream uppercase font-light">
                  A Bold Stature
                </h4>
              </div>
            </div>
          </div>

        </div>

        {/* Founder Tribute Section */}
        <div className="border-t border-white/5 pt-20 text-center max-w-4xl mx-auto space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
            A Message From The Curator
          </span>
          
          <h3 className="text-3xl md:text-5xl font-serif text-cream uppercase font-light tracking-wide leading-tight">
            Ameer Ashiq
          </h3>
          
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          
          <p className="text-cream text-sm md:text-lg italic font-light max-w-2xl mx-auto leading-relaxed">
            "SENTAURA represents the summit of fragrance creation—bold ingredients, timeless sillage, and hand-finished glass design. Formulated to declare a sophisticated presence that lingers forever."
          </p>
          
          <div className="space-y-1">
            <p className="text-[10px] text-primary font-sans font-bold uppercase tracking-[0.3em]">
              Founder & Master Perfumer
            </p>
            <p className="text-[9px] text-muted font-sans uppercase tracking-widest">
              Built by Ameer Ashiq
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
