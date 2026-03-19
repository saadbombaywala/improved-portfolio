import { useState, useEffect } from 'react';
import { saadData } from '../../data/saad';

export default function MindsetWindow() {
  const [visibleLines, setVisibleLines] = useState(0);
  
  // Total lines calculation roughly corresponds to the keys and headers
  const totalLines = 25; 

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= totalLines) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 40); // Typewriter speed

    return () => clearInterval(interval);
  }, []);

  const LineRenderer = ({ index, children }: { index: number, children: React.ReactNode }) => {
    if (visibleLines < index) return null;
    return <div className="leading-[1.8]">{children}</div>;
  };

  const ConfigRow = ({ lineStr, desc }: { lineStr: string, desc: string }) => {
    const [key, val] = lineStr.split(' = ');
    return (
      <div className="group relative w-max cursor-help">
        <span className="text-os-text">{key}</span>
        <span className="text-os-accent mx-2">=</span>
        <span className={`font-bold transition-colors ${val.includes('LOADING') ? 'text-os-yellow animate-pulse' : 'text-os-green group-hover:text-white group-hover:text-glow'}`}>
          {val}
        </span>
        
        {/* Tooltip */}
        <div className="absolute left-full top-0 ml-4 hidden group-hover:block w-64 bg-os-window border border-os-border px-3 py-2 text-xs text-white z-50 shadow-xl pointer-events-none">
          {desc}
        </div>
      </div>
    );
  };

  let globalIndex = 0;
  const getIndex = () => globalIndex++;

  return (
    <div className="w-full h-full bg-os-window p-6 text-os-text font-mono text-sm overflow-auto custom-scrollbar">
      
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># =========================================</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># B.E.A.T OS — CORE OPERATING PARAMETERS</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># User: Saad Bombaywala</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># Config version: 17.0 (age-locked, auto-increments)</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># =========================================</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}><br/></LineRenderer>

      {/* MINDSET */}
      <LineRenderer index={getIndex()}>
        <span className="text-os-accent font-bold">[MINDSET]</span>
      </LineRenderer>
      {saadData.mindset.core.map((item) => (
        <LineRenderer key={item} index={getIndex()}>
          <ConfigRow lineStr={item} desc="Core philosophy determining how problems are approached." />
        </LineRenderer>
      ))}
      <LineRenderer index={getIndex()}><br/></LineRenderer>

      {/* PERSONALITY */}
      <LineRenderer index={getIndex()}>
        <span className="text-os-accent font-bold">[PERSONALITY]</span>
      </LineRenderer>
      {saadData.mindset.personality.map((item) => (
        <LineRenderer key={item} index={getIndex()}>
          <ConfigRow lineStr={item} desc="Intrinsic traits guiding behavior and interaction." />
        </LineRenderer>
      ))}
      <LineRenderer index={getIndex()}><br/></LineRenderer>

      {/* STRENGTHS */}
      <LineRenderer index={getIndex()}>
        <span className="text-os-accent font-bold">[STRENGTHS]</span>
      </LineRenderer>
      {saadData.mindset.strengths.map((item) => (
        <LineRenderer key={item} index={getIndex()}>
          <ConfigRow lineStr={item} desc="Confirmed advantages currently acting as leverage." />
        </LineRenderer>
      ))}
      <LineRenderer index={getIndex()}><br/></LineRenderer>

      {/* IMPROVEMENT QUEUE */}
      <LineRenderer index={getIndex()}>
        <span className="text-os-accent font-bold">[IMPROVEMENT_QUEUE]</span>
        <span className="text-os-muted ml-2"># In active development</span>
      </LineRenderer>
      {saadData.mindset.improving.map((item) => (
        <LineRenderer key={item} index={getIndex()}>
           <ConfigRow lineStr={item} desc="Areas requiring consistent iterations to compile successfully." />
        </LineRenderer>
      ))}
      <LineRenderer index={getIndex()}><br/></LineRenderer>

      {/* Footer */}
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># =========================================</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># END CONFIG — Last modified: always</span>
      </LineRenderer>
      <LineRenderer index={getIndex()}>
        <span className="text-os-muted"># =========================================</span>
      </LineRenderer>

    </div>
  );
}
