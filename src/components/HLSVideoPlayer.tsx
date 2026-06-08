import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onEnded?: () => void;
  onTimeUpdate?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  playbackRate?: number;
}

export default function HLSVideoPlayer({
  src,
  poster,
  className = '',
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
  onEnded,
  onTimeUpdate,
  playbackRate = 1
}: HLSVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (src.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxMaxBufferLength: 10,
          enableWorker: true,
          lowLatencyMode: true
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.playbackRate = playbackRate;
          if (autoPlay) {
            video.play().catch(err => console.log('HLS play error:', err));
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for native Safari HLS support
        video.src = src;
      }
    } else {
      // Standard video file fallback (MP4, WebM, etc.)
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoPlay, playbackRate]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.playbackRate = playbackRate;
  };

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      playsInline={playsInline}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onPlay={handlePlay}
    />
  );
}
