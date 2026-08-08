import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Layers3, Orbit } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothImage from '../components/SmoothImage';
import Button from '../components/ui/razlo-button';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const FOUNDER_IMAGE = 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1775924519/keep_the_image_202604111713_jkcq2i.jpg';
const INSPIRATION_IMAGE = 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1775924514/A_high-end_editorial_202604111718_rfhgga.jpg';

const PRINCIPLES = [
  { number: '01', title: 'Make it unmistakable.', copy: 'A brand should be recognizable before its logo comes into view.', icon: Orbit },
  { number: '02', title: 'Build for the real world.', copy: 'The work needs to feel sharp, move smoothly, and earn its place in a customer’s day.', icon: Layers3 },
  { number: '03', title: 'Use tools with intent.', copy: 'AI expands the studio. It never replaces taste, direction, or accountability.', icon: Cpu },
];

export default function About() {
  useDocumentMeta('About Razlo.digital — Rafael Bulezi, Luanda', 'Razlo is an independent creative technology studio led by Rafael Bulezi in Luanda, Angola.');

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#0E0E0E] dark:bg-noir-surface dark:text-white">
      <Navbar />
      <main>
        <section className="px-5 pb-8 pt-32 sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <motion.div initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75 }}>
              <p className="razlo-kicker mb-6">Razlo.digital / The studio</p>
              <h1 className="font-serif text-[clamp(4.1rem,9vw,9.5rem)] leading-[0.77] tracking-[-0.07em]">
                A SMALL<br />STUDIO WITH<br /><em className="text-[#B15D2E]">A WIDE LENS.</em>
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.12 }} className="pb-2">
              <p className="max-w-xl text-base leading-relaxed text-black/60 dark:text-white/55 md:text-lg">
                Razlo is an independent creative technology studio built in Luanda. We bring brand thinking, digital craft, and moving image into the same conversation.
              </p>
              <div className="razlo-hairline mt-8 flex items-center justify-between border-y py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                <span>Est. 2024</span><span>Luanda, Angola</span><span>Independent</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1540px] overflow-hidden rounded-[2rem] bg-[#151515] text-white lg:grid-cols-[1.02fr_.98fr]">
            <div className="relative min-h-[62vh] overflow-hidden">
              <SmoothImage src={FOUNDER_IMAGE} alt="Rafael Bulezi, founder of Razlo" className="h-full w-full object-cover object-top" containerClassName="absolute inset-0 h-full w-full" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">
                <div><p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FFB692]">Founder / creative director</p><p className="mt-2 font-serif text-3xl">Rafael Bulezi</p></div>
                <span className="razlo-glass-control rounded-full px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white/80">Portrait 01</span>
              </div>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <p className="mb-7 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFB692]">The person behind the practice</p>
                <h2 className="font-serif text-4xl leading-[0.92] tracking-tight sm:text-5xl">Technology is only interesting when it gives an idea more <em className="text-[#FFB692]">presence.</em></h2>
                <p className="mt-8 max-w-lg text-sm leading-relaxed text-white/58 sm:text-base">
                  Rafael is a web developer and AI creative director. His practice bridges modern interface design with image-making, building work that is as usable as it is memorable.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Web · identity · AI media</span>
                <Button variant="outline" size="sm" to="/contact" className="border-white/35 text-white">Work with us <ArrowUpRight size={13} /></Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0D0D0D] px-5 py-24 text-white sm:px-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-14 grid gap-7 md:grid-cols-2 md:items-end">
              <div><p className="razlo-kicker mb-5 !text-[#FFB692]">Our point of view</p><h2 className="max-w-xl font-serif text-5xl leading-[0.86] tracking-tight md:text-7xl">Less noise.<br /><em className="text-[#FFB692]">More signal.</em></h2></div>
              <p className="max-w-md text-sm leading-relaxed text-white/55 md:justify-self-end">We do not chase a style of the week. Every engagement is an exercise in choosing the right tension, then carrying it through every detail.</p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
              {PRINCIPLES.map(({ number, title, copy, icon: Icon }, index) => (
                <motion.article key={number} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: index * 0.09 }} className="min-h-[300px] bg-[#151515] p-7 sm:p-8">
                  <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.2em] text-white/35">{number}</span><Icon size={20} className="text-[#FFB692]" strokeWidth={1.2} /></div>
                  <div className="mt-20"><h3 className="font-serif text-3xl leading-none">{title}</h3><p className="mt-5 text-sm leading-relaxed text-white/50">{copy}</p></div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1540px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#EAE6DE] dark:border-white/10 dark:bg-noir-lowest lg:grid-cols-[.75fr_1.25fr]">
            <div className="p-8 sm:p-10 lg:p-14"><p className="razlo-kicker mb-6">From Luanda, outward</p><h2 className="font-serif text-5xl leading-[0.84] tracking-tight md:text-6xl">We believe local perspective creates global <em className="text-[#B15D2E]">edge.</em></h2><p className="mt-7 max-w-md text-sm leading-relaxed text-black/55 dark:text-white/55">The next generation of African brands should not need to imitate anyone to look world-class. They need a visual language that is precise, confident, and their own.</p></div>
            <div className="relative min-h-[390px] overflow-hidden"><SmoothImage src={INSPIRATION_IMAGE} alt="Razlo studio visual inspiration" className="h-full w-full object-cover" containerClassName="absolute inset-0 h-full w-full" /><div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/18" /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}