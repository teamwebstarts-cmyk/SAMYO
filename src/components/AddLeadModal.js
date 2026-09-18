import { LeadsService } from '../services/leads.js';
import { AuthService } from '../services/auth.js';
import { Toast } from './Toast.js';
import { getIcon } from '../utils/icons.js';

export const AddLeadModal = {
  render() {
    return `
      <div id="add-lead-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <h2 class="modal-title">Add New Lead</h2>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Only name is mandatory. All other details can be skipped or filled later.
              </p>
            </div>
            <button type="button" class="btn btn-ghost btn-icon modal-close-btn" data-modal="add-lead-modal">
              ${getIcon('close', { size: 20 })}
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
                <label class="form-label" for="lead-designation">Designation <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-designation" class="input" placeholder="e.g. Founder / CEO" />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-linkedin">LinkedIn Profile URL <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-linkedin" class="input" placeholder="e.g. linkedin.com/in/..." />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Company Information -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Company Information <span class="optional" style="font-size: 11px; text-transform: none;">(Optional)</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-company">Company Name <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-company" class="input" placeholder="e.g. ABC Technologies" />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-website">Company Website <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-website" class="input" placeholder="e.g. https://abc.com" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-industry">Industry <span class="optional">(Optional)</span></label>
                <select id="lead-industry" class="select">
                  <option value="">Select Industry (Optional)</option>
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
                <label class="form-label" for="lead-location">Location <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-location" class="input" placeholder="e.g. Jaipur, India" />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Opportunity -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Tech Opportunity & Priority <span class="optional" style="font-size: 11px; text-transform: none;">(Optional)</span>
            </div>

            <div class="form-group">
              <label class="form-label">Service Requirements <span class="optional">(Optional)</span></label>
              <div class="tag-selector" id="requirement-tag-selector">
                <span class="tag-option" data-value="Website">🌐 Website</span>
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
                <label class="form-label" for="lead-value">Potential Deal Value (₹) <span class="optional">(Optional)</span></label>
                <input type="number" id="lead-value" class="input" placeholder="e.g. 100000" step="5000" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-assignee">Assign Lead To <span class="optional">(Creator & Assignee both get edit rights)</span></label>
              <select id="lead-assignee" class="select">
                <option value="">Assign to Me (Default)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-notes">Initial Outreach Notes <span class="optional">(Optional)</span></label>
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

  async open() {
    const modal = document.getElementById('add-lead-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('lead-name');
      if (nameInput) nameInput.focus();

      // Populate Assignee Select
      const assigneeSelect = document.getElementById('lead-assignee');
      if (assigneeSelect) {
        const currentUser = AuthService.getCurrentUser();
        const currentUserId = currentUser ? (currentUser.id || currentUser._id) : null;
        try {
          const members = await AuthService.getTeamMembers();
          if (Array.isArray(members) && members.length > 0) {
            assigneeSelect.innerHTML = members.map(m => {
              const mId = m._id || m.id;
              const isMe = String(mId) === String(currentUserId);
              return `<option value="${mId}" ${isMe ? 'selected' : ''}>${m.name} (${m.role || 'Member'})${isMe ? ' — (Me)' : ''}</option>`;
            }).join('');
          } else {
            assigneeSelect.innerHTML = `<option value="${currentUserId}">Me (${currentUser?.name || 'Current User'})</option>`;
          }
        } catch (e) {
          assigneeSelect.innerHTML = `<option value="${currentUserId}">Me (${currentUser?.name || 'Current User'})</option>`;
        }
      }
    }
  },

  close() {
    const modal = document.getElementById('add-lead-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      const form = document.getElementById('add-lead-form');
      if (form) form.reset();
      const tagSelector = document.getElementById('requirement-tag-selector');
      if (tagSelector) {
        tagSelector.querySelectorAll('.tag-option').forEach(t => t.classList.remove('selected'));
      }
      const priorityGroup = document.getElementById('priority-selector');
      if (priorityGroup) {
        priorityGroup.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('selected'));
        const med = priorityGroup.querySelector('.radio-pill[data-value="medium"]');
        if (med) med.classList.add('selected');
      }
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
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!AuthService.isAuthenticated()) {
          Toast.show('Please log in to create leads', 'warning');
          this.close();
          window.location.hash = '#/login';
          return;
        }

        const nameInput = document.getElementById('lead-name');
        const name = nameInput ? nameInput.value.trim() : '';
        if (!name) {
          Toast.show('Please enter the lead full name', 'error');
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Saving to MongoDB...';
        }

        const designation = document.getElementById('lead-designation')?.value.trim() || '';
        let linkedinUrl = document.getElementById('lead-linkedin')?.value.trim() || '';
        if (linkedinUrl && !/^https?:\/\//i.test(linkedinUrl)) {
          linkedinUrl = 'https://' + linkedinUrl;
        }

        const company = document.getElementById('lead-company')?.value.trim() || '';
        let companyWebsite = document.getElementById('lead-website')?.value.trim() || '';
        if (companyWebsite && !/^https?:\/\//i.test(companyWebsite)) {
          companyWebsite = 'https://' + companyWebsite;
        }

        const industry = document.getElementById('lead-industry')?.value || '';
        const location = document.getElementById('lead-location')?.value.trim() || '';
        const potentialValue = document.getElementById('lead-value')?.value;
        const notes = document.getElementById('lead-notes')?.value.trim() || '';
        const ownerId = document.getElementById('lead-assignee')?.value || undefined;

        // Selected tags
        const selectedTags = tagSelector
          ? Array.from(tagSelector.querySelectorAll('.tag-option.selected')).map(el => el.getAttribute('data-value'))
          : [];

        // Selected priority
        const selectedPriority = priorityGroup?.querySelector('.radio-pill.selected')?.getAttribute('data-value') || 'medium';

        try {
          const createdLead = await LeadsService.create({
            name,
            designation,
            linkedinUrl,
            company,
            companyWebsite,
            industry,
            location,
            requirements: selectedTags,
            priority: selectedPriority,
            potentialValue: potentialValue ? Number(potentialValue) : 0,
            notes,
            ownerId
          });

          this.close();
          form.reset();
          Toast.show(`✓ Lead "${createdLead.name}" saved to MongoDB & Pipeline!`);
          window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
        } catch (err) {
          Toast.show(`Failed to save lead: ${err.message}`, 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Save Lead to Pipeline';
          }
        }
      });
    }
  }
};
