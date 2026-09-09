export const MobileNav = {
  render(currentRoute = '/dashboard') {
    const items = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`
      },
      {
        path: '/pipeline',
        label: 'Leaderboard',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`
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
