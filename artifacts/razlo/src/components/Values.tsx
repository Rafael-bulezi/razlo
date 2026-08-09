import { motion } from 'motion/react';

const VALUES = [
  {
    lead: 'We approach every',
    word: 'clarity',
    tail: '— honest and open.',
  },
  {
    lead: 'We obsess over',
    word: 'craft',
    tail: 'in every detail.',
  },
  {
    lead: 'We build with',
    word: 'care',
    tail: 'for the humans behind the screen.',
  },
  {
    lead: 'We foster',
    word: 'connection',
    tail: 'across every touchpoint.',
  },
];

function GlassBubble({ className }: { className: string }) {
  return <span aria-hidden="true" className={`values-glass-bubble ${className}`} />;
}

export default function Values() {
  return (
    <section className="values-section relative min-h-screen overflow-hidden bg-[#131313] px-5 pb-24 pt-32 text-white sm:px-8 md:px-12 lg:px-16">
      <div className="values-ambient" aria-hidden="true" />
      <GlassBubble className="values-bubble-1" />
      <GlassBubble className="values-bubble-2" />
      <GlassBubble className="values-bubble-3" />
      <GlassBubble className="values-bubble-4" />
      <GlassBubble className="values-bubble-5" />
      <GlassBubble className="values-bubble-6" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col justify-center">
        <motion.p
          className="razlo-kicker mb-10 text-[#FFB692]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          Razlo.digital / Our values
        </motion.p>

        <div className="values-lines">
          {VALUES.map((value, index) => (
            <motion.h2
              key={value.word}
              className="values-line"
              initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {value.lead}{' '}
              <span className="values-bubble-word">
                <span>{value.word}</span>
              </span>{' '}
              <em>{value.tail}</em>
            </motion.h2>
          ))}
        </div>

        <div className="values-hairline mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
          <span>04 Principles</span>
          <span className="hidden sm:block">Est. 2024 · Luanda</span>
          <span>Razlo.digital</span>
        </div>
      </div>
    </section>
  );
}