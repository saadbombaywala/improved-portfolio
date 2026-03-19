import { useState, useEffect } from 'react';
import { saadData } from '../../data/saad';

export default function SkillsWindow() {
  const [activeProcess, setActiveProcess] = useState<typeof saadData.skills[0] | null>(null);
  const [fluctuations, setFluctuations] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initial fluctuation map
    const initialFlucs: Record<string, number> = {};
    saadData.skills.forEach(s => {
      initialFlucs[s.name] = s.percent;
    });
    setFluctuations(initialFlucs);

    // Random fluctuation interval
    const timer = setInterval(() => {
      setFluctuations(prev => {
        const next = { ...prev };
        saadData.skills.forEach(s => {
          // Fluctuate by -2 to +2
          const change = Math.floor(Math.random() * 5) - 2;
          next[s.name] = Math.max(0, Math.min(100, s.percent + change));
        });
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const renderBar = (percent: number) => {
    const totalBlocks = 20; // 100% / 5%
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    
    let bar = '';
    for (let i = 0; i < totalBlocks; i++) {
      bar += i < filledBlocks ? '█' : '░';
    }
    return bar;
  };

  return (
    <div className="w-full h-full bg-os-window text-os-text font-mono text-sm p-4 overflow-x-auto custom-scrollbar">
      {/* Header */}
      <div className="border border-os-border p-3 mb-4 bg-os-bg relative">
        <h2 className="text-white font-bold leading-tight">B.E.A.T SKILL ACQUISITION MONITOR v1.0</h2>
        <p className="text-os-muted text-xs mt-1">Monitoring 6 active learning processes...</p>
      </div>

      {/* Process Table Header */}
      <div className="grid grid-cols-[3fr_1fr_4fr_1fr_2fr] gap-4 mb-2 px-2 text-os-muted text-xs border-b border-os-border pb-2 min-w-[500px]">
        <div>PROCESS</div>
        <div>PID</div>
        <div>CPU%</div>
        <div>MEM</div>
        <div>STATUS</div>
      </div>

      {/* Process List */}
      <div className="flex flex-col min-w-[500px]">
        {saadData.skills.map((skill) => {
          const currentPercent = fluctuations[skill.name] || skill.percent;
          const isSelected = activeProcess?.name === skill.name;
          
          return (
            <div key={skill.pid}>
              <div 
                onClick={() => setActiveProcess(isSelected ? null : skill)}
                className={`grid grid-cols-[3fr_1fr_4fr_1fr_2fr] gap-4 px-2 py-1.5 text-xs hover:bg-os-accent/10 cursor-pointer transition-colors border-l-2
                  ${isSelected ? 'border-os-accent bg-white/5' : 'border-transparent'}
                `}
              >
                <div className={`${skill.name === 'python.learn' ? 'text-os-accent' : 'text-white'}`}>{skill.name}</div>
                <div className="text-os-muted">{skill.pid}</div>
                
                {/* CPU Bar */}
                <div className="text-os-accent tracking-[2px]">
                  <span className="opacity-80 transition-all duration-300">
                    {renderBar(currentPercent)}
                  </span>
                </div>
                
                <div className="text-os-muted">{currentPercent}%</div>
                
                <div className="flex items-center gap-2">
                  <span className="animate-pulse text-os-green">●</span>
                  <span className="text-os-green">{skill.status}</span>
                </div>
              </div>
              
              {/* Detail Expansion */}
              {isSelected && (
                <div className="ml-2 my-1 mr-2 p-3 bg-os-bg border border-os-border text-xs text-os-muted leading-relaxed border-l-2 border-l-os-accent/50 animate-in slide-in-from-top-2 duration-200">
                  <span className="text-os-accent">&gt; DETAILS: </span>
                  <span className="text-white/80">{skill.description}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Notes */}
      <div className="mt-8 border border-os-border p-4 bg-os-bg min-w-[500px]">
        <div className="text-os-accent font-bold mb-2">SYSTEM NOTES</div>
        <ul className="text-xs text-os-muted space-y-1">
          <li>&gt; All processes running in LEARNING MODE</li>
          <li>&gt; No process has reached 100% — by design</li>
          <li>&gt; Skill bars update in real-time as Saad grows</li>
          <li>&gt; PID 1701 (python.learn): PRIORITY HIGH</li>
          <li>&gt; Last system update: 2025</li>
        </ul>
      </div>

    </div>
  );
}
