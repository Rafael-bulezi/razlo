import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Button from './ui/razlo-button';
import { useCurtain } from './Curtain';

const HERO_IMAGE = 'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto:good,f_auto,w_2200/v1773073079/Whisk_c451e4d9353ac399ab1438a486573712dr_d8hsrf.jpg';
const WA_LINK = `https://wa.me/244952584360?text=${encodeURIComponent("Hello Razlo, I'm interested in your services.")}`;

export default function Hero() {
  const { navigate } = useCurtain();

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#0C0C0C] px-4 pb-4 pt-4 text-white sm:px-6 sm:pb-6 sm:pt-6">
      <div className="relative min-h-[calc(100svh-2rem)] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#151515] sm:min-h-[calc(100svh-3rem)] sm:rounded-[2rem]">
        <motion.img
          src={HERO_IMAGE}
          alt="Razlo digital work"
          initial={{ scale: 1.09, filter: 'blur(8px)' }}
          animate={{ scale: 1.01, filter: 'blur(0px)' }}
          transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.82)_0%,rgba(6,6,6,0.32)_45%,rgba(6,6,6,0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,6,6,0.86)_0%,transparent_50%,rgba(6,6,6,0.16)_100%)]" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8 lg:p-10">
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="max-w-[13rem] text-[9px] font-bold uppercase leading-relaxed tracking-[0.25em] text-white/58 sm:text-[10px]"
          >
            Independent creative technology studio<br />Luanda · Angola
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="razlo-glass-control flex items-center gap-2 rounded-full px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFB692] shadow-[0_0_12px_#FFB692]" />
            Available / 2026
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
          <div className="grid max-w-[1500px] gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(270px,.55fr)] lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.45 }}
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FFB692]"
              >
                01 — Digital presence, with a point of view
              </motion.p>
              <div className="overflow-visible pb-2">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-5xl font-serif text-[clamp(3.55rem,9.7vw,10.5rem)] leading-[0.85] tracking-[-0.04em]"
                >
                  BUILT TO<br /><em className="text-[#FFB692]">BE FELT.</em>
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.9 }}
              className="lg:pb-2"
            >
              <p className="max-w-sm text-sm leading-relaxed text-white/65">
                We shape identities, digital products, and moving image for brands that refuse to blend in.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button href={WA_LINK} variant="copper" size="sm" className="px-5 py-2.5 text-[10px]">
                  Start a conversation <ArrowUpRight size={13} />
                </Button>
                <Button onClick={() => navigate('/works')} variant="outline" size="sm" className="border-white/30 px-5 py-2.5 text-[10px] text-white hover:bg-white/15">
                  View archive <ArrowDownRight size={13} />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-6 right-6 hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 sm:flex lg:bottom-10 lg:right-10"
        >
          <Sparkles size={13} className="text-[#FFB692]" /> Scroll to enter
        </motion.div>
      </div>
    </section>
  );
}