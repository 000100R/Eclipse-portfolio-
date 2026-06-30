import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data';
import { GalleryImage } from '../types';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon, Eye } from 'lucide-react';

export default function Gallery() {
  const { galleryImages } = portfolioData;
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll bounds to display navigation helpers
  const checkScrollBounds = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollBounds);
      // Run once on load
      checkScrollBounds();
    }
    return () => container?.removeEventListener('scroll', checkScrollBounds);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setActiveImageIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  return (
    <section id="gallery" className="py-24 w-full relative overflow-hidden px-6 md:px-12 bg-black select-none">
      {/* Light highlights */}
      <div className="absolute top-0 right-10 w-[300px] h-[300px] rounded-full bg-gold-warm/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
              05 // VISUAL ATMOSPHERE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mt-2">
              CREATIVE <span className="font-medium text-gradient-silver">GALLERY</span>
            </h2>
          </div>

          {/* Scrolling Action Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-none ${
                canScrollLeft
                  ? 'border-white/10 bg-zinc-900 text-white hover:border-white/20'
                  : 'border-white/5 bg-transparent text-zinc-700 cursor-not-allowed'
              }`}
              data-cursor={canScrollLeft ? 'PREV' : ''}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-none ${
                canScrollRight
                  ? 'border-white/10 bg-zinc-900 text-white hover:border-white/20'
                  : 'border-white/5 bg-transparent text-zinc-700 cursor-not-allowed'
              }`}
              data-cursor={canScrollRight ? 'NEXT' : ''}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Horizontal Scroll Wrapper */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory cursor-none scroll-smooth pr-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((img, idx) => {
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                onClick={() => setActiveImageIndex(idx)}
                className="flex-shrink-0 w-[280px] md:w-[420px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-glass relative group snap-start cursor-none"
                data-cursor="EXPAND"
              >
                {/* Main image */}
                <img
                  src={img.image}
                  alt={img.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-50"
                />

                {/* Fade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Info Text Overlay */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-gold-warm tracking-wider uppercase mb-1">
                        {img.category}
                      </span>
                      <h4 className="text-sm font-sans font-medium text-white tracking-wide leading-tight group-hover:text-gold-warm transition-colors">
                        {img.title}
                      </h4>
                    </div>
                    <Eye className="w-4 h-4 text-zinc-500 group-hover:text-gold-warm transition-colors transform group-hover:scale-110 duration-300 shrink-0" />
                  </div>
                </div>

                {/* Overlay Hover Reveal details */}
                <div className="absolute top-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="text-[10px] font-mono text-zinc-400 bg-black/60 px-2 py-1 rounded border border-white/10">
                    0{idx + 1} // VIEW DETAILS
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Overlay Modal */}
        <AnimatePresence>
          {activeImageIndex !== null && (
            <div className="fixed inset-0 w-full h-full bg-black/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 md:p-12">
              
              {/* Lightbox Header */}
              <div className="flex justify-between items-center w-full z-10">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-gold-warm" />
                  <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                    GALLERY SPACE // PHOTO INSPECT
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-zinc-500">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                  <button
                    onClick={() => setActiveImageIndex(null)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-none"
                    data-cursor="CLOSE"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Center Image with Nav arrows */}
              <div className="flex-1 flex items-center justify-between gap-4 py-8 relative">
                {/* Left Arrow */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 md:left-4 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:border-white/20 transition-all cursor-none"
                  data-cursor="PREV"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Displaying Image with animate-in */}
                <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-center p-4">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      src={galleryImages[activeImageIndex].image}
                      alt={galleryImages[activeImageIndex].title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10 select-none pointer-events-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 md:right-4 z-10 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:border-white/20 transition-all cursor-none"
                  data-cursor="NEXT"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Footer details */}
              <div className="w-full max-w-3xl mx-auto text-center z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-mono text-gold-warm tracking-widest uppercase">
                      {galleryImages[activeImageIndex].category}
                    </span>
                    <h3 className="text-lg md:text-xl font-display font-medium text-white tracking-wide">
                      {galleryImages[activeImageIndex].title}
                    </h3>
                    <p className="text-xs md:text-sm font-sans text-zinc-400 max-w-xl mx-auto leading-relaxed mt-1">
                      {galleryImages[activeImageIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
