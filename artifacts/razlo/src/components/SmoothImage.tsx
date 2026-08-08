import { useState } from 'react';
import { cn } from '../lib/utils';
import { cloudinarySrcSet, SIZES } from '../lib/utils';

interface SmoothImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
}

const SmoothImage: React.FC<SmoothImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  sizes = SIZES.grid,
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);

  const srcSet = cloudinarySrcSet(src);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Blur-up placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}
      <img
        src={src}
        srcSet={srcSet || undefined}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          `object-${objectFit}`,
          className
        )}
        style={{ objectFit }}
      />
    </div>
  );
};

export default SmoothImage;
