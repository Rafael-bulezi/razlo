import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterBar from '../components/Works/FilterBar';
import ProjectCard from '../components/Works/ProjectCard';
import ProjectDetail from '../components/Works/ProjectDetail';
import { PROJECTS } from '../data/projects';
import { Category, Project } from '../types/project';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function Works() {
  useDocumentMeta(
    'Our Work — Web Design & Branding Projects | Razlo.digital Luanda',
    "Browse Razlo.digital's portfolio of websites, brand identities, AI media, and video projects built for clients in Angola and across Africa."
  );

  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () => PROJECTS.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory]
  );

  const counts = useMemo(
    () =>
      ({
        All: PROJECTS.length,
        'Web Development': PROJECTS.filter((p) => p.category === 'Web Development').length,
        'Video Production': PROJECTS.filter((p) => p.category === 'Video Production').length,
        'Graphic Authority': PROJECTS.filter((p) => p.category === 'Graphic Authority').length,
      }) as Record<Category, number>,
    []
  );

  const selectedIndex = selectedProject ? filtered.findIndex((project) => project.id === selectedProject.id) : -1;

  return (
    <div className="wk">
      <Navbar />

      <main className="wk-main">
        <div className="wk-ambient" />
        <div className="wk-bubble wb-1" />
        <div className="wk-bubble wb-2" />
        <div className="wk-bubble wb-3" />

        {/* ============ OPENING ============ */}
        <section className="wk-open">
          <p className="wk-kicker">Razlo.digital / Archive</p>
          <h1 className="wk-h1">
            <span className="wk-mask"><span>Work that</span></span>
            <span className="wk-mask"><span><span className="wk-pill">moves.</span></span></span>
          </h1>
          <p className="wk-lede">
            A collection of websites, identities, films, and visual systems built for brands ready to be taken seriously.
          </p>
          <div className="wk-hairline">
            <span>{String(PROJECTS.length).padStart(2, '0')} Projects</span>
            <span>Est. 2024 · Luanda</span>
            <span>Razlo.digital</span>
          </div>
        </section>

        {/* ============ FILTER ============ */}
        <div className="wk-filter">
          <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} counts={counts} />
        </div>

        {/* ============ GRID ============ */}
        <section className="wk-grid-sec">
          <div className="wk-gridhead">
            <span>{String(filtered.length).padStart(2, '0')} selected projects</span>
            <span>Scroll / explore</span>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="wk-grid">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} index={index} onClick={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onPrev={() => selectedIndex > 0 && setSelectedProject(filtered[selectedIndex - 1])}
            onNext={() => selectedIndex < filtered.length - 1 && setSelectedProject(filtered[selectedIndex + 1])}
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < filtered.length - 1}
          />
        )}
      </AnimatePresence>

      <style>{`
        .wk{--surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--ink-faint:rgba(14,14,14,.42);
          --copper:#B15D2E;--copper-light:#FFB692;
          --rule:rgba(14,14,14,.12);--glass-border:rgba(255,255,255,.65);--glass-bg:rgba(255,255,255,.55);--glass-hi:rgba(255,255,255,.7);
          background:var(--surface);color:var(--ink);font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh;transition:background .5s,color .5s}
        .wk *{box-sizing:border-box}
        body.dark .wk{--surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);
          --copper:#FFB692;--copper-light:#FFB692;
          --rule:rgba(255,255,255,.12);--glass-border:rgba(255,255,255,.18);--glass-bg:rgba(255,255,255,.05);--glass-hi:rgba(255,255,255,.18)}

        .wk-main{position:relative;max-width:1500px;margin:0 auto;padding:clamp(7rem,16vh,10rem) clamp(1.25rem,4vw,3rem) 7rem;overflow:hidden}

        .wk-ambient{position:absolute;inset:0;pointer-events:none;overflow:hidden}
        .wk-ambient::before,.wk-ambient::after{content:"";position:absolute;border-radius:50%;filter:blur(80px)}
        .wk-ambient::before{top:4%;left:-4%;width:440px;height:440px;background:radial-gradient(circle,rgba(177,93,46,.09),transparent 70%)}
        .wk-ambient::after{bottom:12%;right:-6%;width:500px;height:500px;background:radial-gradient(circle,rgba(255,182,146,.08),transparent 70%)}
        body.dark .wk-ambient::before{background:radial-gradient(circle,rgba(255,182,146,.06),transparent 70%)}
        body.dark .wk-ambient::after{background:radial-gradient(circle,rgba(177,93,46,.05),transparent 70%)}

        .wk-bubble{position:absolute;border-radius:50%;border:1px solid var(--glass-border);background:linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.08));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);pointer-events:none;z-index:1}
        .wk-bubble::after{content:"";position:absolute;top:20%;left:22%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.6);filter:blur(2px)}
        body.dark .wk-bubble{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02))}
        body.dark .wk-bubble::after{background:rgba(255,255,255,.15)}
        .wb-1{top:11%;right:7%;width:72px;height:72px;animation:wk-drift 9s ease-in-out infinite alternate}
        .wb-2{top:34%;left:3%;width:36px;height:36px;animation:wk-drift 11s ease-in-out infinite alternate-reverse}
        .wb-3{bottom:24%;right:10%;width:26px;height:26px;border-color:rgba(255,182,146,.45);background:linear-gradient(135deg,rgba(255,182,146,.28),rgba(255,255,255,.08));animation:wk-drift 8s ease-in-out infinite alternate}
        @keyframes wk-drift{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-18px) rotate(3deg)}}

        .wk-kicker{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper)}

        .wk-open{position:relative;z-index:2;max-width:900px;margin-bottom:3rem}
        .wk-h1{margin-top:1.4rem;font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.8rem,8vw,7rem);line-height:.88;letter-spacing:-.04em}
        .wk-mask{display:block;overflow:hidden}
        .wk-mask>span{display:block;transform:translateY(112%);animation:wk-maskup 1s cubic-bezier(.16,1,.3,1) forwards}
        .wk-mask:nth-child(2)>span{animation-delay:.12s}
        @keyframes wk-maskup{to{transform:none}}

        .wk-pill{position:relative;display:inline-block;vertical-align:baseline;margin:0 .1em;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi)}
        .wk-pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        body.dark .wk-pill::after{background:rgba(255,255,255,.2)}

        .wk-lede{margin-top:1.6rem;max-width:32rem;font-size:clamp(.95rem,1.6vw,1.05rem);line-height:1.7;color:var(--ink-soft)}

        .wk-hairline{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;border-top:1px solid var(--rule);margin-top:2.5rem;padding-top:1.2rem;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-faint)}

        .wk-filter{position:relative;z-index:2;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:1.1rem 0;margin-bottom:2.75rem}

        .wk-grid-sec{position:relative;z-index:2}
        .wk-gridhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-faint)}

        .wk-grid{display:grid;grid-template-columns:1fr;gap:1.5rem}
        @media (min-width:768px){.wk-grid{grid-template-columns:repeat(2,1fr);gap:1.75rem}}
        @media (min-width:1200px){.wk-grid{grid-template-columns:repeat(3,1fr);gap:2rem}}

        @media (prefers-reduced-motion:reduce){
          .wk-mask>span,.wk-bubble{animation-duration:.01ms!important;animation-iteration-count:1!important}
        }
      `}</style>
    </div>
  );
}