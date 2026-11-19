// Persistent Local Storage Helper for Offline / Fallback and Seamless Development

const STORAGE_PREFIX = 'adhd_world_';

export const storageHelper = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
      console.error(`Error removing ${key} from storage:`, e);
    }
  },

  clearAll() {
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }
};

export default storageHelper;

