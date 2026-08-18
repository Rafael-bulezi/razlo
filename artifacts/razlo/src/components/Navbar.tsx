import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useCurtain } from './Curtain';
import { cn } from '../lib/utils';

// SVG mask for drifting icon pattern (shared string to avoid repetition)
const PAT_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg opacity='.85' transform='translate(49.6 49.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 49.6) scale(1.2)'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(49.6 181.6) scale(1.2)'%3E%3Cpath d='M17 3l4 4L8 20l-5 1 1-5z'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 181.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M10 8l6 4-6 4z'/%3E%3C/g%3E%3Cg opacity='.6' transform='translate(117.6 117.6) scale(1.2)'%3E%3Cpath d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23000' opacity='.45'%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='130' cy='0' r='2'/%3E%3Ccircle cx='260' cy='0' r='2'/%3E%3Ccircle cx='0' cy='130' r='2'/%3E%3Ccircle cx='260' cy='130' r='2'/%3E%3Ccircle cx='0' cy='260' r='2'/%3E%3Ccircle cx='130' cy='260' r='2'/%3E%3Ccircle cx='260' cy='260' r='2'/%3E%3C/g%3E%3Cg fill='%23000' opacity='.5'%3E%3Cpath d='M130 22l5 5-5 5-5-5z'/%3E%3Cpath d='M130 228l5 5-5 5-5-5z'/%3E%3Cpath d='M22 130l5 5-5 5-5-5z'/%3E%3Cpath d='M228 130l5 5-5 5-5-5z'/%3E%3C/g%3E%3C/svg%3E")`;

const NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'Works',    path: '/works' },
  { label: 'Protocol', path: '/protocol' },
  { label: 'About',    path: '/about' },
  { label: 'Pricing',  path: '/pricing' },
  { label: 'Contact',  path: '/contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const { navigate } = useCurtain();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  useEffect(() => { setExpanded(false); }, [location.pathname]);

  const handleNav = (path: string) => {
    setExpanded(false);
    if (location.pathname !== path) navigate(path);
  };

  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  // Token-driven glass recipe matching the site's rich glassmorphism language
  const pillStyle: React.CSSProperties = {
    border: '1px solid rgba(255,182,146,.5)',
    background: 'var(--pill-grad)',
    backdropFilter: 'blur(14px) saturate(160%)',
    WebkitBackdropFilter: 'blur(14px) saturate(160%)',
    boxShadow: 'var(--pill-shadow)',
  };

  return (
    <>
      {/* ── Global sticky brand lockup — top-left, hidden while menu is open ── */}
      <div className={cn(
        'fixed top-4 left-4 z-[1000] transition-all duration-500 md:top-6 md:left-8',
        (visible && !expanded)
          ? 'translate-y-0 opacity-100'
          : '-translate-y-3 opacity-0 pointer-events-none',
      )}>
        <button
          type="button"
          onClick={() => handleNav('/')}
          className="group flex items-center gap-2.5 focus:outline-none"
          aria-label="Go to homepage"
        >
          {/* Glass pill — with shine reflection */}
          <span
            className="relative inline-block overflow-hidden font-serif italic font-medium text-[1.1rem] text-[#B15D2E] dark:text-[#FFB692] px-[.65em] py-[.1em] rounded-full transition-transform group-hover:scale-[1.06] group-active:scale-95"
            style={pillStyle}
          >
            <span className="nav-shine" aria-hidden="true" />
            <span className="relative z-10">Razlo</span>
          </span>
          <span className="text-[10px] font-bold tracking-[.34em] uppercase text-black/75 dark:text-white/75 group-hover:text-black dark:group-hover:text-white transition-colors">
            studio
          </span>
        </button>
      </div>

      {/* ── Menu trigger — top-right ── */}
      <div className={cn(
        'fixed top-4 right-4 z-[1000] transition-all duration-500 md:top-6 md:right-8',
        (visible || expanded) ? 'translate-y-0 opacity-100' : '-translate-y-20 scale-95 opacity-0',
      )}>
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="razlo-glass-control flex h-11 w-11 items-center justify-center rounded-full text-black/80 transition-colors hover:text-[#B15D2E] dark:text-white/80 dark:hover:text-[#FFB692] shadow-xl"
          aria-label={expanded ? 'Close navigation' : 'Open navigation'}
        >
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {expanded ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </motion.div>
        </button>
      </div>

      {/* ── Full-screen nav overlay ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(10% 10% 90% 90% round 3rem)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0rem)' }}
            exit={{ opacity: 0, clipPath: 'inset(10% 10% 90% 90% round 3rem)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] bg-[#EAE6DE] dark:bg-[#0E0E0E] flex flex-col justify-between overflow-hidden"
          >
            {/* Drifting icon sheet */}
            <div className="nav-pat" aria-hidden="true" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" />

            {/* Links and Side Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-[1400px] mx-auto w-full py-4">
              <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] items-center gap-10 lg:gap-16">
                
                {/* Navigation Links */}
                <div
                  className="flex flex-col gap-1.5 sm:gap-2.5"
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {NAV_LINKS.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    const isPillVisible = hoveredIdx === index || (isActive && hoveredIdx === null);

                    return (
                      <div key={link.path} className="overflow-hidden">
                        <motion.button
                          initial={{ y: '120%' }}
                          animate={{ y: 0 }}
                          exit={{ y: '120%' }}
                          transition={{ duration: 0.48, delay: index * 0.04 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                          onClick={() => handleNav(link.path)}
                          onMouseEnter={() => setHoveredIdx(index)}
                          className="group relative flex items-center text-left py-1 sm:py-1.5 focus:outline-none"
                        >
                          {/* Index number */}
                          <span className="text-[10px] sm:text-xs font-bold tracking-[.3em] uppercase text-[#B15D2E] dark:text-[#FFB692] w-9 sm:w-14 shrink-0 select-none">
                            0{index + 1}
                          </span>

                          {/* Pill + label — 4-layer glassmorphic capsule */}
                          <span className="relative inline-block">
                            <AnimatePresence>
                              {isPillVisible && (
                                <motion.span
                                  layoutId="nav-pill"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                                  className="absolute rounded-[999px] z-0 pointer-events-none overflow-hidden"
                                  style={{
                                    inset: '-0.16em -1.1em',
                                    ...pillStyle,
                                  }}
                                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                >
                                  {/* Curved specular shine reflection */}
                                  <span className="nav-shine" aria-hidden="true" />
                                </motion.span>
                              )}
                            </AnimatePresence>

                            <span className={cn(
                              'relative z-10 font-serif tracking-tight transition-all duration-200',
                              'text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.05]',
                              isActive
                                ? 'italic text-[#B15D2E] dark:text-[#FFB692]'
                                : 'text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white',
                            )}>
                              {link.label}
                            </span>
                          </span>
                        </motion.button>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column (Studio info / featured teaser - fills empty space on desktop) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="hidden lg:flex flex-col justify-between p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-md max-w-[420px]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-2 w-2 rounded-full bg-[#B15D2E] dark:bg-[#FFB692] shadow-[0_0_12px_#FFB692]" />
                      <span className="text-[10px] font-bold tracking-[.25em] uppercase text-black/50 dark:text-white/50">Razlo Digital Studio</span>
                    </div>
                    <p className="font-serif italic text-2xl text-black dark:text-white mb-4">
                      Crafting digital identities, bespoke websites & cinematic moving image.
                    </p>
                    <p className="text-xs leading-relaxed text-black/60 dark:text-white/60">
                      We partner with forward-thinking brands worldwide to create unforgettable online and visual experiences.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold tracking-[.2em] uppercase text-black/40 dark:text-white/40 block">Inquiries</span>
                      <a href="mailto:contact@razlo.digital" className="text-xs font-semibold text-[#B15D2E] dark:text-[#FFB692] hover:underline">contact@razlo.digital</a>
                    </div>
                    <button
                      onClick={() => handleNav('/contact')}
                      className="razlo-glass-control px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[.18em] text-black dark:text-white border-black/20 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Start a Project ↗
                    </button>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="relative z-10 px-6 sm:px-12 md:px-20 py-4 md:py-5 max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-black/10 dark:border-white/10"
            >
              <div>
                <p className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 dark:text-white/40 mb-1">Studio Base</p>
                <p className="text-xs tracking-wider font-medium text-black dark:text-white">Luanda · Angola</p>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[.22em] uppercase text-black/40 dark:text-white/40 mb-1">Connect</p>
                <div className="flex gap-4 text-[10px] uppercase font-bold tracking-[.2em] text-black/55 dark:text-white/55">
                  {[['Instagram','https://instagram.com'],['LinkedIn','https://linkedin.com'],['Behance','https://behance.net']].map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer"
                      className="hover:text-[#B15D2E] dark:hover:text-[#FFB692] transition-colors">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <style>{`
              :root {
                --pill-grad: linear-gradient(135deg, rgba(255,255,255,.9) 0%, rgba(255,255,255,.5) 45%, rgba(255,182,146,.25) 100%);
                --pill-shadow: 0 10px 30px rgba(177,93,46,.18), 0 2px 8px rgba(16,12,8,.08),
                               inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(255,255,255,.35);
              }
              .dark {
                --pill-grad: linear-gradient(135deg, rgba(255,255,255,.18) 0%, rgba(255,255,255,.07) 50%, rgba(255,182,146,.12) 100%);
                --pill-shadow: 0 10px 30px rgba(0,0,0,.5),
                               inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(255,255,255,.08);
              }
              .nav-shine {
                position: absolute;
                top: 12%;
                left: 9%;
                width: 36%;
                height: 40%;
                border-radius: 50%;
                background: rgba(255,255,255,.7);
                filter: blur(3px);
                transform: rotate(-14deg);
                pointer-events: none;
              }
              .dark .nav-shine {
                background: rgba(255,255,255,.22);
              }
              .nav-pat {
                position: absolute;
                inset: -300px;
                z-index: 0;
                pointer-events: none;
                background: #0E0E0E;
                opacity: .12;
                -webkit-mask-image: ${PAT_MASK};
                mask-image: ${PAT_MASK};
                animation: nav-pat 84s linear infinite;
                will-change: transform;
              }
              .dark .nav-pat {
                background: #FFF;
                opacity: .09;
              }
              @keyframes nav-pat {
                to { transform: translate3d(260px,260px,0); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}