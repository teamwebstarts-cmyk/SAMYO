import { StorageService } from './storage.js';

export const FollowUpsService = {
  getAll() {
    return StorageService.get(StorageService.KEYS.FOLLOWUPS, []);
  },

  getByCategory(category = 'today') {
    const all = this.getAll();
    if (category === 'completed') {
      return all.filter(f => f.completed);
    }
    return all.filter(f => !f.completed && (category === 'all' || f.category === category));
  },

  create(data) {
    const all = this.getAll();
    const newFollowup = {
      id: 'f-' + Date.now(),
      leadId: data.leadId || '',
      leadName: data.leadName.trim(),
      company: data.company.trim(),
      task: data.task.trim(),
      dueDate: data.dueDate || new Date().toISOString(),
      dueLabel: data.dueLabel || 'Upcoming',
      category: data.category || 'upcoming',
      priority: data.priority || 'upcoming', // overdue, today, upcoming
      linkedinUrl: data.linkedinUrl || '#',
      completed: false
    };

    all.unshift(newFollowup);
    StorageService.set(StorageService.KEYS.FOLLOWUPS, all);
    return newFollowup;
  },

  complete(id) {
    const all = this.getAll();
    const item = all.find(f => f.id === id);
    if (item) {
      item.completed = true;
      StorageService.set(StorageService.KEYS.FOLLOWUPS, all);
    }
    return item;
  },

  snooze(id, days = 1) {
    const all = this.getAll();
    const item = all.find(f => f.id === id);
    if (item) {
      item.category = 'upcoming';
      item.priority = 'upcoming';
      item.dueLabel = `Snoozed (${days}d)`;
      StorageService.set(StorageService.KEYS.FOLLOWUPS, all);
    }
    return item;
  },

  delete(id) {
    const all = this.getAll().filter(f => f.id !== id);
    StorageService.set(StorageService.KEYS.FOLLOWUPS, all);
    return true;
  }
};
