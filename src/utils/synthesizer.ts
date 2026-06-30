let audioCtx: AudioContext | null = null;
let oscillators: OscillatorNode[] = [];
let gainNode: GainNode | null = null;
let filter: BiquadFilterNode | null = null;

export function startAmbientSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Lowpass filter makes the wave shapes extremely warm, analog, and "dark" (fits Luxury matte black theme)
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, audioCtx.currentTime);
    filter.Q.setValueAtTime(1, audioCtx.currentTime);

    // Main volume gain control with elegant fade-in to prevent loud pops
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    
    // Connect filter chain
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Smoothly fade-in chord volume over 2 seconds
    gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2.5);

    // Warm, ambient minor 11th chord frequencies (G2, D3, G3, Bb3, C4, F4)
    const chords = [98.00, 146.83, 196.00, 233.08, 261.63, 349.23];

    chords.forEach((freq, idx) => {
      if (!audioCtx || !filter) return;

      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      // Triangle oscillators offer beautiful flutey tones perfect for ambient pads
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Introduce micro-tuning offsets (detuning) to generate lush organic chorusing
      const detuneVariance = (idx % 2 === 0 ? 5 : -5) + (Math.random() - 0.5) * 4;
      osc.detune.setValueAtTime(detuneVariance, audioCtx.currentTime);

      // Low volume for individual oscillators
      oscGain.gain.setValueAtTime(0.12, audioCtx.currentTime);

      // Connect node chain
      osc.connect(oscGain);
      oscGain.connect(filter);
      
      osc.start(0);
      oscillators.push(osc);
    });
  } catch (error) {
    console.warn("Web Audio API was blocked or not supported on this container environment", error);
  }
}

export function stopAmbientSound() {
  if (gainNode && audioCtx) {
    try {
      // Elegant fade-out before cutting oscillators to sound incredibly clean and responsive
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.2);
      
      const oscsToStop = [...oscillators];
      oscillators = [];

      setTimeout(() => {
        oscsToStop.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        
        if (audioCtx && audioCtx.state !== 'closed') {
          audioCtx.close().then(() => {
            audioCtx = null;
          });
        }
      }, 1300);
    } catch (e) {
      console.warn("Failed to stop ambient synth sound smoothly", e);
    }
  }
}
