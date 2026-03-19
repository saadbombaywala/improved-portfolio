import { useState } from 'react';
import { saadData } from '../../data/saad';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsWindow() {
  const [activeProject, setActiveProject] = useState(saadData.projects[0]);

  return (
    <div className="flex w-full h-[500px] text-os-text font-mono">
      
      {/* File Tree Sidebar */}
      <div className="w-[35%] border-r border-os-border bg-os-bg p-4">
        <div className="text-xs text-os-muted mb-4 uppercase tracking-widest pl-2">📁 projects/</div>
        <div className="flex flex-col gap-1">
          {saadData.projects.map((proj, i) => (
            <div key={proj.id}>
              {/* Fake tree line connecting */}
              <div className="flex items-center text-xs">
                <span className="text-os-border font-mono mx-2">{i === saadData.projects.length - 1 ? '└──' : '├──'}</span>
                <button
                  onClick={() => setActiveProject(proj)}
                  className={`flex-1 text-left px-3 py-2 rounded-sm truncate transition-colors
                    ${activeProject.id === proj.id 
                      ? 'bg-os-accent/10 border border-os-accent text-white shadow-[inset_0_0_10px_rgba(0,229,255,0.1)]' 
                      : 'hover:bg-white/5 border border-transparent text-os-muted'
                    }
                  `}
                >
                  {proj.folder}/
                  {proj.status === 'IN PROGRESS' && <span className="ml-2 text-os-accent animate-pulse font-bold">←</span>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="w-[65%] relative bg-os-window p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Header Box */}
            <div className="border-2 border-os-border border-double p-5 mb-8 relative">
              <div className="absolute -top-3 left-4 bg-os-window px-2 text-os-accent text-xs font-bold font-mono">
                PROJECT METADATA
              </div>
              <h2 className="font-display text-2xl font-bold text-white tracking-wide mb-1 flex items-center gap-3">
                {activeProject.name}
              </h2>
              <p className="text-xs text-os-muted">{activeProject.fullName}</p>
            </div>

            {/* Properties */}
            <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm mb-8">
              <span className="text-os-muted">TYPE:</span>
              <span className="text-white">{activeProject.type}</span>
              
              <span className="text-os-muted">STATUS:</span>
              <span className="flex items-center gap-2 font-bold text-os-accent bg-os-accent/10 px-3 py-1 rounded w-max border border-os-accent/30">
                {activeProject.status === 'IN PROGRESS' && <span className="w-2 h-2 rounded-full bg-os-accent animate-pulse shadow-[0_0_8px_var(--os-accent)]" />}
                [ {activeProject.status} ]
              </span>
              
              <span className="text-os-muted">DATE:</span>
              <span className="text-white">{activeProject.id === '03' ? '2025 — ONGOING' : '2024'}</span>
            </div>

            {/* Body Info */}
            <div className="space-y-6 text-sm leading-relaxed text-os-text">
              <div>
                <span className="text-os-muted block mb-1 uppercase tracking-widest text-[10px]">Description</span>
                <p>{activeProject.description}</p>
              </div>

              <div>
                <span className="text-os-muted block mb-1 uppercase tracking-widest text-[10px]">Why I Built It</span>
                <p className="italic text-white/80 border-l-2 border-os-accent/50 pl-3">{activeProject.why}</p>
              </div>

              <div>
                <span className="text-os-muted block mb-2 uppercase tracking-widest text-[10px]">What I Learned</span>
                <ul className="space-y-1">
                  {activeProject.learnings.map((learned, i) => (
                    <li key={i} className="flex gap-2">
                       <span className="text-os-green">✓</span> {learned}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-os-muted block mb-2 uppercase tracking-widest text-[10px]">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-os-bg border border-os-border px-2 py-1 text-os-text">
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>
              
              {activeProject.status === 'IN PROGRESS' && (
                <div className="text-os-yellow border border-os-yellow/30 bg-os-yellow/10 p-3 mt-4 text-xs font-bold animate-pulse">
                  &gt; This project is live. Updates weekly.
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
