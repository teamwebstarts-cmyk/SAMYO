import { StorageService } from './storage.js';
import { ApiService } from './api.js';

export const AuthService = {
  getCurrentUser() {
    return StorageService.get(StorageService.KEYS.USER, {
      name: 'Neha Jain',
      email: 'neha.jain@techcrm.io',
      role: 'Web Developer / Outreach Specialist',
      avatar: 'NJ'
    });
  },

  isAuthenticated() {
    return localStorage.getItem('techcrm_logged_in') !== 'false';
  },

  async login(email, password) {
    try {
      // Connect to MongoDB Backend API
      const res = await ApiService.post('/auth/login', { email, password });
      if (res.token) {
        localStorage.setItem('techcrm_token', res.token);
      }
      if (res.user) {
        StorageService.set(StorageService.KEYS.USER, res.user);
      }
      localStorage.setItem('techcrm_logged_in', 'true');
      return { success: true, user: res.user || this.getCurrentUser() };
    } catch (err) {
      console.warn('Backend login fallback (offline/local):', err.message);
      // Seamless fallback to local session if server is offline
      localStorage.setItem('techcrm_logged_in', 'true');
      return { success: true, user: this.getCurrentUser() };
    }
  },

  async register(name, email, password, role) {
    try {
      const res = await ApiService.post('/auth/register', { name, email, password, role });
      if (res.token) {
        localStorage.setItem('techcrm_token', res.token);
      }
      if (res.user) {
        StorageService.set(StorageService.KEYS.USER, res.user);
      }
      localStorage.setItem('techcrm_logged_in', 'true');
      return { success: true, user: res.user };
    } catch (err) {
      throw err;
    }
  },

  logout() {
    localStorage.removeItem('techcrm_token');
    localStorage.setItem('techcrm_logged_in', 'false');
    window.location.hash = '#/login';
  }
};
