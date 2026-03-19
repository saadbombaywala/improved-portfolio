import { useEffect } from 'react';
import { useWindowStore, type OsWindow } from '../store/windowStore';
import { useSystemStore } from '../store/systemStore';
import { saadData } from '../data/saad';
import Wallpaper from '../components/os/Wallpaper';
import Taskbar from '../components/os/Taskbar';
import { APP_REGISTRY } from '../components/os/StartMenu';
import DesktopIcon from '../components/os/DesktopIcon';
import Window from '../components/os/Window';
import ContextMenu from '../components/os/ContextMenu';
import NotificationController from '../components/os/Notification';
import useKonamiCode from '../hooks/useKonamiCode';

import AboutWindow from '../components/windows/AboutWindow';
import ProjectsWindow from '../components/windows/ProjectsWindow';
import SkillsWindow from '../components/windows/SkillsWindow';
import MindsetWindow from '../components/windows/MindsetWindow';
import GoalsWindow from '../components/windows/GoalsWindow';
import ContactWindow from '../components/windows/ContactWindow';
import IntroWindow from '../components/windows/IntroWindow';

const componentMap: Record<string, React.FC> = {
  AboutWindow,
  ProjectsWindow,
  SkillsWindow,
  MindsetWindow,
  GoalsWindow,
  ContactWindow,
  IntroWindow,
};

export default function Desktop() {
  const windows = useWindowStore((state: any) => state.windows as OsWindow[]);
  const { konamiActivated, resetKonami } = useKonamiCode();
  const addNotification = useSystemStore((state: any) => state.addNotification);

  // Notification Generator
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      addNotification(saadData.notifications[index]);
      index = (index + 1) % saadData.notifications.length;
    }, 45000); 

    return () => clearInterval(timer);
  }, [addNotification]);

  // Easter Egg Sequence
  useEffect(() => {
    if (konamiActivated) {
      alert("secret.exe \n\nYou found it. Saad would be impressed. Here's something extra...\n\nKeep building. Keep learning. Do what you love.\n\n— Saad");
      resetKonami();
    }
  }, [konamiActivated, resetKonami]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-os-desktop text-os-text font-mono">
      <Wallpaper />
      <ContextMenu />
      <NotificationController />
      
      {/* Desktop Grid Layout */}
      <div className="absolute top-4 left-4 grid grid-rows-[repeat(4,auto)] grid-flow-col gap-x-6 gap-y-4 z-10 w-max">
        {APP_REGISTRY.map((app: any) => (
          <DesktopIcon 
            key={app.id}
            id={app.id}
            icon={app.icon}
            label={app.id === 'projects' ? 'projects.dir' : app.id === 'about' ? 'about.exe' : app.id === 'skills' ? 'skills.sys' : app.id === 'mindset' ? 'mindset.config' : app.id === 'goals' ? 'goals.txt' : 'contact.link'}
            title={app.title}
            component={app.component}
          />
        ))}
      </div>

      {/* Window Manager Layer */}
      {windows.map((win: OsWindow) => {
        const Component = componentMap[win.component];
        if (!Component) return null;
        
        let w = 700;
        let h = 500;
        
        if (win.id === 'projects') { w = 800; h = 560; }
        if (win.id === 'about') { w = 700; h = 520; }
        if (win.id === 'skills') { w = 680; h = 480; }
        if (win.id === 'mindset') { w = 720; h = 500; }
        if (win.id === 'goals') { w = 640; h = 500; }
        if (win.id === 'contact') { w = 580; h = 400; }
        if (win.id === 'intro') { w = 600; h = 460; }

        return (
          <Window 
            key={win.id} 
            id={win.id} 
            title={win.title}
            defaultWidth={w}
            defaultHeight={h}
          >
            <Component />
          </Window>
        );
      })}

      <Taskbar />
    </div>
  );
}
