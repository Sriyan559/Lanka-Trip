'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AIBeautyAdvisorLauncher from './AIBeautyAdvisorLauncher';
import AIBeautyAdvisorModal from './AIBeautyAdvisorModal';

const AUTO_OPEN_DELAY = 1000;

export default function AIBeautyAdvisorWrapper() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const originElementRef = useRef(null);
  const autoOpenTimerRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (pathname === '/ai-advisor') {
      setIsOpen(false);
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current);
        autoOpenTimerRef.current = null;
      }
      return;
    }

    if (pathname !== '/') {
      hasAutoOpenedRef.current = false;
      return;
    }

    if (hasAutoOpenedRef.current || autoOpenTimerRef.current) return;

    autoOpenTimerRef.current = window.setTimeout(() => {
      autoOpenTimerRef.current = null;
      hasAutoOpenedRef.current = true;
      setIsOpen(true);
    }, AUTO_OPEN_DELAY);

    return () => {
      if (autoOpenTimerRef.current) {
        window.clearTimeout(autoOpenTimerRef.current);
        autoOpenTimerRef.current = null;
      }
    };
  }, [pathname, hasMounted]);

  if (!hasMounted) return null;

  const handleOpen = (e) => {
    if (e && e.currentTarget) {
      originElementRef.current = e.currentTarget;
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (pathname === '/' || pathname === '/ai-advisor') return null;

  return (
    <>
      {pathname !== '/ai-advisor' && <AIBeautyAdvisorLauncher onClick={handleOpen} isOpen={isOpen} />}
      <AIBeautyAdvisorModal 
        isOpen={isOpen} 
        onClose={handleClose} 
        originElement={originElementRef.current} 
      />
    </>
  );
}
