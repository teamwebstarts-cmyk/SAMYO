import { LeadsService } from '../services/leads.js';


export const Sidebar = {
  render(currentRoute = '/dashboard') {
    const leads = LeadsService.getAll();
   

    const navItems = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`
      },
      {
        path: '/pipeline',
        label: 'Lead Board',
        badge: leads.filter(l => l.status !== 'lost' && l.status !== 'won').length,
        icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`
      },
    ];

    return `
      <aside class="sidebar">
                <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between; position: relative;">
          <a href="#/dashboard" class="brand-logo">
            <div class="brand-icon">🚀</div>
            <span class="brand-text">TechCRM</span>
          </a>
          <button id="btn-toggle-sidebar" class="sidebar-toggle-btn" title="Toggle Sidebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>


        <nav class="sidebar-nav">
          ${navItems.map(item => `
            <a href="#${item.path}" class="nav-link ${currentRoute === item.path ? 'active' : ''}" title="${item.label}">
              ${item.icon}
              <span class="nav-link-text">${item.label}</span>
              ${item.badge !== undefined && item.badge > 0 ? `<span class="nav-link-badge">${item.badge}</span>` : ''}
            </a>
          `).join('')}

          <div class="sidebar-divider"></div>

          <a href="#/settings" class="nav-link ${currentRoute === '/settings' ? 'active' : ''}" title="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span class="nav-link-text">Settings</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-outreach-card">
            <div class="sidebar-outreach-title">Monthly Outreach Target</div>
            <div class="sidebar-outreach-bar">
              <div class="sidebar-outreach-progress" style="width: 72%;"></div>
            </div>
            <div class="sidebar-outreach-sub">
              <span>94 / 130 Sent</span>
              <span style="font-weight: 600; color: var(--primary);">72%</span>
            </div>
          </div>
        </div>
      </aside>
    `;
  },
   initListeners() {
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('techcrm_sidebar_collapsed', isCollapsed ? 'true' : 'false');
      });
    }
  }
};
