import { AuthService } from '../services/auth.js';
import { StorageService } from '../services/storage.js';
import { NotificationPanel } from './NotificationPanel.js';

export const Header = {
  render() {
    const user = AuthService.getCurrentUser();
    const notifications = StorageService.get(StorageService.KEYS.NOTIFICATIONS, []);
    const unreadCount = notifications.filter(n => n.unread).length;

    return `
      <header class="top-header">
        <div class="header-left">
          <div class="header-brand-mobile">
            <span>🚀</span> TechCRM
          </div>
          <div class="search-input-wrapper" style="width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="global-search-input" class="input" placeholder="Search leads, companies, founders..." />
          </div>
        </div>

        <div class="header-right">
          <!-- Notification Bell -->
          <div style="position: relative;">
            <button id="notif-toggle-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              ${unreadCount > 0 ? `<span id="notif-badge-count" class="badge-count">${unreadCount}</span>` : ''}
            </button>
            ${NotificationPanel.render()}
          </div>

          <!-- User Menu -->
          <div style="position: relative;">
            <button id="user-menu-btn" class="user-profile-btn" aria-haspopup="true">
              <div class="avatar">${user.avatar || 'NJ'}</div>
              <div class="user-profile-info">
                <div class="user-profile-name">${user.name}</div>
                <div class="user-profile-role">${user.role.split('/')[0].trim()}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-secondary);">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div id="user-dropdown-menu" class="dropdown-menu">
              <div style="padding: 8px 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 4px;">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${user.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${user.email}</div>
              </div>
              <a href="#/settings" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Profile
              </a>
              <a href="#/settings" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Preferences
              </a>
              <div class="dropdown-divider"></div>
              <button id="header-logout-btn" class="dropdown-item danger" style="width: 100%; background: none; border: none; font: inherit;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  initListeners() {
    NotificationPanel.initListeners();

    // Toggle Notification Panel
    const notifBtn = document.getElementById('notif-toggle-btn');
    const notifPanel = document.getElementById('notification-panel');
    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel.classList.toggle('active');
        const userDropdown = document.getElementById('user-dropdown-menu');
        if (userDropdown) userDropdown.classList.remove('active');
      });
    }

    // Toggle User Menu Dropdown
    const userBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown-menu');
    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
        if (notifPanel) notifPanel.classList.remove('active');
      });
    }

    // Close popovers on click outside
    document.addEventListener('click', () => {
      if (notifPanel) notifPanel.classList.remove('active');
      if (userDropdown) userDropdown.classList.remove('active');
    });

    // Logout button
    const logoutBtn = document.getElementById('header-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        AuthService.logout();
      });
    }

    // Global search handler
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = encodeURIComponent(searchInput.value.trim());
          window.location.hash = `#/leads?q=${query}`;
        }
      });
    }
  }
};
