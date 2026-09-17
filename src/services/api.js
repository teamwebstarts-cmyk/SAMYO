
/**
 * API Service for TechCRM
 * Communicates with the Node.js Express & MongoDB Atlas backend server
 */
const PROD_API_URL = 'https://samyo-crm-api.onrender.com/api';
const LOCAL_API_URL = 'http://localhost:5000/api';

const isLocalhost = Boolean(
  typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.')
  )
);

// If on Vite dev server (port 3000), use Vite's proxy '/api'.
// If running via Live Server (port 5500) or other local port, point directly to backend at port 5000.
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return LOCAL_API_URL;
  if (!isLocalhost) return PROD_API_URL;
  if (window.location.port === '3000') return '/api';
  return `http://${window.location.hostname}:5000/api`;
};

const API_BASE_URL = getApiBaseUrl();

async function handleResponse(response) {
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }
  if (!response.ok) {
    const message = (data && (data.message || data.error)) || `HTTP ${response.status}: Server not reachable or endpoint not found`;
    throw new Error(message);
  }
  return data;
}

export const ApiService = {
  baseUrl: API_BASE_URL,

  async checkHealth() {
    try {
      const res = await this.get('/health');
      return { ok: true, data: res };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },
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
      return await handleResponse(response);
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
      return await handleResponse(response);
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
      return await handleResponse(response);
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
      return await handleResponse(response);
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
      return await handleResponse(response);
    } catch (error) {
      console.warn(`ApiService.delete(${endpoint}) failed:`, error.message);
      throw error;
    }
  }
};
