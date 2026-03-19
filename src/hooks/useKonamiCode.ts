import { useState, useEffect } from 'react';

export default function useKonamiCode() {
  const [konamiActivated, setKonamiActivated] = useState(false);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore text case for b and a
      const key = e.key === 'B' ? 'b' : e.key === 'A' ? 'a' : e.key;
      
      if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setKonamiActivated(true);
          konamiIndex = 0; // Reset
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { konamiActivated, resetKonami: () => setKonamiActivated(false) };
}
