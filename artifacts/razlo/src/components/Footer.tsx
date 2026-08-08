import { useCurtain } from './Curtain';

const LINKS = [
  { label: 'Works', path: '/works' },
  { label: 'About', path: '/about' },
  { label: 'Protocol', path: '/protocol' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => {
  const { navigate } = useCurtain();

  return (
    <footer className="bg-[#EAE6DE] dark:bg-noir-lowest px-5 pb-7 pt-16 text-black dark:text-white sm:px-8 md:px-12 lg:px-20 transition-colors duration-500">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 border-b border-black/10 dark:border-white/10 pb-14 lg:grid-cols-[1.25fr_.75fr_.55fr] lg:gap-10">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.27em] text-[#FFB692]">Razlo.digital / Independent studio</p>
            <button onClick={() => navigate('/')} className="font-serif text-[clamp(4rem,10vw,9rem)] leading-[0.74] tracking-[-0.075em] text-black dark:text-white focus:outline-none">
              RAZLO<span className="text-[#FFB692]">.</span>
            </button>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-black/60 dark:text-white/52">Digital identities, websites, and moving image for brands with something to say.</p>
          </div>
          <nav className="grid grid-cols-2 content-start gap-x-8 gap-y-3 pt-2">
            {LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="group flex items-center justify-between border-b border-black/10 dark:border-white/10 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-black/55 dark:text-white/55 transition-colors hover:text-[#B15D2E] dark:hover:text-[#FFB692] focus:outline-none"
              >
                {link.label}<span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </button>
            ))}
          </nav>
          <div className="flex flex-col justify-between gap-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-6">
            <div><span className="mb-3 block h-2 w-2 rounded-full bg-[#B15D2E] dark:bg-[#FFB692] shadow-[0_0_14px_#FFB692] dark:shadow-[0_0_14px_#FFB692]" /><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Taking selected projects</p></div>
            <a
              href="https://wa.me/244926183068"
              target="_blank"
              rel="noopener noreferrer"
              className="razlo-glass-control inline-flex items-center justify-center rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-black dark:text-white border-black/20 dark:border-white/28 hover:bg-black/5 dark:hover:bg-white/11"
            >
              Start on WhatsApp ↗
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Razlo Digital Studio</span>
          <span>Luanda, Angola · Working worldwide</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
