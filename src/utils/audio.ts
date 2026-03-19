// Generates synthesized cyberpunk/terminal audio natively via Web Audio API without external file dependencies.

import { useSystemStore } from '../store/systemStore';

const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playClickSound = () => {
  if (!useSystemStore.getState().isSoundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  // Softer mechanical pop
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); 
  oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.04); 
  
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04); 
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.04);
};

export const playBootSound = () => {
  if (!useSystemStore.getState().isSoundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Deep hum
  oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.6); // Rising pitch
  
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime); 
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.2); // Fade in
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2); // Long fade out
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1.2);
};

export const playTypingSound = () => {
  if (!useSystemStore.getState().isSoundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'sawtooth';
  // Randomizing frequency slightly for realistic terminal clack
  const freq = 600 + Math.random() * 200;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); 
  
  gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); 
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03); 
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.03);
};
