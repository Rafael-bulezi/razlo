import { useState } from 'react';
import { Send, MessageCircle, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/razlo-button';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const SERVICES = ['Web Development', 'AI SEO', 'Video Production', 'Brand Identity', 'AI Media', 'Other'];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000+',
  "Let's discuss",
];

export default function Contact() {
  useDocumentMeta(
    'Contact — Razlo Digital Studio',
    'Get in touch with Razlo Digital Studio. Tell us about your project and we\'ll get back to you within 24 hours.'
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${formData.name} (${formData.email}). I'm interested in ${formData.service || 'your services'}. Budget: ${formData.budget || 'TBD'}. ${formData.message}`;
    window.open(`https://wa.me/244926183068?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  const reset = () => {
    setFormData({ name: '', email: '', service: '', budget: '', message: '' });
    setSubmitted(false);
  };

  return (
    <div className="ct">
      <Navbar />

      <main>
        {/* ============ OPENING ============ */}
        <section className="ct-open">
          <div className="ct-ambient" />
          <div className="ct-bubble cb-1" />
          <div className="ct-bubble cb-2" />
          <div className="ct-bubble cb-3" />

          <div className="ct-open-inner">
            <div className="ct-grid">
              {/* ---- editorial left ---- */}
              <div className="ct-editorial">
                <p className="ct-kicker">Razlo.digital / First contact</p>
                <h1 className="ct-h1">
                  <span className="ct-mask"><span>Let&apos;s start</span></span>
                  <span className="ct-mask"><span>something <span className="ct-pill">real.</span></span></span>
                </h1>
                <p className="ct-lede">
                  Tell us about your project. Discovery calls are always free, and we respond within 24 hours. Every engagement begins from{' '}
                  <span className="ct-pill-sm">first principles.</span>
                </p>

                <div className="ct-info">
                  <div className="ct-info-col">
                    <h3>Response time</h3>
                    <p>Within 24 hours</p>
                    <span>Monday – Friday</span>
                  </div>
                  <div className="ct-info-col">
                    <h3>Local time</h3>
                    <p>Luanda, Angola</p>
                    <span>Working globally</span>
                  </div>
                  <div className="ct-info-col">
                    <h3>Direct connect</h3>
                    <p>+244 926 183 068</p>
                    <span>WhatsApp available</span>
                  </div>
                </div>

                <div className="ct-hairline">
                  <span>Est. 2024</span>
                  <span>Luanda · Angola</span>
                  <span>Razlo.digital</span>
                </div>
              </div>

              {/* ---- glass form card ---- */}
              <div className="ct-card">
                <div className="ct-card-highlight" />
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="ct-form">
                    <div className="ct-row">
                      <div className="ct-field">
                        <label>Your name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="João Silva"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="ct-field">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="joao@empresa.ao"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="ct-row">
                      <div className="ct-field">
                        <label>Service needed</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={formData.service ? 'ct-has-value' : ''}
                        >
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="ct-field">
                        <label>Budget range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={formData.budget ? 'ct-has-value' : ''}
                        >
                          <option value="">Select a range…</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="ct-field">
                      <label>Tell us about your project *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Describe your project, goals, timeline…"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" variant="copper" size="lg" className="ct-submit">
                      Transmit details <Send size={15} />
                    </Button>
                  </form>
                ) : (
                  <div className="ct-sent">
                    <div className="ct-sent-icon">
                      <MessageCircle size={26} />
                    </div>
                    <h2>
                      Message <span className="ct-pill">dispatched.</span>
                    </h2>
                    <p>
                      We&apos;ve opened a secure conversation on WhatsApp with your details. Our team will review the brief and respond within 24 hours.
                    </p>
                    <button type="button" onClick={reset} className="ct-reset">
                      Send another <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CLOSING STRIP ============ */}
        <a
          href="https://wa.me/244926183068"
          target="_blank"
          rel="noopener noreferrer"
          className="ct-strip"
        >
          <span className="ct-strip-k">Prefer a direct line?</span>
          <span className="ct-strip-num">+244 926 183 068 <ArrowUpRight size={13} /></span>
        </a>
      </main>

      <Footer />

      <style>{`
        .ct{--surface:#F5F3EF;--ink:#0E0E0E;--ink-soft:rgba(14,14,14,.6);--ink-faint:rgba(14,14,14,.42);
          --copper:#B15D2E;--copper-light:#FFB692;--terra:#B15D2E;
          --rule:rgba(14,14,14,.12);--glass-border:rgba(255,255,255,.65);--glass-bg:rgba(255,255,255,.55);--glass-hi:rgba(255,255,255,.7);
          background:var(--surface);color:var(--ink);font-family:"Space Grotesk",ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;min-height:100vh;transition:background .5s,color .5s}
        .ct *{box-sizing:border-box}

        body.dark .ct{--surface:#131313;--ink:#FFF;--ink-soft:rgba(255,255,255,.6);--ink-faint:rgba(255,255,255,.45);
          --copper:#FFB692;--copper-light:#FFB692;
          --rule:rgba(255,255,255,.12);--glass-border:rgba(255,255,255,.18);--glass-bg:rgba(255,255,255,.05);--glass-hi:rgba(255,255,255,.18)}

        .ct-kicker{font-size:10px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--copper)}

        /* ambient + bubbles — same language as protocol */
        .ct-ambient{position:absolute;inset:0;pointer-events:none;overflow:hidden}
        .ct-ambient::before,.ct-ambient::after{content:"";position:absolute;border-radius:50%;filter:blur(80px)}
        .ct-ambient::before{top:6%;left:2%;width:420px;height:420px;background:radial-gradient(circle,rgba(177,93,46,.09),transparent 70%)}
        .ct-ambient::after{bottom:10%;right:4%;width:480px;height:480px;background:radial-gradient(circle,rgba(255,182,146,.08),transparent 70%)}
        body.dark .ct-ambient::before{background:radial-gradient(circle,rgba(255,182,146,.06),transparent 70%)}
        body.dark .ct-ambient::after{background:radial-gradient(circle,rgba(177,93,46,.05),transparent 70%)}

        .ct-bubble{position:absolute;border-radius:50%;border:1px solid var(--glass-border);background:linear-gradient(135deg,rgba(255,255,255,.35),rgba(255,255,255,.08));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);pointer-events:none}
        .ct-bubble::after{content:"";position:absolute;top:20%;left:22%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.6);filter:blur(2px)}
        body.dark .ct-bubble{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02))}
        body.dark .ct-bubble::after{background:rgba(255,255,255,.15)}
        .cb-1{top:12%;right:8%;width:76px;height:76px;animation:ct-drift 9s ease-in-out infinite alternate}
        .cb-2{top:52%;left:4%;width:40px;height:40px;animation:ct-drift 11s ease-in-out infinite alternate-reverse}
        .cb-3{bottom:8%;right:14%;width:28px;height:28px;border-color:rgba(255,182,146,.45);background:linear-gradient(135deg,rgba(255,182,146,.28),rgba(255,255,255,.08));animation:ct-drift 8s ease-in-out infinite alternate}
        @keyframes ct-drift{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-18px) rotate(3deg)}}

        /* opening */
        .ct-open{position:relative;overflow:hidden;padding:clamp(7rem,18vh,11rem) clamp(1.25rem,4vw,3rem) clamp(3rem,8vh,5rem)}
        .ct-open-inner{position:relative;z-index:2;max-width:1500px;margin:0 auto}
        .ct-grid{display:grid;gap:3.5rem;align-items:start}
        @media (min-width:1024px){.ct-grid{grid-template-columns:1.1fr .9fr;gap:5rem}}

        .ct-h1{margin-top:1.4rem;font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(2.8rem,7.5vw,6.8rem);line-height:.88;letter-spacing:-.04em}
        .ct-h1 em{font-style:italic;color:var(--copper)}
        .ct-mask{display:block;overflow:hidden}
        .ct-mask>span{display:block;transform:translateY(112%);animation:ct-maskup 1s cubic-bezier(.16,1,.3,1) forwards}
        .ct-mask:nth-child(2)>span{animation-delay:.12s}
        @keyframes ct-maskup{to{transform:none}}

        .ct-pill{position:relative;display:inline-block;vertical-align:baseline;margin:0 .1em;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.08em .45em .14em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(12px) saturate(140%);-webkit-backdrop-filter:blur(12px) saturate(140%);box-shadow:0 8px 24px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi)}
        .ct-pill::after{content:"";position:absolute;top:18%;left:20%;width:22%;height:28%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        body.dark .ct-pill::after{background:rgba(255,255,255,.2)}
        .ct-pill-sm{position:relative;display:inline-block;vertical-align:baseline;margin:0 .06em;font-family:"Noto Serif",serif;font-style:italic;font-weight:500;color:var(--copper);padding:.04em .42em .1em;border-radius:999px;border:1px solid rgba(255,182,146,.45);background:var(--glass-bg);backdrop-filter:blur(10px) saturate(140%);-webkit-backdrop-filter:blur(10px) saturate(140%);box-shadow:0 6px 16px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi);font-size:.92em}
        .ct-pill-sm::after{content:"";position:absolute;top:20%;left:20%;width:24%;height:26%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(1.5px);pointer-events:none}
        body.dark .ct-pill-sm::after{background:rgba(255,255,255,.18)}

        .ct-lede{margin-top:1.6rem;max-width:30rem;font-size:clamp(.95rem,1.6vw,1.05rem);line-height:1.7;color:var(--ink-soft)}

        /* info grid */
        .ct-info{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;border-top:1px solid var(--rule);margin-top:3.5rem;padding-top:2rem}
        .ct-info-col h3{font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--copper);margin-bottom:.75rem}
        .ct-info-col p{font-size:.95rem;font-weight:500;color:var(--ink);margin-bottom:.25rem}
        .ct-info-col span{font-size:.78rem;color:var(--ink-faint)}

        .ct-hairline{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--rule);margin-top:2rem;padding-top:1.4rem;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--ink-faint)}

        /* form card */
        .ct-card{position:relative;border-radius:2rem;border:1px solid var(--glass-border);background:var(--glass-bg);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);box-shadow:0 20px 60px rgba(177,93,46,.12),inset 0 1px 0 var(--glass-hi);padding:clamp(1.75rem,4vw,3rem);overflow:hidden;min-height:520px}
        body.dark .ct-card{box-shadow:0 20px 60px rgba(0,0,0,.4),inset 0 1px 0 var(--glass-hi)}
        .ct-card-highlight{position:absolute;top:10%;left:8%;width:34%;height:22%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(22px);pointer-events:none}
        body.dark .ct-card-highlight{background:rgba(255,255,255,.1);filter:blur(28px)}

        .ct-form{position:relative;z-index:1;display:flex;flex-direction:column;gap:1.75rem}
        .ct-row{display:grid;gap:1.5rem}
        @media (min-width:560px){.ct-row{grid-template-columns:1fr 1fr}}

        .ct-field{display:flex;flex-direction:column}
        .ct-field label{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:.85rem}
        .ct-field input,.ct-field textarea,.ct-field select{font:inherit;width:100%;background:transparent;border:0;border-bottom:1px solid var(--rule);padding:.6rem 0;color:var(--ink);font-size:.95rem;transition:border-color .25s;outline:none}
        .ct-field input::placeholder,.ct-field textarea::placeholder,.ct-field select{color:var(--ink-faint)}
        .ct-field input:focus,.ct-field textarea:focus,.ct-field select:focus{border-color:var(--copper)}
        .ct-field textarea{resize:none;min-height:90px}
        .ct-field select{-webkit-appearance:none;appearance:none;padding-right:1.5rem;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%23B15D2E' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 4px center;background-size:12px;cursor:pointer;transition:border-color .25s,color .25s}
        body.dark .ct-field select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%23FFB692' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E")}
        .ct-field select:not(.ct-has-value){color:var(--ink-faint)}
        .ct-field select option{background:var(--surface);color:var(--ink)}

        .ct-submit{width:100%;margin-top:.5rem;justify-content:center}

        /* submitted state */
        .ct-sent{position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:2rem 0;min-height:440px}
        .ct-sent-icon{width:64px;height:64px;border-radius:50%;border:1px solid var(--glass-border);background:var(--glass-bg);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:grid;place-items:center;color:var(--copper);margin-bottom:1.75rem;box-shadow:0 12px 30px rgba(177,93,46,.14),inset 0 1px 0 var(--glass-hi);position:relative}
        .ct-sent-icon::after{content:"";position:absolute;top:16%;left:20%;width:30%;height:22%;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(2px)}
        body.dark .ct-sent-icon::after{background:rgba(255,255,255,.2)}
        .ct-sent h2{font-family:"Noto Serif",serif;font-weight:400;font-size:clamp(1.8rem,3.5vw,2.5rem);line-height:1.05;letter-spacing:-.02em;margin-bottom:1rem}
        .ct-sent p{font-size:.95rem;line-height:1.7;color:var(--ink-soft);max-width:30rem;margin-bottom:2rem}
        .ct-reset{background:none;border:0;cursor:pointer;font:inherit;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--copper);padding:0;display:inline-flex;align-items:center;gap:.4rem;transition:gap .3s}
        .ct-reset:hover{gap:.7rem}

        /* closing strip */
        .ct-strip{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:1.6rem clamp(1.25rem,4vw,3rem);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);text-decoration:none;color:var(--ink);transition:background .3s;max-width:1500px;margin:0 auto}
        .ct-strip:hover{background:rgba(177,93,46,.04)}
        .ct-strip-k{font-size:10px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--ink-faint)}
        .ct-strip-num{font-family:"Noto Serif",serif;font-size:clamp(1rem,2vw,1.35rem);color:var(--copper);display:inline-flex;align-items:center;gap:.4rem}
        .ct-strip-num svg{transition:transform .3s}
        .ct-strip:hover .ct-strip-num svg{transform:translate(2px,-2px)}
        @media (max-width:560px){.ct-strip{flex-direction:column;align-items:flex-start;gap:.5rem;padding:1.4rem}}

        @media (prefers-reduced-motion:reduce){
          .ct-mask>span,.ct-bubble{animation-duration:.01ms!important;animation-iteration-count:1!important}
        }
      `}</style>
    </div>
  );
}