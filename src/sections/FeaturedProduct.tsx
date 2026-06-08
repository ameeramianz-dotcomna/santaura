import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, RefreshCw } from 'lucide-react';

export default function FeaturedProduct() {
  const [selectedSize, setSelectedSize] = useState('100ML');
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <section id="collection" className="py-32 bg-black relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
            The Signature Blend
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide">
            Featured Masterpiece
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Product Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Premium Bottle Display */}
          <div className="relative flex justify-center items-center group">
            {/* Ambient Gold Glow Backdrop */}
            <div className="absolute w-[80%] aspect-square rounded-full bg-primary/5 blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
            
            <div className="w-full max-w-md aspect-[4/5] bg-black/35 border border-white/5 p-8 flex items-center justify-center rounded-lg overflow-hidden relative group/prod">
              {/* Luxury dark gradient overlay for text readability & bottle pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/25 z-10 pointer-events-none" />

              {/* Ambient Gold Glow Backdrop */}
              <div className="absolute w-[80%] aspect-square rounded-full bg-primary/5 blur-[100px] pointer-events-none group-hover/prod:bg-primary/10 transition-all duration-700 z-10" />

              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                src="/herosection/p1.png"
                alt="SCENTAURA Extrait de Parfum Bottle"
                className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] drop-shadow-[0_5px_15px_rgba(212,164,74,0.15)] transition-transform duration-700 z-20"
              />
              <span className="absolute top-6 left-6 text-[9px] font-sans tracking-[0.25em] text-primary font-bold border border-primary/20 px-3 py-1 bg-black/50 backdrop-blur-md z-30">
                LIMITED PRODUCTION
              </span>
            </div>
          </div>

          {/* Right: Purchase and Detail Panel */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-primary stroke-none" />
                  ))}
                </div>
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-muted">
                  5.0 (148 Reviews)
                </span>
              </div>

              <h3 className="text-4xl font-serif text-cream uppercase tracking-wide leading-tight">
                SCENTAURA <br />
                <span className="italic font-normal text-primary">Extrait de Parfum</span>
              </h3>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif text-cream">$125.00</span>
                <span className="text-xs text-muted line-through font-light">$175.00</span>
              </div>
            </div>

            <p className="text-body text-xs md:text-sm font-light leading-relaxed">
              Our signature scent profile blends the crisp brightness of ripe Pineapple and Bergamot with a smoky, rich heart of Birch and Patchouli. Grounded in luxurious Ambergris, Oakmoss, and Vanilla, SCENTAURA is the ultimate sensory statement of authority.
            </p>

            {/* Note tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Fruity', 'Smoky', 'Woody', 'Extrait concentration'].map((tag) => (
                <div 
                  key={tag}
                  className="bg-slate/30 border border-white/5 py-2 px-3 text-[10px] font-sans text-muted tracking-widest text-center uppercase rounded"
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <span className="text-[10px] font-sans tracking-widest text-muted font-bold uppercase block">
                Select Volume
              </span>
              <div className="flex gap-4">
                {['50ML', '100ML', '200ML'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-white/10 text-muted hover:border-white/30 hover:text-cream'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-primary text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent disabled:bg-primary/50 transition-colors duration-300 border border-primary cursor-pointer"
              >
                <ShoppingBag size={14} />
                <span>{isAdded ? 'Added to Collection' : 'Add to Collection'}</span>
              </button>

              <a
                href="#contact"
                className="sm:w-[180px] flex items-center justify-center py-4 border border-white/15 hover:border-white text-cream font-sans font-bold text-xs uppercase tracking-widest bg-transparent hover:bg-white/5 transition-all duration-300"
              >
                Inquire Bespoke
              </a>
            </div>

            {/* Shipping detail */}
            <div className="flex items-center gap-2 text-[10px] text-muted tracking-wide">
              <RefreshCw size={12} className="animate-spin-slow text-primary" />
              <span>Complimentary premium shipping & free returns included.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
