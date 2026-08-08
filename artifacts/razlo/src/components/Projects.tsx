import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Button from './ui/razlo-button';
import SmoothImage from './SmoothImage';
import { PROJECTS } from '../data/projects';
import { useCurtain } from './Curtain';
import { cn } from '../lib/utils';

export default function Projects() {
  const { navigate } = useCurtain();
  const featured = PROJECTS.slice(0, 3); // 3 big pieces for home

  return (
    <section className="bg-[#0C0C0C] px-5 py-28 md:px-12 md:py-44 lg:px-20 text-white">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-24 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="razlo-kicker mb-6">Selected work / 2024—26</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.85] tracking-[-0.04em]">
              THE<br /><em className="text-[#FFB692]">ARCHIVE.</em>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:pb-2"
          >
            <p className="mb-8 max-w-md text-sm leading-relaxed text-white/60">
              A curated selection of identities, digital spaces, and moving images made for brands ready to be taken seriously.
            </p>
            <Button variant="outline" size="md" onClick={() => navigate('/works')} className="border-white/20 text-white hover:bg-white/10">
              Open full archive <ArrowRight size={14} />
            </Button>
          </motion.div>
        </div>

        <div className="flex flex-col gap-12 md:gap-32">
          {featured.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate('/works')}
                className={cn(
                  "group relative w-full flex flex-col text-left outline-none",
                  isEven ? "md:flex-row items-center" : "md:flex-row-reverse items-center"
                )}
              >
                {/* Image Section */}
                <div className="w-full md:w-[60%] lg:w-[65%] xl:w-[70%] aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl md:rounded-3xl relative z-10">
                  <SmoothImage
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                    containerClassName="h-full w-full"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                {/* Content Section (Liquid Glass Control Overlay) */}
                <div className={cn(
                  "relative z-20 w-[92%] mx-auto md:mx-0 md:w-[50%] lg:w-[45%] xl:w-[38%] -mt-16 md:mt-0 md:mb-0",
                  isEven ? "md:-ml-[10%] lg:-ml-[12%]" : "md:-mr-[10%] lg:-mr-[12%]"
                )}>
                  <div className="razlo-glow-card--dark p-8 md:p-10 lg:p-14 rounded-[2rem] border border-white/10 flex flex-col gap-6 backdrop-blur-xl shadow-2xl transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFB692]">
                        {project.category}
                      </span>
                      <span className="text-xs font-medium text-white/40 tracking-wider">{project.year}</span>
                    </div>

                    <h3 className="font-serif text-4xl lg:text-5xl capitalize leading-[0.9] text-white tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-white/60 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white group-hover:text-[#FFB692] transition-colors">
                      <span>View Project</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}