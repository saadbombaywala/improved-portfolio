import { useSystemStore } from './store/systemStore';
import BootSequence from './phases/BootSequence';
import LoginScreen from './phases/LoginScreen';
import Desktop from './phases/Desktop';
import { useEffect, useState } from 'react';

export default function App() {
  const phase = useSystemStore(state => state.phase);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-os-bg text-os-text flex flex-col items-center justify-center p-8 text-center font-mono">
        <h1 className="text-xl text-os-accent font-bold mb-4 animate-pulse">B.E.A.T OS INCOMPATIBLE</h1>
        <p className="text-sm text-os-muted mb-8 leading-relaxed max-w-sm mx-auto">
          B.E.A.T OS requires a desktop browser for the full interactive terminal experience.
        </p>
        <div className="border border-os-border p-5 bg-os-window/50 text-xs box-glow">
          <p className="mb-2 font-bold tracking-widest text-white">SAAD BOMBAYWALA</p>
          <a href="mailto:saadbombaywala492@gmail.com" className="text-os-accent block mb-2 underline hover:text-white transition-colors">saadbombaywala492@gmail.com</a>
          <a href="tel:+919825883015" className="text-os-muted block hover:text-white transition-colors">+91 9825883015</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="scanlines" />
      <div className="noise-overlay" />
      {phase === 'boot' && <BootSequence />}
      {phase === 'login' && <LoginScreen />}
      {phase === 'desktop' && <Desktop />}
    </>
  );
}
