// Malayalam & English Speech Synthesis Utility for Special Education

class SpeechNarrator {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isSpeaking = false;
    this.listeners = new Set();
    this.currentUtterance = null;
    this.enabled = true;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(state) {
    this.isSpeaking = state;
    this.listeners.forEach(fn => fn(state));
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }

  speak(text, lang = 'ml-IN', onEnd) {
    if (!this.enabled || !text || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Try finding Malayalam voice, or fallback to Indian English or default
    const voices = this.voices.length ? this.voices : this.synth.getVoices();
    const mlVoice = voices.find(v => v.lang.includes('ml') || v.lang.includes('mal'));
    const inVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi-IN'));
    const defaultVoice = voices.find(v => v.default) || voices[0];

    if (lang.startsWith('ml') && mlVoice) {
      utterance.voice = mlVoice;
      utterance.lang = 'ml-IN';
    } else if (inVoice) {
      utterance.voice = inVoice;
      utterance.lang = lang;
    } else if (defaultVoice) {
      utterance.voice = defaultVoice;
    }

    // Friendly, calm pace for neurodivergent children
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      this.notify(false);
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis call failed:', err);
      this.notify(false);
      if (onEnd) onEnd();
    }
  }
}

export const narrator = new SpeechNarrator();
export default narrator;

