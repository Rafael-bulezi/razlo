export type Category = 'All' | 'Web Development' | 'Video Production' | 'Graphic Authority';

export interface Project {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  image: string;
  description: string;
  techStack: string[];
  year: string;
  videoUrl?: string;
  fullVideoUrl?: string;
  liveSiteUrl?: string;
  gallery?: string[];
}
