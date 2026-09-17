import { AuthService } from '../services/auth.js';
import { getIcon } from '../utils/icons.js';

export const LeadCard = {
  getTechIcon(tech) {
    switch (tech.toLowerCase()) {
      case 'website': return getIcon('globe', { size: 12 });
      case 'mobile app':
      case 'mobile': return getIcon('smartphone', { size: 12 });
      case 'ai/ml':
      case 'ai': return getIcon('cpu', { size: 12 });
      case 'ui/ux': return getIcon('palette', { size: 12 });
      case 'software': return getIcon('code', { size: 12 });
      default: return getIcon('zap', { size: 12 });
    }
  },

  formatTimeAgo(dateString) {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Today';
  },

  render(lead) {
    const initials = (lead.name || 'L').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'L';
    const requirements = Array.isArray(lead.requirements) ? lead.requirements : [];
    const timeAgo = this.formatTimeAgo(lead.addedDate);
    const isAdmin = AuthService.isAdmin();

    let priorityBadge = '';
    if (lead.priority === 'high') {
      priorityBadge = `<span class="badge badge-priority-high" style="display: inline-flex; align-items: center; gap: 4px;">${getIcon('flame', { size: 12, color: '#DC2626' })} High</span>`;
    } else if (lead.priority === 'medium') {
      priorityBadge = `<span class="badge badge-priority-medium">Medium</span>`;
    } else {
      priorityBadge = `<span class="badge badge-priority-low">Low</span>`;
    }

    return `
      <div class="lead-card" draggable="true" data-id="${lead.id}" data-status="${lead.status}">
        <div class="lead-card-header">
          <div class="lead-card-avatar">${initials}</div>
          <div class="lead-card-name" title="${lead.name}">${lead.name}</div>
        </div>

        <div class="lead-card-company" title="${lead.company || 'Direct Outreach'}">${lead.company || '—'}</div>
        <div class="lead-card-designation" title="${lead.designation || 'Prospect'}">${lead.designation || 'Prospect'}</div>

        <div class="lead-card-tags">
          ${requirements.slice(0, 2).map(req => `
            <span class="tag-chip">
              <span>${this.getTechIcon(req)}</span>
              <span>${req}</span>
            </span>
          `).join('')}
          ${priorityBadge}
        </div>

        <div class="lead-card-footer">
          <span>${timeAgo}</span>
          ${lead.potentialValue ? `<span style="font-weight: 600; color: #4F46E5;">₹${(lead.potentialValue / 1000).toFixed(0)}k</span>` : ''}
        </div>
      </div>
    `;
  }
};
