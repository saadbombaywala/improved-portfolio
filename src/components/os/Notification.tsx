import { useEffect } from 'react';
import { useSystemStore } from '../../store/systemStore';

export default function NotificationController() {
  const { notifications, removeNotification } = useSystemStore();

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        removeNotification(0); // Pop first
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-16 right-4 z-[10000] flex flex-col gap-2 pointer-events-none">
      {notifications.map((msg, i) => (
        <div 
          key={i} 
          onClick={() => removeNotification(i)}
          className="pointer-events-auto bg-os-window/95 backdrop-blur-md border border-os-border p-4 w-72 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-sm cursor-pointer hover:border-os-accent/50 transition-colors animate-in slide-in-from-right-8 fade-in duration-300"
        >
          <div className="flex items-start gap-3">
            <span className="text-os-accent mt-0.5">🔔</span>
            <span className="font-mono text-[11px] text-os-text leading-[1.6]">{msg}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
