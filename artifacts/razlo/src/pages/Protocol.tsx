import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/razlo-button';
import SwipeStack, { SwipeStackItem } from '../components/SwipeStack';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const PHASES: SwipeStackItem[] = [
  { id: '01', eyebrow: 'Phase 01', title: 'Discovery Call', duration: '1–2 days', description: 'A focused conversation to understand your brand, goals, timeline, and competitive landscape. We listen before we talk.', details: ['Brand questionnaire', 'Goals alignment', 'Scope outline'] },
  { id: '02', eyebrow: 'Phase 02', title: 'Strategic Proposal', duration: '2–3 days', description: 'We craft a tailored proposal — not a template. Deliverables, timeline, investment, and the exact team working on your project.', details: ['Custom proposal', 'Timeline & milestones', 'Fixed pricing'] },
  { id: '03', eyebrow: 'Phase 03', title: 'Design & Architecture', duration: '1–2 weeks', description: 'Before a line of code is written, we design. Wireframes, visual direction, motion principles, and technical architecture.', details: ['Design mockups', 'Motion direction', 'Tech stack decision'] },
  { id: '04', eyebrow: 'Phase 04', title: 'Build & Iterate', duration: '2–6 weeks', description: 'Agile development with weekly check-ins. You see progress, give feedback, and watch the product come to life.', details: ['Weekly builds', 'Feedback cycles', 'QA & testing'] },
  { id: '05', eyebrow: 'Phase 05', title: 'Launch & Handoff', duration: '3–5 days', description: 'We deploy, monitor, and hand off with full documentation. You leave with everything you need to own and grow your digital presence.', details: ['Live deployment', 'Documentation', 'Training session'] },
];

export default function Protocol() {
  useDocumentMeta('Protocol — Razlo Digital Studio', 'A clear five-phase process for creating focused and distinctive digital work.');
  return (
    <div className="dark min-h-screen bg-[#0C0C0C] text-white">
      <Navbar />
      <main>
        <section className="px-4 pb-8 pt-24 sm:px-6 sm:pt-28 md:px-8 lg:px-12">
          <div className="mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_80%_10%,rgba(177,93,46,0.32),transparent_30%),linear-gradient(135deg,#1a1715,#101010_68%)] px-7 py-16 sm:px-10 sm:py-20 lg:max-w-[1540px] lg:px-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_.62fr] lg:items-end">
              <motion.div initial={{ opacity: 0, x: -44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72 }}>
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFB692]">Razlo.digital / The protocol</p>
                <h1 className="font-serif text-[clamp(4.3rem,10vw,10rem)] leading-[0.75] tracking-[-0.07em]">A CLEAR<br />PATH TO<br /><em className="text-[#FFB692]">DISTINCT.</em></h1>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.72, delay: 0.12 }} className="lg:pb-2">
                <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">Good work has rhythm. Five deliberate phases make the process transparent, focused, and easy to move through together.</p>
                <Button variant="copper" size="md" to="/contact" className="mt-7">Start a project <ArrowRight size={15} /></Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-8 sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              <span>01–05 / Studio stages</span><span className="hidden sm:block">Drag or use controls</span>
            </div>
            <SwipeStack items={PHASES} dark />
          </div>
        </section>

        <section className="border-y border-white/10 px-5 py-20 text-center sm:px-8">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFB692]">Your first step</p>
          <h2 className="font-serif text-5xl leading-[0.9] tracking-tight md:text-7xl">Start with a<br /><em className="text-[#FFB692]">real conversation.</em></h2>
          <p className="mx-auto mb-8 mt-6 max-w-lg text-sm leading-relaxed text-white/55">Tell us where you are and where the work needs to go. Discovery calls are always free.</p>
          <Button variant="copper" size="lg" to="/contact">Book a discovery call <ArrowRight size={16} /></Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}