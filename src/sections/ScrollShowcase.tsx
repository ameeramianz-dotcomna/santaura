import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StageData {
  title: string;
  subtitle: string;
  description: string;
  side: 'left' | 'right';
  badge: string;
}

const STAGES: StageData[] = [
  {
    badge: 'CONCEPT I',
    title: 'Premium',
    subtitle: 'Atomizer Spray',
    description: 'Engineered with a fine-mist custom atomizer that delivers smooth, even coverage for a luxurious application every time.',
    side: 'left'
  },
  {
    badge: 'CONCEPT II',
    title: 'High-Quality',
    subtitle: 'Ingredients',
    description: 'Carefully selected fragrance oils and ingredients ensure consistency, performance, and a premium longevity experience that clings to pulse points.',
    side: 'right'
  },
  {
    badge: 'CONCEPT III',
    title: 'Inspired by a',
    subtitle: 'Legendary Fragrance',
    description: "Experience a bold and sophisticated scent inspired by one of the world's most admired fragrance profiles. A tribute to modern charisma.",
    side: 'left'
  }
];

export default function ScrollShowcase() {
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    // Create GSAP ScrollTrigger to track scroll progress and update active state
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Determine active stage based on scroll progress
          if (progress < 0.33) {
            setActiveStage(0);
          } else if (progress >= 0.33 && progress < 0.66) {
            setActiveStage(1);
          } else {
            setActiveStage(2);
          }
        }
      }
    });

    // Animate the background layers in 3D on scroll
    if (bg1Ref.current && bg2Ref.current && bg3Ref.current) {
      gsap.set([bg1Ref.current, bg2Ref.current, bg3Ref.current], {
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      });
      gsap.set(bg1Ref.current, { opacity: 1, scale: 1, z: 0, rotateY: 0, rotateX: 0 });
      gsap.set(bg2Ref.current, { opacity: 0, scale: 1.15, z: -150, rotateY: -15, rotateX: 10 });
      gsap.set(bg3Ref.current, { opacity: 0, scale: 1.15, z: -150, rotateY: -15, rotateX: 10 });

      scrollTl
        // Transition from bg1 (p3) to bg2 (p2)
        .to(bg1Ref.current, {
          opacity: 0,
          scale: 0.85,
          z: 150,
          rotateY: 15,
          rotateX: -10,
          ease: 'none'
        }, 0)
        .to(bg2Ref.current, {
          opacity: 1,
          scale: 1,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          ease: 'none'
        }, 0)

        // Hold bg2 state
        .to({}, { duration: 0.5 })

        // Transition from bg2 (p2) to bg3 (p1)
        .to(bg2Ref.current, {
          opacity: 0,
          scale: 0.85,
          z: 150,
          rotateY: 15,
          rotateX: -10,
          ease: 'none'
        }, 1.5)
        .to(bg3Ref.current, {
          opacity: 1,
          scale: 1,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          ease: 'none'
        }, 1.5);
    }

    return () => {
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} id="showcase" className="relative h-[300vh] bg-black">
      
      {/* Sticky Frame */}
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        
        {/* Luxury Fixed Background Glows */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-[30%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-secondary/5 blur-[120px] glow-effect" />
          <div className="absolute bottom-[30%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[140px] glow-effect" />
        </div>

        {/* ── colour-normalising wrapper: single shared filter ── */}
        <div className="absolute inset-0 bg-stack z-0 pointer-events-none">
          <div 
            ref={bg1Ref} 
            className="bg-layer"
            style={{ 
              backgroundImage: `url(${isMobile ? '/herosection/p3 (2).png' : '/herosection/p3.png'})`,
              backgroundSize: isMobile ? '70% auto' : 'cover'
            }}
          />
          <div 
            ref={bg2Ref} 
            className="bg-layer"
            style={{ 
              backgroundImage: `url(${isMobile ? '/herosection/p2 (2).png' : '/herosection/p2.png'})`,
              backgroundSize: isMobile ? '70% auto' : 'cover'
            }}
          />
          <div 
            ref={bg3Ref} 
            className="bg-layer"
            style={{ 
              backgroundImage: `url(${isMobile ? '/herosection/p1 (2).png' : '/herosection/p1.png'})`,
              backgroundSize: isMobile ? '70% auto' : 'cover'
            }}
          />
        </div>

        {/* Apple Style Scroll Content Container */}
        <div className="relative w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-center z-20">
          
          {/* Text overlays that toggle based on active index */}
          <div className="relative w-full h-full flex items-center justify-between">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const isLeft = stage.side === 'left';

              return (
                <div 
                  key={idx}
                  className={`absolute w-full max-w-xs md:max-w-md pointer-events-none flex flex-col justify-center ${
                    isLeft 
                      ? 'left-0 md:left-6 text-left items-start' 
                      : 'right-0 md:right-6 text-right items-end'
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ 
                          opacity: 0, 
                          x: isLeft ? -50 : 50 
                        }}
                        animate={{ 
                          opacity: 1, 
                          x: 0 
                        }}
                        exit={{ 
                          opacity: 0, 
                          x: isLeft ? -50 : 50 
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-auto bg-black/40 backdrop-blur-md p-6 border border-white/5 rounded-lg max-w-sm md:max-w-md space-y-4"
                      >
                        <span className="text-[10px] font-sans tracking-[0.3em] text-primary font-bold">
                          {stage.badge}
                        </span>
                        
                        <h3 className="text-3xl md:text-5xl font-serif text-cream font-light leading-tight">
                          {stage.title} <br />
                          <span className="italic font-normal text-primary">
                            {stage.subtitle}
                          </span>
                        </h3>
                        
                        <p className="text-body font-light leading-relaxed text-xs md:text-sm">
                          {stage.description}
                        </p>
                        
                        <div className={`w-12 h-[2px] bg-primary ${isLeft ? '' : 'ml-auto'}`} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* Scroll Progress Bar Right side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6">
          {STAGES.map((_, idx) => (
            <div 
              key={idx}
              className={`w-[3px] transition-all duration-500 rounded-full ${
                activeStage === idx 
                  ? 'h-8 bg-primary shadow-lg shadow-primary/40' 
                  : 'h-4 bg-white/20'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
