import { FollowUpsService } from '../services/followups.js';
import { LeadsService } from '../services/leads.js';
import { Toast } from './Toast.js';

export const ScheduleFollowupModal = {
  render() {
    const leads = LeadsService.getAll();

    return `
      <div id="schedule-followup-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title">Schedule Follow-up</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-schedule-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form id="schedule-followup-form" class="modal-body">
            <div class="form-group">
              <label class="form-label" for="followup-lead">Select Lead <span class="required">*</span></label>
              <select id="followup-lead" class="select" required>
                ${leads.map(l => `<option value="${l.id}" data-name="${l.name}" data-company="${l.company || ''}" data-linkedin="${l.linkedinUrl || ''}">${l.name}${l.company ? ` (${l.company})` : ''}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="followup-task">Follow-up Task / Note <span class="required">*</span></label>
              <input type="text" id="followup-task" class="input" placeholder="e.g. Send proposal feedback message on LinkedIn" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="followup-category">Schedule For</label>
                <select id="followup-category" class="select">
                  <option value="today">Today</option>
                  <option value="upcoming" selected>Upcoming</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="followup-priority">Priority</label>
                <select id="followup-priority" class="select">
                  <option value="today">Due Today</option>
                  <option value="upcoming" selected>Upcoming</option>
                  <option value="overdue">🔴 High / Overdue</option>
                </select>
              </div>
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-schedule-modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Schedule Task</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  open() {
    const modal = document.getElementById('schedule-followup-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const modal = document.getElementById('schedule-followup-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      const form = document.getElementById('schedule-followup-form');
      if (form) form.reset();
    }
  },

  initListeners() {
    const modal = document.getElementById('schedule-followup-modal');
    const closeBtn = document.getElementById('btn-close-schedule-modal');
    const cancelBtn = document.getElementById('btn-cancel-schedule-modal');
    const form = document.getElementById('schedule-followup-form');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.close());
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const select = document.getElementById('followup-lead');
        const selectedOption = select.options[select.selectedIndex];
        const leadId = select.value;
        const leadName = selectedOption.getAttribute('data-name');
        const company = selectedOption.getAttribute('data-company');
        const linkedinUrl = selectedOption.getAttribute('data-linkedin');
        const task = document.getElementById('followup-task').value;
        const category = document.getElementById('followup-category').value;
        const priority = document.getElementById('followup-priority').value;

        FollowUpsService.create({
          leadId,
          leadName,
          company,
          task,
          category,
          priority,
          dueLabel: category === 'today' ? 'Today, 4:00 PM' : 'Next Week',
          linkedinUrl
        });

        Toast.show('✓ Follow-up scheduled successfully');
        this.close();
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
      });
    }
  }
};
