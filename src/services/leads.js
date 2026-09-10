import { StorageService } from './storage.js';
import { ApiService } from './api.js';

export const LeadsService = {
  // Sync leads with MongoDB Atlas cloud database
  async syncWithServer() {
    try {
      const serverLeads = await ApiService.get('/leads');
      if (Array.isArray(serverLeads) && serverLeads.length > 0) {
        StorageService.set(StorageService.KEYS.LEADS, serverLeads);
        return serverLeads;
      }
    } catch (err) {
      console.warn('Could not sync with MongoDB server, using local cache:', err.message);
    }
    return this.getAll();
  },

  getAll() {
    return StorageService.get(StorageService.KEYS.LEADS, []);
  },

  getById(id) {
    const leads = this.getAll();
    return leads.find(l => l.id === id || l._id === id) || null;
  },

  async create(data) {
    const leads = this.getAll();
    const rawCompany = (data.company && typeof data.company === 'string') ? data.company.trim() : '';
    const company = rawCompany || 'Individual';
    const tempId = 'lead-' + Date.now();

    const newLead = {
      id: tempId,
      name: (data.name && typeof data.name === 'string') ? data.name.trim() : 'Unnamed Lead',
      company: company,
      designation: (data.designation && typeof data.designation === 'string') ? data.designation.trim() : '',
      linkedinUrl: (data.linkedinUrl && typeof data.linkedinUrl === 'string') ? data.linkedinUrl.trim() : '',
      companyWebsite: (data.companyWebsite && typeof data.companyWebsite === 'string') ? data.companyWebsite.trim() : '',
      industry: data.industry || '',
      location: (data.location && typeof data.location === 'string') ? data.location.trim() : '',
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      priority: data.priority || 'medium',
      status: 'new',
      potentialValue: Number(data.potentialValue) || 0,
      addedDate: new Date().toISOString(),
      notes: data.notes ? [{
        id: 'n-' + Date.now(),
        text: data.notes,
        createdAt: new Date().toISOString(),
        author: 'Neha Jain'
      }] : [],
      activities: [{
        id: 'act-' + Date.now(),
        title: 'Lead Added to Pipeline',
        time: 'Just now',
        date: new Date().toISOString()
      }]
    };

    // 1. Persist directly to MongoDB Atlas cloud database
    try {
      const savedLead = await ApiService.post('/leads', newLead);
      if (savedLead && (savedLead.id || savedLead._id)) {
        newLead.id = savedLead.id || savedLead._id;
      }
    } catch (err) {
      console.error('MongoDB cloud save failed:', err.message);
      throw new Error(`Cloud save failed: ${err.message}`);
    }

    // 2. Save to local storage cache only after successful cloud save
    leads.unshift(newLead);
    StorageService.set(StorageService.KEYS.LEADS, leads);

    // 3. Record in global activities
    const companyLabel = newLead.company && newLead.company !== 'Individual' ? ` (${newLead.company})` : '';
    this.recordGlobalActivity(`${newLead.name}${companyLabel} added as New Lead`, 'new');

    return newLead;
  },

  update(id, updates) {
    const leads = this.getAll();
    const index = leads.findIndex(l => l.id === id || l._id === id);
    if (index === -1) return null;

    leads[index] = { ...leads[index], ...updates };
    StorageService.set(StorageService.KEYS.LEADS, leads);

    // Persist to MongoDB
    ApiService.put(`/leads/${id}`, updates).catch(err => {
      console.warn('MongoDB update warning:', err.message);
    });

    return leads[index];
  },

  updateStatus(id, newStatus, extra = {}) {
    const lead = this.getById(id);
    if (!lead) return null;

    const oldStatus = lead.status;
    if (oldStatus === newStatus) return lead;

    const statusLabels = {
      new: 'New Leads',
      request_sent: 'Request Sent',
      connected: 'Connected',
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

    const updates = {
      status: newStatus,
      activities: [newActivity, ...(lead.activities || [])],
      ...extra
    };

    const updated = this.update(id, updates);

    // Record in global activities
    this.recordGlobalActivity(
      `${lead.name} moved to ${statusLabels[newStatus] || newStatus}`,
      newStatus
    );

    // Persist status change to MongoDB
    ApiService.patch(`/leads/${id}/status`, { status: newStatus, ...extra }).catch(err => {
      console.warn('MongoDB status update warning:', err.message);
    });

    return updated;
  },

  addNote(id, noteText) {
    const lead = this.getById(id);
    if (!lead || !noteText.trim()) return null;

    const newNote = {
      id: 'note-' + Date.now(),
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
      author: 'Neha Jain'
    };

    const notes = [newNote, ...(lead.notes || [])];
    const updated = this.update(id, { notes });

    // Persist note to MongoDB
    ApiService.post(`/leads/${id}/notes`, { text: noteText.trim(), author: 'Neha Jain' }).catch(err => {
      console.warn('MongoDB note save warning:', err.message);
    });

    return updated;
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

    const activities = [newAct, ...(lead.activities || [])];
    return this.update(id, { activities });
  },

  delete(id) {
    const leads = this.getAll().filter(l => l.id !== id && l._id !== id);
    StorageService.set(StorageService.KEYS.LEADS, leads);

    // Persist deletion to MongoDB
    ApiService.delete(`/leads/${id}`).catch(err => {
      console.warn('MongoDB delete warning:', err.message);
    });

    return true;
  },

  recordGlobalActivity(text, type) {
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
