/**
 * Shared "seam" glass material — a bank of frosted slats used as the site's
 * one signature transition move, both for the in-page scroll handoff
 * (SeamReveal) and the page-to-page navigation cut (Curtain). Kept in one
 * place so the two read as the same gesture rather than two different ideas.
 */

export const SEAM_SLAT_COUNT = 6;

export const SEAM_EASE = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

const SEAM_NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")";

// Every slat shares this frosted base — position (top/height or transform) is
// supplied by the caller.
export const SEAM_SLAT_BASE =
  'absolute left-0 w-full overflow-hidden bg-white/[0.07] backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_40px_rgba(0,0,0,0.35)] will-change-transform';

// Sheen + grain + a copper-lit leading edge, dropped inside every slat so the
// glass reads the same whether it's cutting between sections or pages.
export function SeamFace() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/[0.04] via-40% to-transparent" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: SEAM_NOISE_URI, backgroundSize: '128px 128px' }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFB692]/70 to-transparent" />
    </div>
  );
}
