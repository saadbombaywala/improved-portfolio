import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { toggleSound, playClickSound } from '../utils/sound';

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newMutedState = toggleSound();
    setIsMuted(newMutedState);
    if (!newMutedState) playClickSound();
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-xl font-bold font-['Orbitron'] tracking-wider text-white hover:text-neon-blue transition-colors">
          SAAD.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a 
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={handleToggleSound}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={handleToggleSound} className="text-gray-400 hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button onClick={() => { playClickSound(); setMobileMenuOpen(!mobileMenuOpen); }} className="text-gray-300">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 py-4 px-6 flex flex-col space-y-4 shadow-xl backdrop-blur-lg">
          {navLinks.map(link => (
            <a 
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-base font-medium text-gray-300 hover:text-white py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
