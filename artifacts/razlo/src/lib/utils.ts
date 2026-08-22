import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const optimizeCloudinaryUrl = (url: string, width: number = 1200): string => {
  if (!url || !url.includes('cloudinary.com') || !url.includes('/upload/')) return url;

  const cleanUrl = url.split('?')[0];
  const [before, after] = cleanUrl.split('/upload/');
  const segments = after.split('/');
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const transformations = `f_auto,q_auto:good,w_${width},c_limit`;

  // Preserve any existing crop or art-direction transformation, then append a
  // delivery transformation so the final transferred file is never oversized.
  if (versionIndex === -1) return `${before}/upload/${transformations}/${after}`;

  const existingTransforms = segments.slice(0, versionIndex).filter(Boolean);
  const resource = segments.slice(versionIndex).join('/');
  const transformPath = [...existingTransforms, transformations].join('/');
  return `${before}/upload/${transformPath}/${resource}`;
};

export function cloudinarySrcSet(
  url: string,
  widths: number[] = [400, 800, 1200, 1600, 2400]
): string {
  if (!url || !url.includes('cloudinary.com')) return '';
  return widths.map((width) => `${optimizeCloudinaryUrl(url, width)} ${width}w`).join(', ');
}

const EDITION_COVER_PATTERN = /^(\/covers\/.+)-(480|800|1200)\.webp$/;

export function optimizeProjectImage(url: string, width: number = 1200): string {
  const match = url.match(EDITION_COVER_PATTERN);
  if (match) {
    const target = width <= 480 ? 480 : width <= 800 ? 800 : 1200;
    return `${match[1]}-${target}.webp`;
  }
  return optimizeCloudinaryUrl(url, width);
}

export function projectImageSrcSet(url: string): string {
  const match = url.match(EDITION_COVER_PATTERN);
  if (match) {
    return [480, 800, 1200].map((width) => `${match[1]}-${width}.webp ${width}w`).join(', ');
  }
  return cloudinarySrcSet(url);
}

export const optimizeCloudinaryVideoUrl = (url: string, width: number = 1280): string => {
  if (!url || !url.includes('cloudinary.com') || !url.includes('/video/upload/')) return url;

  const cleanUrl = url.split('?')[0];
  const [before, after] = cleanUrl.split('/video/upload/');
  const segments = after.split('/');
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const transformations = `f_auto,q_auto:good,vc_auto,w_${width},c_limit`;

  if (versionIndex === -1) return `${before}/video/upload/${transformations}/${after}`;

  const existingTransforms = segments.slice(0, versionIndex).filter(Boolean);
  const resource = segments.slice(versionIndex).join('/');
  return `${before}/video/upload/${[...existingTransforms, transformations].join('/')}/${resource}`;
};

export const SIZES = {
  thumbnail: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  grid: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  hero: '100vw',
  heroCard: '(max-width: 640px) 42vw, (max-width: 1023px) 26vw, 340px',
  fanCard: '(max-width: 640px) 44vw, (max-width: 899px) 30vw, 210px',
  detail: '(max-width: 1024px) 100vw, 1200px',
} as const;
