import { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import SmoothImage from './SmoothImage';

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
        className="fixed inset-0 z-[8000] flex items-center justify-center bg-[#090909]/[0.98] px-3 py-3 sm:px-8 sm:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          onClick={(event) => { event.stopPropagation(); onClose(); }}
          className="razlo-glass-control absolute bottom-5 right-5 z-20 flex h-12 items-center gap-2 rounded-full px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition sm:bottom-7 sm:right-7"
          aria-label="Close lightbox"
        >
          Close <X size={16} />
        </button>

        {/* Counter */}
        <span className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 sm:left-7 sm:top-7">
          {currentIndex + 1} / {images.length}
        </span>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="razlo-glass-control absolute bottom-5 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full text-white transition sm:bottom-7 sm:left-7"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
            className="h-full max-h-[82vh] w-full max-w-6xl px-2 pb-14 sm:max-h-[84vh] sm:px-16 sm:pb-0 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          drag={images.length > 1 ? 'x' : false}
          dragConstraints={{ left: -180, right: 180 }}
          dragElastic={0.72}
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'pan-y' }}
          whileDrag={{ scale: 0.98, cursor: 'grabbing' }}
        >
          <SmoothImage
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-full max-w-full h-auto w-auto rounded-2xl shadow-[0_24px_90px_rgba(0,0,0,0.5)]"
            containerClassName="flex items-center justify-center"
            objectFit="contain"
            loading="eager"
          />
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="razlo-glass-control absolute bottom-5 right-20 z-20 flex h-11 w-11 items-center justify-center rounded-full text-white transition sm:bottom-7 sm:right-24"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
