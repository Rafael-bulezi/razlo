import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Values from '../components/Values';
import Projects from '../components/Projects';
import ProtocolShowcase from '../components/ProtocolShowcase';
import Footer from '../components/Footer';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const Home = () => {
  useDocumentMeta(
    'Razlo Digital Studio — AI SEO, Web & Video',
    'Razlo Digital Studio is a creative technology agency specializing in AI SEO, immersive web development, and cinematic video production. Based in Luanda.'
  );

  return (
    <>
      <Navbar />
      <div className="dark"><Hero /></div>
      <Values />
      <div className="dark"><Projects /></div>
      <div className="dark"><ProtocolShowcase /></div>
      <Footer />
    </>
  );
};

export default Home;
