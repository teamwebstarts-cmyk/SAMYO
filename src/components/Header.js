import { AuthService } from '../services/auth.js';
import { StorageService } from '../services/storage.js';
import { ApiService } from '../services/api.js';
import { NotificationPanel } from './NotificationPanel.js';
import { getIcon } from '../utils/icons.js';

export const Header = {
  render() {
    const user = AuthService.getCurrentUser() || { name: 'User', role: 'Team Member', avatar: 'U', email: '' };
    const notifications = StorageService.get(StorageService.KEYS.NOTIFICATIONS, []);
    const unreadCount = notifications.filter(n => n.unread).length;

    return `
      <header class="top-header">
        <div class="header-left">
          <div class="header-brand-mobile">
            <span>🚀</span> TechCRM
          </div>
          <div class="search-input-wrapper" style="width: 100%;">
            ${getIcon('search', { size: 16 })}
            <input type="text" id="global-search-input" class="input" placeholder="Search Lead Board..." />
          </div>
        </div>

        <div class="header-right">
          <!-- Role Pill -->
          <div class="user-role-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; background: #EEF2FF; border: 1px solid #C7D2FE; color: #4338CA;" title="Account Role">
            ${getIcon('user', { size: 13, color: '#4338CA' })}
            <span>${user.role ? user.role.split('/')[0].trim() : 'Team Member'}</span>
          </div>

          <!-- Notification Bell -->
          <div style="position: relative;">
            <button id="notif-toggle-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
              ${getIcon('bell', { size: 18 })}
              ${unreadCount > 0 ? `<span id="notif-badge-count" class="badge-count">${unreadCount}</span>` : ''}
            </button>
            ${NotificationPanel.render()}
          </div>

          <!-- User Menu -->
          <div style="position: relative;">
            <button id="user-menu-btn" class="user-profile-btn" aria-haspopup="true">
              <div class="avatar">${user.avatar || (user.name ? user.name.charAt(0).toUpperCase() : 'U')}</div>
              <div class="user-profile-info">
                <div class="user-profile-name">${user.name}</div>
                <div class="user-profile-role">${(user.role || 'Team Member').split('/')[0].trim()}</div>
              </div>
              ${getIcon('chevronDown', { size: 14, style: 'color: var(--text-secondary);' })}
            </button>

            <div id="user-dropdown-menu" class="dropdown-menu">
              <div style="padding: 8px 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 4px;">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${user.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${user.email || ''}</div>
                <div style="margin-top: 4px; font-size: 11px; font-weight: 600; color: #4F46E5;">${user.role || 'Team Member'}</div>
              </div>
              <a href="#/settings" class="dropdown-item">
                ${getIcon('user', { size: 15 })}
                My Profile
              </a>
              <a href="#/settings" class="dropdown-item">
                ${getIcon('settings', { size: 15 })}
                Preferences
              </a>
              <div class="dropdown-divider"></div>
              <button id="header-logout-btn" class="dropdown-item danger" style="width: 100%; background: none; border: none; font: inherit;">
                ${getIcon('logout', { size: 15 })}
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
          window.location.hash = `#/pipeline`;
        }
      });
    }
  }
};
