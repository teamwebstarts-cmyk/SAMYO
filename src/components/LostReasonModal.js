import { LeadsService } from '../services/leads.js';
import { AuthService } from '../services/auth.js';
import { Toast } from './Toast.js';
import { getIcon } from '../utils/icons.js';

export const LostReasonModal = {
  currentLeadId: null,

  render() {
    return `
      <div id="lost-reason-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Mark Lead as Lost</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-lost-modal">
              ${getIcon('close', { size: 20 })}
            </button>
          </div>

          <form id="lost-reason-form" class="modal-body">
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
              Why was this lead lost? Tracking this helps identify outreach and objection bottlenecks for your mentor.
            </p>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="No requirement" checked />
                <span>No requirement currently</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Budget issue" />
                <span>Budget issue / Price too high</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Went with competitor" />
                <span>Went with competitor / internal team</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="No response" />
                <span>No response after follow-ups</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Not interested" />
                <span>Not interested / Declined politely</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Other" />
                <span>Other reason</span>
              </label>
            </div>

            <div class="form-group" id="other-reason-group" style="display: none;">
              <label class="form-label" for="custom-lost-reason">Provide details</label>
              <input type="text" id="custom-lost-reason" class="input" placeholder="e.g. Project paused indefinitely" />
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-lost-modal">Cancel</button>
              <button type="submit" class="btn btn-danger">Confirm Lost</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  open(leadId) {
    this.currentLeadId = leadId;
    const modal = document.getElementById('lost-reason-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const modal = document.getElementById('lost-reason-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      this.currentLeadId = null;
    }
  },

  initListeners() {
    const modal = document.getElementById('lost-reason-modal');
    const closeBtn = document.getElementById('btn-close-lost-modal');
    const cancelBtn = document.getElementById('btn-cancel-lost-modal');
    const form = document.getElementById('lost-reason-form');
    const otherGroup = document.getElementById('other-reason-group');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.close());

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    if (form) {
      form.addEventListener('change', (e) => {
        if (e.target.name === 'lost-reason') {
          if (otherGroup) {
            otherGroup.style.display = e.target.value === 'Other' ? 'block' : 'none';
          }
        }
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!AuthService.isAuthenticated()) {
          Toast.show('Please log in to update lead status', 'warning');
          this.close();
          return;
        }
        if (!this.currentLeadId) return;

        const selectedRadio = form.querySelector('input[name="lost-reason"]:checked');
        let reason = selectedRadio ? selectedRadio.value : 'No response';
        if (reason === 'Other') {
          const custom = document.getElementById('custom-lost-reason')?.value.trim();
          if (custom) reason = custom;
        }

        await LeadsService.updateStatus(this.currentLeadId, 'lost', { lostReason: reason });
        Toast.show(`✓ Lead marked as Lost (${reason}) in MongoDB`, 'warning');
        this.close();
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
      });
    }
  }
};
