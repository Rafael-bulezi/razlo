import { useState } from 'react';
import Lightbox from './Lightbox';
import SmoothImage from './SmoothImage';
import { cn } from '../lib/utils';

interface MediaGalleryProps {
  images: string[];
  className?: string;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ images, className = '' }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  const prev = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const next = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  return (
    <>
      <div className={cn('grid grid-cols-2 md:grid-cols-3 gap-3', className)}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className={cn(
              'relative overflow-hidden rounded-lg group cursor-zoom-in aspect-video',
              i === 0 && images.length > 2 ? 'col-span-2 row-span-2' : ''
            )}
          >
            <SmoothImage
              src={img}
              alt={`Gallery image ${i + 1}`}
              className="w-full h-full transition-transform duration-500 group-hover:scale-105"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
};

export default MediaGallery;
