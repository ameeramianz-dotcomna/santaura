import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HLSVideoPlayer from './HLSVideoPlayer';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isDone, setIsDone] = useState(false);

  // Fallback timer: in case the video doesn't play or load, transition anyway after 5 seconds
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 800);
    }, 5000);

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
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <HLSVideoPlayer
              src="/lodder/playlist.m3u8"
              className="absolute inset-0 w-full h-full object-cover"
              muted
              autoPlay
              loop={false}
              playsInline
              onEnded={handleVideoEnded}
              playbackRate={1.25}
            />
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
