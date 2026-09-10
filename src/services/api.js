/**
 * API Service for TechCRM
 * Communicates with the Node.js Express & MongoDB Atlas backend server
 */
// Dynamic API URL: Automatically uses Render Cloud in production, localhost in development
const PROD_API_URL = 'https://samyo-crm-api.onrender.com/api';
const LOCAL_API_URL = 'http://localhost:5000/api';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.')
);

const API_BASE_URL = isLocalhost ? LOCAL_API_URL : PROD_API_URL;

export const ApiService = {
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    const token = localStorage.getItem('techcrm_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`ApiService.get(${endpoint}) failed:`, error.message);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result;
    } catch (error) {
      console.warn(`ApiService.post(${endpoint}) failed:`, error.message);
      throw error;
    }
  },

  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result;
    } catch (error) {
      console.warn(`ApiService.put(${endpoint}) failed:`, error.message);
      throw error;
    }
  },

  async patch(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result;
    } catch (error) {
      console.warn(`ApiService.patch(${endpoint}) failed:`, error.message);
      throw error;
    }
  },

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }
      return result;
    } catch (error) {
      console.warn(`ApiService.delete(${endpoint}) failed:`, error.message);
      throw error;
    }
  }
};
