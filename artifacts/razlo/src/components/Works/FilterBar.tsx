import { motion } from 'motion/react';
import { CATEGORIES } from '../../data/projects';
import { Category } from '../../types/project';
import { cn } from '../../lib/utils';

interface FilterBarProps {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  counts?: Record<Category, number>;
}

export default function FilterBar({ activeCategory, onCategoryChange, counts }: FilterBarProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-1 border-y border-black/10 py-2 dark:border-white/10">
      {CATEGORIES.map((category) => (
        <button key={category} type="button" onClick={() => onCategoryChange(category)} className={cn('relative flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors md:px-4', activeCategory === category ? 'text-white dark:text-black' : 'text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white')}>
          {activeCategory === category && <motion.span layoutId="works-filter" className="absolute inset-0 -z-0 rounded-full bg-black dark:bg-white" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
          <span className="relative z-10">{category === 'Graphic Authority' ? 'Graphic Design' : category}</span>
          {counts && <span className="relative z-10 opacity-50">{String(counts[category]).padStart(2, '0')}</span>}
        </button>
      ))}
    </div>
  );
}