import { useCurtain } from './Curtain';

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Works', path: '/works' },
  { label: 'About', path: '/about' },
  { label: 'Protocol', path: '/protocol' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => {
  const { navigate } = useCurtain();

  return (
    <footer className="relative overflow-hidden bg-[#EAE6DE] dark:bg-[#0E0E0E] px-5 pb-7 pt-16 text-black dark:text-white sm:px-8 md:px-12 lg:px-20 transition-colors duration-500">
      {/* Drifting icon sheet background pattern */}
      <div className="ft-pat" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.04] pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid gap-14 border-b border-black/10 dark:border-white/10 pb-14 lg:grid-cols-[1.25fr_.75fr_.55fr] lg:gap-10">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.27em] text-[#B15D2E] dark:text-[#FFB692]">Razlo.digital / Independent studio</p>
            <button onClick={() => navigate('/')} className="font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.74] tracking-[-0.075em] text-black dark:text-white focus:outline-none transition-transform hover:scale-[1.01] active:scale-[0.99] text-left">
              RAZLO<span className="text-[#B15D2E] dark:text-[#FFB692]">.</span>
            </button>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-black/60 dark:text-white/60">Digital identities, websites, and moving image for brands with something to say.</p>
          </div>
          <nav className="grid grid-cols-2 content-start gap-x-8 gap-y-3 pt-2">
            {LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="group flex items-center justify-between border-b border-black/10 dark:border-white/10 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-black/65 dark:text-white/65 transition-all hover:text-[#B15D2E] dark:hover:text-[#FFB692] hover:translate-x-1 focus:outline-none"
              >
                {link.label}<span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
              </button>
            ))}
          </nav>
          <div className="flex flex-col justify-between gap-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.04] backdrop-blur-md p-6 shadow-sm">
            <div><span className="mb-3 block h-2 w-2 rounded-full bg-[#B15D2E] dark:bg-[#FFB692] shadow-[0_0_14px_#FFB692] dark:shadow-[0_0_14px_#FFB692]" /><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Taking selected projects</p></div>
            <a
              href="https://wa.me/244926183068"
              target="_blank"
              rel="noopener noreferrer"
              className="razlo-glass-control inline-flex items-center justify-center rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-[0.17em] text-black dark:text-white border-black/20 dark:border-white/28 hover:bg-black/5 dark:hover:bg-white/11 transition-all hover:scale-[1.02]"
            >
              Start on WhatsApp ↗
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[9px] font-bold uppercase tracking-[0.18em] text-black/40 dark:text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Razlo Digital Studio</span>
          <span>Luanda, Angola · Working worldwide</span>
        </div>
      </div>

      <style>{`
        .ft-pat{position:absolute;inset:-300px;z-index:0;pointer-events:none;background:currentColor;opacity:.09;
          color:#0E0E0E;
          -webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg opacity='.85' transform='translate(49.6 49.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 49.6) scale(1.2)'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(49.6 181.6) scale(1.2)'%3E%3Cpath d='M17 3l4 4L8 20l-5 1 1-5z'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 181.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M10 8l6 4-6 4z'/%3E%3C/g%3E%3Cg opacity='.6' transform='translate(117.6 117.6) scale(1.2)'%3E%3Cpath d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23000' opacity='.45'%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='130' cy='0' r='2'/%3E%3Ccircle cx='260' cy='0' r='2'/%3E%3Ccircle cx='0' cy='130' r='2'/%3E%3Ccircle cx='260' cy='130' r='2'/%3E%3Ccircle cx='0' cy='260' r='2'/%3E%3Ccircle cx='130' cy='260' r='2'/%3E%3Ccircle cx='260' cy='260' r='2'/%3E%3C/g%3E%3Cg fill='%23000' opacity='.5'%3E%3Cpath d='M130 22l5 5-5 5-5-5z'/%3E%3Cpath d='M130 228l5 5-5 5-5-5z'/%3E%3Cpath d='M22 130l5 5-5 5-5-5z'/%3E%3Cpath d='M228 130l5 5-5 5-5-5z'/%3E%3C/g%3E%3C/svg%3E");
          mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'%3E%3Cg fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cg opacity='.85' transform='translate(49.6 49.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 49.6) scale(1.2)'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Cpath d='M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(49.6 181.6) scale(1.2)'%3E%3Cpath d='M17 3l4 4L8 20l-5 1 1-5z'/%3E%3C/g%3E%3Cg opacity='.85' transform='translate(181.6 181.6) scale(1.2)'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M10 8l6 4-6 4z'/%3E%3C/g%3E%3Cg opacity='.6' transform='translate(117.6 117.6) scale(1.2)'%3E%3Cpath d='M12 2v20M2 12h20M5 5l14 14M19 5L5 19'/%3E%3C/g%3E%3C/g%3E%3Cg fill='%23000' opacity='.45'%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='130' cy='0' r='2'/%3E%3Ccircle cx='260' cy='0' r='2'/%3E%3Ccircle cx='0' cy='130' r='2'/%3E%3Ccircle cx='260' cy='130' r='2'/%3E%3Ccircle cx='0' cy='260' r='2'/%3E%3Ccircle cx='130' cy='260' r='2'/%3E%3Ccircle cx='260' cy='260' r='2'/%3E%3C/g%3E%3Cg fill='%23000' opacity='.5'%3E%3Cpath d='M130 22l5 5-5 5-5-5z'/%3E%3Cpath d='M130 228l5 5-5 5-5-5z'/%3E%3Cpath d='M22 130l5 5-5 5-5-5z'/%3E%3Cpath d='M228 130l5 5-5 5-5-5z'/%3E%3C/g%3E%3C/svg%3E");
          animation:ft-pat 90s linear infinite;will-change:transform}
        .dark .ft-pat{color:#FFF;opacity:.075}
        @keyframes ft-pat{to{transform:translate3d(260px,260px,0)}}
      `}</style>
    </footer>
  );
};

export default Footer;
