import { ReactNode, useEffect, useRef, useState } from 'react';
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
  renderCard?: (item: SwipeStackItem, isActive: boolean) => ReactNode;
}

const GAP = 16;

export default function SwipeStack({ items, className, dark = false, renderCard }: SwipeStackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 });
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const single = items.length <= 1;

  const step = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.getBoundingClientRect().width + GAP : 320;
  };

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    const width = step();
    setActiveStep(width > 0 ? Math.round(el.scrollLeft / width) : 0);
  };

  const go = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const nextLeft = Math.min(max, Math.max(0, el.scrollLeft + dir * step()));
    el.scrollTo({ left: nextLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth + 4) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      }
    };
    const onResize = () => update();
    el.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { down: true, startX: e.pageX, startScroll: trackRef.current?.scrollLeft ?? 0, moved: 0 };
    suppressClick.current = false;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down || !trackRef.current) return;
    const dx = e.pageX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (wasPointerUp = false, e?: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    if (wasPointerUp && drag.current.moved > 6) suppressClick.current = true;
    if (wasPointerUp && e) {
      drag.current.moved = Math.max(drag.current.moved, Math.abs(e.pageX - drag.current.startX));
      if (drag.current.moved > 6) suppressClick.current = true;
    }
    drag.current.down = false;
    setDragging(false);
    const el = trackRef.current;
    if (el) {
      const nearest = Math.round(el.scrollLeft / step()) * step();
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: Math.min(max, Math.max(0, nearest)), behavior: 'smooth' });
    }
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={trackRef}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(true, e)}
        onPointerLeave={() => endDrag(false)}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
        tabIndex={0}
        role="region"
        aria-label={`${items.length} cards, scroll horizontally`}
        style={{ scrollSnapType: dragging ? 'none' : undefined }}
        className={cn(
          'flex snap-x snap-mandatory touch-pan-x gap-4 overflow-x-auto px-4 py-2 outline-none select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          dragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
      >
        {items.map((item, index) => (
          <article
            key={item.id}
            className={cn(
              'razlo-glow-card is-active w-[82vw] max-w-[330px] shrink-0 snap-start rounded-[1.5rem] p-6 sm:w-[340px] sm:p-7 md:w-[360px] lg:w-[380px]',
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
            type="button"
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous cards"
            className="razlo-glass-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/70 transition disabled:cursor-not-allowed disabled:opacity-25 dark:text-white/70"
          >
            <ArrowLeft size={15} />
          </button>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#B15D2E] to-[#FFB692] transition-[width] duration-200 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canNext}
            aria-label="Next cards"
            className="razlo-glass-control flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-black/70 transition disabled:cursor-not-allowed disabled:opacity-25 dark:text-white/70"
          >
            <ArrowRight size={15} />
          </button>
          <span className="ml-1 min-w-[3.5rem] text-right font-mono text-[10px] tracking-[0.16em] text-black/35 dark:text-white/35">
            {String(activeStep + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
