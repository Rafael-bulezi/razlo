import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Button from './ui/razlo-button';
import { ArrowRight } from 'lucide-react';

const DESKTOP_WAYPOINTS = [
  { x: 12, y: 34 },
  { x: 40, y: 58 },
  { x: 68, y: 34 },
  { x: 92, y: 58 },
] as const;

const MOBILE_WAYPOINTS = [
  { x: 22, y: 8 },
  { x: 80, y: 32 },
  { x: 22, y: 58 },
  { x: 80, y: 82 },
] as const;

function smoothPath(pts: readonly { x: number; y: number }[]): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

function findRouteProgress(route: SVGPathElement, target: { x: number; y: number }) {
  const length = route.getTotalLength();
  let closest = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let sample = 0; sample <= 100; sample += 1) {
    const distance = (sample / 100) * length;
    const point = route.getPointAtLength(distance);
    const deltaX = point.x - target.x;
    const deltaY = point.y - target.y;
    const distanceToTarget = deltaX * deltaX + deltaY * deltaY;
    if (distanceToTarget < closestDistance) {
      closestDistance = distanceToTarget;
      closest = sample / 100;
    }
  }

  return closest;
}

const STEPS = [
  {
    number: '01',
    label: 'Discovery',
    title: <>We start by <em>listening.</em></>,
    duration: '2–3 wks',
  },
  {
    number: '02',
    label: 'Strategy',
    title: <>Then we draw <em>the map.</em></>,
    duration: '1–2 wks',
  },
  {
    number: '03',
    label: 'Execution',
    title: <>We build <em>with care.</em></>,
    duration: '8–12 wks',
  },
  {
    number: '04',
    label: 'Launch & Growth',
    title: <>And we <em>stay.</em></>,
    duration: 'ongoing',
  },
];

const ProtocolShowcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const desktopRouteRef = useRef<SVGPathElement>(null);
  const mobileRouteRef = useRef<SVGPathElement>(null);
  const progressRef = useRef(0);
  const layoutKeyRef = useRef('');
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activationPoints, setActivationPoints] = useState([0.02, 0.34, 0.66, 0.93]);
  const [routeState, setRouteState] = useState({
    length: 0,
    dot: { x: 168, y: 90 },
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 820px)');
    let frame = 0;

    const measureLayout = () => {
      const route = mobileQuery.matches ? mobileRouteRef.current : desktopRouteRef.current;
      if (!route) return;

      const layoutKey = `${mobileQuery.matches ? 'mobile' : 'desktop'}:${window.innerWidth}x${window.innerHeight}`;
      if (layoutKeyRef.current === layoutKey) return;
      layoutKeyRef.current = layoutKey;

      const length = route.getTotalLength();
      const targets = mobileQuery.matches ? MOBILE_WAYPOINTS : DESKTOP_WAYPOINTS;
      setActivationPoints(
        targets.map((target) => Math.max(0.02, findRouteProgress(route, target)))
      );
      setRouteState((current) => ({ length, dot: current.dot }));
    };

    const updateDot = () => {
      const route = mobileQuery.matches ? mobileRouteRef.current : desktopRouteRef.current;
      if (!route) return;

      const length = route.getTotalLength();
      const point = route.getPointAtLength(progressRef.current * length);
      setRouteState({ length, dot: { x: point.x, y: point.y } });
    };

    const render = () => {
      const wrap = wrapRef.current;
      const total = wrap ? Math.max(1, wrap.offsetHeight - window.innerHeight) : 1;
      const next = wrap
        ? Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / total))
        : 0;

      progressRef.current = next;
      setProgress(next);
      measureLayout();
      updateDot();
      frame = 0;
    };

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const updateMobile = () => {
      setIsMobile(mobileQuery.matches);
      requestRender();
    };

    updateMobile();
    render();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    mobileQuery.addEventListener('change', updateMobile);

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      mobileQuery.removeEventListener('change', updateMobile);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeStep = STEPS.reduce((current, _, index) => {
    return progress >= activationPoints[index] ? index : current;
  }, -1);

  return (
    <div ref={wrapRef} className="razlo-protocol-wrap">
      <section className="razlo-protocol-stage relative flex h-svh max-w-[1500px] flex-col overflow-hidden bg-[#0E0E0E] px-5 pt-8 text-white sm:px-8 md:px-12 lg:mx-auto lg:px-20">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="razlo-kicker text-[#FFB692]">Razlo.digital / The protocol</p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.4rem)] leading-[0.88] tracking-[-0.04em]">
              How the work<br /><em className="text-[#FFB692]">moves.</em>
            </h2>
          </div>
          <Button variant="secondary" size="sm" to="/protocol" className="mt-0 shrink-0 border-white/20 text-white">
            Full protocol <ArrowRight size={13} />
          </Button>
        </div>

        <div className="relative min-h-0 flex-1">
          <div className="razlo-protocol-ambient" aria-hidden="true" />
          <div className="protocol-glass-bubble protocol-gb-1" aria-hidden="true" />
          <div className="protocol-glass-bubble protocol-gb-2" aria-hidden="true" />
          <div className="protocol-glass-bubble protocol-gb-3" aria-hidden="true" />
          <div className="protocol-glass-bubble protocol-gb-4" aria-hidden="true" />
          <div className="protocol-glass-bubble protocol-gb-5" aria-hidden="true" />

          <svg className="protocol-route protocol-route-desktop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="protocol-track" d={smoothPath(DESKTOP_WAYPOINTS)} />
            <path ref={desktopRouteRef} className="protocol-route-line" strokeDasharray={routeState.length || undefined} strokeDashoffset={(routeState.length || 0) * (1 - progress)} d={smoothPath(DESKTOP_WAYPOINTS)} />
            <circle className="protocol-ink-drop" cx={routeState.dot.x} cy={routeState.dot.y} r="1.2" />
          </svg>
          <svg className="protocol-route protocol-route-mobile" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="protocol-track" d="M 22 8 C 55 14 80 20 80 32 C 80 44 22 46 22 58 C 22 70 55 74 80 82" />
            <path ref={mobileRouteRef} className="protocol-route-line" strokeDasharray={routeState.length || undefined} strokeDashoffset={(routeState.length || 0) * (1 - progress)} d="M 22 8 C 55 14 80 20 80 32 C 80 44 22 46 22 58 C 22 70 55 74 80 82" />
            <circle className="protocol-ink-drop" cx={routeState.dot.x} cy={routeState.dot.y} r="1.8" />
          </svg>

          {STEPS.map((step, index) => (
            <div key={step.number}>
              <div className={`protocol-waypoint protocol-w-${index + 1} ${activeStep >= index ? 'is-lit' : ''}`}>
                <span>{step.number}</span>
              </div>
              <article className={`protocol-phase protocol-p-${index + 1} ${activeStep >= index ? 'is-lit' : ''}`}>
                <p className="protocol-phase-kicker">{step.number} · {step.label}</p>
                <h3>{step.title}</h3>
                <span className="protocol-pill">{step.duration}</span>
              </article>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 py-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
          <span>Scroll to move through the protocol</span>
          <span>04 phases · Luanda</span>
        </div>
      </section>
    </div>
  );
};

export default ProtocolShowcase;
