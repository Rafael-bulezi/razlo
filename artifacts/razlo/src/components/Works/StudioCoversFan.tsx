import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const COVERS = [
  {
    id: 1,
    title: 'Queen of Dawn',
    category: 'Editorial Cover',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785376/file_00000000a0dc71f4a74b40b4cd6102a9_helsph.png',
  },
  {
    id: 2,
    title: 'Shadow Slave',
    category: 'Creative Direction',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785344/file_000000001408720a9863b53a9ed83b51_yqjlpn.png',
  },
  {
    id: 3,
    title: 'See the Unseen',
    category: 'Visual Concept',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785349/file_00000000259871f4bb61673811cd2f1f_wncdiu.png',
  },
  {
    id: 4,
    title: 'The Mech Touch',
    category: 'Digital Cover',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785361/file_00000000d0e0724399bbd96dafb507bf_jomstw.png',
  },
  {
    id: 5,
    title: 'Shadow Slave',
    category: 'Brand Poster',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785375/file_0000000006ec71f49ecefccd3c3e96d3_lr3kz3.png',
  },
  {
    id: 6,
    title: 'Split',
    category: 'Editorial Visual',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785334/file_00000000561c71f490506870429048f0_geaybe.png',
  },
  {
    id: 7,
    title: 'Arcane',
    category: 'Graphic Art',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785304/file_000000001bbc71f4baa9595f025ff973_hfpre9.png',
  },
  {
    id: 8,
    title: 'Queen of Dawn',
    category: 'Creative Poster',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785303/file_0000000032047243b1cb90ce317b8b06_amrqgg.png',
  },
  {
    id: 9,
    title: 'Aurora Astral',
    category: 'Visual Identity',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786785301/file_00000000dd2071f4b0fc8f0d1fbf30ce_i7qm0r.png',
  },
];

/* Desktop: full 9-card fan. Mobile: show 5 center cards */
const FAN_ALL = [
  { a: -32, ha: -7, ty: 52, d: 0.04 },
  { a: -24, ha: -5.5, ty: 32, d: 0.08 },
  { a: -16, ha: -4, ty: 16, d: 0.12 },
  { a: -8, ha: -2, ty: 4, d: 0.16 },
  { a: 0, ha: 0, ty: -6, d: 0.20 },
  { a: 8, ha: 2, ty: 4, d: 0.24 },
  { a: 16, ha: 4, ty: 16, d: 0.28 },
  { a: 24, ha: 5.5, ty: 32, d: 0.32 },
  { a: 32, ha: 7, ty: 52, d: 0.36 },
];

const MOBILE_INDICES = [1, 3, 4, 5, 7]; // 5 cards for mobile
const FAN_MOBILE = [
  { a: -20, ha: -5, ty: 28, d: 0.04 },
  { a: -10, ha: -2.5, ty: 8, d: 0.1 },
  { a: 0, ha: 0, ty: -4, d: 0.16 },
  { a: 10, ha: 2.5, ty: 8, d: 0.22 },
  { a: 20, ha: 5, ty: 28, d: 0.28 },
];

export default function StudioCoversFan() {
  const fanRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

  // Responsive breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Intersection reveal
  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          fan.classList.remove('pre');
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(fan);
    return () => io.disconnect();
  }, []);

  // Gallery keyboard
  useEffect(() => {
    if (!galleryOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGalleryOpen(false);
      if (e.key === 'ArrowLeft') setGalleryIdx((p) => (p - 1 + COVERS.length) % COVERS.length);
      if (e.key === 'ArrowRight') setGalleryIdx((p) => (p + 1) % COVERS.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [galleryOpen]);

  const pad = (n: number) => String(n + 1).padStart(2, '0');

  const openGallery = useCallback((coverIndex: number) => {
    setGalleryIdx(coverIndex);
    setGalleryOpen(true);
  }, []);

  const visibleCovers = isMobile
    ? MOBILE_INDICES.map((i) => ({ cover: COVERS[i], originalIndex: i }))
    : COVERS.map((c, i) => ({ cover: c, originalIndex: i }));

  const fanConfig = isMobile ? FAN_MOBILE : FAN_ALL;

  return (
    <section className="scv-sec" id="studio-covers">
      <div className="scv-head">
        <p className="scv-k">Razlo Studio / Editorial Archive</p>
        <h2 className="scv-h2">
          Studio covers &amp;<br />
          <span className="scv-pill">posters vault.</span>
        </h2>
        <p className="scv-lede">
          A curated collection of editorial covers, creative direction posters, and visual concepts.
        </p>
      </div>

      <div className="scv-fan-wrap">
        <div className="scv-fan pre" ref={fanRef}>
          {visibleCovers.map(({ cover, originalIndex }, i) => {
            const cfg = fanConfig[i];
            return (
              <button
                key={cover.id}
                type="button"
                className="scv-card"
                style={
                  {
                    '--a': `${cfg.a}deg`,
                    '--ha': `${cfg.ha}deg`,
                    '--ty': `${cfg.ty}px`,
                    '--d': `${cfg.d}s`,
                  } as React.CSSProperties
                }
                aria-label={`Open cover ${pad(originalIndex)}: ${cover.title}`}
                onClick={() => openGallery(originalIndex)}
              >
                <img
                  src={cover.image}
                  alt={cover.title}
                  loading={i < 3 ? 'eager' : 'lazy'}
                />
                <span className="scv-scrim" />
                <span className="scv-num">{pad(originalIndex)}</span>
                <span className="scv-nm">{cover.title}</span>
                <span className="scv-ct">{cover.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* "See All" button — always visible, especially important on mobile */}
      <button
        type="button"
        className="scv-see-all"
        onClick={() => openGallery(0)}
      >
        {isMobile ? `See all ${COVERS.length} covers` : 'Full screen'}
        <span className="scv-see-arrow">↗</span>
      </button>

      {/* Fullscreen Gallery Overlay */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="scv-gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close */}
            <button
              type="button"
              className="scv-gal-close"
              onClick={() => setGalleryOpen(false)}
              aria-label="Close gallery"
            >
              <X size={18} />
            </button>

            {/* Counter */}
            <span className="scv-gal-counter">
              {galleryIdx + 1} / {COVERS.length}
            </span>

            {/* Prev */}
            <button
              type="button"
              className="scv-gal-nav scv-gal-prev"
              onClick={() => setGalleryIdx((p) => (p - 1 + COVERS.length) % COVERS.length)}
              aria-label="Previous cover"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <motion.div
              key={galleryIdx}
              className="scv-gal-stage"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={COVERS[galleryIdx].image}
                alt={COVERS[galleryIdx].title}
                className="scv-gal-img"
              />
              <div className="scv-gal-caption">
                <span className="scv-gal-title">{COVERS[galleryIdx].title}</span>
                <span className="scv-gal-cat">{COVERS[galleryIdx].category}</span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              type="button"
              className="scv-gal-nav scv-gal-next"
              onClick={() => setGalleryIdx((p) => (p + 1) % COVERS.length)}
              aria-label="Next cover"
            >
              <ChevronRight size={28} />
            </button>

            {/* Dot strip at bottom */}
            <div className="scv-gal-dots">
              {COVERS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`scv-dot ${i === galleryIdx ? 'active' : ''}`}
                  onClick={() => setGalleryIdx(i)}
                  aria-label={`Go to cover ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ─── Section ─── */
        .scv-sec{
          --surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--ink-faint:rgba(14,14,14,.42);
          --copper:#B15D2E;--copper-light:#FFB692;--rule:rgba(14,14,14,.12);--glass-bg:rgba(255,255,255,.55);
          --glass-hi:rgba(255,255,255,.7);--noir:#100E0D;--cb:cubic-bezier(.22,1,.3,1);
          position:relative;max-width:1400px;margin:3rem auto 0;padding:3rem 1.25rem 1.5rem;
          display:flex;flex-direction:column;align-items:center;
          border-top:1px solid var(--rule);overflow:visible;
        }
        body.dark .scv-sec{
          --surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);
          --copper:#FFB692;--copper-light:#FFB692;--rule:rgba(255,255,255,.12);--glass-bg:rgba(255,255,255,.06);
          --glass-hi:rgba(255,255,255,.18);--noir:#080808;
        }

        /* ─── Header ─── */
        .scv-head{position:relative;z-index:2;text-align:center;max-width:680px;margin-bottom:1rem}
        .scv-k{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper)}
        .scv-h2{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2rem,5vw,3.8rem);line-height:.92;letter-spacing:-.04em;margin-top:.7rem;color:var(--ink)}
        .scv-pill{
          position:relative;display:inline-block;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;
          color:var(--copper);padding:.06em .5em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);
          background:var(--glass-bg);backdrop-filter:blur(6px);box-shadow:0 8px 22px rgba(177,93,46,.12),inset 0 1px 0 var(--glass-hi);
        }
        .scv-pill::after{content:"";position:absolute;top:16%;left:18%;width:20%;height:26%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px)}
        .scv-lede{margin:.7rem auto 0;max-width:38ch;font-size:.9rem;line-height:1.55;color:var(--ink-soft)}

        /* ─── Fan ─── */
        .scv-fan-wrap{position:relative;z-index:2;width:100%;display:flex;justify-content:center;padding:.5rem 0 0}
        .scv-fan{
          --cw:clamp(100px,22vw,150px);
          position:relative;width:min(96vw,700px);height:calc(var(--cw)*1.9);
          margin-top:.25rem;animation:scv-sway 11s ease-in-out infinite alternate;
        }
        @media(min-width:769px){
          .scv-fan{--cw:clamp(130px,12vw,180px);width:min(98vw,1200px);height:calc(var(--cw)*1.78)}
        }
        @keyframes scv-sway{from{transform:rotate(-1.5deg)}to{transform:rotate(1.5deg)}}

        .scv-fan::before{
          content:"";position:absolute;left:50%;bottom:-10px;width:7px;height:7px;border-radius:50%;
          background:var(--copper);transform:translateX(-50%);
          box-shadow:0 0 0 4px rgba(177,93,46,.15),0 0 16px rgba(177,93,46,.4);
        }

        /* ─── Cards ─── */
        .scv-card{
          position:absolute;left:50%;top:0;width:var(--cw);aspect-ratio:4/6;border-radius:.8rem;
          overflow:hidden;background:var(--noir);box-shadow:0 20px 50px rgba(16,12,8,.22);
          transform-origin:50% 240%;will-change:transform;
          transform:translateX(-50%) translateY(var(--ty)) rotate(var(--a));
          transition:transform .85s var(--cb) var(--d),opacity .6s ease var(--d),box-shadow .45s ease;
          cursor:pointer;border:1px solid rgba(255,255,255,.1);padding:0;
        }
        @media(max-width:768px){
          .scv-card{transform-origin:50% 200%;border-radius:.6rem}
        }
        .scv-fan.pre .scv-card{
          transform:translateX(-50%) translateY(50px) rotate(0deg) scale(.85);opacity:0;
        }
        .scv-card:hover{
          transform:translateX(-50%) translateY(calc(var(--ty) - 20px)) rotate(calc(var(--a) + var(--ha))) scale(1.08);
          z-index:40;box-shadow:0 32px 80px rgba(16,12,8,.4), 0 0 0 1px rgba(255,182,146,.35);
        }
        .scv-card:focus-visible{outline:2px solid var(--copper);outline-offset:4px}
        .scv-card img{
          position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 20%;
          transition:transform 1s var(--cb);
        }
        .scv-card:hover img{transform:scale(1.06)}
        .scv-scrim{
          position:absolute;inset:0;
          background:linear-gradient(to top,rgba(10,8,6,.85) 0%,rgba(10,8,6,.18) 42%,transparent 68%);
        }
        .scv-num{
          position:absolute;top:.55rem;left:.55rem;font-family:"Noto Serif",serif;font-style:italic;
          font-weight:500;font-size:.75rem;color:var(--copper);padding:.12em .45em .2em;border-radius:999px;
          background:rgba(245,243,239,.9);box-shadow:0 3px 10px rgba(16,12,8,.14);line-height:1;
        }
        body.dark .scv-num{background:rgba(20,17,16,.85)}
        .scv-nm{
          position:absolute;left:.65rem;right:.5rem;bottom:1.3rem;font-family:"Noto Serif",serif;
          font-weight:500;font-size:clamp(.65rem,1vw,.85rem);letter-spacing:.02em;color:#F5F3EF;
          line-height:1.1;text-align:left;
        }
        .scv-ct{
          position:absolute;left:.65rem;bottom:.5rem;font-size:6.5px;font-weight:700;
          letter-spacing:.2em;text-transform:uppercase;color:rgba(245,243,239,.6);text-align:left;
        }

        /* ─── See All Button ─── */
        .scv-see-all{
          position:relative;z-index:3;margin-top:.8rem;padding:.5em 1.4em;
          font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
          color:var(--copper);background:var(--glass-bg);
          border:1px solid rgba(255,182,146,.35);border-radius:999px;
          backdrop-filter:blur(8px);cursor:pointer;
          transition:all .35s var(--cb);
          box-shadow:0 6px 18px rgba(177,93,46,.12);
        }
        .scv-see-all:hover{
          transform:translateY(-2px);
          box-shadow:0 10px 28px rgba(177,93,46,.2);
          background:rgba(255,182,146,.18);
        }
        .scv-see-arrow{display:inline-block;margin-left:.5em;transition:transform .3s ease}
        .scv-see-all:hover .scv-see-arrow{transform:translateX(4px)}

        /* ─── Fullscreen Gallery ─── */
        .scv-gallery-overlay{
          position:fixed;inset:0;z-index:9000;
          background:rgba(9,9,9,.98);
          display:flex;align-items:center;justify-content:center;
        }
        .scv-gal-close{
          position:absolute;top:1rem;right:1rem;z-index:20;
          width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.15);
          background:rgba(255,255,255,.08);backdrop-filter:blur(10px);
          color:white;display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all .3s ease;
        }
        .scv-gal-close:hover{background:rgba(255,255,255,.16);transform:scale(1.08)}
        .scv-gal-counter{
          position:absolute;top:1.1rem;left:1.2rem;z-index:20;
          font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
          color:rgba(255,255,255,.45);
        }

        .scv-gal-nav{
          position:absolute;top:50%;z-index:20;transform:translateY(-50%);
          width:42px;height:42px;border-radius:50%;
          border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);
          backdrop-filter:blur(10px);color:white;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all .3s ease;
        }
        .scv-gal-nav:hover{background:rgba(255,255,255,.18);transform:translateY(-50%) scale(1.08)}
        .scv-gal-prev{left:1rem}
        .scv-gal-next{right:1rem}
        @media(max-width:640px){
          .scv-gal-prev{left:.5rem}
          .scv-gal-next{right:.5rem}
          .scv-gal-nav{width:36px;height:36px}
        }

        .scv-gal-stage{
          position:relative;display:flex;flex-direction:column;align-items:center;
          max-width:min(82vw,520px);max-height:82vh;
        }
        .scv-gal-img{
          max-height:72vh;max-width:80vw;width:auto;height:auto;
          object-fit:contain;border-radius:.75rem;
          box-shadow:0 24px 70px rgba(0,0,0,.7);
        }
        .scv-gal-caption{
          margin-top:.75rem;text-align:center;display:flex;flex-direction:column;gap:.15rem;
        }
        .scv-gal-title{
          font-family:"Noto Serif",serif;font-weight:500;font-size:1rem;color:rgba(255,255,255,.88);
          letter-spacing:.02em;
        }
        .scv-gal-cat{
          font-size:9px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
          color:rgba(255,182,146,.65);
        }

        .scv-gal-dots{
          position:absolute;bottom:1.2rem;left:50%;transform:translateX(-50%);z-index:20;
          display:flex;gap:6px;
        }
        .scv-dot{
          width:6px;height:6px;border-radius:50%;border:none;padding:0;
          background:rgba(255,255,255,.25);cursor:pointer;transition:all .3s ease;
        }
        .scv-dot.active{background:var(--copper-light,#FFB692);transform:scale(1.35);box-shadow:0 0 10px rgba(255,182,146,.5)}
        .scv-dot:hover:not(.active){background:rgba(255,255,255,.45)}

        @media (prefers-reduced-motion:reduce){
          .scv-fan{animation:none}
          .scv-card{transition:none}
        }
      `}</style>
    </section>
  );
}
