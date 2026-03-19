import { useState, useEffect } from 'react';
import { useSystemStore } from '../store/systemStore';
import { useWindowStore } from '../store/windowStore';
import Wallpaper from '../components/os/Wallpaper';
import { motion, AnimatePresence } from 'framer-motion';
import { playBootSound } from '../utils/audio';

export default function LoginScreen() {
  const setPhase = useSystemStore((state: any) => state.setPhase);
  const openWindow = useWindowStore((state: any) => state.openWindow);
  const [unlocked, setUnlocked] = useState(false);
  const [dots, setDots] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const i = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const handleUnlock = () => {
    if (unlocked) return;
    let count = 0;
    playBootSound();
    const interval = setInterval(() => {
      count++;
      setDots('•'.repeat(count));
      if (count >= 12) {
        clearInterval(interval);
        setUnlocked(true);
        setTimeout(() => {
          setPhase('desktop');
          setTimeout(() => {
            openWindow('intro', '⚠️ README.txt — SYSTEM WARNING', 'IntroWindow');
          }, 600);
        }, 800);
      }
    }, 40);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-os-desktop flex flex-col items-center justify-center font-mono">
      <div className={`absolute inset-0 transition-all duration-1000 ${unlocked ? 'opacity-0 scale-110' : 'opacity-100 blur-sm scale-100'}`}>
        <Wallpaper />
      </div>
      
      <AnimatePresence>
        {!unlocked && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="z-10 bg-os-window/90 backdrop-blur-md border border-os-border p-8 md:p-12 w-full max-w-sm rounded-sm box-glow text-center flex flex-col items-center relative"
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-os-accent" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-os-accent" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-os-accent" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-os-accent" />

            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-os-accent/30 border-t-os-accent animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 rounded-full border border-os-accent/20 border-b-os-accent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
              <div className="w-16 h-16 rounded-full bg-os-bg flex items-center justify-center border border-os-border shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <span className="font-display font-bold text-2xl text-os-accent text-glow tracking-tighter">SB</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-1">SAAD BOMBAYWALA</h2>
            <p className="text-sm text-os-muted mb-1">Administrator</p>
            <p className="text-xs text-os-muted mb-8 tracking-widest">VADODARA, INDIA</p>

            <div 
              className="w-full bg-os-bg border border-os-border h-12 flex items-center justify-center mb-6 cursor-pointer hover:border-os-accent/50 transition-colors"
              onClick={handleUnlock}
            >
              {dots ? (
                <span className="text-os-accent tracking-[4px] text-lg">{dots}</span>
              ) : (
                <span className="text-xs text-os-muted/60 tracking-widest animate-pulse">ENTER TO CONTINUE</span>
              )}
            </div>

            <button 
              onClick={handleUnlock}
              className="w-full bg-os-bg border border-os-accent text-os-accent py-3 text-xs tracking-widest hover:bg-os-accent hover:text-os-bg transition-colors uppercase font-bold"
            >
              Unlock
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 w-full flex justify-center text-[10px] text-os-muted tracking-widest z-10">
        B.E.A.T OS v1.0  |  System: READY  |  {time}
      </div>
    </div>
  );
}
