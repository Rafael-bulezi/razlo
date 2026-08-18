import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SEAM_SLAT_COUNT, SEAM_SLAT_BASE, SeamFace } from './glass/Seam';

interface CurtainContextValue {
  navigate: (path: string) => void;
}

const CurtainContext = createContext<CurtainContextValue | null>(null);

export function useCurtain() {
  const ctx = useContext(CurtainContext);
  if (!ctx) throw new Error('useCurtain must be used inside CurtainProvider');
  return ctx;
}

interface CurtainProviderProps {
  children: React.ReactNode;
}

// Signature easing used across the site's seam cut
const EASE: [number, number, number, number] = [0.77, 0, 0.18, 1];
const STAGGER = 0.045;

export function CurtainProvider({ children }: CurtainProviderProps) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const navTarget = useRef<string>('');
  const routerNavigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const navigate = useCallback((path: string) => {
    navTarget.current = path;
    setPhase('in');
    setVisible(true);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (phase === 'in') {
      routerNavigate(navTarget.current);
      window.scrollTo(0, 0);
      setPhase('out');
    } else {
      setVisible(false);
    }
  }, [phase, routerNavigate]);

  // Reduced motion keeps the slats still (a plain cross-fade instead of a
  // sweep) and drives the same phase machine on a timer instead of waiting
  // on a transform that never changes.
  useEffect(() => {
    if (!reduceMotion || !visible) return;
    const timer = window.setTimeout(handleAnimationComplete, 220);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, visible, phase, handleAnimationComplete]);

  // Seam cut: glass slats sweep in from alternating sides to cover the
  // viewport (IN), then continue their sweep off the far side once the new
  // route has mounted underneath (OUT) — a cut, not a fade.
  const cover = phase === 'in';
  const duration = cover ? 0.5 : 0.46;

  return (
    <CurtainContext.Provider value={{ navigate }}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="curtain"
            className="pointer-events-none fixed inset-0 z-[9000] overflow-hidden"
            style={{ willChange: 'opacity', contain: 'strict' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            {Array.from({ length: SEAM_SLAT_COUNT }).map((_, i) => {
              const fromLeft = i % 2 === 0;
              const restX = fromLeft ? '-101%' : '101%';
              const exitX = fromLeft ? '101%' : '-101%';
              const isLast = i === SEAM_SLAT_COUNT - 1;
              return (
                <motion.div
                  key={i}
                  className="absolute left-0 w-full overflow-hidden bg-[#120F0D]/90 dark:bg-[#0A0A0A]/95 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  style={{
                    top: `${(i * 100) / SEAM_SLAT_COUNT}%`,
                    height: `${100 / SEAM_SLAT_COUNT + 0.5}%`,
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                  }}
                  initial={{ x: reduceMotion ? '0%' : restX }}
                  animate={{ x: reduceMotion ? '0%' : cover ? '0%' : exitX }}
                  transition={{
                    duration: reduceMotion ? 0.01 : duration,
                    ease: EASE,
                    delay: reduceMotion ? 0 : i * STAGGER,
                  }}
                  onAnimationComplete={!reduceMotion && isLast ? handleAnimationComplete : undefined}
                >
                  <SeamFace />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </CurtainContext.Provider>
  );
}
