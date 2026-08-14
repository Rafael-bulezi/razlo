import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useCurtain } from './Curtain';
import { PROJECTS } from '../data/projects';

/* per-index art direction for the fan blades */
const FOCALS = ['50% 45%', '70% 40%', '30% 60%', '40% 70%'];
const TREATS = ['none', 'none', 'sepia(.25)', 'brightness(.8)'];

export default function Projects() {
  const { navigate } = useCurtain();
  const items = PROJECTS.slice(0, 4);

  const secRef = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const liftRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLParagraphElement | null>(null);
  const fanRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  /* entrance deal + scroll in/out — transforms/opacity only */
  useEffect(() => {
    const sec = secRef.current, fan = fanRef.current;
    if (!sec || !fan) return;
    let tick = false;

    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;
        const e = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
        const x = Math.min(1, Math.max(0, r.bottom / (vh * 0.6)));
        const vis = Math.min(e, x);
        const ty = (1 - e) * 56 - (1 - x) * 36;
        if (headRef.current) {
          headRef.current.style.opacity = String(vis);
          headRef.current.style.transform = `translateY(${(1 - e) * 34}px)`;
        }
        if (liftRef.current) {
          liftRef.current.style.opacity = String(vis);
          liftRef.current.style.transform = `translateY(${ty}px)`;
        }
        if (hintRef.current) hintRef.current.style.opacity = String(vis * 0.9);
      });
    };

    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) { fan.classList.remove('pre'); io.disconnect(); }
      },
      { threshold: 0.3 }
    );
    io.observe(fan);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  /* lightbox: lock, focus, keys */
  useEffect(() => {
    if (openIdx === null) return;
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('lb-open');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === 'ArrowLeft') setOpenIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.body.classList.remove('lb-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [openIdx, items.length]);

  const pad = (n: number) => String(n + 1).padStart(2, '0');
  const active = openIdx !== null ? items[openIdx] : null;

  return (
    <>
      <section className="fan-sec" ref={secRef}>
        <div className="pat" aria-hidden="true" />

        <div className="fan-head" ref={headRef}>
          <p className="pj-k">Selected work / 2024–26</p>
          <h2 className="pj-h1">Our best<br /><span className="pj-pill">work.</span></h2>
          <p className="pj-lede">Four projects we still talk about. Tap one to step inside.</p>
        </div>

        <div className="fan-lift" ref={liftRef}>
          <div className="fan pre" ref={fanRef}>
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="fcard"
                aria-label={`Open ${p.title}`}
                onClick={() => setOpenIdx(i)}
              >
                <img
                  src={p.image}
                  alt={`${p.title} — featured project`}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  style={{ objectPosition: FOCALS[i % FOCALS.length], filter: TREATS[i % TREATS.length] }}
                />
                <span className="scrim" />
                <span className="num">{pad(i)}</span>
                <span className="nm">{p.title}</span>
                <span className="ct">{p.category}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="fan-hint" ref={hintRef}>Hover to spread · tap to open</p>
      </section>

      {/* ---------- lightbox ---------- */}
      <div className={`lb ${openIdx !== null ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="lbName">
        <div className="lb-veil" onClick={() => setOpenIdx(null)} />
        {active && openIdx !== null && (
          <div className="lb-panel">
            <div className="lb-body" key={openIdx}>
              <div className="lb-head">
                <div className="lb-id">
                  <span className="lb-num">{pad(openIdx)}</span>
                  <h3 className="lb-name" id="lbName">{active.title}</h3>
                </div>
                <div className="lb-side">
                  <span className="lb-count">{pad(openIdx)} / {pad(items.length - 1)}</span>
                  <button type="button" className="lb-x" ref={closeRef} aria-label="Close" onClick={() => setOpenIdx(null)}>
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div className="lb-media">
                {active.videoUrl ? (
                  <video controls playsInline poster={active.image} src={active.videoUrl} />
                ) : (
                  <img src={active.image} alt={`${active.title} — project visual`} />
                )}
              </div>

              <p className="lb-note">{active.description}</p>

              <div className="lb-foot">
                <span className="lb-cat">{active.category} · {active.year}</span>
                <div className="lb-act">
                  <div className="lb-nav">
                    <button type="button" aria-label="Previous project" onClick={() => setOpenIdx((openIdx - 1 + items.length) % items.length)}>
                      <ArrowLeft size={14} />
                    </button>
                    <button type="button" aria-label="Next project" onClick={() => setOpenIdx((openIdx + 1) % items.length)}>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <a
                    className="lb-go"
                    href="#/works"
                    onClick={(e) => { e.preventDefault(); navigate('/works'); }}
                  >
                    View <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .fan-sec{--surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--ink-faint:rgba(14,14,14,.42);--copper:#B15D2E;--copper-light:#FFB692;--rule:rgba(14,14,14,.12);--glass-bg:rgba(255,255,255,.55);--glass-hi:rgba(255,255,255,.7);--noir:#141110;--cb:cubic-bezier(.22,1,.3,1);
          position:relative;max-width:1200px;margin:0 auto;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(.9rem,2.6vh,1.8rem);padding:4.5rem 1rem 2.4rem;overflow:hidden}
        body.dark .fan-sec{--surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);--copper:#FFB692;--copper-light:#FFB692;--rule:rgba(255,255,255,.12);--glass-bg:rgba(255,255,255,.06);--glass-hi:rgba(255,255,255,.18);--noir:#0B0908}
        .fan-sec .pat{position:absolute;inset:-300px;z-index:0;pointer-events:none;background:var(--ink);opacity:.14;
          -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg opacity='.85' transform='translate(49.6 49.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 49.6) scale(1.2)'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(49.6 181.6) scale(1.2)'%3E%3Cpath d='M17 3l4 4L8 20l-5 1 1-5z'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 181.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M10 8l6 4-6 4z'/%3E%3C/g%3E%3Cg opacity='.6' transform='translate(117.6 117.6) scale(1.2)'%3E%3Cpath d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23000' opacity='.45'%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='130' cy='0' r='2'/%3E%3Ccircle cx='260' cy='0' r='2'/%3E%3Ccircle cx='0' cy='130' r='2'/%3E%3Ccircle cx='260' cy='130' r='2'/%3E%3Ccircle cx='0' cy='260' r='2'/%3E%3Ccircle cx='130' cy='260' r='2'/%3E%3Ccircle cx='260' cy='260' r='2'/%3E%3C/g%3E%3Cg fill='%23000' opacity='.5'%3E%3Cpath d='M130 22l5 5-5 5-5-5z'/%3E%3Cpath d='M130 228l5 5-5 5-5-5z'/%3E%3Cpath d='M22 130l5 5-5 5-5-5z'/%3E%3Cpath d='M228 130l5 5-5 5-5-5z'/%3E%3C/g%3E%3C/svg%3E");
          mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg opacity='.85' transform='translate(49.6 49.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 49.6) scale(1.2)'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(49.6 181.6) scale(1.2)'%3E%3Cpath d='M17 3l4 4L8 20l-5 1 1-5z'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 181.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M10 8l6 4-6 4z'/%3E%3C/g%3E%3Cg opacity='.6' transform='translate(117.6 117.6) scale(1.2)'%3E%3Cpath d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23000' opacity='.45'%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='130' cy='0' r='2'/%3E%3Ccircle cx='260' cy='0' r='2'/%3E%3Ccircle cx='0' cy='130' r='2'/%3E%3Ccircle cx='260' cy='130' r='2'/%3E%3Ccircle cx='0' cy='260' r='2'/%3E%3Ccircle cx='130' cy='260' r='2'/%3E%3Ccircle cx='260' cy='260' r='2'/%3E%3C/g%3E%3Cg fill='%23000' opacity='.5'%3E%3Cpath d='M130 22l5 5-5 5-5-5z'/%3E%3Cpath d='M130 228l5 5-5 5-5-5z'/%3E%3Cpath d='M22 130l5 5-5 5-5-5z'/%3E%3Cpath d='M228 130l5 5-5 5-5-5z'/%3E%3C/g%3E%3C/svg%3E");
          -webkit-mask-size:260px 260px;mask-size:260px 260px;-webkit-mask-repeat:repeat;mask-repeat:repeat;
          animation:pj-pat 78s linear infinite;will-change:transform}
        body.dark .fan-sec .pat{opacity:.08}
        @keyframes pj-pat{to{transform:translate3d(260px,260px,0)}}

        .fan-head{position:relative;z-index:1;text-align:center;max-width:640px;will-change:transform,opacity}
        .pj-k{font-size:10px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--copper)}
        .pj-h1{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.6rem,8.5vw,5.2rem);line-height:.9;letter-spacing:-.045em;margin-top:1.1rem;color:var(--ink)}
        .pj-pill{position:relative;display:inline-block;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.06em .5em .16em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(6px);box-shadow:0 8px 22px rgba(177,93,46,.12),inset 0 1px 0 var(--glass-hi)}
        .pj-pill::after{content:"";position:absolute;top:16%;left:18%;width:20%;height:26%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px)}
        .pj-lede{margin:.9rem auto 0;max-width:34ch;font-size:.95rem;line-height:1.5;color:var(--ink-soft)}

        .fan-lift{position:relative;z-index:1;will-change:transform,opacity}
        .fan{--cw:clamp(170px,44vw,260px);position:relative;width:min(96vw,1060px);height:calc(var(--cw)*1.8);margin-top:.4rem;animation:pj-sway 10s ease-in-out infinite alternate}
        @media(min-width:900px){.fan{--cw:clamp(220px,23vw,300px);height:calc(var(--cw)*1.72)}}
        @keyframes pj-sway{from{transform:rotate(-2.4deg)}to{transform:rotate(-1.2deg)}}
        .fan::before{content:"";position:absolute;left:50%;bottom:-16px;width:10px;height:10px;border-radius:50%;background:var(--copper);transform:translateX(-50%);box-shadow:0 0 0 6px rgba(177,93,46,.14),0 0 24px rgba(177,93,46,.5)}
        .fan::after{content:"";position:absolute;left:50%;bottom:-2px;width:min(78%,560px);height:26%;transform:translateX(-50%);border-top:1px solid var(--rule);border-radius:50%;pointer-events:none}

        .fcard{position:absolute;left:50%;top:0;width:var(--cw);aspect-ratio:5/7;border-radius:1.2rem;overflow:hidden;background:var(--noir);box-shadow:0 30px 70px rgba(16,12,8,.28);transform-origin:50% 240%;will-change:transform;transform:translateX(-50%) translateY(var(--ty)) rotate(var(--a));transition:transform .9s var(--cb) var(--d),opacity .6s ease var(--d),box-shadow .5s ease,filter .5s ease;cursor:pointer;border:0;padding:0}
        .fcard:nth-child(1){--a:-22deg;--ha:-5deg;--ty:14px;--d:.05s}
        .fcard:nth-child(2){--a:-7deg;--ha:-2.5deg;--ty:-6px;--d:.15s}
        .fcard:nth-child(3){--a:7deg;--ha:2.5deg;--ty:-6px;--d:.25s}
        .fcard:nth-child(4){--a:22deg;--ha:5deg;--ty:14px;--d:.35s}
        @media(max-width:640px){
          .fcard{transform-origin:50% 200%}
          .fcard:nth-child(1){--a:-15deg;--ty:10px}
          .fcard:nth-child(2){--a:-5deg;--ty:-4px}
          .fcard:nth-child(3){--a:5deg;--ty:-4px}
          .fcard:nth-child(4){--a:15deg;--ty:10px}
        }
        .fcard:hover{transform:translateX(-50%) translateY(calc(var(--ty) - 20px)) rotate(calc(var(--a) + var(--ha))) scale(1.045);z-index:30;box-shadow:0 46px 100px rgba(16,12,8,.4)}
        .fcard:focus-visible{outline:2px solid var(--copper);outline-offset:4px}
        .fcard img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--cb)}
        .fcard:hover img{transform:scale(1.06)}
        .fcard .scrim{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,8,6,.85) 0%,rgba(10,8,6,.15) 45%,transparent 65%)}
        .fcard .num{position:absolute;top:.9rem;left:.9rem;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:1.1rem;color:var(--copper);padding:.2em .65em .3em;border-radius:999px;background:rgba(245,243,239,.9);box-shadow:0 4px 12px rgba(16,12,8,.18)}
        body.dark .fcard .num{background:rgba(20,17,16,.85)}
        .fcard .nm{position:absolute;left:1.1rem;right:1rem;bottom:1.8rem;font-family:"Noto Serif",serif;font-weight:500;font-size:clamp(1.05rem,4.6vw,1.5rem);letter-spacing:.03em;text-transform:uppercase;color:#F5F3EF;line-height:1.05}
        .fcard .ct{position:absolute;left:1.15rem;bottom:.8rem;font-size:8.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:rgba(245,243,239,.6)}
        .fan.pre .fcard{transform:translateX(-50%) translateY(90px) rotate(0deg) scale(.9);opacity:0}
        body.lb-open .fcard:not(:hover){filter:saturate(.6) brightness(.85)}
        .fan-hint{position:relative;z-index:1;font-size:9px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-faint)}

        /* lightbox */
        .lb{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:1rem;opacity:0;pointer-events:none;transition:opacity .4s ease}
        .lb.open{opacity:1;pointer-events:auto}
        .lb-veil{position:absolute;inset:0;background:rgba(14,14,14,.55)}
        .lb-panel{position:relative;width:min(94vw,860px);max-height:92svh;overflow-y:auto;border-radius:1.4rem;border:1px solid rgba(177,93,46,.55);background:#FBF8F2;box-shadow:0 60px 140px rgba(0,0,0,.4);padding:clamp(1.1rem,3vw,1.8rem);display:flex;flex-direction:column;gap:1.05rem;transform:scale(.94) translateY(18px);transition:transform .6s var(--cb)}
        body.dark .lb-panel{background:#1a1714;border-color:rgba(255,182,146,.4)}
        .lb.open .lb-panel{transform:none}
        .lb-body{display:flex;flex-direction:column;gap:1.05rem;animation:pj-lbin .35s var(--cb)}
        @keyframes pj-lbin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .lb-head{display:flex;justify-content:space-between;align-items:center;gap:1rem}
        .lb-id{display:flex;align-items:baseline;gap:.9rem;min-width:0}
        .lb-num{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:1.5rem;color:var(--copper);line-height:1}
        .lb-name{font-family:"Noto Serif",serif;font-weight:500;font-size:clamp(1.3rem,4vw,1.8rem);letter-spacing:-.02em;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink)}
        .lb-side{display:flex;align-items:center;gap:.8rem;flex-shrink:0}
        .lb-count{font-size:10px;letter-spacing:.2em;color:var(--ink-faint)}
        .lb-x{width:40px;height:40px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;color:var(--ink-soft);transition:all .3s;cursor:pointer;background:none}
        .lb-x:hover{border-color:var(--copper);color:var(--copper);transform:rotate(90deg)}
        .lb-media{border-radius:1rem;overflow:hidden;background:var(--noir);border:1px solid rgba(177,93,46,.35)}
        .lb-media img{width:100%;height:auto;max-height:60svh;object-fit:contain;display:block}
        .lb-media video{width:100%;max-height:60svh;display:block;background:var(--noir)}
        .lb-note{font-size:.9rem;line-height:1.65;color:var(--ink-soft);max-width:62ch}
        .lb-foot{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;border-top:1px solid var(--rule);padding-top:1rem}
        .lb-cat{font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--ink-soft)}
        .lb-act{display:flex;align-items:center;gap:.6rem}
        .lb-nav{display:flex;gap:.5rem}
        .lb-nav button{width:38px;height:38px;border-radius:50%;border:1px solid var(--rule);display:grid;place-items:center;color:var(--ink-soft);transition:all .3s;cursor:pointer;background:none}
        .lb-nav button:hover{border-color:var(--copper);color:var(--copper)}
        .lb-go{display:inline-flex;align-items:center;gap:.5rem;font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#F5F3EF;background:linear-gradient(120deg,var(--copper-light),#C96F3B);padding:.8rem 1.3rem;border-radius:999px;text-decoration:none;box-shadow:0 10px 26px rgba(201,111,59,.35),inset 0 1px 0 rgba(255,255,255,.5);transition:transform .3s var(--cb)}
        .lb-go:hover{transform:translateY(-2px)}
        @media(prefers-reduced-motion:reduce){
          .fan-sec *{transition-duration:.01ms!important;animation-duration:.01ms!important}
          .fan.pre .fcard{transform:translateX(-50%) rotate(var(--a));opacity:1}
          .fan-sec .pat{animation:none}
        }
      `}</style>
    </>
  );
}