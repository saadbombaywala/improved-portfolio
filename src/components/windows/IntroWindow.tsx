import { useWindowStore } from '../../store/windowStore';

export default function IntroWindow() {
  const closeWindow = useWindowStore(state => state.closeWindow);

  return (
    <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-os-text h-full flex flex-col items-center justify-center bg-gradient-to-b from-os-window to-black relative overflow-hidden">

      {/* Background Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg border border-os-border bg-os-bg/80 p-6 shadow-[0_0_30px_rgba(0,229,255,0.05)] backdrop-blur-sm">

        <h1 className="text-xl font-display font-bold text-os-red mb-4 blink-text border-b border-os-red/30 pb-2">
          [ SYSTEM WARNING ]
        </h1>

        <div className="space-y-4 text-os-muted">
          <p>
            <span className="text-os-accent font-bold">UNAUTHORIZED ACCESS DETECTED.</span><br />
            You have booted into <span className="text-white">B.E.A.T OS v1.0.0</span> (Bharat's Enhanced AI Technology).
          </p>

          <p>
            This is not a real operating system. It is an interactive, fully functional web simulator designed by <strong>Saad Bombaywala</strong> to showcase his technical skills, mindset, and projects.
          </p>

          <p>
            <span className="text-os-yellow">Instructions:</span><br />
            • Click the desktop icons two times to launch applications.<br />
            • Drag windows by their title bars.<br />
            • The taskbar at the bottom tracks active layers.<br />
            • There are hidden Easter Eggs.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => closeWindow('intro')}
            className="px-6 py-2 bg-os-accent/10 border border-os-accent text-os-accent hover:bg-os-accent hover:text-black transition-all duration-300 font-bold tracking-widest text-xs"
          >
            ACKNOWLEDGE
          </button>
        </div>

      </div>
    </div>
  );
}
