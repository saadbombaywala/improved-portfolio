import AICore from './components/AICore';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillMatrix from './components/SkillMatrix';
import ProjectLab from './components/ProjectLab';
import Contact from './components/Contact';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#09090b] text-white font-['Inter'] selection:bg-neon-blue/30 overflow-x-hidden relative">
      <AICore />
      <Navbar />
      
      <main className="relative z-10 flex flex-col items-center">
        <Hero />
        <About />
        <SkillMatrix />
        <ProjectLab />
        <Contact />
      </main>
    </div>
  );
}

export default App;
