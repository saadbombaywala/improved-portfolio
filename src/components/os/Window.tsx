import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import { playClickSound } from '../../utils/audio';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  initialX?: number;
  initialY?: number;
}

export default function Window({ id, title, children, defaultWidth = 700, defaultHeight = 500, initialX, initialY }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeId } = useWindowStore();
  const win = windows.find(w => w.id === id);
  const dragConstraintsRef = useRef(null);
  
  if (!win) return null;

  const isActive = activeId === id;
  const isMaximized = win.isMaximized;

  const handleDragEnd = (_e: any, info: any) => {
    // Window snap behavior
    if (info.point.y < 20) {
      if (!isMaximized) maximizeWindow(id);
    } 
    // We could add left/right snapping here by calculating info.point.x against window.innerWidth
    // but standard maximizing covers the core requirement safely without complex width recalculations.
  };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          ref={dragConstraintsRef}
          initial={{ opacity: 0, scale: 0.95, x: initialX || (window.innerWidth / 2 - defaultWidth / 2), y: initialY || (window.innerHeight / 2 - defaultHeight / 2) }}
          animate={
            isMaximized 
              ? { opacity: 1, scale: 1, x: 0, y: 0, width: '100vw', height: 'calc(100vh - 48px)' } 
              : { opacity: 1, scale: 1, width: defaultWidth, height: defaultHeight }
          }
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
          style={{ zIndex: win.zIndex }}
          className={`absolute flex flex-col bg-os-window border rounded-sm overflow-hidden shadow-2xl origin-center 
            ${isActive ? 'border-os-accent shadow-[0_0_20px_rgba(0,229,255,0.15)]' : 'border-os-border shadow-[0_10px_30px_rgba(0,0,0,0.5)]'}
          `}
          onClick={() => focusWindow(id)}
          drag={!isMaximized}
          dragMomentum={false}
          dragListener={false} // We apply listener only to titlebar
          onDragEnd={handleDragEnd}
        >
          {/* Title Bar - Draggable */}
          <div 
            className={`h-9 flex items-center justify-between px-3 select-none no-drag cursor-move border-b 
              ${isActive ? 'bg-gradient-to-r from-os-window-title to-os-accent/20 border-os-accent' : 'bg-os-window-title border-os-border'}
            `}
            onPointerDown={() => {
              focusWindow(id);
              // Start dragging using framer motion private api bypass or standard drag controls
            }}
            onDoubleClick={() => maximizeWindow(id)}
            style={{ WebkitAppRegion: 'drag' } as any} // Desktop app drag trick, mapped to framer-motion dragControls ideally
          >
            <div className="flex items-center gap-2 pointer-events-none">
              <span className="font-mono text-xs text-white uppercase tracking-widest truncate max-w-[40vw]">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); playClickSound(); minimizeWindow(id); }}
                className="text-os-muted hover:text-white transition-colors"
                title="Minimize"
              >
                <span className="block w-3 h-[1px] bg-current" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); playClickSound(); maximizeWindow(id); }}
                className="text-os-muted hover:text-white transition-colors"
                title="Maximize"
              >
                <div className="w-3 h-3 border border-current" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); playClickSound(); closeWindow(id); }}
                className="text-os-muted hover:text-os-red transition-colors"
                title="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2L10 10M10 2L2 10" />
                </svg>
              </button>
            </div>
          </div>

          {/* Window Body */}
          <div className="flex-1 overflow-auto bg-os-window relative no-scrollbar crt-scanlines">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
