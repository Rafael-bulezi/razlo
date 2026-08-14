import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothImage from '../components/SmoothImage';
import Button from '../components/ui/razlo-button';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const FOUNDER_IMAGE = 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1775924519/keep_the_image_202604111713_jkcq2i.jpg';
const INSPIRATION_IMAGE = 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1775924514/A_high-end_editorial_202604111718_rfhgga.jpg';

const PRINCIPLES = [
  { number: '01', title: 'Make it <em>unmistakable.</em>', copy: 'A brand should be recognizable before its logo comes into view.' },
  { number: '02', title: 'Build for the <em>real world.</em>', copy: 'The work needs to feel sharp, move smoothly, and earn its place in a customer\'s day.' },
  { number: '03', title: 'Use tools with <em>intent.</em>', copy: 'AI expands the studio. It never replaces taste, direction, or accountability.' },
];

export default function About() {
  useDocumentMeta(
    'About Razlo.digital — Rafael Bulezi, Luanda',
    'Razlo is an independent creative technology studio led by Rafael Bulezi in Luanda, Angola.'
  );

  return (
    <div className="ab">
      <Navbar />

      <main className="ab-main">
        <div className="ab-ambient" />
        <div className="ab-bubble abb-1" />
        <div className="ab-bubble abb-2" />
        <div className="ab-bubble abb-3" />

        {/* ============ OPENING ============ */}
        <section className="ab-open">
          <div className="ab-open-grid">
            <div>
              <p className="ab-kicker">Razlo.digital / The studio</p>
              <h1 className="ab-h1">
                <span className="ab-mask"><span>A small studio</span></span>
                <span className="ab-mask"><span>with a <span className="ab-pill">wide</span> lens.</span></span>
              </h1>
            </div>
            <div className="ab-open-side">
              <p className="ab-lede">
                Razlo is an independent creative technology studio built in Luanda. We bring brand thinking, digital craft, and moving image into the same conversation.
              </p>
              <div className="ab-hairline">
                <span>Est. 2024</span>
                <span>Luanda, Angola</span>
                <span>Independent</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOUNDER ============ */}
        <section className="ab-founder">
          <div className="ab-founder-img">
            <SmoothImage
              src={FOUNDER_IMAGE}
              alt="Rafael Bulezi, founder of Razlo"
              className="h-full w-full object-cover object-top"
              containerClassName="absolute inset-0 h-full w-full"
              loading="eager"
            />
            <div className="ab-founder-fade" />
          </div>
          <div className="ab-founder-card">
            <div className="ab-founder-highlight" />
            <p className="ab-kicker">Founder / creative director</p>
            <h2 className="ab-founder-name">Rafael Bulezi</h2>
            <p className="ab-founder-quote">
              Technology is only interesting when it gives an idea more <em>presence.</em>
            </p>
            <p className="ab-founder-body">
              Rafael is a web developer and AI creative director. His practice bridges modern interface design with image-making, building work that is as usable as it is memorable.
            </p>
            <div className="ab-founder-foot">
              <span>Web · Identity · AI Media</span>
              <Button variant="copper" size="sm" to="/contact">
                Work with us <ArrowUpRight size={13} />
              </Button>
            </div>
          </div>
        </section>

        {/* ============ PRINCIPLES ============ */}
        <section className="ab-principles">
          <div className="ab-principles-head">
            <div>
              <p className="ab-kicker">Our point of view</p>
              <h2 className="ab-principles-h2">
                Less noise.<br />
                <em>More signal.</em>
              </h2>
            </div>
            <p className="ab-principles-lede">
              We do not chase a style of the week. Every engagement is an exercise in choosing the right tension, then carrying it through every detail.
            </p>
          </div>

          <ul className="ab-principles-list">
            {PRINCIPLES.map(({ number, title, copy }, i) => (
              <motion.li
                key={number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="ab-principles-row">
                  <span className="ab-principles-num">{number}</span>
                  <div className="ab-principles-body">
                    <h3 dangerouslySetInnerHTML={{ __html: title }} />
                    <p>{copy}</p>
                  </div>
                  <span className="ab-principles-pill">Principle {number}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* ============ LUANDA ============ */}
        <section className="ab-luanda">
          <div className="ab-luanda-img">
            <SmoothImage
              src={INSPIRATION_IMAGE}
              alt="Razlo studio visual inspiration"
              className="h-full w-full object-cover"
              containerClassName="absolute inset-0 h-full w-full"
            />
            <div className="ab-luanda-fade" />
          </div>
          <div className="ab-luanda-copy">
            <p className="ab-kicker">From Luanda, outward</p>
            <h2>
              We believe local perspective creates global <em>edge.</em>
            </h2>
            <p>
              The next generation of African brands should not need to imitate anyone to look world-class. They need a visual language that is precise, confident, and their own.
            </p>
            <div className="ab-luanda-meta">
              <span className="ab-pill-sm">Local craft.</span>
              <span className="ab-pill-sm">Global standards.</span>
            </div>
          </div>
        </section>

        {/* ============ CLOSING STRIP ============ */}
        <a href="/contact" className="ab-strip">
          <span className="ab-strip-k">Start a conversation</span>
          <span className="ab-strip-cta">Book a discovery call <ArrowUpRight size={13} /></span>
        </a>
      </main>

      <Footer />

      <style>{`
        .ab{--surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--ink-faint:rgba(14,14,14,.42);
          --copper:#B15D2E;--copper-light:#FFB692;
          --rule:rgba(14,14,14,.12);--glass-border:rgba(255,255,255,.65);--glass-bg:rgba(255,255,255,.55);--glass-hi:rgba(255,255,255,.7);
          background:var(--surface);color:var(--ink);font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh;transition:background .5s,color .5s}
        .ab *{box-sizing:border-box}
        body.dark .ab{--surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);
          --copper:#FFB692;--copper-light:#FFB692;
          --rule:rgba(255,255,255,.12);--glass-border:rgba(255,255,255,.18);--glass-bg:rgba(255,255,255,.05);--glass-hi:rgba(255,255,255,.18)}

        .ab-main{position:relative;overflow:hidden}

        /* ambient + bubbles */
        .ab-ambient{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
        .ab-ambient::before,.ab-ambient::after{content:"";position:absolute;border-radius:50%;filter:blur(80px)}
        .ab-ambient::before{top:2%;left:-4%;width:440px;height:440px;background:radial-gradient(circle,rgba(177,93,46,.09),transparent 70%)}
        .ab-ambient::after{top:40%;right:-6%;width:500px;height:500px;background:radial-gradient(circle,rgba(255,182,146,.08),transparent 70%)}
        body.dark .ab-ambient::before{background:radial-gradient(circle,rgba(255,182,146,.06),transparent 70%)}
        body.dark .ab-ambient::after{background:radial-gradient(circle,rgba(177,93,46,.05),transparent 70%)}

        .ab-bubble{position:absolute;border-radius:50%;border:1px solid var(--glass-border);background:linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.08));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);pointer-events:none;z-index:1}
        .ab-bubble::after{content:"";position:absolute;top:20%;left:22%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.6);filter:blur(2px)}
        body.dark .ab-bubble{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02))}
        body.dark .ab-bubble::after{background:rgba(255,255,255,.15)}
        .abb-1{top:8%;right:5%;width:78px;height:78px;animation:ab-drift 9s ease-in-out infinite alternate}
        .abb-2{top:55%;left:3%;width:40px;height:40px;animation:ab-drift 11s ease-in-out infinite alternate-reverse}
        .abb-3{top:82%;right:12%;width:28px;height:28px;border-color:rgba(255,182,146,.45);background:linear-gradient(135deg,rgba(255,182,146,.28),rgba(255,255,255,.08));animation:ab-drift 8s ease-in-out infinite alternate}
        @keyframes ab-drift{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-18px) rotate(3deg)}}

        .ab-kicker{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper);margin-bottom:1.4rem}

        /* opening */
        .ab-open{position:relative;z-index:2;padding:clamp(7rem,16vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,8vh,6rem)}
        .ab-open-grid{max-width:1500px;margin:0 auto;display:grid;gap:3rem;align-items:end}
        @media (min-width:1024px){.ab-open-grid{grid-template-columns:1.1fr .9fr;gap:5rem}}
        .ab-h1{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.8rem,7.5vw,6.8rem);line-height:.88;letter-spacing:-.04em}
        .ab-mask{display:block;overflow:hidden}
        .ab-mask>span{display:block;transform:translateY(112%);animation:ab-maskup 1s cubic-bezier(.16,1,.3,1) forwards}
        .ab-mask:nth-child(2)>span{animation-delay:.12s}
        @keyframes ab-maskup{to{transform:none}}

        .ab-pill{position:relative;display:inline-block;vertical-align:baseline;margin:0 .1em;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi)}
        .ab-pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        body.dark .ab-pill::after{background:rgba(255,255,255,.2)}

        .ab-pill-sm{position:relative;display:inline-block;vertical-align:baseline;margin:0 .06em;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);box-shadow:0 6px 16px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi);font-size:.92em}
        .ab-pill-sm::after{content:"";position:absolute;top:20%;left:20%;width:24%;height:26%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        body.dark .ab-pill-sm::after{background:rgba(255,255,255,.18)}

        .ab-lede{max-width:28rem;font-size:clamp(.95rem,1.6vw,1.05rem);line-height:1.7;color:var(--ink-soft)}
        @media (min-width:1024px){.ab-lede{margin-left:auto}}
        .ab-hairline{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;border-top:1px solid var(--rule);margin-top:2rem;padding-top:1.2rem;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-faint)}
        @media (min-width:1024px){.ab-hairline{max-width:28rem;margin-left:auto}}

        /* founder */
        .ab-founder{position:relative;z-index:2;max-width:1500px;margin:0 clamp(1.25rem,4vw,3rem);display:grid;gap:2.5rem;padding:3rem 0}
        @media (min-width:900px){.ab-founder{grid-template-columns:1.1fr .9fr;gap:4rem;align-items:center}}
        .ab-founder-img{position:relative;min-height:520px;border-radius:1.75rem;overflow:hidden;box-shadow:0 30px 80px rgba(16,12,8,.18)}
        body.dark .ab-founder-img{box-shadow:0 30px 80px rgba(0,0,0,.5)}
        .ab-founder-fade{position:absolute;inset:0;background:linear-gradient(to top,rgba(14,14,14,.3),transparent 40%);pointer-events:none}
        .ab-founder-card{position:relative;border-radius:1.75rem;border:1px solid var(--glass-border);background:var(--glass-bg);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);box-shadow:0 20px 60px rgba(177,93,46,.12),inset 0 1px 0 var(--glass-hi);padding:clamp(1.75rem,4vw,3rem);overflow:hidden}
        body.dark .ab-founder-card{box-shadow:0 20px 60px rgba(0,0,0,.4),inset 0 1px 0 var(--glass-hi)}
        .ab-founder-highlight{position:absolute;top:8%;left:6%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(24px);pointer-events:none}
        body.dark .ab-founder-highlight{background:rgba(255,255,255,.1)}
        .ab-founder-name{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2rem,5vw,3.2rem);line-height:1;letter-spacing:-.03em;margin-bottom:1.8rem}
        .ab-founder-quote{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(1.3rem,2.6vw,1.7rem);line-height:1.2;letter-spacing:-.015em;margin-bottom:1.6rem;max-width:28rem}
        .ab-founder-quote em{font-style:italic;color:var(--copper)}
        .ab-founder-body{font-size:.95rem;line-height:1.7;color:var(--ink-soft);margin-bottom:2rem;max-width:28rem}
        .ab-founder-foot{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding-top:1.5rem;border-top:1px solid var(--rule);font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-faint)}

        /* principles */
        .ab-principles{position:relative;z-index:2;max-width:1500px;margin:0 auto;padding:4rem clamp(1.25rem,4vw,3rem)}
        .ab-principles-head{display:grid;gap:1.5rem;margin-bottom:3.5rem;align-items:end}
        @media (min-width:900px){.ab-principles-head{grid-template-columns:1fr 1fr;gap:4rem}}
        .ab-principles-h2{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.4rem,6vw,5rem);line-height:.92;letter-spacing:-.03em}
        .ab-principles-h2 em{font-style:italic;color:var(--copper)}
        .ab-principles-lede{max-width:28rem;font-size:clamp(.95rem,1.6vw,1rem);line-height:1.7;color:var(--ink-soft)}
        @media (min-width:900px){.ab-principles-lede{margin-left:auto}}

        .ab-principles-list{list-style:none;padding:0;margin:0;border-top:1px solid var(--rule)}
        .ab-principles-list li{border-bottom:1px solid var(--rule)}
        .ab-principles-row{display:grid;gap:1.2rem;padding:2.25rem 0;align-items:start}
        @media (min-width:768px){.ab-principles-row{grid-template-columns:80px 1fr auto;gap:2.5rem}}
        .ab-principles-num{font-family:"Noto Serif",serif;font-style:italic;font-weight:500;font-size:1.5rem;color:var(--copper)}
        .ab-principles-body h3{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(1.4rem,2.8vw,1.9rem);line-height:1.1;letter-spacing:-.02em;margin-bottom:.6rem}
        .ab-principles-body h3 em{font-style:italic;color:var(--copper)}
        .ab-principles-body p{font-size:.92rem;line-height:1.6;color:var(--ink-soft);max-width:40rem}
        .ab-principles-pill{display:none;align-self:start;font-size:9px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;padding:.55em 1em .6em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:var(--copper);box-shadow:0 6px 14px rgba(177,93,46,.12),inset 0 1px 0 var(--glass-hi);position:relative}
        .ab-principles-pill::after{content:"";position:absolute;top:20%;left:20%;width:22%;height:26%;border-radius:50%;background:rgba(255,255,255,.5);filter:blur(1px);pointer-events:none}
        body.dark .ab-principles-pill::after{background:rgba(255,255,255,.18)}
        @media (min-width:768px){.ab-principles-pill{display:inline-block}}

        /* luanda */
        .ab-luanda{position:relative;z-index:2;max-width:1500px;margin:3rem auto 0;padding:0 clamp(1.25rem,4vw,3rem);display:grid;gap:2.5rem;align-items:center}
        @media (min-width:900px){.ab-luanda{grid-template-columns:.9fr 1.1fr;gap:4rem}}
        .ab-luanda-copy{order:2}
        @media (min-width:900px){.ab-luanda-copy{order:1}}
        .ab-luanda-copy h2{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2rem,5vw,3.8rem);line-height:.95;letter-spacing:-.03em;margin-bottom:1.4rem}
        .ab-luanda-copy h2 em{font-style:italic;color:var(--copper)}
        .ab-luanda-copy p{font-size:.95rem;line-height:1.7;color:var(--ink-soft);margin-bottom:2rem;max-width:32rem}
        .ab-luanda-meta{display:flex;flex-wrap:wrap;gap:.7rem}
        .ab-luanda-img{position:relative;min-height:440px;border-radius:1.75rem;overflow:hidden;box-shadow:0 30px 80px rgba(16,12,8,.18);order:1}
        body.dark .ab-luanda-img{box-shadow:0 30px 80px rgba(0,0,0,.5)}
        @media (min-width:900px){.ab-luanda-img{order:2}}
        .ab-luanda-fade{position:absolute;inset:0;background:linear-gradient(to right,rgba(14,14,14,.25),transparent 40%);pointer-events:none}

        /* closing strip */
        .ab-strip{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1.6rem clamp(1.25rem,4vw,3rem);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);text-decoration:none;color:var(--ink);transition:background .3s;margin-top:5rem;position:relative;z-index:2}
        .ab-strip:hover{background:rgba(177,93,46,.04)}
        .ab-strip-k{font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--ink-faint)}
        .ab-strip-cta{font-family:"Noto Serif",serif;font-size:clamp(1rem,2vw,1.35rem);color:var(--copper);display:inline-flex;align-items:center;gap:.4rem}
        .ab-strip-cta svg{transition:transform .3s}
        .ab-strip:hover .ab-strip-cta svg{transform:translate(2px,-2px)}
        @media (max-width:560px){.ab-strip{flex-direction:column;align-items:flex-start;gap:.5rem;padding:1.4rem}}

        @media (prefers-reduced-motion:reduce){
          .ab-mask>span,.ab-bubble{animation-duration:.01ms!important;animation-iteration-count:1!important}
        }
      `}</style>
    </div>
  );
}