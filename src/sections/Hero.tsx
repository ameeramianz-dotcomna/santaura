import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    // Create GSAP ScrollTrigger to track scroll progress and animate background layers
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        pin: container,
        pinSpacing: false,
      }
    });

    // Content fade-out animation
    if (contentRef.current) {
      scrollTl.to(contentRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none'
      }, 0);
    }

    // Scroll indicator fade-out animation
    if (indicatorRef.current) {
      scrollTl.to(indicatorRef.current, {
        opacity: 0,
        y: 20,
        ease: 'none'
      }, 0);
    }

    // 3D Background slider animation
    if (bg1Ref.current && bg2Ref.current && bg3Ref.current) {
      gsap.set([bg1Ref.current, bg2Ref.current, bg3Ref.current], {
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      });
      gsap.set(bg1Ref.current, { opacity: 1, scale: 1.0, z: 0, rotateY: 0, rotateX: 0 });
      gsap.set(bg2Ref.current, { opacity: 0, scale: 1.0, z: -150, rotateY: -15, rotateX: 10 });
      gsap.set(bg3Ref.current, { opacity: 0, scale: 1.1, z: -150, rotateY: -15, rotateX: 10 });

      scrollTl
        // Transition from layer 1 (1.png) to layer 2 (2.png)
        // Layer 1 zooms out from 1.0 to 0.9
        .to(bg1Ref.current, {
          opacity: 0,
          scale: 0.9,
          z: 150,
          rotateY: 15,
          rotateX: -10,
          duration: 1.0,
          ease: 'none'
        }, 0)
        // Layer 2 zooms in from 1.0 to 1.1
        .to(bg2Ref.current, {
          opacity: 1,
          scale: 1.1,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 1.0,
          ease: 'none'
        }, 0)

        // Hold middle state: Layer 2 continues to zoom in subtly from 1.1 to 1.12
        .to(bg2Ref.current, {
          scale: 1.12,
          duration: 0.5,
          ease: 'none'
        }, 1.0)

        // Transition from layer 2 (2.png) to layer 3 (3.png)
        // Layer 2 continues to scale up slightly as it leaves
        .to(bg2Ref.current, {
          opacity: 0,
          scale: 1.18,
          z: 150,
          rotateY: 15,
          rotateX: -10,
          duration: 1.0,
          ease: 'none'
        }, 1.5)
        // Layer 3 transitions in and zooms out from 1.1 to 1.0
        .to(bg3Ref.current, {
          opacity: 1,
          scale: 1.0,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 1.0,
          ease: 'none'
        }, 1.5)

        // Layer 3 zooms back in from 1.0 to 1.1 (completing the zoom out-in effect)
        .to(bg3Ref.current, {
          scale: 1.1,
          duration: 0.7,
          ease: 'power1.out'
        }, 2.5);
    }

    if (leftTextRef.current && rightTextRef.current) {
      gsap.set(leftTextRef.current, { opacity: 0, x: -80 });
      gsap.set(rightTextRef.current, { opacity: 0, x: 80 });

      scrollTl
        // Slide left text in as Layer 2 comes in
        .to(leftTextRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out'
        }, 0.3)

        // Slide left text out as Layer 2 transitions out
        .to(leftTextRef.current, {
          opacity: 0,
          x: -80,
          duration: 0.7,
          ease: 'power2.in'
        }, 1.5)

        // Slide right text in as Layer 3 comes in
        .to(rightTextRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out'
        }, 1.8);
    }

    return () => {
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 1.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <div ref={triggerRef} id="home" className="relative h-[300vh] bg-black">
      
      {/* Pinned Frame */}
      <div 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        
        {/* ── colour-normalising wrapper: single shared filter ── */}
        <div className="absolute inset-0 bg-stack z-0 pointer-events-none">
          <div 
            ref={bg1Ref} 
            className="bg-layer"
            style={{ backgroundImage: 'url("/hero section/1.png")' }}
          />
          <div 
            ref={bg2Ref} 
            className="bg-layer"
            style={{ backgroundImage: 'url("/hero section/2.png")' }}
          />
          <div 
            ref={bg3Ref} 
            className="bg-layer"
            style={{ backgroundImage: 'url("/hero section/3.png")' }}
          />
        </div>

        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        {/* Hero Content */}
        <div ref={contentRef} className="w-full z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center px-6 flex flex-col items-center"
          >
            <motion.span 
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.35em] text-primary font-bold mb-4 block animate-pulse"
            >
              Haute Parfumerie Niche
            </motion.span>
            
            <div className="overflow-hidden mb-6">
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-8xl font-serif font-light tracking-[0.2em] text-white leading-tight uppercase select-none"
              >
                SENTAURA
              </motion.h1>
            </div>

            <motion.div 
              variants={itemVariants}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
            />

            <div className="overflow-hidden mb-4">
              <motion.h2 
                variants={itemVariants}
                className="text-lg md:text-2xl font-serif text-cream italic tracking-wide font-light"
              >
                Luxury Inspired Fragrances
              </motion.h2>
            </div>

            <div className="overflow-hidden max-w-xl mb-10">
              <motion.p 
                variants={itemVariants}
                className="text-body text-xs md:text-sm max-w-lg mx-auto font-light leading-relaxed tracking-wide"
              >
                Crafted for those who appreciate timeless elegance and unforgettable presence. A blend of legendary inspiration and absolute purity.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
            >
              <a
                href="#collection"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300 shadow-lg shadow-primary/10 border border-primary"
              >
                Explore Collection
              </a>
              <a
                href="#notes"
                className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white text-white font-sans font-bold text-xs uppercase tracking-widest bg-transparent hover:bg-white/5 transition-all duration-300"
              >
                Discover Notes
              </a>
            </motion.div>
          </motion.div>
        </div>
        {/* Dynamic Scroll Text Elements for Layer 2 */}
        <div 
          ref={leftTextRef}
          className="absolute bottom-20 left-8 md:left-16 max-w-[280px] md:max-w-[360px] text-left z-20 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold block mb-1.5">
            High-Quality Ingredients
          </span>
          <p className="text-cream/80 text-[11px] md:text-xs font-light leading-relaxed">
            Carefully selected fragrance oils and ingredients ensure consistency, performance, and a premium longevity experience.
          </p>
        </div>

        <div 
          ref={rightTextRef}
          className="absolute bottom-20 right-8 md:right-16 max-w-[280px] md:max-w-[360px] text-right z-20 pointer-events-none"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold block mb-1.5">
            Long-Lasting Formula
          </span>
          <p className="text-cream/80 text-[11px] md:text-xs font-light leading-relaxed">
            Designed to provide up to 12 hours of lasting freshness under normal conditions.
          </p>
        </div>

        {/* Mouse Scroll Indicator */}
        <div
          ref={indicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-widest text-muted font-semibold">
            Scroll to discover
          </span>
          <div className="w-5 h-8 border border-white/25 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-1 h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
