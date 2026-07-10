'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { HOME_PROMO_VIDEO } from '@/lib/constants';

function loadYouTubeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (window.slBeautyYouTubeApiReady) {
    return window.slBeautyYouTubeApiReady;
  }

  window.slBeautyYouTubeApiReady = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return window.slBeautyYouTubeApiReady;
}

export default function HomePromoVideo() {
  const iframeId = useId().replace(/:/g, '');
  const playerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const videoId = HOME_PROMO_VIDEO.youtubeId;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&modestbranding=1&rel=0&enablejsapi=1`;
  const soundLabel = isMuted ? 'Turn sound on' : 'Mute video';

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || playerRef.current) return;

      playerRef.current = new YT.Player(iframeId, {
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
            setIsMuted(true);
            setIsPlayerReady(true);
          },
          onStateChange: (event) => {
            if (event.target?.isMuted) {
              setIsMuted(event.target.isMuted());
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [iframeId]);

  const toggleSound = () => {
    const player = playerRef.current;
    if (!player || !isPlayerReady) return;

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume?.(70);
      setIsMuted(false);
      return;
    }

    player.mute();
    setIsMuted(true);
  };

  return (
    <section
      aria-label={HOME_PROMO_VIDEO.title}
      className="relative left-1/2 mt-6 w-screen -translate-x-1/2 overflow-hidden bg-black sm:mt-8 lg:mt-10"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.14),rgba(0,0,0,1)_68%)] md:aspect-[16/8] lg:aspect-[16/7]">
        <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-950 via-black to-primary-950" />
        <iframe
          id={iframeId}
          className="absolute left-1/2 top-1/2 h-[177.78vw] min-h-full w-screen min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={embedUrl}
          title={HOME_PROMO_VIDEO.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] to-black/[0.10]" />
        {isPlayerReady && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundLabel}
            aria-pressed={!isMuted}
            title={soundLabel}
            className="absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:scale-105 hover:bg-black/75 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:bottom-5 sm:right-5 sm:h-12 sm:w-12 lg:bottom-6 lg:right-6"
          >
            {isMuted ? <VolumeX size={21} aria-hidden="true" /> : <Volume2 size={21} aria-hidden="true" />}
          </button>
        )}
      </div>
    </section>
  );
}
