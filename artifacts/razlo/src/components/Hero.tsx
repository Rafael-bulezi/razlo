'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SERVICES = ['Web design', 'Video editing', 'Graphic design', 'App development', 'Brand identity', 'Motion'];

function OfferBar() {
  const [text, setText] = useState(SERVICES[0]);
  const typedRef = useRef<HTMLSpanElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let si = 0, ci = SERVICES[0].length, mode: 'type' | 'hold' | 'erase' = 'hold';
    let timer: ReturnType<typeof setTimeout>;

    const pulse = () => {
      pillRef.current?.classList.add('pulse');
      setTimeout(() => pillRef.current?.classList.remove('pulse'), 450);
    };

    const tick = () => {
      const word = SERVICES[si];
      if (mode === 'type') {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) { mode = 'hold'; pulse(); timer = setTimeout(tick, 1500); return; }
        timer = setTimeout(tick, 65 + Math.random() * 55); // human-ish typing
      } else if (mode === 'hold') {
        mode = 'erase'; tick();
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) { mode = 'type'; si = (si + 1) % SERVICES.length; timer = setTimeout(tick, 380); return; }
        timer = setTimeout(tick, 34); // faster erase
      }
    };

    if (reduced) {
      const id = setInterval(() => { si = (si + 1) % SERVICES.length; setText(SERVICES[si]); }, 2600);
      return () => clearInterval(id);
    }
    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <div className="offer-bar">
      <div className="tw-pill" ref={pillRef}>
        <span className="tw-text" ref={typedRef}>{text}</span>
        <span className="caret" aria-hidden="true" />
      </div>
      <a className="offer" href="/pricing">
        <span className="offer-word">Services we offer</span>
        <ArrowRight size={16} strokeWidth={1.6} />
      </a>
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
    const lede = sec.querySelector<HTMLElement>('#lede');
    const veil = sec.querySelector<HTMLElement>('#veil')!;
    const words = Array.from(sec.querySelectorAll<HTMLElement>('.w'));
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.card'));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const N = cards.length;
    const RAIL_MAX = 134;
    const ARC = [[16,53,-10,.88],[33,50,-6,.94],[50,49,-2,1],[67,50,5,.94],[84,53,10,.88]];
    const STG = [[22,34,-6,.9],[55,26,3,.95],[84,38,-4,.9],[35,62,4,.95],[68,66,-3,.9]];
    const PARK = [50,118,0,.5];

    /* Desktop config — 5-card fan on the RIGHT half, scaled down ~5% with gentle overlap */
    const POS_DESKTOP_START = [
      [56, 50, -18, 0.88],
      [63.5, 46, -9, 0.92],
      [71, 44, 0, 0.96],
      [78.5, 46, 9, 0.92],
      [86, 50, 18, 0.88],
    ];
    const POS_DESKTOP_END = [
      [40, 42, -26, 0.90],
      [52, 36, -13, 0.95],
      [64, 33, 0, 1.00],
      [76, 36, 13, 0.95],
      [88, 42, 26, 0.90],
    ];
    const isDesktop = window.matchMedia('(min-width: 1024px)');

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
      if (isDesktop.matches) {
        const WIN_COUNT = 5;
        const w = (i - win + N) % N, inW = w < WIN_COUNT;
        const A = inW ? POS_DESKTOP_START[w] : PARK;
        const S = inW ? POS_DESKTOP_END[w] : PARK;
        const t1 = seg(p, .14, .30), t2 = seg(p, .46, .62);
        return [
          lerp(lerp(A[0], S[0], t1), 8 + i * 24 - slide, t2),
          lerp(lerp(A[1], S[1], t1), 48, t2),
          lerp(lerp(A[2], S[2], t1), (i % 2 ? 2 : -2), t2),
          lerp(lerp(A[3], S[3], t1), .82, t2),
          lerp(inW ? 1 : 0, 1, t2),
        ];
      }
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
      if (lede) lede.style.opacity = String(f);
      words.forEach((w, index) => {
        const d = w.dataset;
        let x0 = parseFloat(d.x0 || '0');
        let y0 = parseFloat(d.y0 || '0');
        let x1 = parseFloat(d.x1 || '0');
        let y1 = parseFloat(d.y1 || '0');
        if (isDesktop.matches) {
          // Mathematically verified vertical spacing:
          // Intro: 12vh -> Word 0: 18vh (ends ~30vh) -> Word 1: 40vh (ends ~53vh) -> Lede: 59vh (ends ~67vh) -> CTA: 73vh (ends ~77vh) -> OfferBar: ~92vh
          if (index === 0) {
            const x = lerp(8, 6, p);
            const y = lerp(18, 13, p);
            w.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
          } else {
            const x = lerp(8, 20, p);
            const y = lerp(40, 48, p);
            w.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
          }
        } else {
          const x = lerp(x0, x1, p);
          const y = lerp(y0, y1, p);
          w.style.transform = `translate3d(calc(${x}vw - 50%), calc(${y}vh - 50%), 0)`;
        }
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

        <p className="lede" id="lede">We build websites, brands, and films that feel as good as they look — crafted in Luanda for clients who care about the details.</p>

        <button type="button" className="card" aria-label="Reflecting the Glory of GOD film — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786928216/ChatGPT_Image_Aug_17_2026_01_56_33_AM_wrbekd.png" alt="Reflecting the Glory of GOD film cover" /><span className="lab">Film — Glory of GOD</span></span></span></button>
        <button type="button" className="card" aria-label="Veloria fine dining web — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1772994247/veloria-git-main-rafael-bulezis-projects.vercel.app__sycozm.webp" alt="Veloria web experience" /><span className="lab">Veloria — Digital Web</span></span></span></button>
        <button type="button" className="card" aria-label="Love Is Selfless project — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786787274/ChatGPT_Image_Aug_15_2026_10_47_35_AM_balt1e.png" alt="Love Is Selfless visual film" /><span className="lab">Love Is Selfless — Motion</span></span></span></button>
        <button type="button" className="card" aria-label="Christ Is Love cinematic piece — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786787790/ChatGPT_Image_Aug_15_2026_10_56_05_AM_kpwsvf.png" alt="Christ Is Love" /><span className="lab">Film — Christ Is Love</span></span></span></button>
        <button type="button" className="card" aria-label="Law and Order film — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773073079/Whisk_c451e4d9353ac399ab1438a486573712dr_d8hsrf.jpg" alt="Law and Order film" /><span className="lab">Film — Law and Order</span></span></span></button>
        <button type="button" className="card" aria-label="My Past Business documentary — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786786663/livestream_clip_about_my_bussiness._b9zd12.png" alt="My Past Business documentary" /><span className="lab">Doc — My Past Business</span></span></span></button>
        <button type="button" className="card" aria-label="Dr Jimmy documentary — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786930828/ChatGPT_Image_Aug_17_2026_02_40_16_AM_hmqthr.png" alt="Dr Jimmy trailer" /><span className="lab">Documentary — Dr Jimmy</span></span></span></button>
        <button type="button" className="card" aria-label="Cakes do Owi boutique shop — tap to expand"><span className="float"><span className="art a-photo"><img src="https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__4_jbu6ft.webp" alt="Cakes do Owi platform" /><span className="lab">Cakes do Owi — Boutique Web</span></span></span></button>

        <div className="veil" id="veil" />

        <a className="cta" href="/works">VIEW FULL WORK <s>→</s></a>

        {/* Noir Typewriter OfferBar */}
        <OfferBar />

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
        .intro{position:absolute;left:50%;top:14%;transform:translateX(-50%);width:min(90%,520px);text-align:center;font-size:clamp(.85rem,2vw,1.02rem);font-weight:500;line-height:1.6;color:var(--ink-soft)}
        .intro b{color:var(--copper);font-weight:600}
        .lede{position:absolute;left:50%;bottom:108px;transform:translateX(-50%);width:min(88%,420px);text-align:center;font-size:.9rem;line-height:1.55;color:var(--ink-soft);display:none}
        .w{position:absolute;left:0;top:0;z-index:2;font-family:"Noto Serif",serif;font-weight:500;text-transform:uppercase;font-size:clamp(2.4rem,6.8vw,5.4rem);line-height:.92;letter-spacing:-.045em;color:var(--ink);white-space:nowrap;will-change:transform;text-align:left}
        .w .cop{font-style:italic;color:var(--copper)}
        .pill{position:relative;display:inline-block;text-transform:none;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.14),inset 0 1px 0 rgba(255,255,255,.7)}
        .pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        .card{position:absolute;left:0;top:0;width:clamp(140px,26vw,290px);aspect-ratio:4/3;z-index:5;will-change:transform,opacity;pointer-events:auto;cursor:pointer;border:0;background:none;padding:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
        @media (max-width: 640px) {
          .card { width: clamp(140px, 42vw, 240px); }
        }
        .card.anim{transition:transform .8s cubic-bezier(.22,1,.3,1)}
        .card.expanded{z-index:20;cursor:zoom-out}
        .float{display:block;width:100%;height:100%;border-radius:1.15rem;overflow:hidden;box-shadow:0 20px 50px rgba(16,12,8,.18);border:1px solid rgba(14,14,14,.08)}
        .card.expanded .float{box-shadow:0 40px 90px rgba(16,12,8,.28);border-radius:1.35rem}
        .art{display:block;width:100%;height:100%;position:relative;overflow:hidden;background:#fff;border-radius:1.15rem}
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
        .cta{position:absolute;left:50%;bottom:80px;transform:translateX(-50%);z-index:6;text-decoration:none;color:var(--ink);font-size:clamp(10px,2.6vw,12px);font-weight:600;letter-spacing:.26em;padding-bottom:8px;border-bottom:1px solid rgba(14,14,14,.4);display:inline-flex;gap:10px;align-items:center;white-space:nowrap}
        .cta s{text-decoration:none;color:var(--copper);transition:transform .4s}
        .cta:hover s{transform:translateX(6px)}

        /* OfferBar styles */
        .offer-bar{position:absolute;left:0;right:0;bottom:0;height:58px;z-index:40;display:grid;
          grid-template-columns:1fr auto 1fr;align-items:center;padding:0 5vw;
          border-top:1px solid var(--rule,rgba(14,14,14,.12));
          background:var(--bar-bg,rgba(255,255,255,.45));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
        @media(min-width:1024px){.offer-bar{padding:0 6vw}}

        /* TRUE GLASS PILL — layers back→front:
           1 rim gradient (border-box) — bright top-left, hot copper bottom-right
           2 volumetric surface — amber sheen, cool light, noir body
           3 ::before — broad top gloss + diagonal window streak
           4 ::after  — hot specular dot                                    */
        .tw-pill{grid-column:2;justify-self:center;position:relative;display:inline-flex;align-items:center;
          height:40px;padding:0 1.4em;border-radius:999px;border:1.5px solid transparent;color:#FFB692;
          backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);
          background:
            radial-gradient(130% 110% at 88% 100%,rgba(255,138,66,.32) 0%,rgba(255,138,66,0) 52%) padding-box,
            radial-gradient(120% 90% at 12% 0%,rgba(255,255,255,.12) 0%,rgba(255,255,255,0) 46%) padding-box,
            linear-gradient(160deg,#2c2521 0%,#181312 48%,#251a13 100%) padding-box,
            linear-gradient(140deg,rgba(255,255,255,.7) 0%,rgba(255,255,255,.14) 30%,rgba(255,140,60,.28) 62%,rgba(255,150,70,.95) 100%) border-box;
          box-shadow:
            0 14px 30px rgba(16,12,8,.35),
            0 5px 18px rgba(255,140,60,.20),
            inset 0 1px 0 rgba(255,255,255,.30),
            inset 0 -1px 0 rgba(255,150,70,.40);
          transition:transform .5s cubic-bezier(.22,1,.3,1)}
        .tw-pill::before{content:"";position:absolute;left:4%;right:4%;top:7%;height:46%;border-radius:999px;pointer-events:none;
          background:
            linear-gradient(105deg,transparent 32%,rgba(255,255,255,.15) 40%,rgba(255,255,255,.04) 48%,transparent 54%),
            linear-gradient(180deg,rgba(255,255,255,.32),rgba(255,255,255,.02));
          filter:blur(1px)}
        .tw-pill::after{content:"";position:absolute;top:13%;left:8%;width:26%;height:32%;border-radius:50%;pointer-events:none;
          background:radial-gradient(closest-side,rgba(255,255,255,.5),rgba(255,255,255,0));filter:blur(2px)}
        .tw-pill.pulse{transform:scale(1.03)}

        .tw-text{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:1.08rem;
          color:inherit;letter-spacing:-.01em;white-space:nowrap}
        .caret{display:inline-block;width:1.5px;height:1.05em;background:currentColor;margin-left:3px;
          vertical-align:-.15em;animation:ob-blink 1.1s steps(2) infinite}
        @keyframes ob-blink{0%,55%{opacity:1}56%,100%{opacity:0}}

        .offer{grid-column:3;justify-self:end;display:flex;align-items:center;gap:.7rem;font-size:9.5px;
          font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-soft,rgba(14,14,14,.6));
          transition:color .3s;flex-shrink:0;text-decoration:none}
        .offer svg{color:var(--copper,#B15D2E);animation:ob-nudge 2.6s ease-in-out infinite;flex-shrink:0}
        .offer:hover{color:var(--copper,#B15D2E)}
        @keyframes ob-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(4px)}}
        /* Mobile: hide text label, keep only the arrow icon */
        @media(max-width:640px){.offer .offer-word{display:none}}

        @media (prefers-reduced-motion:reduce){.glass-bubble,.caret,.offer svg{animation:none}.card.anim,.tw-pill{transition:none}}
        .brand{position:absolute;top:22px;left:26px;z-index:30;display:flex;align-items:center;gap:.65rem;text-decoration:none}
        .brand-pill{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:1.15rem;color:var(--copper);padding:.1em .55em .18em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 6px 18px rgba(177,93,46,.12),inset 0 1px 0 rgba(255,255,255,.7)}
        .brand-word{font-size:10px;font-weight:700;letter-spacing:.34em;text-transform:uppercase;color:var(--ink)}

        @media (min-width:1024px){
          .intro{left:8vw;top:14.5vh;transform:none;text-align:left;width:auto;max-width:40vw;font-size:clamp(0.85rem,1.05vw,1rem)}
          .w{font-size:clamp(2.45rem,3.8vw,4.45rem);line-height:.94}
          .lede{display:block;left:8vw;top:61.5vh;bottom:auto;transform:none;text-align:left;width:auto;max-width:38ch;font-size:clamp(0.85rem,1.02vw,0.95rem);line-height:1.55}
          .card{width:clamp(210px,21.5vw,340px)}
          .cta{left:8vw;top:75.5vh;bottom:auto;transform:none;font-size:11.5px;letter-spacing:.25em}
        }
      `}</style>
    </section>
  );
}