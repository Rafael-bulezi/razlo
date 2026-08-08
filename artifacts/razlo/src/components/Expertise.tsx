import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import Button from './ui/razlo-button';

const SERVICES = [
  { number: '01', title: 'Digital worlds', description: 'Websites and products with a clear point of view — fast, responsive, and built to hold attention.', tags: ['Web design', 'Development', 'Motion'] },
  { number: '02', title: 'Visual authority', description: 'Identity systems that make a brand feel considered wherever it appears, from the first frame to the final detail.', tags: ['Identity', 'Art direction', 'Systems'] },
  { number: '03', title: 'Moving image', description: 'Films, campaign visuals, and AI-assisted media that give an idea atmosphere, rhythm, and a reason to be remembered.', tags: ['Film', 'AI media', 'Post'] },
];

export default function Expertise() {
  return (
    <section className="relative px-5 py-28 md:px-12 md:py-44 lg:px-20 bg-[#EAE6DE] dark:bg-[#0E0E0E]">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1fr] xl:grid-cols-[0.9fr_1fr] items-start">
          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="razlo-kicker mb-6">What we make</p>
              <h2 className="font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.85] tracking-[-0.04em] text-black dark:text-white mb-8">
                FORM<br />
                <em className="text-[#B15D2E] dark:text-[#FFB692]">FOLLOWS</em><br />
                FEELING.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-black/60 dark:text-white/60 mb-10">
                A focused studio for brands that need more than output. We connect strategy, design, technology, and moving image into one memorable language.
              </p>
              <Button variant="secondary" size="md" to="/protocol" className="border-black/20 dark:border-white/20">
                Explore our approach <ArrowUpRight size={14} />
              </Button>
            </motion.div>
          </div>

          {/* Scrolling Right Column */}
          <div className="flex flex-col gap-10">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col pt-10 border-t border-black/10 dark:border-white/10"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-xs font-bold tracking-[0.25em] text-[#B15D2E] dark:text-[#FFB692]">
                    {service.number}
                  </span>
                  <MoveUpRight size={20} className="text-black/20 group-hover:text-black dark:text-white/20 dark:group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-black dark:text-white mb-6">
                  {service.title}
                </h3>

                <p className="max-w-lg text-base md:text-lg leading-relaxed text-black/60 dark:text-white/60 mb-10">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 dark:text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}