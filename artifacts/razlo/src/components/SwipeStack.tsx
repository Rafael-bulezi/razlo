import { ReactNode, useLayoutEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export interface SwipeStackItem {
  id: string;
  eyebrow: string;
  title: string;
  duration?: string;
  description: string;
  details: string[];
  accent?: string;
}

interface SwipeStackProps {
  items: SwipeStackItem[];
  className?: string;
  dark?: boolean;
  /* NEW — 'pricing' widens cards so ~2.5–3 are visible on desktop */
  size?: 'default' | 'pricing';
  renderCard?: (item: SwipeStackItem, isActive: boolean) => ReactNode;
}

const GAP = 16;

export default function SwipeStack({ items, className, dark = false, size = 'default', renderCard }: SwipeStackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const cardWidthRef = useRef(0);

  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startScroll: 0,
    moved: 0,
  });

  const single = items.length <= 1;

  // Cache card width to avoid expensive layout recalculations during scroll
  const updateCardWidth = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    if (card) {
      cardWidthRef.current = card.getBoundingClientRect().width;
    }
  };

  const getStep = () => cardWidthRef.current + GAP;

  // Direct DOM updates for maximum performance (no React re-renders)
  const updateUI = () => {
    const el = trackRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;

    if (progressRef.current) {
      progressRef.current.style.width = `${progress * 100}%`;
    }

    const step = getStep();
    const activeIdx = step > 0 ? Math.round(el.scrollLeft / step) : 0;
    if (stepRef.current) {
      stepRef.current.innerText = `${String(activeIdx + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    }

    if (prevBtnRef.current) {
      prevBtnRef.current.disabled = el.scrollLeft <= 4;
    }
    if (nextBtnRef.current) {
      nextBtnRef.current.disabled = el.scrollLeft >= max - 4;
    }
  };

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateCardWidth();
    updateUI();

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateUI();
          rafId = null;
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth + 4) return;
      // Only hijack vertical scroll if it's significantly more vertical than horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.5) {
        e.preventDefault();
        // Use 'auto' behavior to prevent "muddy" queued smooth animations
        el.scrollTo({ left: el.scrollLeft + e.deltaY, behavior: 'auto' });
      }
    };

    const onResize = () => {
      updateCardWidth();
      updateUI();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Let native touch scrolling handle itself beautifully
    if (e.pointerType !== 'mouse') return;
    const el = trackRef.current;
    if (!el) return;

    dragState.current = {
      isDragging: true,
      startX: e.pageX,
      startScroll: el.scrollLeft,
      moved: 0,
    };

    // Disable snap and smooth temporarily for 1:1 mouse tracking
    el.style.scrollSnapType = 'none';
    el.style.scrollBehavior = 'auto';
    el.classList.add('dragging');

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const dx = e.pageX - dragState.current.startX;
    dragState.current.moved = Math.abs(dx);

    if (trackRef.current) {
      trackRef.current.scrollLeft = dragState.current.startScroll - dx;
    }
  };

  const onPointerUp = () => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;

    const el = trackRef.current;
    if (el) {
      // Restore native smooth snapping
      el.style.scrollSnapType = 'x mandatory';
      el.style.scrollBehavior = 'smooth';
      el.classList.remove('dragging');

      // Snap to nearest card if a drag actually occurred
      if (dragState.current.moved > 5) {
        const step = getStep();
        const nearest = Math.round(el.scrollLeft / step) * step;
        el.scrollTo({ left: nearest, behavior: 'smooth' });
      }
    }

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent clicks on card contents if the user was actually dragging
    if (dragState.current.moved > 5) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = 0;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const step = getStep();

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      el.scrollBy({ left: -step, behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      el.scrollBy({ left: step, behavior: 'smooth' });
    } else if (e.key === 'Home') {
      e.preventDefault();
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    }
  };

  const go = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const step = getStep();
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
        tabIndex={0}
        role="region"
        aria-label={`${items.length} cards, scroll horizontally`}
        style={{ scrollBehavior: 'smooth' }}
        className={cn(
          'flex snap-x snap-mandatory touch-pan-x gap-4 overflow-x-auto px-4 py-2 outline-none select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'cursor-grab [&.dragging]:cursor-grabbing'
        )}
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className={cn(
              'razlo-glow-card is-active shrink-0 snap-start rounded-[1.5rem] p-6 sm:p-7',
              /* NEW — size-based widths */
              size === 'pricing'
                ? 'w-[88vw] max-w-[360px] sm:w-[380px] md:w-[420px] lg:w-[440px]'
                : 'w-[82vw] max-w-[330px] sm:w-[340px] md:w-[360px] lg:w-[380px]',
              dark ? 'razlo-glow-card--dark text-white' : 'bg-white/55 text-[#0E0E0E]',
            )}
          >
            <span className="razlo-glass-topline" />
            {renderCard ? (
              renderCard(item, index === 0)
            ) : (
              <div className="flex h-full min-h-[350px] flex-col justify-between">
                <div>
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#B15D2E] dark:text-[#FFB692]">{item.eyebrow}</span>
                    <span className="font-mono text-[10px] tracking-[0.18em] opacity-35">{item.id}</span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="max-w-[15rem] font-serif text-3xl leading-[0.95] tracking-tight sm:text-4xl">{item.title}</h3>
                    {item.duration && <span className="pb-1 text-right text-[10px] uppercase tracking-[0.16em] opacity-45">{item.duration}</span>}
                  </div>
                  <p className="mt-6 text-sm leading-relaxed opacity-60">{item.description}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2 border-t border-current/10 pt-5">
                  {item.details.map((detail) => (
                    <span key={detail} className="rounded-full border border-current/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] opacity-60">{detail}</span>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
        {!single && <div aria-hidden className="w-[16vw] shrink-0 sm:w-[12vw]" />}
      </div>

      {!single && (
        <div className="mt-6 flex items-center gap-3">
          <span className="mr-2 hidden text-[9px] font-bold uppercase tracking-[0.2em] text-black/35 dark:text-white/35 sm:block">Drag / scroll</span>
          <button
            ref={prevBtnRef}
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous cards"
            className="razlo-glass-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/70 transition disabled:cursor-not-allowed disabled:opacity-25 dark:text-white/70"
          >
            <ArrowLeft size={15} />
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-[#B15D2E] to-[#FFB692] transition-[width] duration-200 ease-out"
              style={{ width: '0%' }}
            />
          </div>
          <button
            ref={nextBtnRef}
            type="button"
            onClick={() => go(1)}
            aria-label="Next cards"
            className="razlo-glass-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/70 transition disabled:cursor-not-allowed disabled:opacity-25 dark:text-white/70"
          >
            <ArrowRight size={15} />
          </button>
          <span
            ref={stepRef}
            className="ml-1 min-w-[3.5rem] text-right font-mono text-[10px] tracking-[0.16em] text-black/35 dark:text-white/35"
          >
            01 / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}