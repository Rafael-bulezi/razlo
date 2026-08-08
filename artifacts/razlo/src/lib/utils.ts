import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const optimizeCloudinaryUrl = (url: string, width: number = 1200): string => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // If already optimized by us or has complex flags, just return it
  if (url.includes('q_auto') && url.includes(`w_${width}`)) return url;
  if (url.includes('?')) url = url.split('?')[0];

  if (url.includes('/upload/')) {
    const [before, after] = url.split('/upload/');
    // If there's already a transformation block (doesn't start with 'v' + digits), 
    // we might be double-transforming.
    if (after.split('/')[0].includes(',')) return url;
    
    return `${before}/upload/q_auto,f_auto,w_${width},c_limit/${after}`;
  }
  return url;
};

export function cloudinarySrcSet(
  url: string,
  widths: number[] = [400, 800, 1200, 1600, 2400]
): string {
  if (!url || !url.includes('cloudinary.com')) return '';
  return widths
    .map((w) => `${optimizeCloudinaryUrl(url, w)} ${w}w`)
    .join(', ');
}

export const SIZES = {
  thumbnail: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  grid:      '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  hero:      '100vw',
  detail:    '(max-width: 1024px) 100vw, 1200px',
} as const;
