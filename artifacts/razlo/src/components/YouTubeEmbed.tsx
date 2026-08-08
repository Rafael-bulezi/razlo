import { convertToYouTubeEmbed } from '../data/projects';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
}

export function YouTubeEmbed({ url, title = 'YouTube video', className = '', autoplay = false }: YouTubeEmbedProps) {
  const embedUrl = `${convertToYouTubeEmbed(url)}?${autoplay ? 'autoplay=1&' : ''}rel=0&modestbranding=1`;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
