import { useState, useEffect } from 'react';
import { useSystemStore } from '../../store/systemStore';
import { useWindowStore } from '../../store/windowStore';
import StartMenu from './StartMenu';
import { playClickSound } from '../../utils/audio';

export default function Taskbar() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [cpu, setCpu] = useState(25);
  const [startOpen, setStartOpen] = useState(false);
  
  const { windows, activeId, focusWindow, minimizeWindow } = useWindowStore();
  const { isSoundEnabled, toggleSound } = useSystemStore();

  useEffect(() => {
    const handleCpu = () => setCpu(Math.floor(Math.random() * 25) + 15);
    const cpuTimer = setInterval(handleCpu, 2000);
    return () => clearInterval(cpuTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour12: false }));
      setDate(d.toLocaleDateString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePillClick = (id: string, isActive: boolean) => {
    playClickSound();
    if (isActive) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      
      <div className="fixed bottom-0 left-0 w-full h-12 bg-os-taskbar backdrop-blur-md border-t border-os-border flex items-center justify-between px-2 z-[9999] select-none font-mono text-[11px] text-os-text">
        
        {/* Left: Start Button */}
        <div className="flex items-center h-full">
          <button 
            onClick={() => { playClickSound(); setStartOpen(!startOpen); }}
            className={`h-full px-4 flex items-center gap-2 hover:bg-white/5 transition-colors border-r border-os-border ${startOpen ? 'bg-os-accent/10 border-b-2 border-os-accent' : ''}`}
          >
            <div className="w-5 h-5 rounded-full border border-os-accent flex items-center justify-center bg-os-accent/10">
              <div className="w-2 h-2 bg-os-accent rounded-full animate-pulse shadow-[0_0_5px_var(--os-accent)]" />
            </div>
            <span className="font-display font-bold tracking-widest text-white">BEAT</span>
          </button>
        </div>

        {/* Center: Open Windows */}
        <div className="flex-1 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar h-full">
          {windows.map(w => {
            const isActive = activeId === w.id && !w.isMinimized;
            return (
              <button
                key={w.id}
                onClick={() => handlePillClick(w.id, isActive)}
                className={`flex items-center px-3 py-1.5 min-w-[120px] max-w-[180px] border transition-colors truncate
                  ${isActive 
                    ? 'border-os-accent bg-os-accent/10 text-white border-b-2 shadow-[inset_0_-1px_5px_rgba(0,229,255,0.2)]' 
                    : 'border-os-border bg-os-bg/50 text-os-muted hover:bg-os-border/50 hover:text-os-text'
                  }
                `}
              >
                <div className="truncate flex-1 text-left">{w.title.split('—')[0].trim()}</div>
              </button>
            )
          })}
        </div>

        {/* Right: Trays */}
        <div className="flex items-center border-l border-os-border h-full divide-x divide-os-border text-os-muted">
          <div className="px-3 flex items-center gap-2" title="CPU Usage">
            CPU
            <div className="w-12 h-3 bg-os-bg border border-os-border flex p-[1px]">
               <div className="h-full bg-os-accent transition-all duration-1000" style={{ width: `${cpu}%` }} />
            </div>
          </div>
          <div className="px-3 flex items-center" title="Memory Allocation">RAM: 17%</div>
          <div 
            className="px-3 flex items-center cursor-pointer hover:bg-white/5 transition-colors" 
            onClick={toggleSound}
            title={isSoundEnabled ? 'Mute system sounds' : 'Unmute system sounds'}
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </div>
          <div className="px-3 flex items-center">🌐</div>
          <div className="px-4 flex flex-col items-center justify-center h-full hover:bg-white/5 cursor-pointer" title={date}>
            <span className="text-white text-xs">{time || '--:--:--'}</span>
          </div>
        </div>
      </div>
    </>
  );
}
