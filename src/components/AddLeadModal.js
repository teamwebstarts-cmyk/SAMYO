import { LeadsService } from '../services/leads.js';
import { Toast } from './Toast.js';

export const AddLeadModal = {
  render() {
    return `
      <div id="add-lead-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-header">
            <h2 class="modal-title">Add New Lead</h2>
            <button type="button" class="btn btn-ghost btn-icon modal-close-btn" data-modal="add-lead-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form id="add-lead-form" class="modal-body">
            <!-- Personal Information -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Personal Information
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-name">Full Name <span class="required">*</span></label>
              <input type="text" id="lead-name" class="input" placeholder="e.g. Rahul Sharma" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-designation">Designation</label>
                <input type="text" id="lead-designation" class="input" placeholder="e.g. Founder / CEO" />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-linkedin">LinkedIn Profile URL <span class="required">*</span></label>
                <input type="url" id="lead-linkedin" class="input" placeholder="https://linkedin.com/in/..." required />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Company Information -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Company Information
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-company">Company Name <span class="required">*</span></label>
                <input type="text" id="lead-company" class="input" placeholder="e.g. ABC Technologies" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-website">Company Website</label>
                <input type="url" id="lead-website" class="input" placeholder="https://abc.com" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-industry">Industry</label>
                <select id="lead-industry" class="select">
                  <option value="SaaS">SaaS</option>
                  <option value="FinTech">FinTech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="AI/ML Solutions">AI/ML Solutions</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Digital Agency">Digital Agency</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-location">Location</label>
                <input type="text" id="lead-location" class="input" placeholder="e.g. Jaipur, India" />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Opportunity -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Tech Opportunity & Priority
            </div>

            <div class="form-group">
              <label class="form-label">Service Requirements (Select all that apply)</label>
              <div class="tag-selector" id="requirement-tag-selector">
                <span class="tag-option selected" data-value="Website">🌐 Website</span>
                <span class="tag-option" data-value="Mobile App">📱 Mobile App</span>
                <span class="tag-option" data-value="Software">💻 Software</span>
                <span class="tag-option" data-value="AI/ML">🤖 AI/ML</span>
                <span class="tag-option" data-value="UI/UX">🎨 UI/UX</span>
                <span class="tag-option" data-value="Other">⚡ Other</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <div class="radio-pill-group" id="priority-selector">
                  <div class="radio-pill" data-value="low">Low</div>
                  <div class="radio-pill selected" data-value="medium">Medium</div>
                  <div class="radio-pill" data-value="high">🔥 High</div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-value">Potential Deal Value (₹)</label>
                <input type="number" id="lead-value" class="input" placeholder="100000" step="5000" value="100000" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-notes">Initial Outreach Notes</label>
              <textarea id="lead-notes" class="textarea" placeholder="Found on LinkedIn, recently posted about needing a tech partner..."></textarea>
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary modal-close-btn" data-modal="add-lead-modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Lead</button>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  open() {
    const modal = document.getElementById('add-lead-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('lead-name');
      if (nameInput) nameInput.focus();
    }
  },

  close() {
    const modal = document.getElementById('add-lead-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      const form = document.getElementById('add-lead-form');
      if (form) form.reset();
    }
  },

  initListeners() {
    const modal = document.getElementById('add-lead-modal');
    if (!modal) return;

    // Close buttons
    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.close();
    });

    // Tag selector toggle
    const tagSelector = document.getElementById('requirement-tag-selector');
    if (tagSelector) {
      tagSelector.addEventListener('click', (e) => {
        const option = e.target.closest('.tag-option');
        if (option) {
          option.classList.toggle('selected');
        }
      });
    }

    // Priority selector toggle
    const priorityGroup = document.getElementById('priority-selector');
    if (priorityGroup) {
      priorityGroup.addEventListener('click', (e) => {
        const pill = e.target.closest('.radio-pill');
        if (pill) {
          priorityGroup.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
        }
      });
    }

    // Form submission
    const form = document.getElementById('add-lead-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('lead-name').value;
        const designation = document.getElementById('lead-designation').value;
        const linkedinUrl = document.getElementById('lead-linkedin').value;
        const company = document.getElementById('lead-company').value;
        const companyWebsite = document.getElementById('lead-website').value;
        const industry = document.getElementById('lead-industry').value;
        const location = document.getElementById('lead-location').value;
        const potentialValue = document.getElementById('lead-value').value;
        const notes = document.getElementById('lead-notes').value;

        // Selected tags
        const selectedTags = Array.from(tagSelector.querySelectorAll('.tag-option.selected'))
          .map(el => el.getAttribute('data-value'));

        // Selected priority
        const selectedPriority = priorityGroup.querySelector('.radio-pill.selected')?.getAttribute('data-value') || 'medium';

        const createdLead = LeadsService.create({
          name,
          designation,
          linkedinUrl,
          company,
          companyWebsite,
          industry,
          location,
          requirements: selectedTags.length ? selectedTags : ['Website'],
          priority: selectedPriority,
          potentialValue: Number(potentialValue) || 100000,
          notes
        });

        this.close();
        Toast.show(`✓ Lead "${createdLead.name}" added to New Leads!`);
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
      });
    }
  }
};
