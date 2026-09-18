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

  formatDateTime(dateString) {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently';
    const datePart = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const timePart = date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${datePart}, ${timePart}`;
  },

  render(lead) {
    const initials = (lead.name || 'L').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'L';
    const requirements = Array.isArray(lead.requirements) ? lead.requirements : [];
    
    // Auth & Permission Checks (Creator + Assignee edit, others view-only)
    const currentUser = AuthService.getCurrentUser();
    const currentUserId = currentUser ? String(currentUser.id || currentUser._id) : null;
    const isAdmin = AuthService.isAdmin();

    const rawOwner = lead.ownerId;
    const ownerId = rawOwner ? String(rawOwner._id || rawOwner.id || rawOwner) : null;
    const rawCreator = lead.creatorId;
    const creatorId = rawCreator ? String(rawCreator._id || rawCreator.id || rawCreator) : ownerId;

    const canEdit = isAdmin || (currentUserId && (currentUserId === ownerId || currentUserId === creatorId));

    // Formatted Date and Time tracking
    const dateValue = lead.addedDate || lead.createdAt;
    const formattedDateTime = this.formatDateTime(dateValue);
    const ownerName = rawOwner?.name || (currentUserId && ownerId === currentUserId ? 'You' : 'Assigned');
    const creatorName = rawCreator?.name || (currentUserId && creatorId === currentUserId ? 'You' : '');

    let priorityBadge = '';
    if (lead.priority === 'high') {
      priorityBadge = `<span class="badge badge-priority-high" style="display: inline-flex; align-items: center; gap: 4px;">${getIcon('flame', { size: 12, color: '#DC2626' })} High</span>`;
    } else if (lead.priority === 'medium') {
      priorityBadge = `<span class="badge badge-priority-medium">Medium</span>`;
    } else {
      priorityBadge = `<span class="badge badge-priority-low">Low</span>`;
    }

    return `
      <div 
        class="lead-card ${!canEdit ? 'lead-card-readonly' : ''}" 
        draggable="${canEdit ? 'true' : 'false'}" 
        data-id="${lead.id || lead._id}" 
        data-status="${lead.status}"
        title="${!canEdit ? 'View Only (Only creator & assignee can edit/move)' : 'Drag to move stage, click to open'}"
        style="${!canEdit ? 'border-left: 3px solid #CBD5E1; opacity: 0.95;' : ''}"
      >
        <div class="lead-card-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
            <div class="lead-card-avatar">${initials}</div>
            <div class="lead-card-name" title="${lead.name}">${lead.name}</div>
          </div>
          ${!canEdit ? `
            <span class="badge" style="font-size: 10px; padding: 2px 6px; background: #F1F5F9; color: #64748B; border: 1px solid #E2E8F0; display: inline-flex; align-items: center; gap: 3px;" title="View only mode">
              🔒 View
            </span>
          ` : ''}
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

        <!-- Date, Time and Owner Tracking -->
        <div class="lead-card-meta-track" style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #E2E8F0; display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
          <span title="Added: ${formattedDateTime}${creatorName ? ` by ${creatorName}` : ''}" style="display: inline-flex; align-items: center; gap: 3px;">
            🕒 ${formattedDateTime}
          </span>
          <span style="font-weight: 500; color: #475569; display: inline-flex; align-items: center; gap: 3px;" title="Assigned to ${ownerName}">
            👤 ${ownerName}
          </span>
        </div>

        <div class="lead-card-footer" style="margin-top: 6px;">
          ${creatorName ? `<span style="font-size: 10.5px; color: #94A3B8;">By ${creatorName}</span>` : '<span></span>'}
          ${lead.potentialValue ? `<span style="font-weight: 600; color: #4F46E5;">₹${(lead.potentialValue / 1000).toFixed(0)}k</span>` : ''}
        </div>
      </div>
    `;
  }
};
