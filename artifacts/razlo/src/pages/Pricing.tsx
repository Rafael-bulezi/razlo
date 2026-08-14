import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ArrowUpRight, ArrowRight } from 'lucide-react';
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

function PricingCard({ item, currency, category, plans }: { item: SwipeStackItem; currency: Currency; category: PricingCategory; plans: PricingPlan[] }) {
  const plan = plans.find((p) => p.name === item.id)!;
  const navigate = useNavigate();
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(
    currency === 'USD' ? plan.priceUSD : plan.priceUSD * EXCHANGE_RATE,
  );

  return (
    <div className="pr-card-inner">
      <div className="pr-card-head">
        <span className="pr-card-kicker">{category} · {item.eyebrow}</span>
        {plan.isFeatured && <span className="pr-card-pill">{plan.badgeLabel}</span>}
      </div>

      <div className="pr-card-title-row">
        <h2>{plan.name}</h2>
        <span className="pr-card-price">{price}</span>
      </div>

      <p className="pr-card-note">{plan.note}</p>
      <div className="pr-card-rule" />

      <ul className="pr-card-features">
        {plan.features.map((f) => (
          <li key={f}>
            <Check size={13} strokeWidth={2} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        variant="copper"
        size="sm"
        className="pr-card-cta"
        onClick={() => navigate(`/contact?plan=${encodeURIComponent(plan.name)}&category=${encodeURIComponent(category)}`)}
      >
        Start with this plan <ArrowUpRight size={13} />
      </Button>
    </div>
  );
}

export default function Pricing() {
  useDocumentMeta('Pricing — Affordable Web Design & Branding in Angola | Razlo.digital', 'Transparent web design and branding pricing for businesses in Angola. Starting from $100 for brand identity and $130 for a landing page. No hidden fees.');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [category, setCategory] = useState<PricingCategory>('Web');
  const navigate = useNavigate();

  return (
    <div className="pr">
      <Navbar />

      <main className="pr-main">
        {/* ambient layer */}
        <div className="pr-ambient" />
        <div className="pr-bubble pbb-1" />
        <div className="pr-bubble pbb-2" />
        <div className="pr-bubble pbb-3" />

        {/* ============ OPENING ============ */}
        <section className="pr-open">
          <p className="pr-kicker">Razlo.digital / Investment</p>
          <h1 className="pr-h1">
            <span className="pr-mask"><span>Simple, <span className="pr-pill">transparent</span></span></span>
            <span className="pr-mask"><span>pricing.</span></span>
          </h1>
          <p className="pr-lede">
            Clear pricing built for growing brands — no hidden fees, no surprises. Plans start from $100 for brand identity and $130 for a professional landing page, and scale to full website and production packages.
          </p>
          <div className="pr-hairline">
            <span>05 Categories</span>
            <span>Fixed pricing</span>
            <span>No hidden fees</span>
          </div>
        </section>

        {/* ============ CONTROLS ============ */}
        <div className="pr-controls">
          <div className="pr-cats">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={cn('pr-cat', category === item && 'pr-cat-on')}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="pr-currency">
            <span className={cn('pr-cur-label', currency === 'USD' && 'pr-cur-on')}>USD</span>
            <button
              type="button"
              onClick={() => setCurrency((v) => (v === 'USD' ? 'AOA' : 'USD'))}
              className="pr-toggle"
              aria-label="Toggle currency"
            >
              <span className="pr-toggle-knob" style={{ transform: currency === 'USD' ? 'translateX(0)' : 'translateX(20px)' }} />
            </button>
            <span className={cn('pr-cur-label', currency === 'AOA' && 'pr-cur-on')}>AOA</span>
          </div>
        </div>

        {/* ============ PLANS ============ */}
        <AnimatePresence mode="wait">
          {category === 'Partnership' ? (
            <motion.section
              key="partnership"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="pr-partner"
            >
              <div className="pr-partner-main">
                <span className="pr-partner-rule" />
                <h2>The <span className="pr-pill">partner</span> plan</h2>
                <p className="pr-partner-sub">No upfront cost. We build together, we grow together.</p>
                <p className="pr-partner-body">
                  The Partner Plan is Razlo.digital&apos;s equity-based option for founders and business owners across Angola who have a great idea but limited startup budget. We build your complete digital presence — website, brand identity, and launch content — at no upfront cost, in exchange for an agreed equity share or revenue commission. We take on two to three partner projects per quarter.
                </p>
                <Button variant="copper" size="md" onClick={() => navigate('/contact?plan=Partner&category=Partnership')}>
                  Apply for partnership <ArrowUpRight size={14} />
                </Button>
              </div>

              <div className="pr-partner-cards">
                <div className="pr-partner-card">
                  <h3>What we build for you</h3>
                  <ul>
                    {['Full website (Professional tier equivalent)', 'Complete brand identity system', 'Launch content pack (AI media)', '6-month maintenance & consulting'].map((i) => (
                      <li key={i}><span className="pr-partner-mark">→</span>{i}</li>
                    ))}
                  </ul>
                </div>
                <div className="pr-partner-card">
                  <h3>What we ask in return</h3>
                  <ul>
                    {['Equity stake: 5–15% negotiated upfront', 'OR revenue share: 8–20% of monthly revenue', 'Business legally registered in Angola'].map((i) => (
                      <li key={i}><span className="pr-partner-mark">→</span>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pr-stack-wrap"
            >
              <SwipeStack
                dark={false}
                size="pricing"
                items={PRICING_DATA[category].map((plan): SwipeStackItem => ({
                  id: plan.name,
                  eyebrow: plan.isFeatured ? plan.badgeLabel ?? 'Featured' : 'Plan',
                  title: plan.name,
                  description: plan.note,
                  details: plan.features,
                }))}
                renderCard={(item) => (
                  <PricingCard item={item} currency={currency} category={category} plans={PRICING_DATA[category]} />
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ NOT SURE STRIP ============ */}
        <section className="pr-unsure">
          <p className="pr-unsure-k">Not sure which tier?</p>
          <h2 className="pr-unsure-h">Let&apos;s talk it <em>through.</em></h2>
          <p className="pr-unsure-lede">
            Book a free 15-minute discovery call. We&apos;ll help you pick the right plan, or build a custom package around your goals.
          </p>
          <Button variant="copper" size="lg" onClick={() => navigate('/contact')}>
            Book a discovery call <ArrowRight size={15} />
          </Button>
        </section>
      </main>

      <Footer />

      <style>{`
        .pr{--surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--ink-faint:rgba(14,14,14,.42);
          --copper:#B15D2E;--copper-light:#FFB692;
          --rule:rgba(14,14,14,.12);--glass-border:rgba(255,255,255,.65);--glass-bg:rgba(255,255,255,.55);--glass-hi:rgba(255,255,255,.7);
          background:var(--surface);color:var(--ink);font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh;transition:background .5s,color .5s}
        .pr *{box-sizing:border-box}
        body.dark .pr{--surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);
          --copper:#FFB692;--copper-light:#FFB692;
          --rule:rgba(255,255,255,.12);--glass-border:rgba(255,255,255,.18);--glass-bg:rgba(255,255,255,.05);--glass-hi:rgba(255,255,255,.18)}

        .pr-main{position:relative;max-width:1500px;margin:0 auto;padding:clamp(7rem,16vh,10rem) clamp(1.25rem,4vw,3rem) 3rem;overflow:hidden}

        .pr-ambient{position:absolute;inset:0;pointer-events:none;overflow:hidden}
        .pr-ambient::before,.pr-ambient::after{content:"";position:absolute;border-radius:50%;filter:blur(80px)}
        .pr-ambient::before{top:4%;left:-4%;width:440px;height:440px;background:radial-gradient(circle,rgba(177,93,46,.09),transparent 70%)}
        .pr-ambient::after{bottom:10%;right:-6%;width:500px;height:500px;background:radial-gradient(circle,rgba(255,182,146,.08),transparent 70%)}
        body.dark .pr-ambient::before{background:radial-gradient(circle,rgba(255,182,146,.06),transparent 70%)}
        body.dark .pr-ambient::after{background:radial-gradient(circle,rgba(177,93,46,.05),transparent 70%)}

        .pr-bubble{position:absolute;border-radius:50%;border:1px solid var(--glass-border);background:linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.08));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);pointer-events:none;z-index:1}
        .pr-bubble::after{content:"";position:absolute;top:20%;left:22%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.6);filter:blur(2px)}
        body.dark .pr-bubble{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02))}
        body.dark .pr-bubble::after{background:rgba(255,255,255,.15)}
        .pbb-1{top:10%;right:6%;width:72px;height:72px;animation:pr-drift 9s ease-in-out infinite alternate}
        .pbb-2{top:36%;left:3%;width:36px;height:36px;animation:pr-drift 11s ease-in-out infinite alternate-reverse}
        .pbb-3{bottom:22%;right:10%;width:26px;height:26px;border-color:rgba(255,182,146,.45);background:linear-gradient(135deg,rgba(255,182,146,.28),rgba(255,255,255,.08));animation:pr-drift 8s ease-in-out infinite alternate}
        @keyframes pr-drift{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-18px) rotate(3deg)}}

        .pr-kicker{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper)}

        .pr-open{position:relative;z-index:2;max-width:900px;margin-bottom:3.5rem}
        .pr-h1{margin-top:1.4rem;font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.8rem,8vw,7rem);line-height:.88;letter-spacing:-.04em}
        .pr-h1 em{font-style:italic;color:var(--copper)}
        .pr-mask{display:block;overflow:hidden}
        .pr-mask>span{display:block;transform:translateY(112%);animation:pr-maskup 1s cubic-bezier(.16,1,.3,1) forwards}
        .pr-mask:nth-child(2)>span{animation-delay:.12s}
        @keyframes pr-maskup{to{transform:none}}

        .pr-pill{position:relative;display:inline-block;vertical-align:baseline;margin:0 .1em;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi)}
        .pr-pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        body.dark .pr-pill::after{background:rgba(255,255,255,.2)}

        .pr-lede{margin-top:1.6rem;max-width:44rem;font-size:clamp(.95rem,1.6vw,1.05rem);line-height:1.7;color:var(--ink-soft)}

        .pr-hairline{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;border-top:1px solid var(--rule);margin-top:2.5rem;padding-top:1.2rem;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-faint)}

        /* controls */
        .pr-controls{position:relative;z-index:2;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1.5rem;margin-bottom:2.5rem;padding-bottom:2rem;border-bottom:1px solid var(--rule)}
        .pr-cats{display:flex;flex-wrap:wrap;gap:.5rem}
        .pr-cat{font:inherit;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:.7rem 1.2rem;border-radius:999px;border:1px solid var(--rule);background:transparent;color:var(--ink-faint);cursor:pointer;transition:all .25s}
        .pr-cat:hover{color:var(--ink);border-color:var(--ink-faint)}
        .pr-cat-on{background:var(--ink);color:var(--surface);border-color:var(--ink)}

        .pr-currency{display:flex;align-items:center;gap:.9rem;padding:.5rem 1rem;border-radius:999px;border:1px solid var(--rule);background:var(--glass-bg);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
        .pr-cur-label{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-faint);transition:color .25s}
        .pr-cur-on{color:var(--ink)}
        .pr-toggle{position:relative;width:40px;height:20px;border-radius:999px;border:0;background:rgba(14,14,14,.1);cursor:pointer;padding:3px}
        body.dark .pr-toggle{background:rgba(255,255,255,.1)}
        .pr-toggle-knob{display:block;width:14px;height:14px;border-radius:50%;background:var(--copper);transition:transform .35s cubic-bezier(.16,1,.3,1)}

        /* cards (rendered inside SwipeStack's glass shell) */
        .pr-card-inner{display:flex;flex-direction:column;min-height:380px;justify-content:space-between}
        .pr-card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:1.5rem}
        .pr-card-kicker{font-size:10px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--copper)}
        .pr-card-pill{font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:.45em .9em .5em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:var(--copper);box-shadow:0 6px 14px rgba(177,93,46,.12),inset 0 1px 0 var(--glass-hi);position:relative}
        .pr-card-pill::after{content:"";position:absolute;top:20%;left:20%;width:22%;height:26%;border-radius:50%;background:rgba(255,255,255,.5);filter:blur(1px);pointer-events:none}
        body.dark .pr-card-pill::after{background:rgba(255,255,255,.18)}

        .pr-card-title-row{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;margin-bottom:.5rem}
        .pr-card-title-row h2{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(1.8rem,4vw,2.4rem);line-height:1;letter-spacing:-.02em}
        .pr-card-price{font-family:"Noto Serif",serif;font-weight:500;font-size:clamp(1.1rem,2.2vw,1.4rem);color:var(--copper);white-space:nowrap}
        .pr-card-note{font-size:10px;font-style:italic;color:var(--ink-faint);margin-bottom:1.2rem}
        .pr-card-rule{height:1px;width:2rem;background:var(--copper);opacity:.5;margin-bottom:1.4rem}

        .pr-card-features{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.7rem;margin-bottom:1.5rem}
        .pr-card-features li{display:flex;align-items:flex-start;gap:.6rem;font-size:.85rem;line-height:1.4;color:var(--ink-soft)}
        .pr-card-features svg{flex-shrink:0;margin-top:2px;color:var(--copper)}

        .pr-card-cta{width:100%;justify-content:center}

        /* partnership */
        .pr-partner{position:relative;z-index:2;display:grid;gap:3rem;padding:2rem 0}
        @media (min-width:900px){.pr-partner{grid-template-columns:1.1fr 1fr;gap:4rem;align-items:start}}
        .pr-partner-main{position:relative;padding-left:1.5rem}
        .pr-partner-rule{position:absolute;left:0;top:.4rem;bottom:.4rem;width:3px;background:var(--copper);border-radius:2px}
        .pr-partner-main h2{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.2rem,6vw,4rem);line-height:.95;letter-spacing:-.03em;margin-bottom:.5rem}
        .pr-partner-sub{font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--copper);margin-bottom:1.5rem}
        .pr-partner-body{font-size:.95rem;line-height:1.7;color:var(--ink-soft);margin-bottom:2rem;max-width:32rem}

        .pr-partner-cards{display:flex;flex-direction:column;gap:1rem}
        .pr-partner-card{border-radius:1.25rem;border:1px solid var(--glass-border);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);padding:1.5rem;box-shadow:0 12px 36px rgba(177,93,46,.10),inset 0 1px 0 var(--glass-hi);position:relative;overflow:hidden}
        body.dark .pr-partner-card{box-shadow:0 12px 36px rgba(0,0,0,.4),inset 0 1px 0 var(--glass-hi)}
        .pr-partner-card::before{content:"";position:absolute;top:-10%;left:-10%;width:40%;height:40%;border-radius:50%;background:rgba(255,255,255,.4);filter:blur(30px);pointer-events:none}
        body.dark .pr-partner-card::before{background:rgba(255,255,255,.06)}
        .pr-partner-card h3{font-family:"Noto Serif",serif;font-weight:500;font-size:1rem;margin-bottom:1rem;position:relative}
        .pr-partner-card ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.6rem;position:relative}
        .pr-partner-card li{font-size:.82rem;line-height:1.5;color:var(--ink-soft);display:flex;gap:.5rem}
        .pr-partner-mark{color:var(--copper);flex-shrink:0}

        /* not sure */
        .pr-unsure{position:relative;z-index:2;text-align:center;padding:5rem 1rem 3rem;margin-top:4rem;border-top:1px solid var(--rule)}
        .pr-unsure-k{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper);margin-bottom:1.2rem}
        .pr-unsure-h{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2rem,5.5vw,4rem);line-height:.95;letter-spacing:-.03em;margin-bottom:1.2rem}
        .pr-unsure-h em{font-style:italic;color:var(--copper)}
        .pr-unsure-lede{max-width:28rem;margin:0 auto 2rem;font-size:.95rem;line-height:1.7;color:var(--ink-soft)}

        .pr-stack-wrap{position:relative;z-index:2}

        @media (prefers-reduced-motion:reduce){
          .pr-mask>span,.pr-bubble{animation-duration:.01ms!important;animation-iteration-count:1!important}
        }
      `}</style>
    </div>
  );
}