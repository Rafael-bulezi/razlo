import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useCurtain } from './Curtain';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { label: 'Projects', path: '/works' },
  { label: 'Protocol', path: '/protocol' },
  { label: 'About', path: '/about' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const { navigate } = useCurtain();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  useMotionValueEvent(scrollY, 'change', (value) => setIsScrolled(value > 40));

  useEffect(() => {
    const onScroll = () => {
      if (expanded) return;
      setVisible(true);
      window.clearTimeout((window as typeof window & { __razloNavTimer?: number }).__razloNavTimer);
      (window as typeof window & { __razloNavTimer?: number }).__razloNavTimer = window.setTimeout(() => {
        if (window.scrollY > 180) setVisible(false);
      }, 2400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [expanded]);

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const handleNav = (path: string) => {
    setExpanded(false);
    if (location.pathname !== path) navigate(path);
  };

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  return (
    <>
      <div className={cn(
        'fixed top-4 right-4 z-[1000] flex justify-end transition-all duration-500 md:top-6 md:right-8',
        visible || expanded ? 'translate-y-0 opacity-100' : '-translate-y-20 scale-95 opacity-0',
      )}>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="razlo-glass-control flex h-12 w-12 items-center justify-center rounded-full text-black/80 transition-colors hover:text-[#B15D2E] dark:text-white/80 dark:hover:text-[#FFB692] shadow-xl relative z-[1001]"
          aria-label={expanded ? 'Close navigation' : 'Open navigation'}
        >
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {expanded ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(10% 10% 90% 90% round 3rem)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0rem)' }}
            exit={{ opacity: 0, clipPath: 'inset(10% 10% 90% 90% round 3rem)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] bg-[#EAE6DE] dark:bg-[#0E0E0E] flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" />

            <div className="flex-1 flex flex-col justify-center px-8 md:px-20 max-w-[1500px] mx-auto w-full">
              <div className="flex flex-col gap-6 md:gap-8">
                {NAV_LINKS.map((link, index) => (
                  <div key={link.path} className="overflow-hidden">
                    <motion.button
                      initial={{ y: '120%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '120%' }}
                      transition={{ duration: 0.5, delay: index * 0.05 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => handleNav(link.path)}
                      className="group flex items-center text-left"
                    >
                      <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#B15D2E] dark:text-[#FFB692] w-12 md:w-16">
                        0{index + 1}
                      </span>
                      <span className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-colors">
                        {link.label}
                      </span>
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-8 md:px-20 py-8 md:py-12 max-w-[1500px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-black/10 dark:border-white/10"
            >
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">Location</p>
                <p className="text-xs tracking-wider text-black dark:text-white">Luanda · Angola</p>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">Socials</p>
                <div className="flex gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-black/60 dark:text-white/60">
                  <span>Instagram</span>
                  <span>LinkedIn</span>
                  <span>Behance</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}