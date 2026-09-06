import { LeadsService } from '../services/leads.js';
import { Toast } from './Toast.js';

export const LeadDrawer = {
  currentLeadId: null,

  render() {
    return `
      <div id="drawer-backdrop" class="drawer-backdrop"></div>
      <aside id="lead-drawer" class="drawer" aria-label="Lead Details">
        <div class="drawer-header">
          <span class="drawer-title">Lead Details</span>
          <button id="drawer-close-btn" class="btn btn-ghost btn-icon" aria-label="Close drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
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

    this.currentLeadId = leadId;
    const drawer = document.getElementById('lead-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const content = document.getElementById('drawer-content');

    if (!drawer || !backdrop || !content) return;

    const initials = lead.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const requirements = Array.isArray(lead.requirements) ? lead.requirements : ['Website'];

    content.innerHTML = `
      <div class="drawer-profile-banner">
        <div class="drawer-avatar">${initials}</div>
        <div class="drawer-profile-text">
          <h2>${lead.name}</h2>
          <p>${lead.designation || 'Contact'} @ ${lead.company}</p>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <a href="${lead.linkedinUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
          </svg>
          Open LinkedIn Profile
        </a>
      </div>

      <div class="drawer-field-grid">
        <div class="drawer-field">
          <span class="drawer-field-label">Status</span>
          <select id="drawer-status-select" class="select" style="font-weight: 500;">
            <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New Leads</option>
            <option value="request_sent" ${lead.status === 'request_sent' ? 'selected' : ''}>Request Sent</option>
            <option value="connected" ${lead.status === 'connected' ? 'selected' : ''}>Connected</option>
            <option value="qualified" ${lead.status === 'qualified' ? 'selected' : ''}>Qualified</option>
            <option value="proposal" ${lead.status === 'proposal' ? 'selected' : ''}>Proposal Sent</option>
            <option value="won" ${lead.status === 'won' ? 'selected' : ''}>Won (Closed)</option>
            <option value="lost" ${lead.status === 'lost' ? 'selected' : ''}>Lost</option>
          </select>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Company</span>
          <div class="drawer-field-value">${lead.company} ${lead.companyWebsite ? `<a href="${lead.companyWebsite}" target="_blank" style="font-size: 12px; color: var(--primary); margin-left: 6px;">(${lead.companyWebsite.replace(/^https?:\/\//, '')})</a>` : ''}</div>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Tech Requirement</span>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
            ${requirements.map(req => `<span class="tag-chip" style="font-size: 12px; padding: 4px 8px;">${req}</span>`).join('')}
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
              ₹${(lead.potentialValue || 100000).toLocaleString('en-IN')}
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
          <button id="btn-add-activity-trigger" class="btn btn-ghost btn-sm" style="font-size: 11px;">+ Add Activity</button>
        </div>

        <!-- Inline Add Activity Form -->
        <div id="add-activity-box" style="display: none; margin-bottom: 12px; background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
          <input type="text" id="custom-activity-input" class="input" placeholder="e.g. Discussed proposal on call" style="margin-bottom: 8px;" />
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="btn-cancel-activity" class="btn btn-ghost btn-sm">Cancel</button>
            <button id="btn-save-activity" class="btn btn-primary btn-sm">Log Activity</button>
          </div>
        </div>

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
        <div style="margin-top: 10px;">
          <textarea id="drawer-new-note" class="textarea" placeholder="Add a note or call update..." style="min-height: 60px;"></textarea>
          <button id="btn-drawer-add-note" class="btn btn-secondary btn-sm" style="margin-top: 8px; width: 100%;">+ Add Note</button>
        </div>
      </div>

      <div class="drawer-divider"></div>

      <!-- Bottom Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
        <button id="btn-drawer-delete-lead" class="btn btn-ghost btn-sm" style="color: var(--danger);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Delete Lead
        </button>
        <a href="#/followups" class="btn btn-secondary btn-sm">Schedule Follow-up</a>
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
      statusSelect.addEventListener('change', (e) => {
        const newStatus = e.target.value;
        LeadsService.updateStatus(leadId, newStatus);
        Toast.show(`Lead status updated to ${newStatus.replace('_', ' ')}`);
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
      saveAct.addEventListener('click', () => {
        const text = actInput.value.trim();
        if (text) {
          LeadsService.addActivity(leadId, text);
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
      addNoteBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
          LeadsService.addNote(leadId, text);
          Toast.show('Note added');
          window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
          this.open(leadId);
        }
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
