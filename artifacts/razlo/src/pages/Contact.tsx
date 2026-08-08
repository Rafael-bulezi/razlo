import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/ui/razlo-button';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { cn } from '../lib/utils';

const SERVICES = ['Web Development', 'AI SEO', 'Video Production', 'Brand Identity', 'AI Media', 'Other'];

const Contact = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${formData.name} (${formData.email}). I'm interested in ${formData.service || 'your services'}. Budget: ${formData.budget || 'TBD'}. ${formData.message}`;
    window.open(`https://wa.me/244926183068?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 text-sm focus:outline-none focus:border-[#B15D2E] dark:focus:border-[#FFB692] transition-colors rounded-none';

  return (
    <div className="min-h-screen bg-[#F5F3EF] dark:bg-noir-surface transition-colors duration-500">
      <Navbar />
      <main className="pt-32 pb-24 px-5 md:px-12 lg:px-20 max-w-[1500px] mx-auto min-h-[calc(100vh-200px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start">

          {/* Left Column: Editorial & Rail */}
          <div className="flex flex-col justify-between h-full pt-4">
            <div>
              <p className="razlo-kicker mb-6">Initiate Protocol</p>
              <h1 className="font-serif text-[clamp(3.5rem,7.5vw,7.5rem)] leading-[0.85] tracking-[-0.04em] text-black dark:text-white mb-8">
                LET'S BUILD<br /><em className="text-[#B15D2E] dark:text-[#FFB692]">SOMETHING</em><br />GREAT.
              </h1>
              <p className="max-w-md text-base leading-relaxed text-black/60 dark:text-white/60 mb-16 lg:mb-24">
                Tell us about your project. Discovery calls are always free, and we respond within 24 hours. Every engagement begins from first principles.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-black/10 dark:border-white/10 pt-12">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B15D2E] dark:text-[#FFB692] mb-3">Response Time</h3>
                <p className="text-sm font-medium text-black dark:text-white">Within 24 hours</p>
                <p className="text-xs text-black/50 dark:text-white/50 mt-1">Monday – Friday</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B15D2E] dark:text-[#FFB692] mb-3">Local Time</h3>
                <p className="text-sm font-medium text-black dark:text-white">Luanda, Angola</p>
                <p className="text-xs text-black/50 dark:text-white/50 mt-1">Working globally</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B15D2E] dark:text-[#FFB692] mb-3">Direct Connect</h3>
                <p className="text-sm font-medium text-black dark:text-white">+244 926 183 068</p>
                <p className="text-xs text-black/50 dark:text-white/50 mt-1">WhatsApp available</p>
              </div>
            </div>
          </div>

          {/* Right Column: Liquid Glass Form */}
          <div className="relative">
            <div className={cn(
              "razlo-glow-card p-8 md:p-12 lg:p-14 rounded-[2rem]",
              "bg-white/40 border-black/10 shadow-2xl"
            )}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
                        Your name *
                      </label>
                      <input type="text" name="name" required placeholder="João Silva" value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
                        Email *
                      </label>
                      <input type="email" name="email" required placeholder="joao@empresa.ao" value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
                        Service needed
                      </label>
                      <select name="service" value={formData.service} onChange={handleChange} className={inputClass}>
                        <option value="">Select a service...</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
                        Budget range
                      </label>
                      <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                        <option value="">Select a range...</option>
                        <option>Under $1,000</option>
                        <option>$1,000 – $5,000</option>
                        <option>$5,000 – $15,000</option>
                        <option>$15,000+</option>
                        <option>Let's discuss</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">
                      Tell us about your project *
                    </label>
                    <textarea name="message" required rows={4} placeholder="Describe your project, goals, timeline..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Transmit Details <Send size={15} />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-start justify-center py-20 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#B15D2E]/10 flex items-center justify-center mb-8">
                    <MessageCircle className="text-[#B15D2E] dark:text-[#FFB692]" size={28} />
                  </div>
                  <h2 className="font-serif text-4xl text-black dark:text-white mb-4 leading-tight">
                    Message sent<br />via WhatsApp.
                  </h2>
                  <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed max-w-sm">
                    We've opened a secure conversation with your details. Our team will review the brief and respond within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
