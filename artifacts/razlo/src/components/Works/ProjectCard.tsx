import { motion } from 'motion/react';
import { ArrowUpRight, Play, Expand, Layers } from 'lucide-react';
import { Project } from '../../types/project';
import SmoothImage from '../SmoothImage';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  /** Optional — emitted when the expand icon is tapped. Parent can open a lightbox. */
  onFullscreen?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick, onFullscreen }) => {
  const hasVideo = !!project.videoUrl;
  const hasGallery = !!project.gallery && project.gallery.length > 1;

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation(); // don't bubble to the card onClick
    if (onFullscreen) {
      onFullscreen(project);
      return;
    }
    // Fallback: use the native Fullscreen API on the image wrapper
    const wrapper = (e.currentTarget as HTMLElement).closest<HTMLElement>('.pc-wrap');
    if (wrapper?.requestFullscreen) {
      wrapper.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="relative w-full">
      {/* Visual Stack Cards behind main card when project has multiple covers/gallery */}
      {hasGallery && (
        <>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-transform duration-500 ease-out group-hover:rotate-[-2.5deg] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,182,146,.25), rgba(14,14,14,.6))',
              border: '1px solid rgba(255,182,146,.3)',
              transform: 'rotate(-1.4deg) translate(-2px, -3px)',
              zIndex: 0,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-transform duration-500 ease-out group-hover:rotate-[2.5deg] group-hover:translate-x-[4px] group-hover:translate-y-[-2px]"
            style={{
              background: 'linear-gradient(135deg, rgba(14,14,14,.7), rgba(20,17,16,.85))',
              border: '1px solid rgba(255,255,255,.15)',
              transform: 'rotate(1.2deg) translate(2px, -2px)',
              zIndex: 0,
            }}
          />
        </>
      )}

      <motion.button
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
        className="pc-wrap group relative z-10 block w-full cursor-pointer overflow-hidden rounded-2xl text-left aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B15D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EF] dark:focus-visible:ring-offset-[#131313]"
        style={{
          boxShadow: '0 8px 28px rgba(16,12,8,.10)',
        }}
      >
        {/* Image */}
        <SmoothImage
          src={project.image}
          alt={project.title}
          className={cn(
            'w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04]',
            (project.id === '13' || hasGallery) ? 'object-[50%_20%]' : 'object-cover'
          )}
          containerClassName="w-full h-full"
          loading={index < 4 ? 'eager' : 'lazy'}
        />

        {/* Soft resting veil — lifts on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-all duration-500 ease-out"
          style={{
            background:
              'linear-gradient(to top, rgba(14,14,14,.78) 0%, rgba(14,14,14,.28) 38%, rgba(14,14,14,0) 68%), linear-gradient(to bottom, rgba(14,14,14,.18), transparent 40%)',
          }}
        />

        {/* Copper glow frame — only visible on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255,182,146,.35), 0 20px 60px rgba(177,93,46,.25)',
          }}
        />

        {/* Top row: single streamlined dark category pill (left) + expand (right) */}
        <div className="absolute left-4 top-4 right-4 z-30 flex items-start justify-between gap-3 pointer-events-none">
          <span className="pc-pill pc-pill--dark">
            {hasVideo && <Play size={9} className="fill-current text-[#FFB692]" />}
            <span>
              {project.category === 'Video Production'
                ? 'VIDEO'
                : project.category === 'Web Development'
                ? 'SITE'
                : 'BRAND'}
            </span>
            {hasGallery && (
              <>
                <span className="pc-pill-sep" />
                <Layers size={11} strokeWidth={2.2} className="text-[#FFB692]" />
                <span className="text-[#FFB692]">+{project.gallery!.length}</span>
              </>
            )}
          </span>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              aria-label="View fullscreen"
              onClick={handleFullscreen}
              className="pc-expand"
            >
              <Expand size={12} />
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1 p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="flex items-end justify-between gap-4">
            <h3 className="pc-title">
              {project.title}
            </h3>
            <span className="pc-arrow" aria-hidden="true">
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </span>
          </div>
        </div>

        <style>{`
          .pc-wrap{
            --copper:#B15D2E; --copper-light:#FFB692;
            background:#0E0E0E;
          }
          body.dark .pc-wrap{ --copper:#FFB692; }

          .pc-pill{
            display:inline-flex; align-items:center; gap:.42rem;
            font-size:9.5px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
            padding:.45em .85em .5em;
            border-radius:999px;
            position:relative; line-height:1;
          }
          .pc-pill--dark{
            background:rgba(14,14,14,.72);
            border:1px solid rgba(255,255,255,.18);
            color:#FFF;
            box-shadow:0 8px 24px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.15);
            backdrop-filter:blur(14px) saturate(140%);
            -webkit-backdrop-filter:blur(14px) saturate(140%);
          }
          .pc-pill-sep{
            width:1px; height:10px;
            background:rgba(255,255,255,.28);
            margin:0 .1rem;
          }

          .pc-expand{
            display:grid; place-items:center;
            width:28px; height:28px; border-radius:999px;
            border:1px solid rgba(255,255,255,.25);
            background:rgba(14,14,14,.45);
            backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
            color:#FFF;
            opacity:0; transform:translateY(4px);
            transition:opacity .35s, transform .35s, background .2s, border-color .2s;
            cursor:pointer;
          }
          .group:hover .pc-expand{ opacity:1; transform:translateY(0); }
          .pc-expand:hover{ background:var(--copper); border-color:var(--copper); }
          .pc-expand:focus-visible{ outline:2px solid var(--copper-light); outline-offset:2px; opacity:1; transform:translateY(0); }

          .pc-title{
            font-family:"Noto Serif",serif; font-weight:400;
            font-size:clamp(1.15rem,2.4vw,1.5rem);
            line-height:1.05; letter-spacing:-.02em;
            color:#FFF;
            text-shadow:0 2px 20px rgba(0,0,0,.4);
            max-width:78%;
          }
          .pc-arrow{
            flex-shrink:0;
            width:32px; height:32px; border-radius:999px;
            display:grid; place-items:center;
            background:rgba(255,255,255,.9);
            color:#0E0E0E;
            opacity:0; transform:translate(6px, 6px);
            transition:opacity .4s cubic-bezier(.16,1,.3,1), transform .4s cubic-bezier(.16,1,.3,1);
          }
          .group:hover .pc-arrow{ opacity:1; transform:translate(0,0); }
        `}</style>
      </motion.button>
    </div>
  );
};

export default ProjectCard;