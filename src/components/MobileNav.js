import { getIcon } from '../utils/icons.js';

export const MobileNav = {
  render(currentRoute = '/dashboard') {
    const items = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: getIcon('dashboard', { size: 20 })
      },
      {
        path: '/pipeline',
        label: 'Lead Board',
        icon: getIcon('leads', { size: 20 })
      },
      {
        path: '/team',
        label: 'Team',
        icon: getIcon('user', { size: 20 })
      },
    ];

    return `
      <nav class="mobile-bottom-nav">
        ${items.map(item => `
          <a href="#${item.path}" class="mobile-nav-item ${currentRoute === item.path ? 'active' : ''}">
            ${item.icon}
            <span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
    `;
  }
};
