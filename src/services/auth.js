import { StorageService } from './storage.js';
import { ApiService } from './api.js';

export const AuthService = {
  getCurrentUser() {
    return StorageService.get(StorageService.KEYS.USER, null);
  },

  getToken() {
    return localStorage.getItem('techcrm_token');
  },

  isAdmin() {
    // In team CRM mode, all authenticated users have full access to manage their own records
    const user = this.getCurrentUser();
    return Boolean(user);
  },

  isSystemAdmin() {
    const user = this.getCurrentUser();
    return Boolean(user?.isAdmin || user?.accessRole === 'admin');
  },

  isViewer() {
    return false;
  },

  getRoleBadgeText() {
    const user = this.getCurrentUser();
    return user?.role || 'Team Member';
  },

  isAuthenticated() {
    const token = this.getToken();
    return Boolean(token);
  },

  async validateSession() {
    const token = this.getToken();
    if (!token) {
      this.clearSession();
      return null;
    }

    try {
      const res = await ApiService.get('/auth/me');
      if (res && res.user) {
        StorageService.set(StorageService.KEYS.USER, res.user);
        localStorage.setItem('techcrm_logged_in', 'true');
        return res.user;
      }
      this.clearSession();
      return null;
    } catch (err) {
      console.warn('Session validation failed:', err.message);
      this.clearSession();
      return null;
    }
  },

  async login(email, password) {
    const res = await ApiService.post('/auth/login', { email, password });
    if (res.token) {
      localStorage.setItem('techcrm_token', res.token);
    }
    if (res.user) {
      StorageService.set(StorageService.KEYS.USER, res.user);
    }
    localStorage.setItem('techcrm_logged_in', 'true');
    return { success: true, user: res.user };
  },

  async register(name, email, password, role) {
    const res = await ApiService.post('/auth/register', { name, email, password, role });
    if (res.token) {
      localStorage.setItem('techcrm_token', res.token);
    }
    if (res.user) {
      StorageService.set(StorageService.KEYS.USER, res.user);
    }
    localStorage.setItem('techcrm_logged_in', 'true');
    return { success: true, user: res.user };
  },

  clearSession() {
    StorageService.clearUserData();
  },

  logout() {
    this.clearSession();
    window.location.hash = '#/login';
    window.location.reload();
  }
};

