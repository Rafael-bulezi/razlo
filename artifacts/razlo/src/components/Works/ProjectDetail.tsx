import { useEffect } from 'react';
// Bug fix: was importing from 'framer-motion', corrected to 'motion/react'
import { motion, useMotionValue, useTransform } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Project } from '../../types/project';
import MediaGallery from '../MediaGallery';
import MediaCarousel from '../MediaCarousel';
import CustomVideo from '../CustomVideo';
import { YouTubeEmbed } from '../YouTubeEmbed';
import { isYouTubeUrl } from '../../data/projects';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const hasVideo = !!project.videoUrl;
  const isYT = hasVideo && isYouTubeUrl(project.videoUrl!);
  const hasGallery = !!project.gallery?.length;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col md:flex-row bg-[#F5F3EF] dark:bg-[#0E0E0E]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Media Area - takes up full height on desktop, top portion on mobile */}
      <div className="relative w-full h-[55vh] md:h-full md:w-[65%] lg:w-[70%] bg-[#0A0A0A] flex flex-col">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          {hasVideo ? (
            isYT ? (
              <YouTubeEmbed
                url={project.videoUrl!}
                title={project.title}
                className="w-full h-full"
              />
            ) : (
              <CustomVideo
                src={project.videoUrl!}
                poster={project.image}
                className="w-full h-full object-cover"
              />
            )
          ) : hasGallery ? (
            <MediaCarousel
              images={project.gallery!}
              className="w-full h-full rounded-none"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full h-[45vh] md:h-full md:w-[35%] lg:w-[30%] flex flex-col bg-[#F5F3EF] dark:bg-noir-surface shadow-[-20px_0_40px_rgba(0,0,0,0.05)] dark:shadow-[-20px_0_40px_rgba(0,0,0,0.3)]">
        {/* Scrollable text content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:p-10 lg:p-12 pb-32 hide-scrollbar">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-[#B15D2E] dark:text-[#FFB692]">
                {project.category}
              </span>
              <span className="text-black/20 dark:text-white/20">·</span>
              <span className="text-xs font-medium text-black/40 dark:text-white/40 tracking-wider">
                {project.year}
              </span>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl leading-[0.9] text-black dark:text-white capitalize tracking-tight">
              {project.title}
            </h2>

            <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed mt-2">
              {project.description}
            </p>

            <div className="mt-4">
              <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-3">
                Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[0.65rem] font-medium tracking-wider px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {hasGallery && hasVideo && (
              <div className="mt-6">
                <h4 className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-4">
                  Stills
                </h4>
                <MediaGallery images={project.gallery!} />
              </div>
            )}

            {project.liveSiteUrl && (
              <a
                href={project.liveSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#B15D2E] dark:text-[#FFB692] hover:text-black dark:hover:text-white transition-colors"
              >
                Visit Site <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Floating Control Cluster at bottom */}
        <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center pointer-events-none">
          <div className="razlo-glass-control rounded-full flex items-center p-1.5 gap-1 pointer-events-auto bg-white/70 dark:bg-[#121212]/70 shadow-xl">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="flex h-10 w-12 items-center justify-center rounded-full text-black/60 hover:text-black hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>

            <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1" />

            <button
              onClick={onClose}
              className="flex h-10 px-5 items-center justify-center rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/5 transition-all gap-2"
              aria-label="Close project"
            >
              Close <X size={14} strokeWidth={2.5} />
            </button>

            <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1" />

            <button
              onClick={onNext}
              disabled={!hasNext}
              className="flex h-10 w-12 items-center justify-center rounded-full text-black/60 hover:text-black hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5 transition-all"
              aria-label="Next project"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
