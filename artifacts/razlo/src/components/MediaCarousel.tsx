import { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import SmoothImage from './SmoothImage';
import Lightbox from './Lightbox';
import { cn } from '../lib/utils';

interface MediaCarouselProps {
  images: string[];
  className?: string;
  objectFit?: 'cover' | 'contain';
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ images, className = '', objectFit = 'contain' }) => {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 45 && Math.abs(info.velocity.x) < 350) return;
    if (info.offset.x < 0) next();
    else prev();
  };

  if (!images.length) return null;

  return (
    <>
      <div className={cn('relative group overflow-hidden rounded-xl', className)}>
        <motion.div
          key={current}
          className="h-full w-full cursor-grab active:cursor-grabbing flex items-center justify-center"
          drag={images.length > 1 ? 'x' : false}
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'pan-y' }}
          initial={{ opacity: 0.7, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22 }}
        >
          <SmoothImage
            src={images[current]}
            alt={`Gallery image ${current + 1}. Swipe to browse`}
            className="h-full w-full select-none"
            containerClassName="h-full w-full flex items-center justify-center"
            objectFit={objectFit}
          />
        </motion.div>
        {/* Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
            {/* Dots */}
            <div className="pointer-events-auto absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    i === current ? 'bg-white w-4' : 'bg-white/50'
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
        {/* Expand button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          aria-label="Expand"
        >
          <Expand size={14} />
        </button>
      </div>
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={current}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
};

export default MediaCarousel;
