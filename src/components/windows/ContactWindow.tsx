import { useState, useEffect } from 'react';
import { saadData } from '../../data/saad';

export default function ContactWindow() {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [ping, setPing] = useState(17);

  useEffect(() => {
    // Initial loading bar
    const interval = setInterval(() => {
      setLoadingPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30); // 600ms total load time

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingPercent < 100) return;
    
    // Ping fluctuation
    const pingTimer = setInterval(() => {
      setPing(Math.floor(Math.random() * 6) + 15); // fluctuates 15-20ms
    }, 2000);

    return () => clearInterval(pingTimer);
  }, [loadingPercent]);

  return (
    <div className="w-full h-full bg-os-window p-6 text-os-text font-mono text-sm overflow-auto custom-scrollbar flex items-center justify-center">
      
      <div className="w-full max-w-lg border border-os-border p-1 box-glow bg-os-bg">
        
        {/* Connection Header */}
        <div className="border border-os-border p-4 mb-1">
          {loadingPercent < 100 ? (
            <div>
              <div className="text-white mb-2">ESTABLISHING CONNECTION...</div>
              <div className="flex items-center gap-3 text-os-accent">
                <div className="flex-1 bg-os-window h-4 border border-os-border p-[1px]">
                  <div className="h-full bg-os-accent transition-all duration-75" style={{ width: `${loadingPercent}%` }} />
                </div>
                <div>{loadingPercent}%</div>
              </div>
            </div>
          ) : (
            <div className="text-os-green font-bold animate-in fade-in duration-500">
              Connection to SAAD BOMBAYWALA: SECURE
            </div>
          )}
        </div>

        {/* Channels */}
        <div className={`border border-os-border p-6 mb-1 transition-opacity duration-500 ${loadingPercent === 100 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-os-muted mb-6 tracking-widest uppercase">AVAILABLE CHANNELS:</div>

          <div className="space-y-6 pl-4 border-l-2 border-os-border">
            {/* Email */}
            <div>
              <div className="text-os-accent font-bold mb-1">[✉ EMAIL]</div>
              <div className="text-white mb-2">{saadData.identity.email}</div>
              <a 
                href={`mailto:${saadData.identity.email}`}
                className="text-os-muted text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-2 w-max"
              >
                <span className="text-os-accent">→</span> Click to open mail client
              </a>
            </div>

            {/* Phone */}
            <div>
              <div className="text-os-accent font-bold mb-1">[📞 PHONE]</div>
              <div className="text-white mb-2">{saadData.identity.phone}</div>
              <a 
                href={`tel:${saadData.identity.phone.replace(/\s+/g, '')}`}
                className="text-os-muted text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-2 w-max"
              >
                <span className="text-os-accent">→</span> Click to call
              </a>
            </div>
          </div>

          <div className="my-6 border-t border-os-border border-dashed" />

          {/* Status block */}
          <div className="pl-4">
            <div className="text-os-muted mb-3">STATUS: OPEN TO —</div>
            <ul className="space-y-1.5 text-white/80">
              <li><span className="text-os-green mr-2">✓</span> Meaningful conversations</li>
              <li><span className="text-os-green mr-2">✓</span> Collaborations & feedback</li>
              <li><span className="text-os-green mr-2">✓</span> Opportunities in AI/tech</li>
              <li><span className="text-os-green mr-2">✓</span> Just saying hi</li>
            </ul>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className={`border border-os-border p-3 text-xs text-os-muted transition-opacity duration-1000 delay-300 ${loadingPercent === 100 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-os-accent">&gt;</span> Connection stable. Ping time: <span className="text-white">{ping}ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-os-accent">&gt;</span> Feel free to reach out anytime. 
            <span className="w-1.5 h-1.5 rounded-full bg-os-green animate-pulse ml-1" />
          </div>
        </div>

      </div>

    </div>
  );
}
