import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import NoiseOverlay from './components/NoiseOverlay';
import { CurtainProvider } from './components/Curtain';
import Home from './pages/Home';
import Works from './pages/Works';
import About from './pages/About';
import Protocol from './pages/Protocol';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative w-full transition-colors duration-500">
      <NoiseOverlay />
      {/* CurtainProvider lives here so it has access to useNavigate */}
      <CurtainProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </CurtainProvider>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
