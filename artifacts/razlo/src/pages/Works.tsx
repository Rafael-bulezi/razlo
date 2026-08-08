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
  useDocumentMeta('Our Work — Web Design & Branding Projects | Razlo.digital Luanda', "Browse Razlo.digital's portfolio of websites, brand identities, AI media, and video projects built for clients in Angola and across Africa.");
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const filtered = useMemo(() => PROJECTS.filter((project) => activeCategory === 'All' || project.category === activeCategory), [activeCategory]);
  const counts = useMemo(() => ({
    All: PROJECTS.length,
    'Web Development': PROJECTS.filter((p) => p.category === 'Web Development').length,
    'Video Production': PROJECTS.filter((p) => p.category === 'Video Production').length,
    'Graphic Authority': PROJECTS.filter((p) => p.category === 'Graphic Authority').length,
  } as Record<Category, number>), []);
  const selectedIndex = selectedProject ? filtered.findIndex((project) => project.id === selectedProject.id) : -1;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F3EF] text-black dark:bg-noir-surface dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-[1500px] px-5 pb-28 pt-32 md:px-12 lg:px-20">
        <section className="mb-16">
          <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#B15D2E]">Razlo.digital / Archive</motion.p>
          <motion.h1 initial={{ opacity: 0, x: -55 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="font-serif text-6xl leading-[0.86] tracking-tight md:text-8xl">Our<br /><em className="text-[#B15D2E]">Work.</em></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 max-w-lg text-sm leading-relaxed text-black/55 dark:text-white/45">A collection of websites, identities, films, and visual systems built for brands ready to be taken seriously.</motion.p>
        </section>
        <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} counts={counts} />
        <section className="pt-10">
          <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-black/35 dark:text-white/25"><span>{String(filtered.length).padStart(2, '0')} selected projects</span><span>Scroll / explore</span></div>
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {filtered.map((project, index) => (
                <motion.div key={project.id} layout initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.65, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  <ProjectCard project={project} index={index} onClick={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
      <AnimatePresence>
        {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} onPrev={() => selectedIndex > 0 && setSelectedProject(filtered[selectedIndex - 1])} onNext={() => selectedIndex < filtered.length - 1 && setSelectedProject(filtered[selectedIndex + 1])} hasPrev={selectedIndex > 0} hasNext={selectedIndex < filtered.length - 1} />}
      </AnimatePresence>
    </div>
  );
}