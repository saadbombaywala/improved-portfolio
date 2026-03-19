import { useState, useEffect } from 'react';
import { saadData } from '../../data/saad';

export default function AboutWindow() {
  const [typedText, setTypedText] = useState('');
  const fullText = saadData.identity.bio;

  useEffect(() => {
    let index = 0;
    setTypedText('');
    const timer = setInterval(() => {
      setTypedText(prev => prev + fullText[index]);
      index++;
      if (index >= fullText.length - 1) {
        clearInterval(timer);
      }
    }, 15); // Fast typewriter

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-full text-os-text font-mono">
      
      {/* Left Sidebar */}
      <div className="w-full md:w-[30%] bg-white/5 border-b md:border-b-0 md:border-r border-os-border p-6 flex flex-col items-center text-center">
        
        {/* Avatar Ring */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-os-accent/30 border-t-os-accent animate-spin" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-2 rounded-full border border-os-accent/10 border-b-os-accent animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
          <div className="w-16 h-16 rounded-full bg-os-window flex items-center justify-center border border-os-border shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <span className="font-display font-bold text-2xl text-os-accent text-glow">SB</span>
          </div>
        </div>

        <h2 className="font-bold text-white text-lg tracking-wide leading-tight mb-6">SAAD<br/>BOMBAYWALA</h2>
        
        <div className="w-full space-y-4 text-left text-xs text-os-muted">
          <div>
            <span className="text-os-accent block mb-1">AGE:</span> <span className="text-white">17</span>
          </div>
          <div>
            <span className="text-os-accent block mb-1">LOC:</span> <span className="text-white">VADODARA<br/>GUJARAT<br/>INDIA</span>
          </div>
          <div>
            <span className="text-os-accent block mb-1">STATUS:</span> 
            <div className="flex items-start gap-2 text-white">
              <span className="text-os-green animate-pulse mt-0.5">●</span> 
              <span>LEARNING<br/>& BUILDING</span>
            </div>
          </div>
          <div className="pt-4 border-t border-os-border">
            <span className="text-os-accent block mb-1">EDU:</span> <span className="text-white">Diploma IT<br/>Parul Univ.</span>
          </div>
          <div>
            <span className="text-os-accent block mb-1">10th:</span> <span className="text-white">GSEB<br/>Board, GJ</span>
          </div>
        </div>
      </div>

      {/* Right Terminal Text */}
      <div className="w-full md:w-[70%] p-6 bg-os-window overflow-auto custom-scrollbar">
        <div className="mb-8">
          <p className="text-os-accent font-bold mb-2">&gt; whoami</p>
          <div className="pl-4 text-sm text-white/80 leading-relaxed border-l-2 border-os-accent/30">
            <span className="font-bold text-white block text-base mb-1">SAAD BOMBAYWALA</span>
            <span>17-year-old builder. Vadodara, India.</span><br/>
            <span>IT Diploma student at Parul University.</span>
          </div>
        </div>

        <div>
          <p className="text-os-accent font-bold mb-4">&gt; cat bio.txt</p>
          <div className="pl-4 text-sm leading-8 text-os-text whitespace-pre-wrap">
            {typedText}
            {typedText.length >= fullText.length - 1 && <span className="inline-block w-2.5 h-4 ml-1 bg-os-accent animate-blink" />}
          </div>
        </div>
      </div>

    </div>
  );
}
