import { AuthService } from '../services/auth.js';
import { Toast } from '../components/Toast.js';
import { ApiService } from '../services/api.js';
import { getIcon } from '../utils/icons.js';

export const SettingsPage = {
  currentSection: 'profile', // profile, team
  teamUsers: [],
  isLoadingUsers: false,

  async fetchTeamMembers() {
    this.isLoadingUsers = true;
    try {
      const res = await ApiService.get('/auth/users');
      if (res && res.users) {
        this.teamUsers = res.users;
      }
    } catch (err) {
      console.warn('Could not fetch team users:', err.message);
    } finally {
      this.isLoadingUsers = false;
    }
  },

  render() {
    const user = AuthService.getCurrentUser() || { name: 'User', email: '', role: 'Team Member', avatar: 'U' };
    const isCallerAdmin = AuthService.isSystemAdmin();

    const displayMembers = this.teamUsers.length > 0 ? this.teamUsers : [
      { id: user.id || 'me', name: user.name, email: user.email, role: user.role || 'Team Member', leadsCount: 'Mine', isAdmin: isCallerAdmin, avatar: user.avatar || 'U' }
    ];

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Settings & Profile</h1>
            <p>Manage your account profile and team preferences</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-24);">
          <button class="btn btn-ghost ${this.currentSection === 'profile' ? 'active' : ''}" id="tab-sec-profile" style="border-bottom: 2px solid ${this.currentSection === 'profile' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection === 'profile' ? 'var(--primary)' : 'var(--text-secondary)'};">
            My Profile
          </button>
          <button class="btn btn-ghost ${this.currentSection === 'team' ? 'active' : ''}" id="tab-sec-team" style="border-bottom: 2px solid ${this.currentSection === 'team' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection === 'team' ? 'var(--primary)' : 'var(--text-secondary)'};">
            Team & Roles
          </button>
        </div>

        <!-- My Profile Section -->
        ${this.currentSection === 'profile' ? `
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; max-width: 600px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
              <div class="avatar" style="width: 56px; height: 56px; font-size: 20px; font-weight: 700;">${user.avatar || 'U'}</div>
              <div>
                <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${user.name}</h2>
                <div style="font-size: 13px; color: var(--text-secondary);">${user.email}</div>
                <span class="badge" style="margin-top: 6px; background: #EEF2FF; color: #4F46E5;">${user.role || 'Team Member'}</span>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px; display: flex; flex-direction: column; gap: 14px;">
              <div>
                <label class="form-label" style="font-size: 12px; text-transform: uppercase; color: var(--text-muted);">Full Name</label>
                <div style="font-size: 14px; font-weight: 500; color: var(--text-main);">${user.name}</div>
              </div>
              <div>
                <label class="form-label" style="font-size: 12px; text-transform: uppercase; color: var(--text-muted);">Email Address</label>
                <div style="font-size: 14px; font-weight: 500; color: var(--text-main);">${user.email}</div>
              </div>
              <div>
                <label class="form-label" style="font-size: 12px; text-transform: uppercase; color: var(--text-muted);">Assigned Role</label>
                <div style="font-size: 14px; font-weight: 500; color: var(--text-main);">${user.role || 'Team Member'}</div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Team & Roles Section -->
        ${this.currentSection === 'team' ? `
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); overflow: hidden; max-width: 850px; box-shadow: var(--shadow-sm);">
            <div style="padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 600;">Team Members & Roles</h3>
                <p style="font-size: 13px; color: var(--text-secondary);">Manage registered users, access seats, and admin privileges</p>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-invite-member">+ Invite Member</button>
            </div>

            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                  <th style="padding: 12px 20px;">User</th>
                  <th style="padding: 12px 20px;">Role & Access</th>
                  <th style="padding: 12px 20px;">Leads Assigned</th>
                  <th style="padding: 12px 20px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${displayMembers.map(m => {
                  const isCurrent = m.email && user.email && m.email.toLowerCase() === user.email.toLowerCase();
                  return `
                    <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div class="avatar" style="width: 34px; height: 34px; font-size: 12px; font-weight: 600;">${m.avatar || 'U'}</div>
                          <div>
                            <span style="font-weight: 600; color: var(--text-main);">${m.name}</span>
                            <div style="font-size: 11.5px; color: var(--text-muted);">${m.email || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding: 12px 20px;">
                        ${m.isAdmin 
                          ? `<span class="badge" style="background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">${getIcon('crown', { size: 12, color: '#4338CA' })} Admin</span>` 
                          : '<span class="badge" style="background: #F1F5F9; color: #64748B; font-weight: 500;">Team Member</span>'}
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">${m.role || 'Member'}</div>
                      </td>
                      <td style="padding: 12px 20px; font-weight: 600; color: var(--text-main);">${m.leadsCount ?? 0}</td>
                      <td style="padding: 12px 20px; text-align: right;">
                        ${isCurrent 
                          ? '<span class="badge" style="background: #EEF2FF; color: #4F46E5;">You</span>' 
                          : isCallerAdmin
                            ? (m.isAdmin 
                                ? `<button class="btn btn-secondary btn-sm btn-toggle-role" data-user-id="${m.id}" data-make-admin="false" style="color: #DC2626; border-color: #FECACA; font-size: 12px; padding: 4px 10px;" title="Revoke Admin Access">Revoke Admin</button>`
                                : `<button class="btn btn-primary btn-sm btn-toggle-role" data-user-id="${m.id}" data-make-admin="true" style="font-size: 12px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 4px;" title="Promote user to Admin">${getIcon('crown', { size: 12, color: '#ffffff' })} Make Admin</button>`
                              )
                            : '<span style="color: var(--text-muted); font-size: 12px;">—</span>'
                        }
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}
      </div>
    `;
  },

  initListeners() {
    const tabProf = document.getElementById('tab-sec-profile');
    const tabTeam = document.getElementById('tab-sec-team');

    if (tabProf) {
      tabProf.addEventListener('click', () => { 
        this.currentSection = 'profile'; 
        this.reRender(); 
      });
    }

    if (tabTeam) {
      tabTeam.addEventListener('click', async () => { 
        this.currentSection = 'team'; 
        await this.fetchTeamMembers(); 
        this.reRender(); 
      });
    }

    // Role toggle (Make Admin / Revoke Admin)
    document.querySelectorAll('.btn-toggle-role').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const userId = e.currentTarget.getAttribute('data-user-id');
        const makeAdmin = e.currentTarget.getAttribute('data-make-admin') === 'true';

        try {
          btn.disabled = true;
          const res = await ApiService.patch(`/auth/users/${userId}/role`, { isAdmin: makeAdmin });
          Toast.show(res.message || (makeAdmin ? '✓ User promoted to Admin' : '✓ Admin rights revoked'));
          await this.fetchTeamMembers();
          this.reRender();
        } catch (err) {
          Toast.show(`❌ Error: ${err.message}`, 'error');
          btn.disabled = false;
        }
      });
    });

    // Invite member dummy
    const inviteBtn = document.getElementById('btn-invite-member');
    if (inviteBtn) {
      inviteBtn.addEventListener('click', () => {
        Toast.show('Invitation link copied to clipboard!');
      });
    }
  },

  reRender() {
    const app = document.getElementById('app');
    if (app && window.location.hash.startsWith('#/settings')) {
      const container = app.querySelector('.page-container');
      if (container) {
        container.outerHTML = this.render();
        this.initListeners();
      }
    }
  }
};
