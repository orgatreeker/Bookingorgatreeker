"use client";

import { useEffect, useRef, useState } from "react";

interface WistiaEmbedProps {
  mediaId: string;
  onPlay?: () => void;
  onTimeUpdate?: (time: number) => void;
}

declare global {
  interface Window {
    _wq?: Array<{ id: string; onReady: (video: WistiaVideo) => void }>;
  }
}

interface WistiaVideo {
  play: () => void;
  pause: () => void;
  time: () => number;
  duration: () => number;
  bind: (event: string, callback: () => void) => void;
}

export function WistiaEmbed({ mediaId, onPlay, onTimeUpdate }: WistiaEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Wistia queue
    window._wq = window._wq || [];
    
    window._wq.push({
      id: mediaId,
      onReady: (video: WistiaVideo) => {
        setIsLoaded(true);
        
        if (onPlay) {
          video.bind("play", () => {
            onPlay();
          });
        }

        if (onTimeUpdate) {
          video.bind("secondchange", () => {
            onTimeUpdate(video.time());
          });
        }
      },
    });
  }, [mediaId, onPlay, onTimeUpdate]);

  return (
    <div ref={containerRef} className="wistia-embed-container">
      <div
        className={`wistia_embed wistia_async_${mediaId} videoFoam=true`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
