import { LeadsService } from '../services/leads.js';
import { LeadDrawer } from '../components/LeadDrawer.js';

export const LeadsPage = {
  searchQuery: '',
  filterStatus: 'all',
  filterPriority: 'all',
  filterRequirement: 'all',

  render() {
    const leads = LeadsService.getAll();
    const stats = LeadsService.getStats();

    // Check query params if any
    const hash = window.location.hash;
    if (hash.includes('?q=')) {
      const param = hash.split('?q=')[1];
      if (param) this.searchQuery = decodeURIComponent(param);
    }

    const filtered = leads.filter(lead => {
      const matchSearch = !this.searchQuery ||
        lead.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lead.designation.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchStatus = this.filterStatus === 'all' || lead.status === this.filterStatus;
      const matchPriority = this.filterPriority === 'all' || lead.priority === this.filterPriority;
      const matchReq = this.filterRequirement === 'all' ||
        (Array.isArray(lead.requirements) && lead.requirements.some(r => r.toLowerCase().includes(this.filterRequirement.toLowerCase())));

      return matchSearch && matchStatus && matchPriority && matchReq;
    });

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Leads Directory</h1>
            <p>${stats.totalLeads} total prospects tracked across LinkedIn outreach</p>
          </div>
          <button class="btn btn-primary" id="btn-leads-add-lead">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Add Lead
          </button>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 16px; margin-bottom: var(--space-20); box-shadow: var(--shadow-sm);">
          <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 260px; max-width: 400px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="leads-table-search" class="input" placeholder="Search by name, company, role..." value="${this.searchQuery}" />
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <!-- Status Filter -->
              <select id="filter-status-select" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.filterStatus === 'all' ? 'selected' : ''}>All Statuses</option>
                <option value="new" ${this.filterStatus === 'new' ? 'selected' : ''}>New Leads</option>
                <option value="request_sent" ${this.filterStatus === 'request_sent' ? 'selected' : ''}>Request Sent</option>
                <option value="connected" ${this.filterStatus === 'connected' ? 'selected' : ''}>Connected</option>
                <option value="qualified" ${this.filterStatus === 'qualified' ? 'selected' : ''}>Qualified</option>
                <option value="proposal" ${this.filterStatus === 'proposal' ? 'selected' : ''}>Proposal</option>
                <option value="won" ${this.filterStatus === 'won' ? 'selected' : ''}>Won</option>
                <option value="lost" ${this.filterStatus === 'lost' ? 'selected' : ''}>Lost</option>
              </select>

              <!-- Priority Filter -->
              <select id="filter-priority-select" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.filterPriority === 'all' ? 'selected' : ''}>All Priorities</option>
                <option value="high" ${this.filterPriority === 'high' ? 'selected' : ''}>🔥 High</option>
                <option value="medium" ${this.filterPriority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="low" ${this.filterPriority === 'low' ? 'selected' : ''}>Low</option>
              </select>

              <!-- Requirement Filter -->
              <select id="filter-requirement-select" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.filterRequirement === 'all' ? 'selected' : ''}>All Services</option>
                <option value="website" ${this.filterRequirement === 'website' ? 'selected' : ''}>Website</option>
                <option value="mobile" ${this.filterRequirement === 'mobile' ? 'selected' : ''}>Mobile App</option>
                <option value="ai" ${this.filterRequirement === 'ai' ? 'selected' : ''}>AI/ML</option>
                <option value="ui/ux" ${this.filterRequirement === 'ui/ux' ? 'selected' : ''}>UI/UX</option>
                <option value="software" ${this.filterRequirement === 'software' ? 'selected' : ''}>Software</option>
              </select>

              <button id="btn-leads-reset" class="btn btn-ghost btn-sm" style="font-size: 12px;">Reset</button>
            </div>
          </div>
        </div>

        <!-- Leads Table (64px row height) -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
                  <th style="padding: 14px 20px;">Lead Name</th>
                  <th style="padding: 14px 20px;">Company</th>
                  <th style="padding: 14px 20px;">Status</th>
                  <th style="padding: 14px 20px;">Priority</th>
                  <th style="padding: 14px 20px;">Services</th>
                  <th style="padding: 14px 20px;">Added</th>
                  <th style="padding: 14px 20px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody id="leads-table-body">
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="7">
                      <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <div class="empty-title">No leads match your filter</div>
                        <div class="empty-desc">Try resetting your search query or add a new lead.</div>
                        <button class="btn btn-primary btn-sm" onclick="window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'))">+ Add Lead</button>
                      </div>
                    </td>
                  </tr>
                ` : filtered.map(lead => {
      const initials = lead.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      const addedDate = new Date(lead.addedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      let statusBadge = `<span class="badge badge-${lead.status}"><span class="badge-dot"></span> ${lead.status.replace('_', ' ')}</span>`;
      let priorityBadge = lead.priority === 'high'
        ? `<span class="badge badge-priority-high">🔥 High</span>`
        : lead.priority === 'medium'
          ? `<span class="badge badge-priority-medium">Medium</span>`
          : `<span class="badge badge-priority-low">Low</span>`;

      return `
                    <tr style="height: 64px; border-bottom: 1px solid var(--border-subtle); cursor: pointer; transition: background var(--transition-fast);" class="lead-table-row" data-id="${lead.id}">
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div class="avatar" style="width: 32px; height: 32px; font-size: 11px;">${initials}</div>
                          <div>
                            <div style="font-weight: 600; color: var(--text-main);">${lead.name}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">${lead.designation || 'Prospect'}</div>
                          </div>
                        </div>
                      </td>

                      <td style="padding: 12px 20px; font-weight: 500; color: var(--text-secondary);">
                        ${lead.company}
                      </td>

                      <td style="padding: 12px 20px;">
                        ${statusBadge}
                      </td>

                      <td style="padding: 12px 20px;">
                        ${priorityBadge}
                      </td>

                      <td style="padding: 12px 20px;">
                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                          ${(lead.requirements || ['Website']).slice(0, 2).map(r => `<span class="tag-chip">${r}</span>`).join('')}
                        </div>
                      </td>

                      <td style="padding: 12px 20px; color: var(--text-muted); font-size: 12.5px;">
                        ${addedDate}
                      </td>

                      <td style="padding: 12px 20px; text-align: right;">
                        <button class="btn btn-ghost btn-sm btn-open-lead-drawer" data-id="${lead.id}">View</button>
                      </td>
                    </tr>
                  `;
    }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    const addLeadBtn = document.getElementById('btn-leads-add-lead');
    if (addLeadBtn) {
      addLeadBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'));
      });
    }

    const searchInput = document.getElementById('leads-table-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.refreshTable();
      });
    }

    const statusFilter = document.getElementById('filter-status-select');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        this.filterStatus = e.target.value;
        this.refreshTable();
      });
    }

    const priorityFilter = document.getElementById('filter-priority-select');
    if (priorityFilter) {
      priorityFilter.addEventListener('change', (e) => {
        this.filterPriority = e.target.value;
        this.refreshTable();
      });
    }

    const reqFilter = document.getElementById('filter-requirement-select');
    if (reqFilter) {
      reqFilter.addEventListener('change', (e) => {
        this.filterRequirement = e.target.value;
        this.refreshTable();
      });
    }

    const resetBtn = document.getElementById('btn-leads-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.searchQuery = '';
        this.filterStatus = 'all';
        this.filterPriority = 'all';
        this.filterRequirement = 'all';
        this.refreshTable();
      });
    }

    this.bindRowClicks();
  },

  bindRowClicks() {
    document.querySelectorAll('.lead-table-row, .btn-open-lead-drawer').forEach(el => {
      el.addEventListener('click', (e) => {
        const leadId = el.getAttribute('data-id');
        if (leadId) LeadDrawer.open(leadId);
      });
    });
  },

  refreshTable() {
    const app = document.getElementById('app');
    if (app && window.location.hash.startsWith('#/leads')) {
      // Re-render
      app.querySelector('.page-container').outerHTML = this.render();
      this.initListeners();
    }
  }
};
