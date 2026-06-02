// Helper to create white noise
const createNoiseBuffer = (ctx: AudioContext): AudioBuffer => {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

// Click Feedback Sound
export const playClickSynth = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(500, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
};

export interface AmbientSynth {
  ambientGain: GainNode;
  ambientPanner: StereoPannerNode | null;
  waveSource: AudioBufferSourceNode;
  windSource: AudioBufferSourceNode;
  waveLfo: OscillatorNode;
  windLfo: OscillatorNode;
}

// Setup Ambient Loop (Waves & Wind)
export const setupAmbientSynth = (ctx: AudioContext, shouldMuteAmbient: boolean): AmbientSynth => {
  const ambientGain = ctx.createGain();
  ambientGain.gain.setValueAtTime(shouldMuteAmbient ? 0 : 0.35, ctx.currentTime);

  const ambientPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

  // Wave noise setup
  const waveSource = ctx.createBufferSource();
  waveSource.buffer = createNoiseBuffer(ctx);
  waveSource.loop = true;

  const waveFilter = ctx.createBiquadFilter();
  waveFilter.type = 'lowpass';
  waveFilter.frequency.setValueAtTime(250, ctx.currentTime);
  waveFilter.Q.setValueAtTime(1.0, ctx.currentTime);

  const waveLfo = ctx.createOscillator();
  waveLfo.type = 'sine';
  waveLfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Slow swell (12s)

  const waveLfoGain = ctx.createGain();
  waveLfoGain.gain.setValueAtTime(100, ctx.currentTime);

  waveLfo.connect(waveLfoGain);
  waveLfoGain.connect(waveFilter.frequency);

  const waveVolumeGain = ctx.createGain();
  waveVolumeGain.gain.setValueAtTime(0.012, ctx.currentTime);

  const waveLfoVolGain = ctx.createGain();
  waveLfoVolGain.gain.setValueAtTime(0.008, ctx.currentTime);
  waveLfo.connect(waveLfoVolGain);
  waveLfoVolGain.connect(waveVolumeGain.gain);

  waveSource.connect(waveFilter);
  waveFilter.connect(waveVolumeGain);

  // Wind noise setup
  const windSource = ctx.createBufferSource();
  windSource.buffer = createNoiseBuffer(ctx);
  windSource.loop = true;

  const windFilter = ctx.createBiquadFilter();
  windFilter.type = 'bandpass';
  windFilter.frequency.setValueAtTime(550, ctx.currentTime);
  windFilter.Q.setValueAtTime(2.5, ctx.currentTime);

  const windLfo = ctx.createOscillator();
  windLfo.type = 'sine';
  windLfo.frequency.setValueAtTime(0.05, ctx.currentTime); // Slow wind whistle (20s)

  const windLfoGain = ctx.createGain();
  windLfoGain.gain.setValueAtTime(150, ctx.currentTime);

  windLfo.connect(windLfoGain);
  windLfoGain.connect(windFilter.frequency);

  const windVolumeGain = ctx.createGain();
  windVolumeGain.gain.setValueAtTime(0.004, ctx.currentTime);

  windSource.connect(windFilter);
  windFilter.connect(windVolumeGain);

  // Connect Ambient
  if (ambientPanner) {
    waveVolumeGain.connect(ambientPanner);
    windVolumeGain.connect(ambientPanner);
    ambientPanner.connect(ambientGain);
  } else {
    waveVolumeGain.connect(ambientGain);
    windVolumeGain.connect(ambientGain);
  }
  ambientGain.connect(ctx.destination);

  waveSource.start();
  windSource.start();
  waveLfo.start();
  windLfo.start();

  return {
    ambientGain,
    ambientPanner,
    waveSource,
    windSource,
    waveLfo,
    windLfo,
  };
};

// Continuous rumbling loop for Volcano
export const setupVolcanoSynth = (ctx: AudioContext, islandGain: AudioNode): AudioScheduledSourceNode[] => {
  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = createNoiseBuffer(ctx);
  rumbleSource.loop = true;
  
  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.setValueAtTime(50, ctx.currentTime);
  
  const lowOsc = ctx.createOscillator();
  lowOsc.type = 'sine';
  lowOsc.frequency.setValueAtTime(40, ctx.currentTime);
  
  const lowOscGain = ctx.createGain();
  lowOscGain.gain.setValueAtTime(0.06, ctx.currentTime);
  
  const crackleLfo = ctx.createOscillator();
  crackleLfo.frequency.setValueAtTime(10, ctx.currentTime); // 10Hz wobble
  
  const crackleLfoGain = ctx.createGain();
  crackleLfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
  
  crackleLfo.connect(crackleLfoGain);
  
  const rumbleVolumeNode = ctx.createGain();
  rumbleVolumeNode.gain.setValueAtTime(0.25, ctx.currentTime);
  crackleLfoGain.connect(rumbleVolumeNode.gain);
  
  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleVolumeNode);
  
  lowOsc.connect(lowOscGain);
  
  rumbleVolumeNode.connect(islandGain);
  lowOscGain.connect(islandGain);
  
  rumbleSource.start();
  lowOsc.start();
  crackleLfo.start();

  return [rumbleSource, lowOsc, crackleLfo];
};

// Chimes/cosmic and seagulls sounds
export const triggerIslandSynthCycle = (
  ctx: AudioContext,
  islandGain: AudioNode,
  type: 'space' | 'seagull'
) => {
  if (type === 'space') {
    const now = ctx.currentTime;
    const notes = [1046.50, 1318.51, 1567.98, 1975.53, 2093.00, 2637.02];
    const freq = notes[Math.floor(Math.random() * notes.length)];
    
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    osc.connect(noteGain);
    noteGain.connect(islandGain);
    
    osc.start(now);
    osc.stop(now + 1.2);

  } else if (type === 'seagull') {
    const now = ctx.currentTime;
    const count = 1 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < count; i++) {
      const delay = i * 0.3 + Math.random() * 0.05;
      const tStart = now + delay;
      
      const osc = ctx.createOscillator();
      const birdGain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, tStart);
      osc.frequency.exponentialRampToValueAtTime(1150, tStart + 0.05);
      osc.frequency.exponentialRampToValueAtTime(600, tStart + 0.2);
      
      birdGain.gain.setValueAtTime(0, tStart);
      birdGain.gain.linearRampToValueAtTime(0.06, tStart + 0.03);
      birdGain.gain.exponentialRampToValueAtTime(0.001, tStart + 0.2);
      
      osc.connect(birdGain);
      birdGain.connect(islandGain);
      
      osc.start(tStart);
      osc.stop(tStart + 0.2);
    }
  }
};
