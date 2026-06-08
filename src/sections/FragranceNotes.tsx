import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScentNote {
  name: string;
  color: string;
  description: string;
}

const TOP_NOTES: ScentNote[] = [
  { name: 'Pineapple', color: '#F2C94C', description: 'Brings a bright, tropical juiciness with rich, sweet undertones.' },
  { name: 'Bergamot', color: '#FFD166', description: 'Delivers a crisp, citrus opening that is both refreshing and complex.' },
  { name: 'Blackcurrant', color: '#2D1B3D', description: 'Adds a dark, tangy, berry richness that gives depth to the opening.' },
  { name: 'Apple', color: '#7A8B52', description: 'Introduces a clean, crisp, fruity brightness that energizes the scent.' }
];

const HEART_NOTES: ScentNote[] = [
  { name: 'Birch', color: '#8B6A4F', description: 'Infuses a smoky, dry leather, and woody profile that defines the core.' },
  { name: 'Patchouli', color: '#2A2A2A', description: 'Lends an earthy, dark, and exotic herbaceous quality to the heart.' },
  { name: 'Moroccan Jasmine', color: '#F7F3EB', description: 'Spreads a rich, opulent, white floral sweet sillage.' },
  { name: 'Rose', color: '#D8A7A7', description: 'Contributes a soft, romantic, slightly spicy floral character.' }
];

const BASE_NOTES: ScentNote[] = [
  { name: 'Musk', color: '#FFFFFF', description: 'Creates a clean, powdery, skin-like sensuality that anchors the blend.' },
  { name: 'Oakmoss', color: '#7A8B52', description: 'Anchors the scent with forest-like green earthiness and damp woody details.' },
  { name: 'Ambergris Accord', color: '#B87A1E', description: 'Delivers a salty, warm, oceanic, and mineral-like longevity.' },
  { name: 'Vanilla', color: '#F5E6B3', description: 'Provides a creamy, sweet, cozy warmth that rounds out the ending.' }
];

export default function FragranceNotes() {
  const [selectedNote, setSelectedNote] = useState<ScentNote | null>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop: Pinned 3D slider background transition driven by scroll position (bg1 -> bg2 -> bg3)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: container,
          pinSpacing: true,
        }
      });

      if (bg1Ref.current && bg2Ref.current && bg3Ref.current) {
        gsap.set([bg1Ref.current, bg2Ref.current, bg3Ref.current], {
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        });
        gsap.set(bg1Ref.current, { opacity: 1, scale: 1.0, z: 0, rotateY: 0, rotateX: 0 });
        gsap.set(bg2Ref.current, { opacity: 0, scale: 1.0, z: -150, rotateY: -15, rotateX: 10 });
        gsap.set(bg3Ref.current, { opacity: 0, scale: 1.1, z: -150, rotateY: -15, rotateX: 10 });

        scrollTl
          // First half of scroll: transition bg1 -> bg2
          .to(bg1Ref.current, {
            opacity: 0,
            scale: 0.9,
            z: 150,
            rotateY: 15,
            rotateX: -10,
            duration: 1.0,
            ease: 'none'
          }, 0)
          .to(bg2Ref.current, {
            opacity: 1,
            scale: 1.1,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'none'
          }, 0)

          // Hold second layer
          .to(bg2Ref.current, {
            scale: 1.12,
            duration: 0.5,
            ease: 'none'
          }, 1.0)

          // Second half of scroll: transition bg2 -> bg3
          .to(bg2Ref.current, {
            opacity: 0,
            scale: 1.18,
            z: 150,
            rotateY: 15,
            rotateX: -10,
            duration: 1.0,
            ease: 'none'
          }, 1.5)
          .to(bg3Ref.current, {
            opacity: 1,
            scale: 1.0,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'none'
          }, 1.5)

          // Hold third layer
          .to(bg3Ref.current, {
            scale: 1.1,
            duration: 0.7,
            ease: 'power1.out'
          }, 2.5);
      }

      return () => {
        scrollTl.scrollTrigger?.kill();
        scrollTl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile: Pinned 3D slider background transition + step-by-step card slideshow transition driven by scroll position
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: container,
          pinSpacing: true,
        }
      });

      if (bg1Ref.current && bg2Ref.current && bg3Ref.current && card1Ref.current && card2Ref.current && card3Ref.current) {
        gsap.set([bg1Ref.current, bg2Ref.current, bg3Ref.current], {
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        });
        // Initial state: bg1 visible, others hidden
        gsap.set(bg1Ref.current, { opacity: 1, scale: 1.0, z: 0, rotateY: 0, rotateX: 0 });
        gsap.set(bg2Ref.current, { opacity: 0, scale: 1.0, z: -150, rotateY: -15, rotateX: 10 });
        gsap.set(bg3Ref.current, { opacity: 0, scale: 1.1, z: -150, rotateY: -15, rotateX: 10 });

        // Initial setup for cards on mobile: Top Notes is visible initially (0% scroll)
        gsap.set(card1Ref.current, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
        gsap.set(card2Ref.current, { opacity: 0, y: 30, scale: 0.95, pointerEvents: 'none' });
        gsap.set(card3Ref.current, { opacity: 0, y: 30, scale: 0.95, pointerEvents: 'none' });

        scrollTl
          // Scroll Step 1 (0.0 to 1.0): transition Card 1 -> Card 2, and BG1 -> BG2
          .to(card1Ref.current, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            pointerEvents: 'none',
            duration: 1.0,
            ease: 'power1.inOut'
          }, 0)
          .to(card2Ref.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power1.inOut'
          }, 0)
          // Background transition: bg1 -> bg2
          .to(bg1Ref.current, {
            opacity: 0,
            scale: 0.9,
            z: 150,
            rotateY: 15,
            rotateX: -10,
            duration: 1.0,
            ease: 'none'
          }, 0)
          .to(bg2Ref.current, {
            opacity: 1,
            scale: 1.1,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'none'
          }, 0)

          // Hold second layer (1.0 to 1.5)
          .to(bg2Ref.current, {
            scale: 1.12,
            duration: 0.5,
            ease: 'none'
          }, 1.0)

          // Scroll Step 2 (1.5 to 2.5): transition Card 2 -> Card 3, and BG2 -> BG3
          .to(card2Ref.current, {
            opacity: 0,
            y: -30,
            scale: 0.95,
            pointerEvents: 'none',
            duration: 1.0,
            ease: 'power1.inOut'
          }, 1.5)
          .to(card3Ref.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: 'auto',
            duration: 1.0,
            ease: 'power1.inOut'
          }, 1.5)
          // Background transition: bg2 -> bg3
          .to(bg2Ref.current, {
            opacity: 0,
            scale: 1.18,
            z: 150,
            rotateY: 15,
            rotateX: -10,
            duration: 1.0,
            ease: 'none'
          }, 1.5)
          .to(bg3Ref.current, {
            opacity: 1,
            scale: 1.0,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            duration: 1.0,
            ease: 'none'
          }, 1.5)

          // Hold third layer (2.5 to 3.2)
          .to(bg3Ref.current, {
            scale: 1.1,
            duration: 0.7,
            ease: 'power1.out'
          }, 2.5);
      }

      return () => {
        scrollTl.scrollTrigger?.kill();
        scrollTl.kill();
      };
    });

    return () => mm.revert();
  }, [isMobile]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh] z-10 bg-black border-y border-white/5">
      <div ref={containerRef} className="relative h-screen w-full flex flex-col justify-center overflow-hidden py-4 lg:py-0">
        
        {/* 3D Background slider */}
        <div className="bg-stack select-none pointer-events-none">
          <div 
            ref={bg1Ref} 
            className="bg-layer"
            style={{ backgroundImage: 'url("/notesbg/3.png")' }}
          />
          <div 
            ref={bg2Ref} 
            className="bg-layer"
            style={{ backgroundImage: 'url("/notesbg/2.png")' }}
          />
          <div 
            ref={bg3Ref} 
            className="bg-layer"
            style={{ backgroundImage: 'url("/notesbg/1.png")' }}
          />
        </div>

        {/* Dark Overlay for legibility */}
        <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 w-full">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-xl mx-auto mb-8 lg:mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
              The Olfactory Pyramid
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide">
              Scent Architecture
            </h2>
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            <p className="text-muted text-xs md:text-sm font-light max-w-md mx-auto">
              A premium olfactory profile carefully constructed with three distinct notes phases, delivering projection and longevity.
            </p>
          </div>

          {/* Pyramid Grid with Staggered Heights and Animated Borders */}
          <motion.div 
            variants={isMobile ? undefined : containerVariants}
            initial={isMobile ? undefined : "hidden"}
            whileInView={isMobile ? undefined : "visible"}
            viewport={{ once: true, margin: '-100px' }}
            className={isMobile ? "relative w-full h-[480px] sm:h-[520px]" : "relative w-full h-auto lg:grid lg:grid-cols-3 lg:gap-12 lg:items-center"}
          >
            
            {/* Top Notes - Left Column */}
            <motion.div 
              ref={card1Ref}
              variants={isMobile ? undefined : itemVariants}
              className={isMobile ? "absolute inset-0 h-full p-6 flex flex-col justify-between rounded-xl overflow-hidden group bg-transparent border-none" : "animated-border-card min-h-[440px] lg:min-h-[460px] p-8 flex flex-col justify-between rounded-xl relative overflow-hidden group"}
              style={isMobile ? undefined : {
                '--border-color-start': 'rgba(212, 164, 74, 0.1)',
                '--border-color-mid': '#D4A44A',
                '--border-color-mid-glow': '#F2C76E',
                '--border-color-end': 'rgba(212, 164, 74, 0.1)'
              } as React.CSSProperties}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-1">
                        Opening Phase
                      </span>
                      <h3 className="text-2xl font-serif text-cream uppercase tracking-wider">
                        Top Notes
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-muted">
                      0-15 MIN
                    </span>
                  </div>

                  <div className="space-y-4">
                    {TOP_NOTES.map((note) => (
                      <button
                        key={note.name}
                        onClick={() => setSelectedNote(note)}
                        className="w-full flex items-center justify-between p-3.5 bg-black/20 hover:bg-black/45 border border-transparent hover:border-white/5 transition-all duration-300 rounded text-left group/item cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: note.color, boxShadow: `0 0 10px ${note.color}40` }}
                          />
                          <span className="text-xs md:text-sm font-sans tracking-wide text-body group-hover/item:text-white transition-colors">
                            {note.name}
                          </span>
                        </div>
                        <span className="text-[9px] tracking-widest text-muted opacity-0 group-hover/item:opacity-100 transition-opacity">
                          DISCOVER
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-muted font-light tracking-wide uppercase">
                  First impact, fresh and volatile.
                </div>
              </div>
            </motion.div>

            {/* Heart Notes - Middle Column (Taller and offset) */}
            <motion.div 
              ref={card2Ref}
              variants={isMobile ? undefined : itemVariants}
              className={isMobile ? "absolute inset-0 h-full p-6 flex flex-col justify-between rounded-xl overflow-hidden group bg-transparent border-none" : "animated-border-card min-h-[480px] lg:min-h-[500px] p-8 flex flex-col justify-between rounded-xl relative overflow-hidden group lg:-translate-y-4"}
              style={isMobile ? undefined : {
                '--border-color-start': 'rgba(216, 167, 167, 0.1)',
                '--border-color-mid': '#D8A7A7',
                '--border-color-mid-glow': '#EFC8C8',
                '--border-color-end': 'rgba(216, 167, 167, 0.1)'
              } as React.CSSProperties}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent block mb-1">
                        Core Character
                      </span>
                      <h3 className="text-2xl font-serif text-cream uppercase tracking-wider">
                        Heart Notes
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-muted">
                      15 MIN - 4 HR
                    </span>
                  </div>

                  <div className="space-y-4">
                    {HEART_NOTES.map((note) => (
                      <button
                        key={note.name}
                        onClick={() => setSelectedNote(note)}
                        className="w-full flex items-center justify-between p-3.5 bg-black/20 hover:bg-black/45 border border-transparent hover:border-white/5 transition-all duration-300 rounded text-left group/item cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: note.color, boxShadow: `0 0 10px ${note.color}40` }}
                          />
                          <span className="text-xs md:text-sm font-sans tracking-wide text-body group-hover/item:text-white transition-colors">
                            {note.name}
                          </span>
                        </div>
                        <span className="text-[9px] tracking-widest text-muted opacity-0 group-hover/item:opacity-100 transition-opacity">
                          DISCOVER
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-muted font-light tracking-wide uppercase">
                  The heart and personality core.
                </div>
              </div>
            </motion.div>

            {/* Base Notes - Right Column */}
            <motion.div 
              ref={card3Ref}
              variants={isMobile ? undefined : itemVariants}
              className={isMobile ? "absolute inset-0 h-full p-6 flex flex-col justify-between rounded-xl overflow-hidden group bg-transparent border-none" : "animated-border-card min-h-[440px] lg:min-h-[460px] p-8 flex flex-col justify-between rounded-xl relative overflow-hidden group"}
              style={isMobile ? undefined : {
                '--border-color-start': 'rgba(184, 122, 30, 0.1)',
                '--border-color-mid': '#B87A1E',
                '--border-color-mid-glow': '#ECA942',
                '--border-color-end': 'rgba(184, 122, 30, 0.1)'
              } as React.CSSProperties}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary block mb-1">
                        Longevity Anchor
                      </span>
                      <h3 className="text-2xl font-serif text-cream uppercase tracking-wider">
                        Base Notes
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-muted">
                      4 - 12+ HR
                    </span>
                  </div>

                  <div className="space-y-4">
                    {BASE_NOTES.map((note) => (
                      <button
                        key={note.name}
                        onClick={() => setSelectedNote(note)}
                        className="w-full flex items-center justify-between p-3.5 bg-black/20 hover:bg-black/45 border border-transparent hover:border-white/5 transition-all duration-300 rounded text-left group/item cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/10"
                            style={{ backgroundColor: note.color, boxShadow: `0 0 10px ${note.color}40` }}
                          />
                          <span className="text-xs md:text-sm font-sans tracking-wide text-body group-hover/item:text-white transition-colors">
                            {note.name}
                          </span>
                        </div>
                        <span className="text-[9px] tracking-widest text-muted opacity-0 group-hover/item:opacity-100 transition-opacity">
                          DISCOVER
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-muted font-light tracking-wide uppercase">
                  Deep anchor, lingering sillage.
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Note Interactive Modal / Highlight Box */}
          {selectedNote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-x-4 bottom-6 lg:relative lg:inset-auto lg:mt-12 lg:max-w-2xl lg:mx-auto p-6 bg-black/90 lg:bg-black/75 backdrop-blur-xl border border-primary/20 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-50 shadow-2xl"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-white/10"
                    style={{ backgroundColor: selectedNote.color, boxShadow: `0 0 12px ${selectedNote.color}` }}
                  />
                  <h4 className="text-xl font-serif text-cream uppercase tracking-wide">
                    {selectedNote.name}
                  </h4>
                </div>
                <p className="text-body text-xs md:text-sm font-light leading-relaxed">
                  {selectedNote.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-xs font-sans tracking-widest text-primary border border-primary/20 px-4 py-2 hover:bg-primary hover:text-black transition-colors uppercase self-end md:self-center cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
