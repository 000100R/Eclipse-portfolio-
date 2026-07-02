import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if device supports fine pointers or has touch capabilities
    const checkDevice = () => {
      const mediaQuery = window.matchMedia('(pointer: fine)');
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(!mediaQuery.matches || hasTouch || isMobileAgent);
    };

    checkDevice();

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const handleMediaQueryChange = () => {
      checkDevice();
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const onMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    // Detect keyboard navigation (Tab key)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        document.body.classList.remove('custom-cursor-active');
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      if (mediaQuery.matches) {
        document.body.classList.add('custom-cursor-active');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    // Track hover status on links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], input, select, textarea, .interactive-hover');
      
      if (clickable) {
        setIsHovered(true);
        const dataText = (clickable as HTMLElement).getAttribute('data-cursor');
        if (dataText) {
          setHoverText(dataText);
        } else {
          setHoverText('');
        }
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Add active class to body for CSS selectors (only if not keyboard user)
    if (mediaQuery.matches && !isKeyboardUser) {
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isKeyboardUser]);

  // Smooth trail effect using requestAnimationFrame
  useEffect(() => {
    if (isMobile || !isVisible) return;

    let animId: number;
    const smoothTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease speed
        const speed = 0.15;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animId = requestAnimationFrame(smoothTrail);
    };

    animId = requestAnimationFrame(smoothTrail);
    return () => cancelAnimationFrame(animId);
  }, [position, isMobile, isVisible]);

  if (isMobile || !isVisible || isKeyboardUser) return null;

  return (
    <>
      {/* Tiny Core Dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold-warm rounded-full pointer-events-none z-50 mix-blend-screen transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0) scale(${isHovered ? 2.5 : 1})`,
        }}
      />

      {/* Main Trail Ring */}
      <div
        ref={trailRef}
        id="custom-cursor-trail"
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-40 mix-blend-screen transition-all duration-300 ease-out border flex items-center justify-center ${
          isHovered
            ? 'w-16 h-16 bg-electric-blue/10 border-electric-blue glow-blue scale-110'
            : 'w-8 h-8 bg-transparent border-white/20'
        }`}
        style={{
          transform: `translate3d(${trailPosition.x - (isHovered ? 32 : 16)}px, ${trailPosition.y - (isHovered ? 32 : 16)}px, 0)`,
        }}
      >
        {isHovered && hoverText && (
          <span className="text-[9px] font-mono font-medium tracking-widest text-white uppercase animate-fade-in">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
}
