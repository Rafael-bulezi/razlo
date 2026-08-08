import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/razlo-button';
import SwipeStack, { SwipeStackItem } from '../components/SwipeStack';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { cn } from '../lib/utils';

type Currency = 'USD' | 'AOA';
type PricingCategory = 'Web' | 'AI Media' | 'Video' | 'Graphic Design' | 'Partnership';

interface PricingPlan {
  name: string;
  priceUSD: number;
  features: string[];
  note: string;
  isFeatured?: boolean;
  badgeLabel?: string;
}

const EXCHANGE_RATE = 950;
const PRICING_DATA: Record<PricingCategory, PricingPlan[]> = {
  Web: [
    { name: 'Starter', priceUSD: 130, note: 'Hawkers, vendors, individual pros', features: ['1-page landing site', 'Mobile responsive', 'WhatsApp + contact button', 'Google Maps embed', '1 revision round'] },
    { name: 'Essential', priceUSD: 450, note: 'Small businesses, clinics, cafés', features: ['Up to 5 pages', 'CMS (self-editable)', 'Basic SEO setup', 'Contact form', '2 revision rounds'] },
    { name: 'Professional', priceUSD: 1100, note: 'Growing SMEs, restaurants, NGOs', isFeatured: true, badgeLabel: 'Most popular', features: ['Up to 15 pages', 'Motion / animations', 'Booking or catalog system', 'Full SEO + Analytics', '4 revision rounds'] },
    { name: 'Enterprise', priceUSD: 3000, note: 'Corporates, banks, large brands', features: ['Unlimited pages', 'E-commerce or dashboard', 'API integrations', 'Multilingual (PT/EN)', '3-month support'] },
  ],
  'AI Media': [
    { name: 'Spark', priceUSD: 200, note: 'Instagram / TikTok starters', features: ['5 AI short-form videos', 'AI voiceover (PT or EN)', 'Branded captions', '1 revision per video'] },
    { name: 'Social', priceUSD: 500, note: 'Active brand social channels', features: ['12 AI videos (mixed formats)', 'AI-generated imagery pack', 'Trend-aligned formats', '2 revision rounds'] },
    { name: 'Campaign', priceUSD: 1200, note: 'Product launches, activations', isFeatured: true, badgeLabel: 'Best value', features: ['30 mixed content pieces', '1 hero AI film (60–90s)', 'Content calendar + strategy', 'Platform formatting included', '3 revision rounds'] },
    { name: 'Production', priceUSD: 2800, note: 'Agencies, major brands', features: ['60+ pieces (full month)', '3 hero films up to 3 min', 'AI brand universe build', 'Full distribution strategy', 'Unlimited revisions'] },
  ],
  Video: [
    { name: 'Cut', priceUSD: 150, note: 'Raw footage that needs polish', features: ['Up to 3 min final cut', 'Color grading', 'Basic audio cleanup', '1 export format'] },
    { name: 'Edit', priceUSD: 400, note: 'Brand videos, event recaps', features: ['Up to 8 min final runtime', 'Pro color grading', 'Sound design', 'VFX cleanup (10 shots)', '2 export formats'] },
    { name: 'Shoot', priceUSD: 1500, note: 'Brand films, product films', isFeatured: true, badgeLabel: 'Most popular', features: ['1-day shoot in Luanda', 'Location scouting', 'Full post-production', 'BTS content pack', 'Delivery in 10 days'] },
    { name: 'Feature', priceUSD: 3500, note: 'Documentaries, corporate films', features: ['Multi-day production', 'Drone coverage', 'AI-enhanced VFX', 'Original / licensed score', 'Full rights transfer'] },
  ],
  'Graphic Design': [
    { name: 'Mark', priceUSD: 100, note: 'Startups needing something fast', features: ['1 logo concept', '2 color variants', 'PNG + SVG files', '1 revision round'] },
    { name: 'Identity', priceUSD: 250, note: 'New businesses, personal brands', features: ['Logo suite (3 variants)', 'Typography system', 'Color palette', 'Business card design', 'All source files'] },
    { name: 'System', priceUSD: 500, note: 'Scaling businesses, retail', isFeatured: true, badgeLabel: 'Most complete', features: ['Full brand guidelines PDF', 'Logo suite (5 variants)', 'Stationery set', 'Social template kit (12)', 'Brand voice guide', '3 revision rounds'] },
    { name: 'Rebrand', priceUSD: 700, note: 'Established brands needing a refresh', features: ['Brand audit + competitor analysis', 'Full identity overhaul', 'Digital + print asset library', 'Signage / environmental design', '3-month consistency support'] },
  ],
  Partnership: [],
};

const CATEGORIES = Object.keys(PRICING_DATA) as PricingCategory[];

function PlanCard({ plan, currency, category }: { plan: PricingPlan; currency: Currency; category: PricingCategory }) {
  const navigate = useNavigate();
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(
    currency === 'USD' ? plan.priceUSD : plan.priceUSD * EXCHANGE_RATE,
  );
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className={cn(
        'group relative flex min-h-[410px] flex-col justify-between overflow-hidden rounded-sm border p-6 transition-all duration-300',
        plan.isFeatured
          ? 'border-[#B15D2E] bg-white shadow-[0_18px_60px_rgba(177,93,46,0.12)] dark:bg-noir-lowest'
          : 'border-black/10 bg-white/60 hover:border-[#B15D2E]/60 dark:border-white/10 dark:bg-noir-lowest/60',
      )}
    >
      {plan.isFeatured && <span className="absolute right-4 top-4 rounded-full bg-[#FFB692] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black">{plan.badgeLabel}</span>}
      <div>
        <h2 className="font-serif text-3xl tracking-tight text-black/90 dark:text-white/90">{plan.name}</h2>
        <p className="mt-3 text-xl font-bold tracking-tight text-black/75 dark:text-white/70">{price}</p>
        <div className="my-6 h-px w-8 bg-[#B15D2E]/50" />
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-xs leading-snug text-black/60 dark:text-white/45">
              <Check size={13} className="mt-0.5 shrink-0 text-[#B15D2E]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-[10px] italic text-black/45 dark:text-white/30">{plan.note}</p>
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center"
          onClick={() => navigate(`/contact?plan=${encodeURIComponent(plan.name)}&category=${encodeURIComponent(category)}`)}
        >
          Initiate Protocol <ArrowUpRight size={13} />
        </Button>
      </div>
    </motion.article>
  );
}

function PricingStackCard({ item, currency, category, plans }: { item: SwipeStackItem; currency: Currency; category: PricingCategory; plans: PricingPlan[] }) {
  const plan = plans.find((candidate) => candidate.name === item.id)!;
  const navigate = useNavigate();
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(currency === 'USD' ? plan.priceUSD : plan.priceUSD * EXCHANGE_RATE);

  return (
    <div className="flex min-h-[335px] flex-col justify-between">
      <div>
        <div className="mb-7 flex items-start justify-between gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#B15D2E] dark:text-[#FFB692]">{category} / {item.eyebrow}</span>
          <span className="font-mono text-[10px] tracking-[0.18em] opacity-35">{item.id}</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">{plan.name}</h2>
          <p className="pb-1 text-lg font-bold tracking-tight text-[#B15D2E] dark:text-[#FFB692]">{price}</p>
        </div>
        <p className="mt-3 text-[10px] italic opacity-45">{plan.note}</p>
        <div className="my-5 h-px w-8 bg-[#B15D2E]/50" />
        <div className="grid grid-cols-1 gap-x-5 gap-y-2">
          {plan.features.map((feature) => <span key={feature} className="flex items-start gap-2 text-xs leading-snug opacity-60"><Check size={12} className="mt-0.5 shrink-0 text-[#B15D2E]" />{feature}</span>)}
        </div>
      </div>
      <Button variant="primary" size="sm" className="mt-6 w-full justify-center" onClick={() => navigate(`/contact?plan=${encodeURIComponent(plan.name)}&category=${encodeURIComponent(category)}`)}>Initiate Protocol <ArrowUpRight size={13} /></Button>
    </div>
  );
}

export default function Pricing() {
  useDocumentMeta('Pricing — Affordable Web Design & Branding in Angola | Razlo.digital', 'Transparent web design and branding pricing for businesses in Angola. Starting from $100 for brand identity and $130 for a landing page. No hidden fees.');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [category, setCategory] = useState<PricingCategory>('Web');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-black dark:bg-noir-surface dark:text-white">
      <Navbar />
      <main className="mx-auto max-w-[1500px] px-5 pb-28 pt-32 md:px-12 lg:px-20">
        <div className="mb-20 max-w-4xl">
          <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="razlo-kicker mb-5">Razlo.digital / Investment</motion.p>
          <motion.h1 initial={{ opacity: 0, x: -55 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="font-serif text-5xl leading-[0.92] tracking-tight md:text-8xl">Simple,<br /><em className="text-[#B15D2E]">Transparent</em><br />Pricing.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 max-w-2xl text-sm leading-relaxed text-black/60 dark:text-white/50">Clear pricing built for growing brands — no hidden fees, no surprises. Plans start from $100 for brand identity and $130 for a professional landing page, and scale up to full website and production packages.</motion.p>
        </div>

        <div className="razlo-hairline mb-10 flex flex-col gap-6 border-b pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={cn('rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors', category === item ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black/45 hover:bg-black/5 dark:text-white/45 dark:hover:bg-white/5')}>{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-4 rounded-full border border-black/10 px-4 py-2 dark:border-white/10">
            <span className={cn('text-[10px] font-bold tracking-[0.18em]', currency === 'USD' ? 'text-black dark:text-white' : 'text-black/25 dark:text-white/25')}>USD</span>
            <button type="button" onClick={() => setCurrency((value) => value === 'USD' ? 'AOA' : 'USD')} className="relative h-5 w-10 rounded-full bg-black/10 px-1 dark:bg-white/10" aria-label="Toggle currency">
              <motion.span animate={{ x: currency === 'USD' ? 0 : 20 }} className="block h-3 w-3 rounded-full bg-[#B15D2E]" />
            </button>
            <span className={cn('text-[10px] font-bold tracking-[0.18em]', currency === 'AOA' ? 'text-black dark:text-white' : 'text-black/25 dark:text-white/25')}>AOA</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {category === 'Partnership' ? (
            <motion.section key="partnership" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="grid gap-12 border-l-4 border-[#B15D2E] py-5 pl-6 md:grid-cols-2 md:pl-10">
              <div><h2 className="font-serif text-4xl md:text-6xl">The Partner Plan</h2><p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15D2E]">No upfront cost. We build together, we grow together.</p><p className="mt-6 max-w-lg text-sm leading-relaxed text-black/60 dark:text-white/50">The Partner Plan is Razlo.digital's equity-based option for founders and business owners across Angola who have a great idea but limited startup budget. We build your complete digital presence — website, brand identity, and launch content — at no upfront cost, in exchange for an agreed equity share or revenue commission. We take on two to three partner projects per quarter.</p><Button variant="primary" size="md" onClick={() => navigate('/contact?plan=Partner&category=Partnership')}>Apply for Partnership <ArrowUpRight size={14} /></Button></div>
              <div className="space-y-5"><div className="razlo-glow-card border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-noir-lowest"><h3 className="mb-4 font-medium">What we build for you</h3><ul className="space-y-2 text-xs text-black/60 dark:text-white/45">{['Full website (Professional tier equivalent)', 'Complete brand identity system', 'Launch content pack (AI media)', '6-month maintenance & consulting'].map((item) => <li key={item} className="flex gap-2"><span className="text-[#B15D2E]">→</span>{item}</li>)}</ul></div><div className="razlo-glow-card border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-noir-lowest"><h3 className="mb-4 font-medium">What we ask in return</h3><ul className="space-y-2 text-xs text-black/60 dark:text-white/45">{['Equity stake: 5–15% negotiated upfront', 'OR revenue share: 8–20% of monthly revenue', 'Business legally registered in Angola'].map((item) => <li key={item} className="flex gap-2"><span className="text-[#B15D2E]">→</span>{item}</li>)}</ul></div></div>
            </motion.section>
          ) : (
            <motion.div key={category} className="w-full">
              <div className="block lg:hidden">
                <SwipeStack
                  dark={false}
                  items={PRICING_DATA[category].map((plan): SwipeStackItem => ({ id: plan.name, eyebrow: plan.isFeatured ? plan.badgeLabel ?? 'Featured' : 'Plan', title: plan.name, description: plan.note, details: plan.features }))}
                  renderCard={(item) => <PricingStackCard item={item} currency={currency} category={category} plans={PRICING_DATA[category]} />}
                />
              </div>
              <div className="hidden lg:grid grid-cols-4 gap-6">
                {PRICING_DATA[category].map((plan) => (
                  <PlanCard key={plan.name} plan={plan} currency={currency} category={category} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}