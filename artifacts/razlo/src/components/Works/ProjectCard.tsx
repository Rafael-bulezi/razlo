import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Project } from '../../types/project';
import SmoothImage from '../SmoothImage';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const hasVideo = !!project.videoUrl;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={onClick}
      className={cn(
        'group relative w-full cursor-pointer overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B15D2E]',
        'aspect-[4/3]'
      )}
    >
      {/* Image */}
      <SmoothImage
        src={project.image}
        alt={project.title}
        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        containerClassName="w-full h-full"
        loading={index < 4 ? 'eager' : 'lazy'}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-95" />

      {/* Video indicator */}
      {hasVideo && (
        <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
          <Play size={10} className="text-[#FFB692] fill-[#FFB692]" />
          <span className="text-[0.6rem] font-medium text-white/80 uppercase tracking-widest">Video</span>
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1 p-5 transition-transform duration-300 group-hover:translate-y-0">
        <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[#FFB692]/75 mb-1.5 block">
          {project.category}
        </span>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-serif text-xl md:text-2xl text-white capitalize leading-tight">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="text-white/70 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0"
          />
        </div>
      </div>
    </motion.button>
  );
};

export default ProjectCard;
