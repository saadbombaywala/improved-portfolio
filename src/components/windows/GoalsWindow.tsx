import { useState } from 'react';
import { saadData } from '../../data/saad';

export default function GoalsWindow() {
  const [checkedShort, setCheckedShort] = useState<number[]>([]);
  const [checkedLong, setCheckedLong] = useState<number[]>([]);

  const toggleShort = (index: number) => {
    setCheckedShort(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const toggleLong = (index: number) => {
    setCheckedLong(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const totalGoals = saadData.goals.short.length + saadData.goals.long.length;
  const activeGoals = totalGoals - (checkedShort.length + checkedLong.length);

  return (
    <div className="w-full h-full bg-[#030a14] p-6 text-os-text font-mono text-sm overflow-auto custom-scrollbar">
      
      {/* Header */}
      <div className="text-os-accent border-y-2 border-double border-os-border py-2 mb-6 text-center">
        <div className="font-bold tracking-widest text-lg">GOALS.TXT — SAAD BOMBAYWALA</div>
        <div className="text-xs text-os-muted mt-1">Last edited: now. Updated regularly.</div>
      </div>

      {/* Short Term */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-8 bg-os-border" />
          <span className="text-os-accent font-bold font-display uppercase tracking-widest text-xs">SHORT_TERM.mission</span>
          <div className="h-[2px] flex-1 bg-os-border" />
        </div>

        <div className="space-y-3 pl-8">
          {saadData.goals.short.map((goal, i) => {
            const isChecked = checkedShort.includes(i);
            return (
              <div 
                key={i} 
                className={`flex gap-3 cursor-pointer group transition-all duration-300 ${isChecked ? 'opacity-40' : 'opacity-100 hover:translate-x-1'}`}
                onClick={() => toggleShort(i)}
              >
                <div className={`w-4 h-4 mt-0.5 border flex items-center justify-center transition-colors
                  ${isChecked ? 'bg-os-accent border-os-accent text-os-bg select-none' : 'border-os-muted bg-transparent group-hover:border-os-accent'}
                `}>
                  {isChecked && <span className="text-[10px] font-bold">✓</span>}
                </div>
                <div className={`flex-1 ${isChecked ? 'line-through text-os-muted' : 'text-white'}`}>
                  {goal}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Long Term */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-8 bg-os-border" />
          <span className="text-os-accent font-bold font-display uppercase tracking-widest text-xs">LONG_TERM.vision</span>
          <div className="h-[2px] flex-1 bg-os-border" />
        </div>

        <div className="space-y-3 pl-8">
          {saadData.goals.long.map((goal, i) => {
            const isChecked = checkedLong.includes(i);
            return (
              <div 
                key={i} 
                className={`flex gap-3 cursor-pointer group transition-all duration-300 ${isChecked ? 'opacity-40' : 'opacity-100 hover:translate-x-1'}`}
                onClick={() => toggleLong(i)}
              >
                <div className={`w-4 h-4 mt-0.5 border flex items-center justify-center transition-colors
                  ${isChecked ? 'bg-os-accent border-os-accent text-os-bg select-none' : 'border-os-muted bg-transparent group-hover:border-os-accent'}
                `}>
                  {isChecked && <span className="text-[10px] font-bold">✓</span>}
                </div>
                <div className={`flex-1 ${isChecked ? 'line-through text-os-muted' : 'text-white'}`}>
                  {goal}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Note */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-8 bg-os-border" />
          <span className="text-os-accent font-bold font-display uppercase tracking-widest text-xs">PERSONAL_NOTE</span>
          <div className="h-[2px] flex-1 bg-os-border" />
        </div>

        <div className="pl-8 text-os-muted italic leading-relaxed whitespace-pre-wrap border-l-2 border-os-border ml-10">
{`I'm not at the top yet — and that's ok.
I'm building the foundation right now.
Preparing for bigger things ahead.

This list is not the final version.
It will evolve as I do.

— Saad`}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-6 border-t border-os-border text-xs text-os-muted">
        PROGRESS: {activeGoals}/{totalGoals} goals active
      </div>

    </div>
  );
}
