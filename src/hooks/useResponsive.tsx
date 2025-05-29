
import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/utils/constants';

/**
 * Enhanced responsive hook with mobile-first approach
 * Provides detailed screen size information and mobile optimizations
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      setIsMobile(width < BREAKPOINTS.md);
      setIsTablet(width >= BREAKPOINTS.md && width < BREAKPOINTS.lg);
      setIsDesktop(width >= BREAKPOINTS.lg);
      
      // Detect touch device
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return {
    ...screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    isSmallScreen: screenSize.width < BREAKPOINTS.sm,
    isMediumScreen: screenSize.width >= BREAKPOINTS.sm && screenSize.width < BREAKPOINTS.lg,
    isLargeScreen: screenSize.width >= BREAKPOINTS.lg,
  };
};
