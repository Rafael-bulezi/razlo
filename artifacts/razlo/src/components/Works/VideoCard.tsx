import { motion } from 'motion/react';
import { Play, ExternalLink } from 'lucide-react';
import { Project } from '../../types/project';
import SmoothImage from '../SmoothImage';

interface VideoCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B15D2E] aspect-[16/9]"
    >
      <SmoothImage
        src={project.image}
        alt={project.title}
        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        containerClassName="w-full h-full"
        loading={index < 2 ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
          <Play size={20} className="text-white fill-white ml-1" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[#FFB692]/75 mb-1.5 block">
          {project.category}
        </span>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-xl text-white capitalize">{project.title}</h3>
          {project.fullVideoUrl && (
            <ExternalLink size={14} className="text-white/50 flex-shrink-0" />
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default VideoCard;
