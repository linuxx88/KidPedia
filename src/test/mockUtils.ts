import { vi } from 'vitest';

/**
 * Mock global pour l'API SpeechSynthesis.
 * Élimine le besoin de casts "as unknown as" dans les tests.
 */
export const setupSpeechMock = () => {
  // On utilise une classe pour que "new SpeechSynthesisUtterance()" fonctionne
  const MockUtterance = vi.fn(function(this: Partial<SpeechSynthesisUtterance>, text?: string) {
    this.lang = '';
    this.rate = 1;
    this.voice = null;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
    this.pitch = 1;
    this.text = text || '';
    this.volume = 1;
  });

  vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance);
  
  vi.stubGlobal('speechSynthesis', {
    speak: vi.fn(),
    cancel: vi.fn(),
    getVoices: vi.fn().mockReturnValue([{ lang: 'fr-FR', name: 'Voix FR' }]),
    onvoiceschanged: null,
  });
};

/**
 * Mock global pour l'API HTMLAudioElement.
 */
export const setupAudioMock = () => {
  const MockAudio = vi.fn(function(this: Partial<HTMLAudioElement>) {
    this.play = vi.fn().mockResolvedValue(undefined);
    this.pause = vi.fn();
    this.onended = null;
    this.onerror = null;
    this.currentTime = 0;
    this.addEventListener = vi.fn();
    this.removeEventListener = vi.fn();
  });

  vi.stubGlobal('Audio', MockAudio);
};
