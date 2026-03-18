import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl text-center flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold font-['Orbitron'] tracking-tight mb-6"
        >
          Saad Bombaywala <span className="text-gray-500 font-sans block md:inline text-3xl md:text-6xl mt-2 md:mt-0 font-light">&ndash; Portfolio</span>
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-neon-blue font-medium mb-8 flex items-center gap-3"
        >
          <span className="w-12 h-[2px] bg-neon-blue hidden md:block"></span>
          Student | Aspiring AI & Tech Developer
          <span className="w-12 h-[2px] bg-neon-blue hidden md:block"></span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          I am a 17-year-old student passionate about learning technology, building projects, and growing in the field of AI and development.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href="#projects" 
            className="px-8 py-4 bg-white/5 border border-white/20 hover:border-neon-blue hover:text-neon-blue rounded-full transition-all duration-300 tracking-wide font-medium backdrop-blur-sm"
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
