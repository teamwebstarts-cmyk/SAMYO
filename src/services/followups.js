import { StorageService } from './storage.js';
import { ApiService } from './api.js';

let followupsCache = [];
let isLoadedFromMongo = false;

export const FollowUpsService = {
  resetCache() {
    followupsCache = [];
    isLoadedFromMongo = false;
  },

  async fetchFromMongoDB() {
    try {
      const serverFollowups = await ApiService.get('/followups');
      if (Array.isArray(serverFollowups)) {
        followupsCache = serverFollowups.map(f => ({
          ...f,
          id: f._id || f.id
        }));
        isLoadedFromMongo = true;
        StorageService.set(StorageService.KEYS.FOLLOWUPS, followupsCache);
        return followupsCache;
      }
    } catch (err) {
      console.warn('Could not sync followups with MongoDB server, using cached:', err.message);
    }
    return this.getAll();
  },

  getAll() {
    if (followupsCache.length > 0 || isLoadedFromMongo) {
      return followupsCache;
    }
    const stored = StorageService.get(StorageService.KEYS.FOLLOWUPS, []);
    followupsCache = stored.map(f => ({
      ...f,
      id: f._id || f.id
    }));
    return followupsCache;
  },

  getByCategory(category = 'today') {
    const all = this.getAll();
    if (category === 'completed') {
      return all.filter(f => f.completed);
    }
    return all.filter(f => !f.completed && (category === 'all' || f.category === category));
  },

  async create(data) {
    const payload = {
      leadId: data.leadId || '',
      leadName: (data.leadName && typeof data.leadName === 'string') ? data.leadName.trim() : 'Lead',
      company: (data.company && typeof data.company === 'string') ? data.company.trim() : '',
      task: (data.task && typeof data.task === 'string') ? data.task.trim() : '',
      dueDate: data.dueDate || new Date().toISOString(),
      dueLabel: data.dueLabel || 'Upcoming',
      category: data.category || 'upcoming',
      priority: data.priority || 'upcoming',
      linkedinUrl: data.linkedinUrl || '#'
    };

    let saved;
    try {
      saved = await ApiService.post('/followups', payload);
    } catch (err) {
      console.warn('MongoDB followup create error, saving locally:', err.message);
      saved = {
        ...payload,
        id: 'f-' + Date.now(),
        completed: false
      };
    }

    const normalized = {
      ...saved,
      id: saved._id || saved.id
    };

    followupsCache.unshift(normalized);
    StorageService.set(StorageService.KEYS.FOLLOWUPS, followupsCache);
    return normalized;
  },

  async complete(id) {
    const item = followupsCache.find(f => f.id === id || f._id === id);
    if (item) {
      item.completed = true;
      StorageService.set(StorageService.KEYS.FOLLOWUPS, followupsCache);
    }

    try {
      await ApiService.patch(`/followups/${id}/complete`);
    } catch (err) {
      console.warn('MongoDB followup complete error:', err.message);
    }

    return item;
  },

  async snooze(id, days = 1) {
    const item = followupsCache.find(f => f.id === id || f._id === id);
    if (item) {
      item.category = 'upcoming';
      item.priority = 'upcoming';
      item.dueLabel = `Snoozed (${days}d)`;
      StorageService.set(StorageService.KEYS.FOLLOWUPS, followupsCache);
    }

    try {
      await ApiService.patch(`/followups/${id}/snooze`, { days });
    } catch (err) {
      console.warn('MongoDB followup snooze error:', err.message);
    }

    return item;
  },

  async delete(id) {
    followupsCache = followupsCache.filter(f => f.id !== id && f._id !== id);
    StorageService.set(StorageService.KEYS.FOLLOWUPS, followupsCache);

    try {
      await ApiService.delete(`/followups/${id}`);
    } catch (err) {
      console.warn('MongoDB followup delete error:', err.message);
    }

    return true;
  }
};
