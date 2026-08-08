import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';
import { SEAM_EASE, SEAM_SLAT_BASE, SEAM_SLAT_COUNT, SeamFace } from './glass/Seam';

const STAGGER = 0.07;
const TRANSITION_END = 0.55;

interface SeamRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * One deliberate scroll handoff. A bank of glass slats sweeps across the
 * viewport, staggered from alternating sides, cutting from the section
 * before this one into the live content underneath as the page scrolls.
 * Used sparingly — once, not around every section.
 */
export default function SeamReveal({ children, className }: SeamRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const slatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const root = rootRef.current;
      const scene = sceneRef.current;
      if (!root || !scene) return;

      const viewportHeight = window.innerHeight;
      const top = root.getBoundingClientRect().top + window.scrollY;
      const progress = Math.max(0, Math.min(1, (window.scrollY - top) / viewportHeight));
      const t = Math.max(0, Math.min(1, progress / TRANSITION_END));

      scene.style.opacity = String(t);
      scene.style.transform = `translateY(${(1 - t) * 24}px)`;

      slatRefs.current.forEach((slat, i) => {
        if (!slat) return;
        const delay = i * STAGGER;
        const localT = SEAM_EASE(Math.max(0, Math.min(1, (t - delay) / (1 - delay))));
        const fromLeft = i % 2 === 0;
        const travel = fromLeft ? -110 + localT * 220 : 110 - localT * 220;
        const squeeze = 1 - 0.05 * Math.sin(localT * Math.PI);
        slat.style.transform = `translateX(${travel}%) scaleY(${squeeze})`;
      });

      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {/* This short track owns only the transition; the actual long-form section follows normally. */}
      <div className="relative h-svh">
        <div className="sticky top-0 h-svh overflow-hidden bg-[#0C0C0C]">
          <div ref={sceneRef} className="absolute inset-0 overflow-hidden opacity-0">
            {children}
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {Array.from({ length: SEAM_SLAT_COUNT }).map((_, i) => (
              <div
                key={i}
                ref={(el) => { slatRefs.current[i] = el; }}
                className={SEAM_SLAT_BASE}
                style={{ top: `${(i * 100) / SEAM_SLAT_COUNT}%`, height: `${100 / SEAM_SLAT_COUNT}%` }}
              >
                <SeamFace />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
