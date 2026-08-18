import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta(
    '404 — Page Not Found | Razlo Digital Studio',
    'The page you are looking for does not exist. Return to Razlo Digital Studio homepage.',
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0E0E0E] text-[#F5F3EF] px-6 text-center">
      <div className="text-xs uppercase tracking-widest text-[#FFB692] font-mono mb-4">404 Error</div>
      <h1 className="text-4xl sm:text-6xl font-light mb-4 tracking-tight">Page Not Found</h1>
      <p className="max-w-md text-sm text-[#F5F3EF]/60 mb-8 leading-relaxed">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-[#F5F3EF] text-[#0E0E0E] font-medium text-xs tracking-wider uppercase hover:bg-white transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
