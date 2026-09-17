import { LeadsService } from '../services/leads.js';
import { AuthService } from '../services/auth.js';
import { Toast } from './Toast.js';
import { getIcon } from '../utils/icons.js';

export const LeadDrawer = {
  currentLeadId: null,

  render() {
    return `
      <div id="drawer-backdrop" class="drawer-backdrop"></div>
      <aside id="lead-drawer" class="drawer" aria-label="Lead Details">
        <div class="drawer-header">
          <span class="drawer-title">Lead Details</span>
          <button id="drawer-close-btn" class="btn btn-ghost btn-icon" aria-label="Close drawer">
            ${getIcon('close', { size: 20 })}
          </button>
        </div>

        <div id="drawer-content" class="drawer-body">
          <!-- Populated dynamically via open(leadId) -->
        </div>
      </aside>
    `;
  },

  open(leadId) {
    const lead = LeadsService.getById(leadId);
    if (!lead) return;

    const isAdmin = AuthService.isAdmin();

    this.currentLeadId = leadId;
    const drawer = document.getElementById('lead-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const content = document.getElementById('drawer-content');

    if (!drawer || !backdrop || !content) return;

    const initials = (lead.name || 'L').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'L';
    const requirements = Array.isArray(lead.requirements) ? lead.requirements : [];

    content.innerHTML = `
      <div class="drawer-profile-banner">
        <div class="drawer-avatar">${initials}</div>
        <div class="drawer-profile-text">
          <h2>${lead.name}</h2>
          <p>${lead.designation || 'Prospect'}${lead.company ? ` @ ${lead.company}` : ''}</p>
        </div>
      </div>

      ${lead.linkedinUrl ? `
      <div style="margin-bottom: 20px;">
        <a href="${lead.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;">
          ${getIcon('linkedin', { size: 16 })}
          Open LinkedIn Profile
        </a>
      </div>
      ` : ''}

      <div class="drawer-field-grid">
        <div class="drawer-field">
          <span class="drawer-field-label">Status ${!isAdmin ? '(Locked)' : ''}</span>
          <select id="drawer-status-select" class="select" style="font-weight: 500; ${!isAdmin ? 'background: #F1F5F9; cursor: not-allowed; color: #64748B;' : ''}" ${!isAdmin ? 'disabled title="Read-only for viewers"' : ''}>
            <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New Leads</option>
            <option value="request_sent" ${lead.status === 'request_sent' ? 'selected' : ''}>Request Sent</option>
            <option value="connected" ${lead.status === 'connected' ? 'selected' : ''}>Connected</option>
            <option value="followup_scheduled" ${lead.status === 'followup_scheduled' ? 'selected' : ''}>Follow-up Scheduled</option>
            <option value="qualified" ${lead.status === 'qualified' ? 'selected' : ''}>Qualified</option>
            <option value="proposal" ${lead.status === 'proposal' ? 'selected' : ''}>Proposal Sent</option>
            <option value="won" ${lead.status === 'won' ? 'selected' : ''}>Won (Closed)</option>
            <option value="lost" ${lead.status === 'lost' ? 'selected' : ''}>Lost</option>
          </select>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Company</span>
          <div class="drawer-field-value">${lead.company || '<span style="color: var(--text-muted); font-style: italic;">Not specified</span>'} ${lead.companyWebsite ? `<a href="${lead.companyWebsite}" target="_blank" style="font-size: 12px; color: var(--primary); margin-left: 6px;">(${lead.companyWebsite.replace(/^https?:\/\//, '')})</a>` : ''}</div>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Tech Requirement</span>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
            ${requirements.length > 0
        ? requirements.map(req => `<span class="tag-chip" style="font-size: 12px; padding: 4px 8px;">${req}</span>`).join('')
        : '<span style="color: var(--text-muted); font-size: 13px; font-style: italic;">None specified</span>'}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="drawer-field">
            <span class="drawer-field-label">Priority</span>
            <div class="drawer-field-value" style="text-transform: capitalize;">
              ${lead.priority === 'high' ? '🔥 High' : lead.priority === 'medium' ? '⚡ Medium' : '🌱 Low'}
            </div>
          </div>
          <div class="drawer-field">
            <span class="drawer-field-label">Potential Value</span>
            <div class="drawer-field-value" style="color: #4F46E5; font-weight: 600;">
              ${lead.potentialValue ? `₹${Number(lead.potentialValue).toLocaleString('en-IN')}` : '<span style="color: var(--text-muted); font-size: 13px; font-weight: normal;">Not specified</span>'}
            </div>
          </div>
        </div>
      </div>

      <div class="drawer-divider"></div>

      <!-- Activity Timeline -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary);">
            Activity Timeline
          </span>
          ${isAdmin ? `
            <button id="btn-add-activity-trigger" class="btn btn-ghost btn-sm" style="font-size: 11px;">+ Add Activity</button>
          ` : `
            <span class="badge" style="background: #F1F5F9; color: #64748B; font-size: 10.5px;">Read-Only</span>
          `}
        </div>

        <!-- Inline Add Activity Form -->
        ${isAdmin ? `
        <div id="add-activity-box" style="display: none; margin-bottom: 12px; background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
          <input type="text" id="custom-activity-input" class="input" placeholder="e.g. Discussed proposal on call" style="margin-bottom: 8px;" />
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="btn-cancel-activity" class="btn btn-ghost btn-sm">Cancel</button>
            <button id="btn-save-activity" class="btn btn-primary btn-sm">Log Activity</button>
          </div>
        </div>
        ` : ''}

        <div class="timeline">
          ${(lead.activities || []).map(act => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-title">${act.title}</div>
              <div class="timeline-time">${act.time || 'Recently'}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="drawer-divider"></div>

      <!-- Notes Section -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary);">
            Notes
          </span>
        </div>

        <div class="notes-list" id="drawer-notes-list">
          ${(!lead.notes || lead.notes.length === 0) ? `
            <div style="font-size: 12px; color: var(--text-muted); font-style: italic; padding: 8px 0;">No notes added yet.</div>
          ` : lead.notes.map(note => `
            <div class="note-item">
              <div>${note.text}</div>
              <div class="note-meta">${note.author || 'Neha'} • ${new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
          `).join('')}
        </div>

        <!-- Add Note Box -->
        ${isAdmin ? `
        <div style="margin-top: 10px;">
          <textarea id="drawer-new-note" class="textarea" placeholder="Add a note or call update..." style="min-height: 60px;"></textarea>
          <button id="btn-drawer-add-note" class="btn btn-secondary btn-sm" style="margin-top: 8px; width: 100%;">+ Add Note</button>
        </div>
        ` : `
        <div style="font-size: 12px; color: var(--text-muted); font-style: italic; margin-top: 10px; padding: 8px; background: #F8FAFC; border-radius: 6px; text-align: center;">
          🔒 Adding notes is restricted to Administrator
        </div>
        `}
      </div>

      <div class="drawer-divider"></div>

      <!-- Bottom Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
        ${isAdmin ? `
        <button id="btn-drawer-delete-lead" class="btn btn-ghost btn-sm" style="color: var(--danger);">
          ${getIcon('trash', { size: 14 })}
          Delete Lead
        </button>
        <button id="btn-drawer-schedule-followup" class="btn btn-secondary btn-sm">Schedule Follow-up</button>
        ` : `
        <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">Viewing as Guest/Viewer</span>
        `}
      </div>
    `;

    backdrop.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.bindDrawerActions(leadId);
  },

  close() {
    const drawer = document.getElementById('lead-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    this.currentLeadId = null;
  },

  bindDrawerActions(leadId) {

    // Status Change
    const statusSelect = document.getElementById('drawer-status-select');
    if (statusSelect) {
      statusSelect.addEventListener('change', async (e) => {
        const newStatus = e.target.value;
        await LeadsService.updateStatus(leadId, newStatus);
        Toast.show(`✓ Status updated to ${newStatus.replace('_', ' ')} in MongoDB`);
        // Refresh drawer and page
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
        this.open(leadId);
      });
    }

    // Toggle Add Activity Form
    const actTrigger = document.getElementById('btn-add-activity-trigger');
    const actBox = document.getElementById('add-activity-box');
    const cancelAct = document.getElementById('btn-cancel-activity');
    const saveAct = document.getElementById('btn-save-activity');
    const actInput = document.getElementById('custom-activity-input');

    if (actTrigger && actBox) {
      actTrigger.addEventListener('click', () => {
        actBox.style.display = 'block';
        actInput.focus();
      });
    }
    if (cancelAct && actBox) {
      cancelAct.addEventListener('click', () => {
        actBox.style.display = 'none';
        actInput.value = '';
      });
    }
    if (saveAct && actInput) {
      saveAct.addEventListener('click', async () => {
        const text = actInput.value.trim();
        if (text) {
          await LeadsService.addActivity(leadId, text);
          Toast.show('Activity logged successfully');
          window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
          this.open(leadId);
        }
      });
    }

    // Add Note
    const addNoteBtn = document.getElementById('btn-drawer-add-note');
    const noteInput = document.getElementById('drawer-new-note');
    if (addNoteBtn && noteInput) {
      addNoteBtn.addEventListener('click', async () => {
        const text = noteInput.value.trim();
        if (text) {
          addNoteBtn.disabled = true;
          try {
            await LeadsService.addNote(leadId, text);
            Toast.show('✓ Note saved to MongoDB');
            window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
            this.open(leadId);
          } finally {
            addNoteBtn.disabled = false;
          }
        }
      });
    }

    // Schedule Follow-up button in drawer
    const scheduleBtn = document.getElementById('btn-drawer-schedule-followup');
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('techcrm:open-schedule-followup'));
      });
    }

    // Delete Lead
    const deleteBtn = document.getElementById('btn-drawer-delete-lead');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('techcrm:confirm-delete', { detail: { leadId } }));
      });
    }
  },

  initGlobalListeners() {
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (backdrop) backdrop.addEventListener('click', () => this.close());
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Listen to escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentLeadId) {
        this.close();
      }
    });
  }
};
