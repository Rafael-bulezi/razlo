import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/razlo-button';
import { useDocumentMeta } from '../lib/useDocumentMeta';

type Phase = {
  id: string;
  title: string;
  duration: string;
  description: string;
  details: string[];
  line: string;
  output: string;
};

const PHASES: Phase[] = [
  { id: '01', title: 'Discovery Call', duration: '1–2 days', description: 'A focused conversation to understand your brand, goals, timeline, and competitive landscape. We listen before we talk.', details: ['Brand questionnaire', 'Goals alignment', 'Scope outline'], line: 'We start by <em>listening.</em>', output: 'Output → a short discovery brief.' },
  { id: '02', title: 'Strategic Proposal', duration: '2–3 days', description: 'We craft a tailored proposal — not a template. Deliverables, timeline, investment, and the exact team working on your project.', details: ['Custom proposal', 'Timeline & milestones', 'Fixed pricing'], line: 'Then we draw <em>the map.</em>', output: 'Output → direction + fixed pricing, signed off.' },
  { id: '03', title: 'Design & Architecture', duration: '1–2 weeks', description: 'Before a line of code is written, we design. Wireframes, visual direction, motion principles, and technical architecture.', details: ['Design mockups', 'Motion direction', 'Tech stack decision'], line: 'Design first, <em>always.</em>', output: 'Output → mockups, motion direction, stack.' },
  { id: '04', title: 'Build & Iterate', duration: '2–6 weeks', description: 'Agile development with weekly check-ins. You see progress, give feedback, and watch the product come to life.', details: ['Weekly builds', 'Feedback cycles', 'QA & testing'], line: 'We build <em>in the open.</em>', output: 'Output → weekly builds you can click.' },
  { id: '05', title: 'Launch & Handoff', duration: '3–5 days', description: 'We deploy, monitor, and hand off with full documentation. You leave with everything you need to own and grow your digital presence.', details: ['Live deployment', 'Documentation', 'Training session'], line: 'And we <em>hand over</em> the keys.', output: 'Output → a shipped product you own.' },
];

const AT = [0.02, 0.25, 0.5, 0.74, 0.95];

export default function Protocol() {
  useDocumentMeta('Protocol — Razlo Digital Studio', 'A clear five-phase process for creating focused and distinctive digital work.');

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const routeDRef = useRef<SVGPathElement | null>(null);
  const routeMRef = useRef<SVGPathElement | null>(null);
  const inkRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  /* ---------- scroll-drawn route ---------- */
  useEffect(() => {
    const wrap = wrapRef.current;
    const routeD = routeDRef.current;
    const routeM = routeMRef.current;
    const ink = inkRef.current;
    if (!wrap || !routeD || !routeM || !ink) return;

    const wps = Array.from(wrap.querySelectorAll<HTMLElement>('.pp-waypoint'));
    const phs = Array.from(wrap.querySelectorAll<HTMLElement>('.pp-phase'));
    const mq = matchMedia('(max-width:820px)');
    let route: SVGPathElement = routeD;
    let len = 0;

    const measure = () => {
      route = mq.matches ? routeM : routeD;
      [routeD, routeM].forEach((r) => {
        const L = r.getTotalLength();
        r.style.strokeDasharray = String(L);
        r.style.strokeDashoffset = String(L);
      });
      len = route.getTotalLength();
    };
    measure();

    const render = () => {
      const total = wrap.offsetHeight - innerHeight;
      const p = Math.max(0, Math.min(1, -wrap.getBoundingClientRect().top / total));
      route.style.strokeDashoffset = String(len * (1 - p));

      const svg = route.ownerSVGElement!;
      const vb = svg.viewBox.baseVal;
      const sr = svg.getBoundingClientRect();
      const pt = route.getPointAtLength(p * len);
      ink.style.left = `${((pt.x - vb.x) / vb.width) * sr.width}px`;
      ink.style.top = `${((pt.y - vb.y) / vb.height) * sr.height}px`;

      let lit = 0;
      wps.forEach((w, i) => { const on = p >= AT[i]; if (on) lit = i + 1; w.classList.toggle('lit', on); });
      phs.forEach((c, i) => c.classList.toggle('lit', p >= AT[i]));
      if (countRef.current) countRef.current.textContent = `0${Math.max(1, lit)} / 05`;
    };

    let ticking = false;
    const onScroll = () => { if (!ticking) { requestAnimationFrame(() => { render(); ticking = false; }); ticking = true; } };
    const onResize = () => { measure(); render(); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    mq.addEventListener?.('change', onResize);
    render();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      mq.removeEventListener?.('change', onResize);
    };
  }, []);

  /* ---------- lightbox ---------- */
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', onKey); };
  }, [open]);

  const d = open !== null ? PHASES[open] : null;

  return (
    <div className="pp">
      <Navbar />

      {/* ============ OPENING ============ */}
      <section className="pp-open">
        <div className="pp-ambient" />
        <div className="pp-bubble pb-1" /><div className="pp-bubble pb-2" /><div className="pp-bubble pb-3" />

        <div className="pp-open-inner">
          <div className="pp-open-grid">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <p className="pp-kicker">Razlo.digital / The protocol</p>
              <h1 className="pp-h1">
                <span className="pp-mask"><span>A <span className="pp-pill">clear</span> path</span></span>
                <span className="pp-mask"><span>to <em>distinct.</em></span></span>
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="pp-open-side">
              <p className="pp-lede">Good work has rhythm. Five deliberate phases make the process transparent, focused, and easy to move through together.</p>
              <Button variant="copper" size="md" to="/contact" className="mt-7">Start a project <ArrowRight size={15} /></Button>
            </motion.div>
          </div>
          <div className="pp-hairline">
            <span>05 Phases</span>
            <span>Est. 2024 · Luanda</span>
            <span>Razlo.digital</span>
          </div>
        </div>
      </section>

      {/* ============ THE ROUTE ============ */}
      <div className="pp-wrap" ref={wrapRef}>
        <section className="pp-stage">
          <div className="pp-stage-head">
            <span className="pp-kicker">The route</span>
            <span className="pp-count" ref={countRef}>01 / 05</span>
          </div>

          <div className="pp-map-area">
            <div className="pp-ambient" />
            <div className="pp-bubble pb-4" /><div className="pp-bubble pb-5" />

            <div className="pp-map pp-map-d">
              <svg viewBox="0 0 1400 900" preserveAspectRatio="none">
                <path className="pp-track" d="M 168 90 C 520 130 880 190 1176 270 C 880 370 540 400 224 468 C 540 560 880 580 1176 648 C 940 740 760 780 700 810" />
                <path className="pp-route" ref={routeDRef} d="M 168 90 C 520 130 880 190 1176 270 C 880 370 540 400 224 468 C 540 560 880 580 1176 648 C 940 740 760 780 700 810" />
              </svg>
            </div>
            <div className="pp-map pp-map-m">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="pp-track" d="M 22 8 C 55 14 80 18 80 28 C 80 40 22 40 22 48 C 22 60 80 60 80 68 C 80 78 55 82 50 88" />
                <path className="pp-route" ref={routeMRef} d="M 22 8 C 55 14 80 18 80 28 C 80 40 22 40 22 48 C 22 60 80 60 80 68 C 80 78 55 82 50 88" />
              </svg>
            </div>

            <div className="pp-ink" ref={inkRef} />

            {PHASES.map((ph, i) => (
              <div key={ph.id} className={`pp-waypoint w-${i + 1}`}>
                <button type="button" className="pp-wp" onClick={() => setOpen(i)} aria-haspopup="dialog" aria-label={`View details for phase ${ph.id}, ${ph.title}`}>
                  <span className="pp-ring" /><span className="pp-num">{ph.id}</span><span className="pp-badge" aria-hidden="true">+</span>
                </button>
              </div>
            ))}

            {PHASES.map((ph, i) => (
              <article key={ph.id} className={`pp-phase p-${i + 1}`}>
                <p className="pp-phase-kicker">{ph.id} · {ph.title}</p>
                <h3 className="pp-phase-title" dangerouslySetInnerHTML={{ __html: ph.line }} />
                <span className="pp-pill-bubble">{ph.duration}</span>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ============ CLOSING ============ */}
      <section className="pp-cta">
        <div className="pp-bubble pb-2" /><div className="pp-bubble pb-3" />
        <p className="pp-kicker">Your first step</p>
        <h2 className="pp-h2">Start with a<br /><em>real conversation.</em></h2>
        <p className="pp-cta-lede">Tell us where you are and where the work needs to go. Discovery calls are always free.</p>
        <Button variant="copper" size="lg" to="/contact">Book a discovery call <ArrowRight size={16} /></Button>
      </section>

      <Footer />

      {/* ============ LIGHTBOX ============ */}
      <div className={`pp-lb-backdrop ${open !== null ? 'open' : ''}`} onClick={() => setOpen(null)} />
      <aside className={`pp-lb ${open !== null ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="ppLbTitle">
        <div className="pp-lb-inner">
          <div className="pp-lb-ambient" />
          <button type="button" className="pp-lb-close" onClick={() => setOpen(null)} aria-label="Close details"><X size={16} /></button>
          {d && (
            <div className="pp-lb-content">
              <div className="pp-lb-numrow">
                <span className="pp-lb-num">{d.id}</span>
                <span className="pp-lb-kicker">Phase {d.id} · {d.duration}</span>
              </div>
              <h2 className="pp-lb-title" id="ppLbTitle">{d.title}</h2>
              <p className="pp-lb-lede">{d.description}</p>
              <div className="pp-lb-steps">
                {d.details.map((s) => (
                  <div key={s} className="pp-lb-step">
                    <span className="pp-lb-mark" />
                    <div className="pp-lb-body">{s}</div>
                  </div>
                ))}
              </div>
              <p className="pp-lb-foot">{d.output}</p>
            </div>
          )}
        </div>
      </aside>

      <style>{`
        .pp{--surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);--copper:#FFB692;--terra:#B15D2E;--rule:rgba(255,255,255,.12);--glass-border:rgba(255,255,255,.18);--glass-bg:rgba(255,255,255,.05);
          background:var(--surface);color:var(--ink);font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh}
        .pp *{box-sizing:border-box}
        .pp-kicker{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper)}

        .pp-ambient{position:absolute;inset:0;pointer-events:none}
        .pp-ambient::before,.pp-ambient::after{content:"";position:absolute;border-radius:50%;filter:blur(80px)}
        .pp-ambient::before{top:10%;left:6%;width:380px;height:380px;background:radial-gradient(circle,rgba(255,182,146,.06),transparent 70%)}
        .pp-ambient::after{bottom:6%;right:6%;width:440px;height:440px;background:radial-gradient(circle,rgba(177,93,46,.05),transparent 70%)}

        .pp-bubble{position:absolute;border-radius:50%;border:1px solid var(--glass-border);background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);pointer-events:none}
        .pp-bubble::after{content:"";position:absolute;top:20%;left:22%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.15);filter:blur(2px)}
        .pb-1{top:14%;right:7%;width:84px;height:84px;animation:pp-drift 9s ease-in-out infinite alternate}
        .pb-2{top:44%;left:4%;width:44px;height:44px;animation:pp-drift 11s ease-in-out infinite alternate-reverse}
        .pb-3{top:24%;left:38%;width:30px;height:30px;border-color:rgba(255,182,146,.4);background:linear-gradient(135deg,rgba(255,182,146,.12),rgba(255,255,255,.02));animation:pp-drift 8s ease-in-out infinite alternate}
        .pb-4{top:12%;right:6%;width:56px;height:56px;animation:pp-drift 9s ease-in-out infinite alternate}
        .pb-5{bottom:14%;left:5%;width:34px;height:34px;border-color:rgba(255,182,146,.35);background:linear-gradient(135deg,rgba(255,182,146,.1),rgba(255,255,255,.02));animation:pp-drift 10s ease-in-out infinite alternate-reverse}
        @keyframes pp-drift{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-20px) rotate(3deg)}}

        /* opening */
        .pp-open{position:relative;overflow:hidden;padding:clamp(6.5rem,16vh,10rem) clamp(1.25rem,4vw,3rem) clamp(2.5rem,6vh,4rem)}
        .pp-open-inner{position:relative;z-index:2;max-width:1500px;margin:0 auto}
        .pp-open-grid{display:grid;gap:2.5rem;align-items:end}
        @media (min-width:1024px){.pp-open-grid{grid-template-columns:1fr .62fr}}
        .pp-h1{margin-top:1.2rem;font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.8rem,7.5vw,7rem);line-height:.9;letter-spacing:-.04em}
        .pp-h1 em{font-style:italic;color:var(--copper)}
        .pp-mask{display:block;overflow:hidden}
        .pp-mask>span{display:block;transform:translateY(112%);animation:pp-maskup 1s cubic-bezier(.16,1,.3,1) forwards}
        .pp-mask:nth-child(2)>span{animation-delay:.12s}
        @keyframes pp-maskup{to{transform:none}}
        .pp-pill{position:relative;display:inline-block;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.4);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.18),inset 0 1px 0 rgba(255,255,255,.12)}
        .pp-pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.2);filter:blur(1.5px);pointer-events:none}
        .pp-lede{max-width:28rem;font-size:.95rem;line-height:1.7;color:var(--ink-soft)}
        @media (min-width:1024px){.pp-lede{margin-left:auto}}
        .pp-hairline{margin-top:4rem;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--rule);padding-top:1.4rem;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-faint)}

        /* route */
        .pp-wrap{height:420vh}
        @media (max-width:820px){.pp-wrap{height:340vh}}
        .pp-stage{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;padding:clamp(1.2rem,4vh,2.4rem) clamp(1.25rem,4vw,3rem) 0;max-width:1500px;margin:0 auto;overflow:hidden}
        .pp-stage-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.6rem}
        .pp-count{font-family:"Noto Serif",serif;font-style:italic;font-size:1rem;color:var(--copper)}
        .pp-map-area{position:relative;flex:1;min-height:0}
        .pp-map{position:absolute;inset:0;pointer-events:none}
        .pp-map svg{position:absolute;inset:0;width:100%;height:100%}
        .pp-track{fill:none;stroke:var(--rule);stroke-width:1.5;stroke-dasharray:3 9}
        .pp-route{fill:none;stroke:var(--copper);stroke-width:2.5;stroke-linecap:round;filter:drop-shadow(0 0 6px rgba(177,93,46,.35))}
        .pp-map-m{display:none}
        @media (max-width:820px){.pp-map-d{display:none}.pp-map-m{display:block}.pp-track,.pp-route{vector-effect:non-scaling-stroke}}
        .pp-ink{position:absolute;z-index:3;width:11px;height:11px;border-radius:50%;background:var(--copper);transform:translate(-50%,-50%);box-shadow:0 0 0 5px rgba(177,93,46,.16),0 0 18px rgba(177,93,46,.55);pointer-events:none}

        .pp-waypoint{position:absolute;z-index:4;transform:translate(-50%,-50%);opacity:0;scale:.4;transition:opacity .6s cubic-bezier(.16,1,.3,1),scale .7s cubic-bezier(.16,1,.3,1)}
        .pp-waypoint.lit{opacity:1;scale:1}
        .pp-wp{position:relative;width:clamp(64px,7vw,104px);aspect-ratio:1;border-radius:50%;border:1px solid var(--glass-border);background:radial-gradient(72% 60% at 30% 24%,rgba(255,255,255,.14),var(--glass-bg) 62%);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);box-shadow:0 16px 40px rgba(255,182,146,.12),inset 0 1px 0 rgba(255,255,255,.2),inset 0 -8px 18px rgba(255,255,255,.06);display:grid;place-items:center;cursor:pointer;animation:pp-wobble 6s ease-in-out infinite;transition:border-color .5s}
        .pp-wp::after{content:"";position:absolute;top:16%;left:20%;width:30%;height:24%;border-radius:50%;background:rgba(255,255,255,.16);filter:blur(3px)}
        .pp-wp:hover{border-color:rgba(255,182,146,.6)}
        .pp-wp:active{transform:scale(.94)}
        .pp-wp:focus-visible{outline:2px solid var(--copper);outline-offset:4px}
        .pp-waypoint.lit .pp-wp{border-color:rgba(255,182,146,.45)}
        .pp-num{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:clamp(1.3rem,3vw,2.4rem);color:var(--copper)}
        .pp-badge{position:absolute;bottom:-3px;right:-3px;z-index:2;width:20px;height:20px;border-radius:50%;background:var(--terra);color:#FFF;display:grid;place-items:center;font-size:12px;font-weight:600;line-height:1;box-shadow:0 3px 10px rgba(177,93,46,.5),0 0 0 3px var(--surface)}
        .pp-ring{position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(255,182,146,.3);animation:pp-ringp 2.6s ease-in-out infinite;pointer-events:none}
        @keyframes pp-ringp{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:0;transform:scale(1.22)}}
        @keyframes pp-wobble{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-7px) rotate(1.5deg)}}
        @media (max-width:820px){.pp-wp{width:54px}.pp-num{font-size:1.15rem}.pp-badge{width:16px;height:16px;font-size:10px}}

        .pp-phase{position:absolute;z-index:3;max-width:300px;opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
        .pp-phase.lit{opacity:1;transform:none}
        .pp-phase-kicker{font-size:9px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--copper);margin-bottom:.45rem}
        .pp-phase-title{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(1.3rem,2.4vw,2rem);line-height:1.05;letter-spacing:-.02em;margin-bottom:.6rem}
        .pp-phase-title em{font-style:italic;color:var(--copper)}
        .pp-pill-bubble{position:relative;display:inline-block;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:.82rem;color:var(--copper);padding:.14em .6em .2em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 6px 16px rgba(177,93,46,.14),inset 0 1px 0 rgba(255,255,255,.12)}
        .pp-pill-bubble::after{content:"";position:absolute;top:22%;left:16%;width:24%;height:32%;border-radius:50%;background:rgba(255,255,255,.16);filter:blur(1.5px)}
        @media (max-width:820px){.pp-phase{max-width:56%}.pp-phase-title{font-size:clamp(1rem,4.6vw,1.3rem)}}

        .w-1{left:12%;top:10%}.p-1{left:20%;top:5%}
        .w-2{left:84%;top:30%}.p-2{right:20%;top:25%;text-align:right}
        .w-3{left:16%;top:52%}.p-3{left:24%;top:47%}
        .w-4{left:84%;top:72%}.p-4{right:20%;top:67%;text-align:right}
        .w-5{left:50%;top:90%}.p-5{left:50%;margin-left:-150px;top:82%;text-align:center}
        @media (max-width:820px){
          .w-1{left:22%;top:8%}.p-1{left:40%;top:4%;text-align:left}
          .w-2{left:80%;top:28%}.p-2{left:6%;top:23%;text-align:left}
          .w-3{left:22%;top:48%}.p-3{left:40%;top:44%;text-align:left}
          .w-4{left:80%;top:68%}.p-4{left:6%;top:63%;text-align:left}
          .w-5{left:50%;top:88%}.p-5{left:22%;margin-left:0;top:80%;text-align:left}
        }

        /* closing */
        .pp-cta{position:relative;overflow:hidden;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:6rem 1.5rem;text-align:center}
        .pp-h2{margin-top:1.2rem;font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.4rem,6vw,4.8rem);line-height:.9;letter-spacing:-.03em}
        .pp-h2 em{font-style:italic;color:var(--copper)}
        .pp-cta-lede{margin:1.4rem auto 2.2rem;max-width:26rem;font-size:.92rem;line-height:1.7;color:var(--ink-soft)}

        /* lightbox */
        .pp-lb-backdrop{position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;visibility:hidden;transition:opacity .35s ease}
        .pp-lb-backdrop.open{opacity:1;visibility:visible}
        .pp-lb{position:fixed;z-index:51;top:0;right:0;height:100%;width:min(560px,92vw);background:var(--surface);border-left:1px solid var(--rule);box-shadow:-40px 0 80px rgba(0,0,0,.5);transform:translateX(100%);transition:transform .5s cubic-bezier(.16,1,.3,1);overflow-y:auto}
        .pp-lb.open{transform:translateX(0)}
        @media (max-width:820px){.pp-lb{width:100%}}
        .pp-lb-inner{position:relative;padding:clamp(2rem,5vw,3.5rem) clamp(1.75rem,5vw,3.25rem) 3rem;min-height:100%;display:flex;flex-direction:column;justify-content:center}
        .pp-lb-ambient{position:absolute;inset:0;overflow:hidden;pointer-events:none}
        .pp-lb-ambient::before{content:"";position:absolute;top:-10%;right:-15%;width:340px;height:340px;border-radius:50%;filter:blur(80px);background:radial-gradient(circle,rgba(255,182,146,.08),transparent 70%)}
        .pp-lb-close{position:absolute;top:clamp(1.25rem,3vh,2rem);right:clamp(1.25rem,4vw,2rem);z-index:2;width:38px;height:38px;border-radius:50%;border:1px solid var(--rule);background:var(--glass-bg);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);cursor:pointer;display:grid;place-items:center;color:var(--ink);transition:transform .3s,border-color .3s}
        .pp-lb-close:hover{transform:rotate(90deg);border-color:rgba(255,182,146,.5)}
        .pp-lb-content{position:relative;z-index:1}
        .pp-lb-numrow{display:flex;align-items:baseline;gap:1rem;margin-bottom:1.1rem}
        .pp-lb-num{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:clamp(2rem,5vw,2.8rem);color:var(--copper);line-height:1}
        .pp-lb-kicker{font-size:9px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--ink-faint)}
        .pp-lb-title{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(1.6rem,3.6vw,2.2rem);line-height:1.1;letter-spacing:-.02em;margin-bottom:1rem}
        .pp-lb-lede{font-size:.98rem;line-height:1.6;color:var(--ink-soft);margin-bottom:1.5rem;max-width:40ch}
        .pp-lb-steps{display:flex;flex-direction:column;gap:.85rem;margin-bottom:1.4rem}
        .pp-lb-step{display:flex;gap:.7rem;align-items:baseline}
        .pp-lb-mark{flex-shrink:0;width:5px;height:5px;border-radius:50%;background:var(--copper)}
        .pp-lb-body{font-size:.92rem;line-height:1.4;color:var(--ink-soft)}
        .pp-lb-foot{font-size:.76rem;color:var(--ink-faint);border-top:1px solid var(--rule);padding-top:1rem;line-height:1.5}

        @media (prefers-reduced-motion:reduce){
          .pp-wp,.pp-ring,.pp-bubble,.pp-mask>span{animation-duration:.01ms!important;animation-iteration-count:1!important}
          .pp-lb,.pp-lb-backdrop{transition-duration:.01ms!important}
        }
      `}</style>
    </div>
  );
}