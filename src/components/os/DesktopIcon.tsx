import { useState } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { playClickSound } from '../../utils/audio';

interface IconProps {
  id: string;
  icon: any;
  label: string;
  component: string;
  title: string;
}

export default function DesktopIcon({ id, icon: Icon, label, component, title }: IconProps) {
  const [selected, setSelected] = useState(false);
  const openWindow = useWindowStore(state => state.openWindow);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(true);
    
    // Deselect other icons (simulated by listening to document clicks)
    const reset = () => {
      setSelected(false);
      document.removeEventListener('click', reset);
    };
    document.addEventListener('click', reset);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(false);
    playClickSound();
    openWindow(id, title, component);
  };

  return (
    <div 
      className="flex flex-col items-center gap-2 p-2 rounded-sm cursor-pointer group w-20 relative no-drag select-none"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={(e) => {
        // Mobile tap falls back to single click open if double click is hard
        if (e.detail === 2) handleDoubleClick(e as unknown as React.MouseEvent);
      }}
    >
      <div className={`text-4xl text-os-text filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_15px_var(--os-accent)] group-hover:text-os-accent transition-all duration-300 pointer-events-none flex justify-center items-center h-12 w-12`}>
        <Icon size={38} strokeWidth={1.5} />
      </div>
      
      <div className={`px-1.5 py-0.5 rounded-[2px] text-center pointer-events-none transition-colors max-w-full overflow-hidden text-ellipsis
        ${selected 
          ? 'bg-os-accent text-os-bg font-bold shadow-[0_0_10px_var(--os-accent)]' 
          : 'bg-os-bg/60 text-white group-hover:text-os-accent'
        }
      `}>
        <span className="font-mono text-[11px] leading-tight block truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      </div>
    </div>
  );
}
