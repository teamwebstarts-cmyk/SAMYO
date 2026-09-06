import { StorageService } from './storage.js';

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

  login(email, password) {
    localStorage.setItem('techcrm_logged_in', 'true');
    return { success: true, user: this.getCurrentUser() };
  },

  logout() {
    localStorage.setItem('techcrm_logged_in', 'false');
    window.location.hash = '#/login';
  }
};
