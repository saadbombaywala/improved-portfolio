import { motion } from 'framer-motion';

export default function ProjectLab() {
  const projects = [
    {
      title: 'B.E.A.T – AI Assistant',
      desc: 'An AI assistant built for Indian users, featuring local language processing and offline capabilities.',
      tech: ['Python', 'NLP', 'React'],

    },
    {
      title: 'Smart Dustbin',
      desc: 'An IoT-based dustbin with an automated lid mechanism and integrated voice assistant for touchless waste management.',
      tech: ['Arduino', 'IoT', 'C++', 'Voice Recognition'],

    },
    {
      title: 'Python Jarvis Assistant',
      desc: 'A robust desktop voice assistant capable of automation, query handling, and system controls.',
      tech: ['Python', 'SpeechRecognition', 'APIs'],

    }
  ];

  return (
    <section id="projects" className="w-full py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold font-['Orbitron'] mb-12 flex items-center"
        >
          <span className="text-neon-blue mr-4">03.</span> Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/5 border border-white/10 hover:border-neon-blue/50 p-8 rounded-2xl flex flex-col h-full transition-all group backdrop-blur-sm shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">{proj.title}</h3>
              <p className="text-gray-400 mb-6 flex-1 leading-relaxed">{proj.desc}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {proj.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-neon-purple bg-neon-purple/10 px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <p>Will available soon</p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
