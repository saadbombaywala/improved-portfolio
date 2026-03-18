import { motion } from 'framer-motion';

export default function SkillMatrix() {
  const skills = [
    { name: 'Python', level: 'Learning', percent: 60 },
    { name: 'AI Basics', level: 'Learning', percent: 50 },
    { name: 'Electronics', level: 'Basic Knowledge', percent: 40 },
    { name: 'Problem Solving', level: 'Improving', percent: 70 },
    { name: 'Technology & Innovation Mindset', level: 'Active', percent: 100 }
  ];

  return (
    <section id="skills" className="w-full py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-4xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold font-['Orbitron'] mb-12 flex items-center"
        >
          <span className="text-neon-blue mr-4">02.</span> Skills & Learning
        </motion.h2>

        <div className="grid gap-6 bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
          {skills.map((skill, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-white text-lg">{skill.name}</span>
                <span className="text-neon-blue text-sm font-mono bg-neon-blue/10 px-3 py-1 rounded-full">{skill.level}</span>
              </div>
              <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
