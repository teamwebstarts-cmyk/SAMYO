import { CompaniesService } from '../services/companies.js';

export const CompaniesPage = {
  searchQuery: '',
  selectedCompany: null,

  render() {
    const companies = CompaniesService.getAll();
    const filtered = companies.filter(c =>
      !this.searchQuery ||
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Target Companies</h1>
            <p>Grouped accounts & decision-maker contacts across active opportunities</p>
          </div>
          <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'))">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Add Company Lead
          </button>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom: var(--space-24); max-width: 400px;">
          <div class="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="companies-search" class="input" placeholder="Search companies or industry..." value="${this.searchQuery}" />
          </div>
        </div>

        <!-- Companies Grid (~280 × 180px cards) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${filtered.length === 0 ? `
            <div style="grid-column: 1 / -1;">
              <div class="empty-state">
                <div class="empty-icon">🏢</div>
                <div class="empty-title">No companies found</div>
                <div class="empty-desc">No accounts match your query. Add a new lead to populate companies.</div>
              </div>
            </div>
          ` : filtered.map(comp => `
            <div class="card company-card" data-name="${encodeURIComponent(comp.name)}" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 20px; box-shadow: var(--shadow-sm); cursor: pointer; transition: all var(--transition-fast); display: flex; flex-direction: column; justify-content: space-between; height: 190px;">
              <div>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px;">
                  <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); line-height: 1.3;">${comp.name}</h3>
                  <span class="badge badge-${comp.status || 'new'}">${(comp.status || 'New').replace('_', ' ')}</span>
                </div>
                <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">${comp.industry} • ${comp.location || 'India'}</p>
                
                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;">
                  ${comp.requirements.slice(0, 3).map(r => `<span class="tag-chip">${r}</span>`).join('')}
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 10px; font-size: 12px;">
                <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
                  👥 ${comp.contacts.length} Contact${comp.contacts.length > 1 ? 's' : ''}
                </span>
                <span style="font-weight: 600; color: #4F46E5;">₹${comp.potentialValue.toLocaleString('en-IN')}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Company Details Modal -->
        <div id="company-details-modal" class="modal-overlay" style="display: none;">
          <div class="modal-dialog" style="max-width: 520px;">
            <div class="modal-header">
              <div>
                <h2 id="modal-comp-name" class="modal-title">Company Details</h2>
                <div id="modal-comp-sub" style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;"></div>
              </div>
              <button type="button" class="btn btn-ghost btn-icon" id="btn-close-comp-modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div class="modal-body" id="modal-comp-body">
              <!-- Dynamically populated -->
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="btn-done-comp-modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    const searchInput = document.getElementById('companies-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const app = document.getElementById('app');
        if (app && window.location.hash.startsWith('#/companies')) {
          app.querySelector('.page-container').outerHTML = this.render();
          this.initListeners();
        }
      });
    }

    // Company card click -> open modal
    document.querySelectorAll('.company-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        if (name) this.openDetails(name);
      });
    });

    // Modal Close
    const closeBtn = document.getElementById('btn-close-comp-modal');
    const doneBtn = document.getElementById('btn-done-comp-modal');
    const modal = document.getElementById('company-details-modal');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDetails());
    if (doneBtn) doneBtn.addEventListener('click', () => this.closeDetails());
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeDetails();
      });
    }
  },

  openDetails(encodedName) {
    const comp = CompaniesService.getByName(encodedName);
    if (!comp) return;

    const modal = document.getElementById('company-details-modal');
    const nameEl = document.getElementById('modal-comp-name');
    const subEl = document.getElementById('modal-comp-sub');
    const bodyEl = document.getElementById('modal-comp-body');

    if (modal && nameEl && subEl && bodyEl) {
      nameEl.textContent = comp.name;
      subEl.innerHTML = `${comp.industry} • ${comp.location || 'India'} ${comp.website ? `• <a href="${comp.website}" target="_blank" style="color: var(--primary);">${comp.website.replace(/^https?:\/\//, '')}</a>` : ''}`;

      bodyEl.innerHTML = `
        <!-- Contacts -->
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); margin-bottom: 10px;">
            Key Contacts & Stakeholders
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${comp.contacts.map(c => `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 8px;">
                <div>
                  <div style="font-weight: 600; font-size: 13.5px; color: var(--text-main);">${c.name}</div>
                  <div style="font-size: 11.5px; color: var(--text-secondary);">${c.designation || 'Team Member'}</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <span class="badge badge-${c.status || 'new'}">${(c.status || 'new').replace('_', ' ')}</span>
                  ${c.linkedinUrl ? `<a href="${c.linkedinUrl}" target="_blank" style="color: #0A66C2; display: flex;" title="LinkedIn Profile"><svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg></a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="drawer-divider"></div>

        <!-- Requirements -->
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); margin-bottom: 10px;">
            Target Services Required
          </h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${comp.requirements.map(req => `<span class="tag-chip" style="font-size: 12px; padding: 4px 10px;">${req}</span>`).join('')}
          </div>
        </div>

        <div class="drawer-divider"></div>

        <!-- Opportunity Summary -->
        <div>
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); margin-bottom: 10px;">
            Opportunity Details
          </h4>
          <div style="background: #EEF2FF; border: 1px solid #C7D2FE; border-radius: 8px; padding: 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; color: #4338CA; font-weight: 500;">Current Stage</div>
              <div style="font-size: 15px; font-weight: 700; color: #312E81; text-transform: capitalize;">${(comp.status || 'New Leads').replace('_', ' ')}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 12px; color: #4338CA; font-weight: 500;">Potential Deal Value</div>
              <div style="font-size: 18px; font-weight: 700; color: #312E81;">₹${comp.potentialValue.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      `;

      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  closeDetails() {
    const modal = document.getElementById('company-details-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
};
