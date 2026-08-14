'use client';

import { useEffect, useRef } from 'react';
import { Globe, Clapperboard, PenTool, Smartphone, Sparkles, Film } from 'lucide-react';

const SERVICES = [
  { Icon: Globe, label: 'Web design' },
  { Icon: Clapperboard, label: 'Video editing' },
  { Icon: PenTool, label: 'Graphic design' },
  { Icon: Smartphone, label: 'App development' },
  { Icon: Sparkles, label: 'Brand identity' },
  { Icon: Film, label: 'Motion' },
];

function MqGroup() {
  return (
    <div className="mq-group">
      {SERVICES.map(({ Icon, label }) => (
        <span key={label} style={{ display: 'contents' }}>
          <span className="mq-item">
            <Icon size={13} strokeWidth={1.7} />
            {label}
          </span>
          <span className="mq-dot" />
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const secRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;

    const stage = sec.querySelector<HTMLElement>('.stage')!;
    const intro = sec.querySelector<HTMLElement>('#intro')!;
    const veil = sec.querySelector<HTMLElement>('#veil')!;
    const words = Array.from(sec.querySelectorAll<HTMLElement>('.w'));
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.card'));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const N = cards.length;
    const RAIL_MAX = 134;
    const ARC = [[16,53,-10,.88],[33,50,-6,.94],[50,49,-2,1],[67,50,5,.94],[84,53,10,.88]];
    const STG = [[22,34,-6,.9],[55,26,3,.95],[84,38,-4,.9],[35,62,4,.95],[68,66,-3,.9]];
    const PARK = [50,118,0,.5];

    let H = sec.offsetHeight;
    let target = 0, cur = 0, win = 0, raf = 0;
    let expandedEl: HTMLElement | null = null;
    let dragOff = 0, dragTarget = 0, dragging = false, moved = false;
    let dragId: number | null = null, sx = 0, sy = 0, startDrag = 0;
    let railOn = false, lastBase = 0, drift = 0;
    let st: (number[] | null)[] = cards.map(() => null);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (t: number, a: number, b: number) => (t < a ? a : t > b ? b : t);
    const sm = (t: number) => t * t * (3 - 2 * t);
    const seg = (p: number, a: number, b: number) => sm(clamp((p - a) / (b - a), 0, 1));
    const kFor = (base: number, dt: number) => 1 - Math.pow(base, dt / 1000);

    function targetFor(i: number, p: number, slide: number) {
      const w = (i - win + N) % N, inW = w < 5;
      const A = inW ? ARC[w] : PARK, S = inW ? STG[w] : PARK;
      const t1 = seg(p, .14, .30), t2 = seg(p, .46, .62);
      return [
        lerp(lerp(A[0], S[0], t1), 12 + i * 30 - slide, t2),
        lerp(lerp(A[1], S[1], t1), 50, t2),
        lerp(lerp(A[2], S[2], t1), (i % 2 ? 2 : -2), t2),
        lerp(lerp(A[3], S[3], t1), .85, t2),
        lerp(inW ? 1 : 0, 1, t2),
      ];
    }

    function apply(p: number, kC: number) {
      const f = 1 - seg(p, .10, .24);
      intro.style.opacity = String(f);
      words.forEach((w) => {
        const d = w.dataset;
        const x = lerp(parseFloat(d.x0 || '0'), parseFloat(d.x1 || '0'), p);
        const y = lerp(parseFloat(d.y0 || '0'), parseFloat(d.y1 || '0'), p);
        w.style.transform = `translate3d(calc(${x}vw - 50%), calc(${y}vh - 50%), 0)`;
        w.style.opacity = String(f);
      });
      const scrollSlide = seg(p, .66, .94) * RAIL_MAX;
      const slide = clamp(scrollSlide + drift + dragOff, 0, RAIL_MAX);
      lastBase = scrollSlide + drift;
      cards.forEach((el, i) => {
        const T = targetFor(i, p, slide);
        const s = st[i] || (st[i] = T.slice());
        for (let q = 0; q < 5; q++) s[q] += (T[q] - s[q]) * kC;
        (el as any)._t = `translate3d(calc(${s[0]}vw - 50%), calc(${s[1]}vh - 50%), 0) rotate(${s[2]}deg) scale(${s[3]})`;
        (el as any)._o = s[4];
        if (el.classList.contains('expanded')) return;
        el.style.transform = (el as any)._t;
        el.style.opacity = String(s[4]);
      });
    }

    /* ---- expansion ---- */
    function collapse() {
      if (!expandedEl) return;
      const el = expandedEl; expandedEl = null;
      veil.classList.remove('on');
      el.style.transform = (el as any)._t;
      el.style.opacity = String((el as any)._o);
      const done = (e?: TransitionEvent) => {
        if (e && e.propertyName !== 'transform') return;
        el.classList.remove('anim', 'expanded');
        el.removeEventListener('transitionend', done as EventListener);
      };
      el.addEventListener('transitionend', done as EventListener);
      setTimeout(() => done(), 900);
    }
    function expand(el: HTMLElement) {
      if (expandedEl) collapse();
      const rect = el.getBoundingClientRect();
      const W = Math.min(innerWidth * .86, 640);
      const s = Math.min(W / rect.width, (innerHeight * .68) / rect.height, 3.5);
      el.classList.add('anim', 'expanded');
      veil.classList.add('on');
      el.style.transform = `translate3d(calc(${innerWidth / 2}px - 50%), calc(${innerHeight / 2}px - 50%), 0) rotate(0deg) scale(${s})`;
      el.style.opacity = '1';
      expandedEl = el;
    }

    const clickers = cards.map((c) => {
      const fn = () => (expandedEl === c ? collapse() : expand(c));
      c.addEventListener('click', fn);
      return fn;
    });
    const onVeil = () => collapse();
    veil.addEventListener('click', onVeil);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && collapse();
    addEventListener('keydown', onKey);

    /* ---- swipe ---- */
    const onDown = (e: PointerEvent) => {
      if (!railOn || expandedEl) return;
      dragId = e.pointerId; sx = e.clientX; sy = e.clientY; moved = false; dragging = false; startDrag = dragTarget;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== dragId) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        dragging = true; moved = true; stage.classList.add('grabbing');
      }
      if (dragging) dragTarget = clamp(startDrag - (dx / innerWidth) * 100, -lastBase, RAIL_MAX - lastBase);
    };
    const onUp = () => { dragging = false; dragId = null; stage.classList.remove('grabbing'); };
    const onClickCapture = (e: MouseEvent) => { if (moved) { e.stopPropagation(); moved = false; } };
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('click', onClickCapture, true);

    /* ---- 8s carousel at rest ---- */
    const iv = setInterval(() => {
      if (cur < .05 && !expandedEl && !document.hidden) win = (win + 1) % N;
    }, 8000);

    const onResize = () => { H = sec.offsetHeight; collapse(); };
    addEventListener('resize', onResize, { passive: true });
    const onScroll = () => { target = clamp(scrollY / (H - innerHeight), 0, 1); };
    addEventListener('scroll', onScroll, { passive: true });

    if (reduced) {
      apply(.5, .2);
    } else {
      apply(0, .2);
      let last = performance.now();
      const loop = (now: number) => {
        const dt = Math.min(50, now - last); last = now;
        cur += (target - cur) * kFor(.001, dt);
        railOn = seg(cur, .46, .62) > .55;
        if (railOn && !dragging && !expandedEl && !document.hidden) {
          drift = Math.min(RAIL_MAX, drift + dt * 0.0012);
        }
        dragOff += (dragTarget - dragOff) * kFor(.0001, dt);
        apply(cur, kFor(.00008, dt));
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      removeEventListener('keydown', onKey);
      removeEventListener('resize', onResize);
      removeEventListener('scroll', onScroll);
      veil.removeEventListener('click', onVeil);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('click', onClickCapture, true);
      cards.forEach((c, i) => c.removeEventListener('click', clickers[i]));
    };
  }, []);

  return (
    <section className="dim" ref={secRef}>
      <div className="stage">
        <div className="ambient" />
        <div className="glass-bubble gb-1" /><div className="glass-bubble gb-2" />
        <div className="glass-bubble gb-3" /><div className="glass-bubble gb-4" />

        <p className="intro" id="intro">Based in <b>Luanda</b> — crafting for the whole world.</p>

        <h1 style={{ display: 'contents' }}>
          <span className="w" data-x0="54" data-y0="23" data-x1="32" data-y1="16">Digital<br />experiences</span>
          <span className="w" data-x0="46" data-y0="75" data-x1="68" data-y1="80">that <span className="pill">move</span><br /><span className="cop">people.</span></span>
        </h1>

        <button type="button" className="card" aria-label="Razlo studio poster — tap to expand"><span className="float"><span className="art a-poster"><span className="lab">Razlo® — Studio</span><b>move</b></span></span></button>
        <button type="button" className="card" aria-label="Web design project — tap to expand"><span className="float"><span className="art a-wire"><span className="bar"><i /><i /><i /></span><span className="bd"><span className="hb" /><span className="cols"><i /><i /></span></span></span></span></button>
        <button type="button" className="card" aria-label="Calm living project — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786312201/file_00000000050c81f4a41ae7e5c484ffcb_izhsxa.png" alt="Calm living project" /><span className="lab">Calm living — redefined</span></span></span></button>
        <button type="button" className="card" aria-label="Brand identity project — tap to expand"><span className="float"><span className="art a-brand"><span className="lab">Brand identity</span><span className="aa">A<em>a</em></span><span className="sw"><i /><i /><i /></span><span className="big">26</span></span></span></button>
        <button type="button" className="card" aria-label="Motion reel — tap to expand"><span className="float"><span className="art a-dark"><span className="lab">Motion reel</span><span className="ring" /></span></span></button>
        <button type="button" className="card" aria-label="Studio selected work — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786316467/file_00000000e1cc81f48d2cac08cca65587_zd8rsw.png" alt="Studio selected work" /><span className="lab">Studio — selected work</span></span></span></button>
        <button type="button" className="card" aria-label="Type study — tap to expand"><span className="float"><span className="art a-type"><span className="lab">Type study</span><b>26</b></span></span></button>
        <button type="button" className="card" aria-label="Dashboard web app — tap to expand"><span className="float"><span className="art a-dash"><span className="bar"><i /><i /><i /></span><span className="bd"><span className="sd" /><span className="mn" /></span><span className="lab">Dashboard — web app</span></span></span></button>

        <div className="veil" id="veil" />

        {/* point this at your work page when ready */}
        <a className="cta" href="#">VIEW FULL WORK <s>→</s></a>

        <div className="marquee" aria-hidden="true">
          <div className="mq-track">
            <MqGroup />
            <MqGroup />
          </div>
        </div>

        <div className="grain" />
      </div>

      <style>{`
        .dim{--surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--copper:#B15D2E;--copper-light:#FFB692;--rule:rgba(14,14,14,.12);--glass-border:rgba(255,255,255,.65);--glass-bg:rgba(255,255,255,.55);
          height:460vh;position:relative;background:var(--surface);color:var(--ink);
          font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .dim *{box-sizing:border-box}
        .stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;touch-action:pan-y}
        .stage.rail{cursor:grab}
        .stage.grabbing{cursor:grabbing}
        .ambient{position:absolute;inset:0;pointer-events:none}
        .ambient::before,.ambient::after{content:"";position:absolute;border-radius:50%;filter:blur(70px)}
        .ambient::before{top:10%;left:6%;width:380px;height:380px;background:radial-gradient(circle,rgba(177,93,46,.09),transparent 70%)}
        .ambient::after{bottom:8%;right:6%;width:440px;height:440px;background:radial-gradient(circle,rgba(255,182,146,.08),transparent 70%)}
        .glass-bubble{position:absolute;border-radius:50%;border:1px solid var(--glass-border);background:linear-gradient(135deg,rgba(255,255,255,.45),rgba(255,255,255,.1));backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);box-shadow:0 12px 32px rgba(177,93,46,.10);pointer-events:none}
        .glass-bubble::after{content:"";position:absolute;top:20%;left:22%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.6);filter:blur(2px)}
        .gb-1{top:18%;right:8%;width:64px;height:64px;animation:drift 9s ease-in-out infinite alternate}
        .gb-2{top:33%;left:6%;width:40px;height:40px;animation:drift 11s ease-in-out infinite alternate-reverse}
        .gb-3{top:64%;right:9%;width:30px;height:30px;border-color:rgba(255,182,146,.5);background:linear-gradient(135deg,rgba(255,182,146,.3),rgba(255,255,255,.1));animation:drift 8s ease-in-out infinite alternate}
        .gb-4{top:66%;left:7%;width:24px;height:24px;animation:drift 10s ease-in-out infinite alternate-reverse}
        @keyframes drift{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-18px) rotate(3deg)}}
        .intro{position:absolute;left:50%;top:8%;transform:translateX(-50%);width:min(90%,520px);text-align:center;font-size:clamp(.85rem,2.6vw,1.02rem);font-weight:500;line-height:1.6;color:var(--ink-soft)}
        .intro b{color:var(--copper);font-weight:600}
        .w{position:absolute;left:0;top:0;z-index:2;font-family:"Noto Serif",serif;font-weight:500;text-transform:uppercase;font-size:clamp(2.4rem,11vw,7.5rem);line-height:.88;letter-spacing:-.05em;color:var(--ink);white-space:nowrap;will-change:transform;text-align:left}
        .w .cop{font-style:italic;color:var(--copper)}
        .pill{position:relative;display:inline-block;text-transform:none;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.14),inset 0 1px 0 rgba(255,255,255,.7)}
        .pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        .card{position:absolute;left:0;top:0;width:clamp(140px,42vw,340px);aspect-ratio:4/3;z-index:5;will-change:transform,opacity;pointer-events:auto;cursor:pointer;border:0;background:none;padding:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
        .card.anim{transition:transform .8s cubic-bezier(.22,1,.3,1)}
        .card.expanded{z-index:20;cursor:zoom-out}
        .float{display:block;width:100%;height:100%;box-shadow:0 20px 50px rgba(16,12,8,.18);border:1px solid rgba(14,14,14,.08)}
        .card.expanded .float{box-shadow:0 40px 90px rgba(16,12,8,.28)}
        .art{display:block;width:100%;height:100%;position:relative;overflow:hidden;background:#fff}
        .lab{position:absolute;font-size:8px;font-weight:700;letter-spacing:.22em;color:rgba(14,14,14,.5);text-transform:uppercase}
        .a-poster{background:linear-gradient(140deg,#B15D2E,#5e2410 75%);display:grid;place-items:center}
        .a-poster b{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:clamp(24px,7vw,56px);color:#F5F3EF}
        .a-poster .lab{left:12px;top:10px;color:rgba(245,243,239,.7)}
        .a-wire{padding:9% 8%}
        .a-wire .bar{height:8%;border:1px solid rgba(14,14,14,.25);border-bottom:0;border-radius:4px 4px 0 0;display:flex;gap:4px;align-items:center;padding:0 6px}
        .a-wire .bar i{width:4px;height:4px;border-radius:50%;background:rgba(14,14,14,.35)}
        .a-wire .bd{height:84%;border:1px solid rgba(14,14,14,.25);border-radius:0 0 4px 4px;padding:6%;display:grid;gap:5%}
        .a-wire .hb{background:var(--copper);border-radius:2px}
        .a-wire .cols{display:grid;grid-template-columns:1fr 1fr;gap:5%}
        .a-wire .cols i{background:rgba(14,14,14,.12);border-radius:2px}
        .a-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .a-photo .lab{left:12px;bottom:10px;color:rgba(245,243,239,.85);text-shadow:0 1px 8px rgba(0,0,0,.6)}
        .a-brand{padding:8%}
        .a-brand .aa{font-family:"Noto Serif",serif;font-size:clamp(24px,6vw,48px);color:#0E0E0E}
        .a-brand .aa em{color:var(--copper)}
        .a-brand .big{position:absolute;right:6%;bottom:-8%;font-weight:700;font-size:clamp(34px,9vw,84px);letter-spacing:-.05em;color:rgba(14,14,14,.1)}
        .a-brand .sw{position:absolute;left:8%;bottom:10%;display:flex;gap:6px}
        .a-brand .sw i{width:10px;height:10px;border-radius:50%}
        .a-brand .sw i:nth-child(1){background:#0E0E0E}.a-brand .sw i:nth-child(2){background:var(--copper)}.a-brand .sw i:nth-child(3){border:1px solid rgba(14,14,14,.4)}
        .a-dark{background:#141110;display:grid;place-items:center}
        .a-dark .ring{width:38%;aspect-ratio:1;border-radius:50%;border:1px solid rgba(255,255,255,.3);position:relative}
        .a-dark .ring::after{content:"";position:absolute;left:50%;top:50%;width:12%;aspect-ratio:1;border-radius:50%;background:var(--copper-light);transform:translate(-50%,-50%)}
        .a-dark .lab{left:12px;top:10px;color:rgba(255,255,255,.5)}
        .a-type{background:linear-gradient(160deg,#FBF8F2,#EDE5D8);display:grid;place-items:center}
        .a-type b{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:clamp(30px,9vw,72px);color:var(--copper)}
        .a-dash{background:#141110;padding:9% 8%}
        .a-dash .bar{height:8%;border:1px solid rgba(255,255,255,.25);border-bottom:0;border-radius:4px 4px 0 0;display:flex;gap:4px;align-items:center;padding:0 6px}
        .a-dash .bar i{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.4)}
        .a-dash .bd{height:84%;border:1px solid rgba(255,255,255,.25);border-radius:0 0 4px 4px;padding:6%;display:grid;gap:5%;grid-template-columns:1fr 2fr}
        .a-dash .sd{background:rgba(255,255,255,.08);border-radius:2px}
        .a-dash .mn{background:linear-gradient(140deg,rgba(255,182,146,.55),rgba(255,182,146,.15));border-radius:2px}
        .a-dash .lab{left:12px;top:10px;color:rgba(255,255,255,.5)}
        .veil{position:absolute;inset:0;background:rgba(14,14,14,.22);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .5s;z-index:15}
        .veil.on{opacity:1;pointer-events:auto}
        .cta{position:absolute;left:50%;bottom:62px;transform:translateX(-50%);z-index:6;text-decoration:none;color:var(--ink);font-size:clamp(10px,2.6vw,12px);font-weight:600;letter-spacing:.26em;padding-bottom:10px;border-bottom:1px solid rgba(14,14,14,.4);display:inline-flex;gap:10px;align-items:center;white-space:nowrap}
        .cta s{text-decoration:none;color:var(--copper);transition:transform .4s}
        .cta:hover s{transform:translateX(6px)}
        .marquee{position:absolute;left:0;right:0;bottom:0;height:46px;z-index:6;display:flex;align-items:center;overflow:hidden;border-top:1px solid var(--rule);background:rgba(255,255,255,.4);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
        .mq-track{display:flex;white-space:nowrap;will-change:transform;animation:mq 30s linear infinite}
        .marquee:hover .mq-track{animation-play-state:paused}
        .mq-group{display:flex;align-items:center;gap:2.4rem;padding-right:2.4rem}
        .mq-item{display:flex;align-items:center;gap:.55rem;font-size:9px;font-weight:600;letter-spacing:.26em;color:var(--ink-soft);text-transform:uppercase}
        .mq-item svg{color:var(--copper);flex-shrink:0}
        .mq-dot{width:3px;height:3px;border-radius:50%;background:var(--copper);flex-shrink:0}
        @keyframes mq{to{transform:translateX(-50%)}}
        .grain{position:absolute;inset:0;z-index:8;pointer-events:none;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        @media (prefers-reduced-motion:reduce){.glass-bubble,.mq-track{animation:none}.card.anim{transition-duration:.2s}}
      `}</style>
    </section>
  );
}