import { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 60 && Math.abs(info.velocity.x) < 450) return;
    if (info.offset.x < 0) onNext();
    else onPrev();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[8000] flex items-center justify-center bg-[#090909]/[0.98]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Counter — top-left */}
        <span className="absolute left-5 top-5 z-30 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 sm:left-7 sm:top-7">
          {currentIndex + 1} / {images.length}
        </span>

        {/* Close — bottom-right */}
        <button
          onClick={(event) => { event.stopPropagation(); onClose(); }}
          className="razlo-glass-control absolute bottom-5 right-5 z-30 flex h-12 items-center gap-2 rounded-full px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition sm:bottom-7 sm:right-7"
          aria-label="Close lightbox"
        >
          Close <X size={16} />
        </button>

        {/* Prev — vertically centered, left edge */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="razlo-glass-control absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition sm:left-5 md:left-7"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Next — vertically centered, right edge */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="razlo-glass-control absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white transition sm:right-5 md:right-7"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Dynamic Image Canvas */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="relative z-20 flex items-center justify-center max-h-[88vh] max-w-[86vw] select-none px-10 sm:px-14"
          onClick={(e) => e.stopPropagation()}
          drag={images.length > 1 ? 'x' : false}
          dragConstraints={{ left: -140, right: 140 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'pan-y' }}
          whileDrag={{ scale: 0.98, cursor: 'grabbing' }}
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[84vh] max-w-[82vw] w-auto h-auto object-contain rounded-xl shadow-[0_28px_90px_rgba(0,0,0,0.75)]"
            loading="eager"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
