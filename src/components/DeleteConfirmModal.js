import { LeadsService } from '../services/leads.js';
import { AuthService } from '../services/auth.js';
import { Toast } from './Toast.js';
import { LeadDrawer } from './LeadDrawer.js';
import { getIcon } from '../utils/icons.js';

export const DeleteConfirmModal = {
  currentLeadId: null,

  render() {
    return `
      <div id="delete-confirm-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Delete Lead?</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-delete-modal">
              ${getIcon('close', { size: 20 })}
            </button>
          </div>

          <div class="modal-body">
            <p id="delete-modal-msg" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">
              This will permanently remove this lead and their activity history from your pipeline.
            </p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-cancel-delete">Cancel</button>
            <button type="button" class="btn btn-danger" id="btn-confirm-delete">Delete</button>
          </div>
        </div>
      </div>
    `;
  },

  open(leadId) {
    const lead = LeadsService.getById(leadId);
    if (!lead) return;

    this.currentLeadId = leadId;
    const modal = document.getElementById('delete-confirm-modal');
    const msg = document.getElementById('delete-modal-msg');

    if (modal && msg) {
      msg.innerHTML = `This will permanently remove <strong>${lead.name}</strong> ${lead.company ? `(${lead.company}) ` : ''}and their activity history.`;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const modal = document.getElementById('delete-confirm-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      this.currentLeadId = null;
    }
  },

  initListeners() {
    const modal = document.getElementById('delete-confirm-modal');
    const closeBtn = document.getElementById('btn-close-delete-modal');
    const cancelBtn = document.getElementById('btn-cancel-delete');
    const confirmBtn = document.getElementById('btn-confirm-delete');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.close());
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', async () => {
        if (!AuthService.isAuthenticated()) {
          Toast.show('Please log in to manage leads', 'warning');
          this.close();
          return;
        }
        if (this.currentLeadId) {
          const lead = LeadsService.getById(this.currentLeadId);
          const name = lead ? lead.name : 'Lead';
          confirmBtn.disabled = true;
          try {
            await LeadsService.delete(this.currentLeadId);
            LeadDrawer.close();
            this.close();
            Toast.show(`✓ Lead "${name}" deleted from MongoDB`, 'danger');
            window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
          } finally {
            confirmBtn.disabled = false;
          }
        }
      });
    }
  }
};
