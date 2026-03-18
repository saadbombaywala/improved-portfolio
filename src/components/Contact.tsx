import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export default function Contact() {
  const email = "saadbombaywala492@gmail.com";
  const phone = "+919825883015";

  return (
    <section id="contact" className="w-full py-24 px-6 md:px-12 flex justify-center mb-20">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold font-['Orbitron'] mb-12 flex items-center"
        >
          <span className="text-neon-blue mr-4">04.</span> Contact
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm text-center flex flex-col items-center shadow-xl"
        >
          <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center mb-6 text-neon-blue">
            <Mail size={32} />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
          <p className="text-gray-400 mb-8 max-w-lg">
            I'm currently available for opportunities, project collaborations, and networking. Feel free to reach out.
          </p>

          <div className="flex flex-col md:flex-row gap-6 mb-12 w-full max-w-lg justify-center">
            <a
              href={`mailto:${email}`}
              onClick={playClickSound}
              className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-3 text-white font-medium group"
            >
              <Mail className="text-neon-blue group-hover:scale-110 transition-transform" size={20} />
              Email Me
            </a>

            <a
              href={`tel:${phone}`}
              onClick={playClickSound}
              className="flex-1 py-4 px-6 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-3 text-white font-medium group"
            >
              <Phone className="text-green-400 group-hover:scale-110 transition-transform" size={20} />
              Call Me
            </a>
          </div>

          <div className="flex flex-col gap-2 text-gray-300 font-mono text-sm bg-black/40 p-6 rounded-xl border border-white/5 w-full max-w-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Email:</span>
              <span className="text-neon-blue">{email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Phone:</span>
              <span className="text-green-400">{phone}</span>
            </div>
          </div>

          <p className="mt-12 text-sm text-gray-500 tracking-widest uppercase">
            Available for opportunities and collaborations.<br />
            Serious inquiries only.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
