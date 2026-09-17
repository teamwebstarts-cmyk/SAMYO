import { StorageService } from '../services/storage.js';
import { AuthService } from '../services/auth.js';
import { Toast } from '../components/Toast.js';

export const SettingsPage = {
  currentSection: 'pipeline', // pipeline, team, general

  render() {
    const isAdmin = AuthService.isAdmin();
    const stages = StorageService.get(StorageService.KEYS.PIPELINE_STAGES, []);

    const teamMembers = [
      { name: 'Neha Jain', role: 'Sales / Fullstack Dev', leads: 48, status: 'Active', avatar: 'NJ', isCurrent: true },
      { name: 'Aman Sharma', role: 'Outreach Specialist', leads: 37, status: 'Active', avatar: 'AS', isCurrent: false },
      { name: 'Priya Verma', role: 'Agency Manager', leads: 15, status: 'Active', avatar: 'PV', isCurrent: false }
    ];

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Settings & Preferences</h1>
            <p>Configure pipeline stages, team members, outreach parameters and roles</p>
          </div>
          ${!isAdmin ? `
            <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 6px 12px; font-size: 12.5px; color: #92400E; display: flex; align-items: center; gap: 6px;">
              <span>👁️</span>
              <span><strong>Viewer Access:</strong> Configuration editing is restricted to Admin.</span>
            </div>
          ` : ''}
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-24);">
          <button class="btn btn-ghost ${this.currentSection === 'pipeline' ? 'active' : ''}" id="tab-sec-pipeline" style="border-bottom: 2px solid ${this.currentSection === 'pipeline' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection === 'pipeline' ? 'var(--primary)' : 'var(--text-secondary)'};">
            Pipeline Stages
          </button>
          <button class="btn btn-ghost ${this.currentSection === 'team' ? 'active' : ''}" id="tab-sec-team" style="border-bottom: 2px solid ${this.currentSection === 'team' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection === 'team' ? 'var(--primary)' : 'var(--text-secondary)'};">
            Team & Roles
          </button>
          <button class="btn btn-ghost ${this.currentSection === 'general' ? 'active' : ''}" id="tab-sec-general" style="border-bottom: 2px solid ${this.currentSection === 'general' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection === 'general' ? 'var(--primary)' : 'var(--text-secondary)'};">
            General & Tags
          </button>
        </div>

        <!-- Pipeline Stages Section -->
        ${this.currentSection === 'pipeline' ? `
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; max-width: 700px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 600;">Custom Outreach Stages</h3>
                <p style="font-size: 13px; color: var(--text-secondary);">Manage columns appearing in your Jira-style pipeline board</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;" id="stages-list">
              ${stages.map((stage, idx) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #F8FAFC; border: 1px solid var(--border-color); border-radius: 8px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="cursor: grab; color: var(--text-muted); font-size: 16px;">☰</span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${stage.color || '#6366F1'};"></span>
                    <span style="font-weight: 600; font-size: 14px; color: var(--text-main);">${stage.name}</span>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <span class="badge" style="background: #EEF2FF; color: #4F46E5;">Stage ${idx + 1}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Add stage inline -->
            ${isAdmin ? `
            <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              <input type="text" id="new-stage-input" class="input" placeholder="e.g. Contract In Review" style="flex: 1;" />
              <button class="btn btn-secondary" id="btn-add-stage">+ Add Stage</button>
            </div>
            ` : `
            <div style="font-size: 13px; color: var(--text-muted); font-style: italic; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              🔒 Modifying pipeline stages is restricted to Administrator.
            </div>
            `}
          </div>
        ` : ''}

        <!-- Team & Roles Section -->
        ${this.currentSection === 'team' ? `
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); overflow: hidden; max-width: 800px; box-shadow: var(--shadow-sm);">
            <div style="padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 16px; font-weight: 600;">Team Members & Outreach Seats</h3>
                <p style="font-size: 13px; color: var(--text-secondary);">3 Active team members prospecting on LinkedIn</p>
              </div>
              ${isAdmin ? `
                <button class="btn btn-primary btn-sm" id="btn-invite-member">+ Invite Member</button>
              ` : `
                <span class="badge" style="background: #F1F5F9; color: #64748B;">View Only</span>
              `}
            </div>

            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                  <th style="padding: 12px 20px;">User</th>
                  <th style="padding: 12px 20px;">Role</th>
                  <th style="padding: 12px 20px;">Leads Assigned</th>
                  <th style="padding: 12px 20px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${teamMembers.map(m => `
                  <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 20px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="avatar" style="width: 32px; height: 32px; font-size: 11px;">${m.avatar}</div>
                        <div>
                          <span style="font-weight: 600;">${m.name}</span>
                          ${m.isCurrent ? '<span class="badge" style="margin-left: 6px; background: #EEF2FF; color: #4F46E5;">You</span>' : ''}
                        </div>
                      </div>
                    </td>
                    <td style="padding: 12px 20px; color: var(--text-secondary);">${m.role}</td>
                    <td style="padding: 12px 20px; font-weight: 600;">${m.leads}</td>
                    <td style="padding: 12px 20px;">
                      <span class="badge badge-won"><span class="badge-dot"></span> Active</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- General Section -->
        ${this.currentSection === 'general' ? `
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; max-width: 600px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Agency & Service Tags</h3>
            
            <div class="form-group">
              <label class="form-label">Active Tech Services Offered</label>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">🌐 Website Development</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">📱 Mobile App Development</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">💻 Custom Software</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">🤖 AI/ML Solutions</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">🎨 UI/UX Design</span>
              </div>
            </div>

            <div class="drawer-divider"></div>

            <div class="form-group">
              <label class="form-label">Data Management</label>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Reset all mock data back to default template demo state.</p>
              ${isAdmin ? `
                <button id="btn-reset-demo-data" class="btn btn-secondary btn-sm" style="color: var(--danger);">
                  Restore Factory Demo Data
                </button>
              ` : `
                <span style="font-size: 13px; color: var(--text-muted); font-style: italic;">🔒 Data reset operations are restricted to Administrator.</span>
              `}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  initListeners() {
    const tabPipe = document.getElementById('tab-sec-pipeline');
    const tabTeam = document.getElementById('tab-sec-team');
    const tabGen = document.getElementById('tab-sec-general');

    if (tabPipe) tabPipe.addEventListener('click', () => { this.currentSection = 'pipeline'; this.reRender(); });
    if (tabTeam) tabTeam.addEventListener('click', () => { this.currentSection = 'team'; this.reRender(); });
    if (tabGen) tabGen.addEventListener('click', () => { this.currentSection = 'general'; this.reRender(); });

    if (!AuthService.isAdmin()) return;

    // Add stage
    const addStageBtn = document.getElementById('btn-add-stage');
    const newStageInput = document.getElementById('new-stage-input');
    if (addStageBtn && newStageInput) {
      addStageBtn.addEventListener('click', () => {
        const name = newStageInput.value.trim();
        if (name) {
          const stages = StorageService.get(StorageService.KEYS.PIPELINE_STAGES, []);
          const id = name.toLowerCase().replace(/\s+/g, '_');
          stages.push({ id, name, color: '#6366F1' });
          StorageService.set(StorageService.KEYS.PIPELINE_STAGES, stages);
          Toast.show(`✓ Added stage "${name}"`);
          this.reRender();
          window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
        }
      });
    }

    // Reset demo data
    const resetDataBtn = document.getElementById('btn-reset-demo-data');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        localStorage.clear();
        StorageService.init();
        Toast.show('Default data successfully restored!');
        setTimeout(() => window.location.reload(), 500);
      });
    }

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
      app.querySelector('.page-container').outerHTML = this.render();
      this.initListeners();
    }
  }
};
