import { LeadsService } from '../services/leads.js';
import { getIcon } from '../utils/icons.js';


export const Sidebar = {
  render(currentRoute = '/dashboard') {
    const leads = LeadsService.getAll();
   

    const navItems = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: getIcon('dashboard', { size: 18 })
      },
      {
        path: '/pipeline',
        label: 'Lead Board',
        badge: leads.filter(l => l.status !== 'lost' && l.status !== 'won').length,
        icon: getIcon('leads', { size: 18 })
      },
      {
        path: '/team',
        label: 'Team',
        icon: getIcon('user', { size: 18 })
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
            ${getIcon('chevronLeft', { size: 14 })}
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
            ${getIcon('settings', { size: 18 })}
            <span class="nav-link-text">Settings</span>
          </a>
        </nav>
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
