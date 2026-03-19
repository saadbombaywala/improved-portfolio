import { useState, useEffect } from 'react';
import { useSystemStore } from '../store/systemStore';
import { saadData } from '../data/saad';
import { motion } from 'framer-motion';

export default function BootSequence() {
  const setPhase = useSystemStore((state: any) => state.setPhase);
  const [logs, setLogs] = useState<typeof saadData.bootLogs>([]);
  const [isDone, setIsDone] = useState(false);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('beat-os-booted') && sessionStorage.getItem('hasBooted')) {
      setPhase('login');
      return;
    }

    let localIndex = 0;
    
    const interval = setInterval(() => {
      setLogs(prev => {
        // Prevent undefined pushing by checking strict array bounds exactly at execution time
        if (localIndex >= saadData.bootLogs.length) {
          clearInterval(interval);
          if (!isDone) {
            sessionStorage.setItem('beat-os-booted', 'true');
            sessionStorage.setItem('hasBooted', 'true');
            setIsDone(true);
          }
          return prev;
        }
        
        const nextTarget = saadData.bootLogs[localIndex];
        localIndex++;
        
        // Strict boundary fallback
        if (!nextTarget) return prev;
        
        return [...prev, nextTarget];
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isDone) {
      const flash = setTimeout(() => {
        setFlashing(true);
        const shift = setTimeout(() => setPhase('login'), 200);
        return () => clearTimeout(shift);
      }, 1000);
      return () => clearTimeout(flash);
    }
  }, [isDone, setPhase]);

  return (
    <div className={`fixed inset-0 bg-os-bg text-os-text font-mono z-[1000] p-6 lg:p-12 transition-colors duration-150 ${flashing ? 'bg-os-accent' : ''}`}>
      
      {/* Top Left Header */}
      <div className="absolute top-6 left-6 opacity-70">
        <p className="text-sm">B.E.A.T OS v1.0.0</p>
        <p className="text-sm">Bharat's Enhanced AI Technology</p>
      </div>

      {/* Boot Logs */}
      <div className="absolute bottom-12 left-6 lg:left-12 flex flex-col gap-1.5 w-full max-w-3xl">
        {logs.map((log: any, i: number) => {
          if (!log) return null;
          return (
            <div key={i} className="flex gap-4 text-[14px]">
              <span className={`font-bold ${log.type === 'ok' ? 'text-os-accent' : log.type === 'warn' ? 'text-os-yellow' : 'text-os-red'}`}>
                [{log.type === 'ok' ? '  OK  ' : log.type === 'warn' ? ' WARN ' : ' ERR  '}]
              </span>
              <span className="text-os-muted">{log.text}</span>
            </div>
          );
        })}
        
        {isDone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex gap-2 text-[18px] text-os-accent font-bold"
          >
            <span>&gt;</span>
            <span>Welcome, Saad.</span>
            <span className="w-3 h-5 bg-os-accent animate-blink shadow-[0_0_8px_var(--os-accent)]" />
          </motion.div>
        )}
      </div>

      {/* Initial Boot Cursor */}
      {!isDone && logs.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-block w-8 h-12 bg-os-text animate-blink" />
        </div>
      )}

      {/* CRT Scanlines native to boot */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(0,229,255,0.03)_50%,transparent_50%)] bg-[length:100%_4px] opacity-20 z-10" />
    </div>
  );
}
