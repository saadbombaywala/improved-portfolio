import { useWindowStore } from '../../store/windowStore';
import { User, Folder, Cpu, Brain, Target, Network } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

export const APP_REGISTRY = [
  { id: 'about', title: '🤖 about.exe — SAAD BOMBAYWALA', component: 'AboutWindow', icon: User },
  { id: 'projects', title: '📁 projects.dir — PROJECT REGISTRY', component: 'ProjectsWindow', icon: Folder },
  { id: 'skills', title: '⚙️ skills.sys — SKILL MONITOR', component: 'SkillsWindow', icon: Cpu },
  { id: 'mindset', title: '🧠 mindset.config — PARAMETERS', component: 'MindsetWindow', icon: Brain },
  { id: 'goals', title: '🎯 goals.txt — MISSION BRIEFING', component: 'GoalsWindow', icon: Target },
  { id: 'contact', title: '📡 contact.link — OPEN CHANNEL', component: 'ContactWindow', icon: Network },
];

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const openWindow = useWindowStore(state => state.openWindow);

  return (
    <>
      <div className="fixed inset-0 z-[9997]" onClick={onClose} />
      
      <div className="fixed bottom-[48px] left-0 w-[320px] bg-os-bg/95 backdrop-blur-xl border border-os-border shadow-[5px_-5px_20px_rgba(0,0,0,0.5)] z-[9998] font-mono text-[12px] flex flex-col">
        
        {/* Header Profile */}
        <div className="p-4 border-b border-os-border flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-os-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="w-10 h-10 rounded-full bg-os-window border border-os-accent flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <span className="font-display font-bold text-os-accent">SB</span>
          </div>
          <div>
            <div className="text-white font-bold tracking-wide">SAAD BOMBAYWALA</div>
            <div className="text-os-muted text-[10px] tracking-widest mt-0.5">Administrator · Age 17</div>
          </div>
        </div>

        {/* App List */}
        <div className="py-2 flex-1">
          {APP_REGISTRY.map(app => (
            <button
              key={app.id}
              className="w-full text-left px-6 py-2.5 flex items-center gap-3 text-os-text hover:bg-os-accent/10 hover:text-white transition-colors group"
              onClick={() => {
                playClickSound();
                openWindow(app.id, app.title, app.component);
                onClose();
              }}
            >
              <span className="text-base group-hover:scale-110 transition-transform"><app.icon size={18} /></span>
              <span className="truncate">{app.id}.{app.id === 'projects' ? 'dir' : app.id === 'about' ? 'exe' : app.id === 'skills' ? 'sys' : app.id === 'mindset' ? 'config' : app.id === 'goals' ? 'txt' : 'link'}</span>
            </button>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-os-border p-2 bg-os-window/50">
          <button 
            className="w-full text-left px-4 py-2 flex items-center gap-3 text-os-muted hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => {
              playClickSound();
              openWindow('intro', '⚠️ README.txt — SYSTEM WARNING', 'IntroWindow');
              onClose();
            }}
          >
            <span>ℹ️</span> About B.E.A.T OS
          </button>
          <button 
            className="w-full text-left px-4 py-2 flex items-center gap-3 text-os-muted hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => window.location.reload()}
          >
            <span>🔒</span> Lock Screen
          </button>
        </div>
      </div>
    </>
  );
}
