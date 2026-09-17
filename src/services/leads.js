import { StorageService } from './storage.js';
import { ApiService } from './api.js';
import { AuthService } from './auth.js';

let leadsCache = [];
let isLoadedFromMongo = false;

export const LeadsService = {
  resetCache() {
    leadsCache = [];
    isLoadedFromMongo = false;
  },

  // Sync leads with MongoDB Atlas cloud database
  async fetchFromMongoDB() {
    try {
      const serverLeads = await ApiService.get('/leads');
      if (Array.isArray(serverLeads)) {
        leadsCache = serverLeads.map(l => ({
          ...l,
          id: l._id || l.id
        }));
        isLoadedFromMongo = true;
        StorageService.set(StorageService.KEYS.LEADS, leadsCache);
      }

      // Also sync activities from MongoDB
      try {
        const activities = await ApiService.get('/activities');
        if (Array.isArray(activities) && activities.length > 0) {
          StorageService.set(StorageService.KEYS.ACTIVITIES, activities);
        }
      } catch (actErr) {
        // quiet
      }

      return leadsCache;
    } catch (err) {
      console.warn('Could not sync with MongoDB server, using cached data:', err.message);
    }
    return this.getAll();
  },

  async syncWithServer() {
    return this.fetchFromMongoDB();
  },

  getAll() {
    if (leadsCache.length > 0 || isLoadedFromMongo) {
      return leadsCache;
    }
    const stored = StorageService.get(StorageService.KEYS.LEADS, []);
    leadsCache = stored.map(l => ({
      ...l,
      id: l._id || l.id
    }));
    return leadsCache;
  },

  getById(id) {
    const leads = this.getAll();
    return leads.find(l => l.id === id || l._id === id) || null;
  },

  async create(data) {
    const rawCompany = (data.company && typeof data.company === 'string') ? data.company.trim() : '';
    const company = rawCompany || 'Individual';

    const payload = {
      name: (data.name && typeof data.name === 'string') ? data.name.trim() : 'Unnamed Lead',
      company: company,
      designation: (data.designation && typeof data.designation === 'string') ? data.designation.trim() : '',
      linkedinUrl: (data.linkedinUrl && typeof data.linkedinUrl === 'string') ? data.linkedinUrl.trim() : '',
      companyWebsite: (data.companyWebsite && typeof data.companyWebsite === 'string') ? data.companyWebsite.trim() : '',
      industry: data.industry || '',
      location: (data.location && typeof data.location === 'string') ? data.location.trim() : '',
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      priority: data.priority || 'medium',
      status: data.status || 'new',
      potentialValue: Number(data.potentialValue) || 0,
      notes: data.notes ? [{
        text: data.notes,
        createdAt: new Date().toISOString(),
        author: AuthService.getCurrentUser()?.name || 'Me'
      }] : []
    };

    // 1. Persist directly to MongoDB Atlas
    let savedLead;
    try {
      savedLead = await ApiService.post('/leads', payload);
    } catch (err) {
      console.error('MongoDB cloud save failed:', err.message);
      throw new Error(`MongoDB save failed: ${err.message}`);
    }

    const normalized = {
      ...savedLead,
      id: savedLead._id || savedLead.id
    };

    // 2. Update in-memory cache and local mirror
    leadsCache.unshift(normalized);
    StorageService.set(StorageService.KEYS.LEADS, leadsCache);

    // 3. Record in global activities (both MongoDB and local)
    const companyLabel = normalized.company && normalized.company !== 'Individual' ? ` (${normalized.company})` : '';
    this.recordGlobalActivity(`${normalized.name}${companyLabel} added as New Lead`, 'new');

    return normalized;
  },

  async update(id, updates) {
    // 1. Persist directly to MongoDB Atlas
    let updatedDoc;
    try {
      updatedDoc = await ApiService.put(`/leads/${id}`, updates);
    } catch (err) {
      console.warn('MongoDB update warning:', err.message);
    }

    // 2. Update local state
    const index = leadsCache.findIndex(l => l.id === id || l._id === id);
    if (index !== -1) {
      leadsCache[index] = {
        ...leadsCache[index],
        ...(updatedDoc || updates),
        id: updatedDoc?._id || updatedDoc?.id || id
      };
      StorageService.set(StorageService.KEYS.LEADS, leadsCache);
      return leadsCache[index];
    }

    return updatedDoc || null;
  },

  async updateStatus(id, newStatus, extra = {}) {
    const lead = this.getById(id);
    if (!lead) return null;

    const oldStatus = lead.status;
    if (oldStatus === newStatus) return lead;

    const statusLabels = {
      new: 'New Leads',
      request_sent: 'Request Sent',
      connected: 'Connected',
      followup_scheduled: 'Follow-up Scheduled',
      qualified: 'Qualified',
      proposal: 'Proposal',
      won: 'Won',
      lost: 'Lost'
    };

    const newActivity = {
      id: 'act-' + Date.now(),
      title: `Moved from ${statusLabels[oldStatus] || oldStatus} to ${statusLabels[newStatus] || newStatus}`,
      time: 'Just now',
      date: new Date().toISOString()
    };

    // Optimistic local update
    lead.status = newStatus;
    lead.activities = [newActivity, ...(lead.activities || [])];
    if (extra.lostReason !== undefined) lead.lostReason = extra.lostReason;
    StorageService.set(StorageService.KEYS.LEADS, leadsCache);

    // Record in global activities
    this.recordGlobalActivity(
      `${lead.name} moved to ${statusLabels[newStatus] || newStatus}`,
      newStatus
    );

    // Persist status change to MongoDB
    try {
      const serverUpdated = await ApiService.patch(`/leads/${id}/status`, { status: newStatus, ...extra });
      if (serverUpdated) {
        const idx = leadsCache.findIndex(l => l.id === id || l._id === id);
        if (idx !== -1) {
          leadsCache[idx] = { ...serverUpdated, id: serverUpdated._id || serverUpdated.id };
          StorageService.set(StorageService.KEYS.LEADS, leadsCache);
        }
      }
    } catch (err) {
      console.warn('MongoDB status update warning:', err.message);
    }

    return lead;
  },

  async addNote(id, noteText) {
    const lead = this.getById(id);
    if (!lead || !noteText.trim()) return null;

    const authorName = AuthService.getCurrentUser()?.name || 'Me';

    try {
      const serverUpdated = await ApiService.post(`/leads/${id}/notes`, {
        text: noteText.trim(),
        author: authorName
      });
      if (serverUpdated) {
        const idx = leadsCache.findIndex(l => l.id === id || l._id === id);
        if (idx !== -1) {
          leadsCache[idx] = { ...serverUpdated, id: serverUpdated._id || serverUpdated.id };
          StorageService.set(StorageService.KEYS.LEADS, leadsCache);
          return leadsCache[idx];
        }
      }
    } catch (err) {
      console.warn('MongoDB note save error:', err.message);
      // Fallback local note
      const newNote = {
        id: 'note-' + Date.now(),
        text: noteText.trim(),
        createdAt: new Date().toISOString(),
        author: authorName
      };
      lead.notes = [newNote, ...(lead.notes || [])];
      StorageService.set(StorageService.KEYS.LEADS, leadsCache);
    }

    return lead;
  },

  addActivity(id, activityTitle) {
    const lead = this.getById(id);
    if (!lead || !activityTitle.trim()) return null;

    const newAct = {
      id: 'act-' + Date.now(),
      title: activityTitle.trim(),
      time: 'Just now',
      date: new Date().toISOString()
    };

    lead.activities = [newAct, ...(lead.activities || [])];
    StorageService.set(StorageService.KEYS.LEADS, leadsCache);
    return lead;
  },

  async delete(id) {
    // 1. Delete from MongoDB
    try {
      await ApiService.delete(`/leads/${id}`);
    } catch (err) {
      console.warn('MongoDB delete warning:', err.message);
    }

    // 2. Remove from local cache
    leadsCache = leadsCache.filter(l => l.id !== id && l._id !== id);
    StorageService.set(StorageService.KEYS.LEADS, leadsCache);
    return true;
  },

  recordGlobalActivity(text, type) {
    // Persist to MongoDB
    ApiService.post('/activities', { text, type, time: 'Just now' }).catch(() => { });

    // Update local activities mirror
    const activities = StorageService.get(StorageService.KEYS.ACTIVITIES, []);
    activities.unshift({
      id: 'g-act-' + Date.now(),
      text,
      time: 'Just now',
      type
    });
    StorageService.set(StorageService.KEYS.ACTIVITIES, activities.slice(0, 20));
  },

  getStats() {
    const leads = this.getAll();
    const countByStatus = {
      new: 0,
      request_sent: 0,
      connected: 0,
      qualified: 0,
      proposal: 0,
      won: 0,
      lost: 0
    };

    leads.forEach(l => {
      if (countByStatus[l.status] !== undefined) {
        countByStatus[l.status]++;
      }
    });

    const totalLeads = leads.length;
    const connections = countByStatus.connected || 0;
    const proposals = countByStatus.proposal || 0;
    const won = countByStatus.won || 0;

    return {
      totalLeads,
      connections,
      proposals,
      won,
      breakdown: {
        newLeads: countByStatus.new || 0,
        requests: countByStatus.request_sent || 0,
        connected: countByStatus.connected || 0,
        qualified: countByStatus.qualified || 0,
        proposal: countByStatus.proposal || 0,
        won: countByStatus.won || 0,
        lost: countByStatus.lost || 0
      },
      actualCounts: countByStatus
    };
  }
};
