import { useEffect, useState } from 'react';
import { useWindowStore } from '../../store/windowStore';

export default function ContextMenu() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Only open if clicking on desktop wallpaper empty area
      const target = e.target as HTMLElement;
      if (target.closest('.window') || target.closest('.taskbar') || target.closest('.no-drag')) {
        setIsOpen(false);
        return;
      }
      e.preventDefault();
      setPos({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
    };

    const handleClick = () => setIsOpen(false);

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-[9999] w-56 bg-os-window/95 backdrop-blur-md border border-os-border shadow-[5px_5px_15px_rgba(0,0,0,0.5)] font-mono text-[11px] py-1.5 select-none"
      style={{ top: pos.y, left: pos.x }}
    >
      <button className="w-full text-left px-5 py-2 hover:bg-os-accent/20 hover:text-white transition-colors" onClick={() => window.location.reload()}>
        <span className="mr-3">🔄</span> Refresh Desktop
      </button>
      <button className="w-full text-left px-5 py-2 hover:bg-os-accent/20 hover:text-white transition-colors" onClick={() => openWindow('projects', '📁 projects.dir — PROJECT REGISTRY', 'ProjectsWindow')}>
        <span className="mr-3">📁</span> Open File Manager
      </button>
      
      <div className="w-full h-[1px] bg-os-border my-1.5" />
      
      <button className="w-full text-left px-5 py-2 hover:bg-os-accent/20 hover:text-white transition-colors" onClick={() => openWindow('about', '🤖 about.exe — SAAD BOMBAYWALA', 'AboutWindow')}>
        <span className="mr-3">💡</span> About This OS
      </button>
      <button className="w-full text-left px-5 py-2 hover:bg-os-accent/20 hover:text-white transition-colors" onClick={() => openWindow('contact', '📡 contact.link — OPEN CHANNEL', 'ContactWindow')}>
        <span className="mr-3">📧</span> Contact Saad
      </button>
      
      <div className="w-full h-[1px] bg-os-border my-1.5" />
      
      <button className="w-full text-left px-5 py-2 hover:bg-os-accent/20 hover:text-white transition-colors text-os-muted" onClick={() => alert("System Properties locked.")}>
        <span className="mr-3">⚙️</span> System Properties
      </button>
    </div>
  );
}
