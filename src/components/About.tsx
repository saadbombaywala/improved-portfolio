import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="w-full py-24 px-6 md:px-12 flex justify-center">
      <div className="max-w-4xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold font-['Orbitron'] mb-12 flex items-center"
        >
          <span className="text-neon-blue mr-4">01.</span> About Me
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl"
        >
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              <strong className="text-white text-xl">Hi, I'm Saad,</strong> a 17-year-old student from Vadodara, India.
            </p>
            <p>
              I am currently pursuing a diploma in Computer Engineering and actively learning Python, AI, and technology.
            </p>
            <p>
              I enjoy building projects, experimenting with ideas, and improving my skills every day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
