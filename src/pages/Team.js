import { AuthService } from '../services/auth.js';
import { LeadsService } from '../services/leads.js';
import { ApiService } from '../services/api.js';
import { LeadDrawer } from '../components/LeadDrawer.js';
import { Toast } from '../components/Toast.js';
import { getIcon } from '../utils/icons.js';

export const TeamPage = {
  teamMembers: [],
  allTeamLeads: [],
  selectedMemberId: 'all', // 'all' or specific user ID
  searchQuery: '',
  statusFilter: 'all',
  priorityFilter: 'all',
  isLoading: false,

  async fetchData() {
    this.isLoading = true;
    try {
      // 1. Fetch team members
      const usersRes = await ApiService.get('/auth/users');
      if (usersRes && Array.isArray(usersRes.users)) {
        this.teamMembers = usersRes.users;
      }

      // 2. Fetch team leads with populated owner details
      const leads = await LeadsService.fetchTeamLeads({ scope: 'team' });
      if (Array.isArray(leads)) {
        this.allTeamLeads = leads;
      }
    } catch (err) {
      console.warn('Error loading team data:', err.message);
    } finally {
      this.isLoading = false;
    }
  },

  getStageBadge(status) {
    const map = {
      new: { label: 'New Lead', bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' },
      request_sent: { label: 'Request Sent', bg: '#FEF3C7', color: '#D97706', border: '#FDE68A' },
      connected: { label: 'Connected', bg: '#DCFCE7', color: '#15803D', border: '#BBF7D0' },
      followup_scheduled: { label: 'Follow-up Scheduled', bg: '#E0F2FE', color: '#0284C7', border: '#BAE6FD' },
      qualified: { label: 'Qualified', bg: '#F3E8FF', color: '#7E22CE', border: '#E9D5FF' },
      proposal: { label: 'Proposal Sent', bg: '#E0E7FF', color: '#4338CA', border: '#C7D2FE' },
      won: { label: 'Won Deal 🏆', bg: '#DCFCE7', color: '#166534', border: '#86EFAC' },
      lost: { label: 'Lost', bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' }
    };
    const s = map[status] || { label: (status || 'New').replace('_', ' '), bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };
    return `<span class="badge" style="background: ${s.bg}; color: ${s.color}; border: 1px solid ${s.border}; font-weight: 600; padding: 4px 10px; font-size: 11.5px; border-radius: 6px;">${s.label}</span>`;
  },

  getPriorityBadge(priority) {
    if (priority === 'high') {
      return `<span class="badge badge-priority-high" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; font-size: 11px;">${getIcon('flame', { size: 11, color: '#DC2626' })} High</span>`;
    } else if (priority === 'medium') {
      return `<span class="badge badge-priority-medium" style="padding: 3px 8px; font-size: 11px;">Medium</span>`;
    }
    return `<span class="badge badge-priority-low" style="padding: 3px 8px; font-size: 11px;">Low</span>`;
  },

  render() {
    const currentUser = AuthService.getCurrentUser() || { id: '', email: '', name: 'User' };
    const currentUserId = currentUser.id || currentUser._id;

    const totalLeads = this.allTeamLeads.length;

    // Filter leads according to selected member and search criteria
    const filteredLeads = this.allTeamLeads.filter(l => {
      // Member filter
      if (this.selectedMemberId !== 'all') {
        const leadOwnerId = typeof l.ownerId === 'object' ? l.ownerId?._id || l.ownerId?.id : l.ownerId;
        if (leadOwnerId !== this.selectedMemberId) return false;
      }

      // Status filter
      if (this.statusFilter !== 'all' && l.status !== this.statusFilter) {
        return false;
      }

      // Priority filter
      if (this.priorityFilter !== 'all' && l.priority !== this.priorityFilter) {
        return false;
      }

      // Search query
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const nameMatch = l.name && l.name.toLowerCase().includes(q);
        const companyMatch = l.company && l.company.toLowerCase().includes(q);
        const ownerName = typeof l.ownerId === 'object' ? l.ownerId?.name : '';
        const ownerMatch = ownerName && ownerName.toLowerCase().includes(q);
        return nameMatch || companyMatch || ownerMatch;
      }

      return true;
    });

    const selectedMember = this.selectedMemberId === 'all' 
      ? null 
      : this.teamMembers.find(m => (m.id || m._id) === this.selectedMemberId);

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Team & Lead Management</h1>
            <p>Collaborative pipeline overview, member workloads, and real-time status tracking</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-secondary" id="btn-refresh-team" style="display: inline-flex; align-items: center; gap: 6px;">
              🔄 Refresh
            </button>
            <button class="btn btn-primary" id="btn-team-add-lead">
              ${getIcon('plus', { size: 16 })}
              Add Lead
            </button>
          </div>
        </div>

        <!-- Team Members Selection Pills -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 16px 20px; box-shadow: var(--shadow-sm); margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main); text-transform: uppercase; letter-spacing: 0.03em;">
              Filter by Team Member
            </div>
            <span style="font-size: 12px; color: var(--text-muted);">Click a member to view their leads</span>
          </div>

          <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; flex-wrap: wrap;">
            <!-- All Team Pill -->
            <button class="btn btn-member-pill ${this.selectedMemberId === 'all' ? 'active' : ''}" data-member-id="all" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 20px; border: 1px solid ${this.selectedMemberId === 'all' ? 'var(--primary)' : 'var(--border-color)'}; background: ${this.selectedMemberId === 'all' ? '#EEF2FF' : '#FFFFFF'}; color: ${this.selectedMemberId === 'all' ? 'var(--primary)' : 'var(--text-main)'}; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
              <span>🌐 All Team</span>
              <span class="badge" style="background: ${this.selectedMemberId === 'all' ? '#C7D2FE' : '#F1F5F9'}; color: ${this.selectedMemberId === 'all' ? '#3730A3' : '#64748B'}; font-size: 11px;">${totalLeads}</span>
            </button>

            <!-- Individual Member Pills -->
            ${this.teamMembers.map(m => {
              const isSelected = this.selectedMemberId === (m.id || m._id);
              const isCurrent = (m.id || m._id) === currentUserId || (m.email && currentUser.email && m.email.toLowerCase() === currentUser.email.toLowerCase());
              const leadsCount = m.leadsCount ?? this.allTeamLeads.filter(l => {
                const oid = typeof l.ownerId === 'object' ? l.ownerId?._id || l.ownerId?.id : l.ownerId;
                return oid === (m.id || m._id);
              }).length;

              return `
                <button class="btn btn-member-pill ${isSelected ? 'active' : ''}" data-member-id="${m.id || m._id}" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 20px; border: 1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}; background: ${isSelected ? '#EEF2FF' : '#FFFFFF'}; color: ${isSelected ? 'var(--primary)' : 'var(--text-main)'}; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">
                  <div class="avatar" style="width: 22px; height: 22px; font-size: 10px; font-weight: 700;">${m.avatar || 'U'}</div>
                  <span>${m.name}</span>
                  ${isCurrent ? `<span style="font-size: 10px; font-weight: 700; color: #4F46E5; background: #E0E7FF; padding: 1px 6px; border-radius: 10px;">You</span>` : ''}
                  <span class="badge" style="background: ${isSelected ? '#C7D2FE' : '#F1F5F9'}; color: ${isSelected ? '#3730A3' : '#64748B'}; font-size: 11px;">${leadsCount}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Leads Filter & Table Card -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); box-shadow: var(--shadow-sm); overflow: hidden;">
          <!-- Search & Filter Controls -->
          <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; gap: 10px; align-items: center; flex: 1; min-width: 240px; max-width: 400px;">
              <div class="search-input-wrapper" style="width: 100%;">
                ${getIcon('search', { size: 15 })}
                <input type="text" id="team-lead-search" class="input" placeholder="Search leads by name, company, or assignee..." value="${this.searchQuery}" />
              </div>
            </div>

            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <!-- Status Filter -->
              <select id="team-filter-status" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.statusFilter === 'all' ? 'selected' : ''}>All Stages</option>
                <option value="new" ${this.statusFilter === 'new' ? 'selected' : ''}>New Leads</option>
                <option value="request_sent" ${this.statusFilter === 'request_sent' ? 'selected' : ''}>Request Sent</option>
                <option value="connected" ${this.statusFilter === 'connected' ? 'selected' : ''}>Connected</option>
                <option value="followup_scheduled" ${this.statusFilter === 'followup_scheduled' ? 'selected' : ''}>Follow-up Scheduled</option>
                <option value="qualified" ${this.statusFilter === 'qualified' ? 'selected' : ''}>Qualified</option>
                <option value="proposal" ${this.statusFilter === 'proposal' ? 'selected' : ''}>Proposal Sent</option>
                <option value="won" ${this.statusFilter === 'won' ? 'selected' : ''}>Won Deals 🏆</option>
                <option value="lost" ${this.statusFilter === 'lost' ? 'selected' : ''}>Lost</option>
              </select>

              <!-- Priority Filter -->
              <select id="team-filter-priority" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.priorityFilter === 'all' ? 'selected' : ''}>All Priorities</option>
                <option value="high" ${this.priorityFilter === 'high' ? 'selected' : ''}>🔥 High Priority</option>
                <option value="medium" ${this.priorityFilter === 'medium' ? 'selected' : ''}>Medium Priority</option>
                <option value="low" ${this.priorityFilter === 'low' ? 'selected' : ''}>Low Priority</option>
              </select>

              <button class="btn btn-ghost btn-sm" id="btn-reset-team-filter" style="font-size: 12px;">Reset</button>
            </div>
          </div>

          <!-- Active Filter Banner (if filtering by specific member) -->
          ${selectedMember ? `
            <div style="background: #F8FAFC; border-bottom: 1px solid var(--border-subtle); padding: 10px 20px; font-size: 12.5px; color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>Viewing leads assigned to:</span>
                <strong>${selectedMember.name}</strong>
                <span class="badge" style="background: #EEF2FF; color: #4F46E5;">${selectedMember.role || 'Member'}</span>
              </div>
              <button id="btn-clear-member-filter" style="background: none; border: none; color: var(--primary); font-size: 12px; cursor: pointer; font-weight: 600;">Clear filter ✕</button>
            </div>
          ` : ''}

          <!-- Leads Table -->
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                  <th style="padding: 12px 20px;">Lead & Company</th>
                  <th style="padding: 12px 20px;">Assigned To</th>
                  <th style="padding: 12px 20px;">Pipeline Stage / Status</th>
                  <th style="padding: 12px 20px;">Priority</th>
                  <th style="padding: 12px 20px;">Potential Value</th>
                  <th style="padding: 12px 20px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${filteredLeads.length === 0 ? `
                  <tr>
                    <td colspan="6" style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
                      <div style="font-size: 24px; margin-bottom: 8px;">🔍</div>
                      <div style="font-weight: 600; font-size: 14px; color: var(--text-main);">No leads found</div>
                      <div style="font-size: 12.5px; margin-top: 4px;">Try adjusting your member or search filters</div>
                    </td>
                  </tr>
                ` : filteredLeads.map(lead => {
                  const owner = typeof lead.ownerId === 'object' && lead.ownerId ? lead.ownerId : null;
                  const ownerName = owner ? owner.name : 'Unassigned';
                  const ownerAvatar = owner ? owner.avatar || owner.name.charAt(0).toUpperCase() : 'U';
                  const isOwnedByCurrent = owner && (owner._id === currentUserId || owner.id === currentUserId);

                  return `
                    <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle); transition: background 0.15s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='#FFFFFF'">
                      <!-- Lead & Company -->
                      <td style="padding: 12px 20px;">
                        <div style="font-weight: 600; color: var(--text-main);">${lead.name}</div>
                        <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                          <span>${lead.company || 'Direct Outreach'}</span>
                          ${lead.linkedinUrl ? `
                            <a href="${lead.linkedinUrl}" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" style="color: #0A66C2; display: inline-flex; align-items: center;">
                              ${getIcon('linkedin', { size: 12 })}
                            </a>
                          ` : ''}
                        </div>
                      </td>

                      <!-- Assigned To -->
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <div class="avatar" style="width: 26px; height: 26px; font-size: 11px; font-weight: 700;">${ownerAvatar}</div>
                          <div>
                            <span style="font-weight: 500; color: var(--text-main); font-size: 13px;">${ownerName}</span>
                            ${isOwnedByCurrent ? `<span style="font-size: 10px; font-weight: 700; color: #4F46E5; background: #EEF2FF; padding: 1px 5px; border-radius: 8px; margin-left: 4px;">You</span>` : ''}
                          </div>
                        </div>
                      </td>

                      <!-- Status Badge / Quick Switcher -->
                      <td style="padding: 12px 20px;">
                        <div style="display: inline-flex; align-items: center; gap: 6px;">
                          ${this.getStageBadge(lead.status)}
                          <select class="select team-lead-status-select" data-lead-id="${lead.id}" style="width: auto; padding: 3px 8px; height: 26px; font-size: 11.5px; border-radius: 4px; border-color: var(--border-color); background: #F8FAFC;">
                            <option value="new" ${lead.status === 'new' ? 'selected' : ''}>New</option>
                            <option value="request_sent" ${lead.status === 'request_sent' ? 'selected' : ''}>Request Sent</option>
                            <option value="connected" ${lead.status === 'connected' ? 'selected' : ''}>Connected</option>
                            <option value="followup_scheduled" ${lead.status === 'followup_scheduled' ? 'selected' : ''}>Follow-up</option>
                            <option value="qualified" ${lead.status === 'qualified' ? 'selected' : ''}>Qualified</option>
                            <option value="proposal" ${lead.status === 'proposal' ? 'selected' : ''}>Proposal</option>
                            <option value="won" ${lead.status === 'won' ? 'selected' : ''}>Won 🏆</option>
                            <option value="lost" ${lead.status === 'lost' ? 'selected' : ''}>Lost</option>
                          </select>
                        </div>
                      </td>

                      <!-- Priority -->
                      <td style="padding: 12px 20px;">
                        ${this.getPriorityBadge(lead.priority)}
                      </td>

                      <!-- Deal Value -->
                      <td style="padding: 12px 20px; font-weight: 600; color: #4F46E5;">
                        ${lead.potentialValue ? `₹${Number(lead.potentialValue).toLocaleString('en-IN')}` : '<span style="color: var(--text-muted); font-size: 12px; font-weight: normal;">—</span>'}
                      </td>

                      <!-- Action -->
                      <td style="padding: 12px 20px; text-align: right;">
                        <button class="btn btn-secondary btn-sm btn-view-lead" data-lead-id="${lead.id}" style="font-size: 12px; padding: 4px 12px; border-radius: 6px;">
                          View Details →
                        </button>
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
    // Add lead trigger
    const addLeadBtn = document.getElementById('btn-team-add-lead');
    if (addLeadBtn) {
      addLeadBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'));
      });
    }

    // Refresh button
    const refreshBtn = document.getElementById('btn-refresh-team');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        refreshBtn.disabled = true;
        refreshBtn.textContent = 'Refreshing...';
        await this.fetchData();
        Toast.show('✓ Team pipeline data synced with MongoDB');
        this.reRender();
      });
    }

    // Member pills filter
    document.querySelectorAll('.btn-member-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedMemberId = btn.getAttribute('data-member-id');
        this.reRender();
      });
    });

    // Clear member filter button
    const clearMemberBtn = document.getElementById('btn-clear-member-filter');
    if (clearMemberBtn) {
      clearMemberBtn.addEventListener('click', () => {
        this.selectedMemberId = 'all';
        this.reRender();
      });
    }

    // Search input
    const searchInput = document.getElementById('team-lead-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        this.reRender();
      });
    }

    // Status filter
    const statusSelect = document.getElementById('team-filter-status');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        this.statusFilter = e.target.value;
        this.reRender();
      });
    }

    // Priority filter
    const prioritySelect = document.getElementById('team-filter-priority');
    if (prioritySelect) {
      prioritySelect.addEventListener('change', (e) => {
        this.priorityFilter = e.target.value;
        this.reRender();
      });
    }

    // Reset filters
    const resetBtn = document.getElementById('btn-reset-team-filter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.searchQuery = '';
        this.statusFilter = 'all';
        this.priorityFilter = 'all';
        this.selectedMemberId = 'all';
        this.reRender();
      });
    }

    // Inline Status Change Dropdown
    document.querySelectorAll('.team-lead-status-select').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const leadId = sel.getAttribute('data-lead-id');
        const newStatus = e.target.value;
        try {
          sel.disabled = true;
          await LeadsService.updateStatus(leadId, newStatus);
          Toast.show(`✓ Lead stage moved to ${newStatus.replace('_', ' ').toUpperCase()}`);
          await this.fetchData();
          this.reRender();
          window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
        } catch (err) {
          Toast.show(`Failed to update status: ${err.message}`, 'error');
          sel.disabled = false;
        }
      });
    });

    // View Details button -> Opens LeadDrawer
    document.querySelectorAll('.btn-view-lead').forEach(btn => {
      btn.addEventListener('click', () => {
        const leadId = btn.getAttribute('data-lead-id');
        if (leadId) {
          LeadDrawer.open(leadId);
        }
      });
    });
  },

  reRender() {
    const app = document.getElementById('app');
    if (app && window.location.hash.startsWith('#/team')) {
      const mainArea = app.querySelector('#main-content-area');
      if (mainArea) {
        mainArea.innerHTML = this.render();
        this.initListeners();
      }
    }
  }
};
