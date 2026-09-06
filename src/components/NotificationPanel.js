import { StorageService } from '../services/storage.js';

export const NotificationPanel = {
  render() {
    const notifications = StorageService.get(StorageService.KEYS.NOTIFICATIONS, []);
    
    return `
      <div id="notification-panel" class="notification-panel">
        <div class="notification-panel-header">
          <span style="font-size: 14px; font-weight: 600; color: var(--text-main);">Notifications</span>
          <button id="btn-mark-all-read" class="btn btn-ghost btn-sm" style="font-size: 11px;">Mark all as read</button>
        </div>
        <div class="notification-list">
          ${notifications.length === 0 ? `
            <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
              No new notifications
            </div>
          ` : notifications.map(notif => `
            <div class="notification-item ${notif.unread ? 'unread' : ''}" data-id="${notif.id}">
              <span class="notif-dot ${notif.dotColor || 'notif-blue'}"></span>
              <div style="flex: 1;">
                <p style="font-size: 13px; color: var(--text-main); line-height: 1.4;">${notif.text}</p>
                <span style="font-size: 11px; color: var(--text-muted); margin-top: 2px; display: block;">${notif.time}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  initListeners() {
    const markAllBtn = document.getElementById('btn-mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        const notifications = StorageService.get(StorageService.KEYS.NOTIFICATIONS, []);
        const updated = notifications.map(n => ({ ...n, unread: false }));
        StorageService.set(StorageService.KEYS.NOTIFICATIONS, updated);
        
        // Update unread badge in header
        const badge = document.getElementById('notif-badge-count');
        if (badge) badge.style.display = 'none';

        // Re-render items
        const panel = document.getElementById('notification-panel');
        if (panel) {
          panel.querySelectorAll('.notification-item').forEach(el => el.classList.remove('unread'));
        }
      });
    }
  }
};
