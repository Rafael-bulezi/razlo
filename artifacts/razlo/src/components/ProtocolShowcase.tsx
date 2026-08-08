import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from './ui/razlo-button';
import { cn } from '../lib/utils';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start with a deep-dive into your brand, goals, and competitive landscape. No templates — every engagement begins from first principles.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'A bespoke roadmap that connects your business objectives to creative and technical execution. We define success metrics before we write a single line of code.',
  },
  {
    number: '03',
    title: 'Execution',
    description:
      'Our team builds with precision — iterative delivery, regular check-ins, and a relentless focus on craft at every layer of the stack.',
  },
  {
    number: '04',
    title: 'Launch & Growth',
    description:
      'We ship, monitor, and optimize. Our work doesn\'t end at launch — we\'re partners in long-term digital growth.',
  },
];

const ProtocolShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#EAE6DE] px-5 py-32 text-black md:px-12 md:py-48 lg:px-20 dark:bg-noir-lowest dark:text-white"
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#B15D2E]/10 blur-[100px] dark:bg-[#B15D2E]/20" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-24 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="razlo-kicker mb-6">How the work moves</p>
            <motion.h2 style={{ y: titleY }} className="font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.85] tracking-[-0.04em]">
              THE<br /><em className="text-[#B15D2E] dark:text-[#FFB692]">PROTOCOL.</em>
            </motion.h2>
          </div>
          <div className="md:pb-2">
            <p className="max-w-md text-sm leading-relaxed text-black/60 dark:text-white/60 mb-8">
              No mystery handoffs or bloated process. Just a clear sequence that lets the idea get sharper at every stage.
            </p>
            <Button variant="secondary" size="md" to="/protocol" className="border-black/20 dark:border-white/20">
              See all five phases <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col border-t border-black/10 dark:border-white/10">
          {STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative grid gap-8 py-12 md:py-20 lg:grid-cols-[0.3fr_1fr_0.8fr] xl:grid-cols-[0.25fr_1.1fr_0.75fr] border-b border-black/10 dark:border-white/10 items-start",
                "hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors -mx-5 px-5 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20"
              )}
            >
              <div className="flex items-center text-[10px] font-bold tracking-[0.25em] text-[#B15D2E] dark:text-[#FFB692]">
                PHASE {step.number}
              </div>

              <h3 className="font-serif text-4xl md:text-5xl leading-none text-black dark:text-white tracking-tight">
                {step.title}
              </h3>

              <div className="flex flex-col gap-6 lg:ml-auto max-w-md">
                <p className="text-sm md:text-base leading-relaxed text-black/60 dark:text-white/60">
                  {step.description}
                </p>
                <div className="h-px w-12 bg-black/10 dark:bg-white/10 group-hover:w-full group-hover:bg-[#B15D2E] dark:group-hover:bg-[#FFB692] transition-all duration-700 ease-[0.16,1,0.3,1]" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProtocolShowcase;
