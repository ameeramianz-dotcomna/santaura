import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HLSVideoPlayer from './HLSVideoPlayer';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isDone, setIsDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fallback timer: in case the video doesn't play or load, transition anyway after 3.5 seconds (1.5 seconds on mobile)
  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768;
    const timeoutDuration = isMobileDevice ? 1500 : 3500;
    const fallbackTimeout = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 800);
    }, timeoutDuration);

    return () => clearTimeout(fallbackTimeout);
  }, [onComplete]);

  const handleVideoEnded = () => {
    setIsDone(true);
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => {
            setIsDone(true);
            setTimeout(onComplete, 800);
          }}
        >
          {/* Background Video (Desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
              <HLSVideoPlayer
                src="/lodder/playlist.m3u8"
                className="absolute inset-0 w-full md:w-[calc(100%+10rem)] h-full object-cover ml-0 md:ml-40"
                muted
                autoPlay
                loop={false}
                playsInline
                onEnded={handleVideoEnded}
                playbackRate={1.25}
              />
            </div>
          )}

          {/* Luxury mobile loader fallback (CSS animations, lightweight, fail-safe) */}
          {isMobile && (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-black">
              {/* Premium pulsing golden orb */}
              <div className="w-[110px] h-[110px] rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/30"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-lg font-serif text-primary tracking-widest font-bold">SC</span>
              </div>
              <h2 className="text-cream text-base font-serif tracking-[0.25em] uppercase font-light animate-pulse">
                SCENTAURA
              </h2>
            </div>
          )}

          {/* Top-Right Skip Hint */}
          <div className="absolute top-6 right-6 z-20 text-[9px] font-sans uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300">
            Tap to enter
          </div>

          {/* Bottom branding */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-10 z-20 text-[9px] font-sans uppercase tracking-[0.25em] text-muted"
          >
            Built by Ameer Ashiq
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
