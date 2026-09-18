import { AuthService } from './services/auth.js';
import { StorageService } from './services/storage.js';
import { LeadsService } from './services/leads.js';
import { FollowUpsService } from './services/followups.js';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { MobileNav } from './components/MobileNav.js';
import { LeadDrawer } from './components/LeadDrawer.js';
import { AddLeadModal } from './components/AddLeadModal.js';
import { LostReasonModal } from './components/LostReasonModal.js';
import { ScheduleFollowupModal } from './components/ScheduleFollowupModal.js';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.js';
import { Toast } from './components/Toast.js';

// Pages
import { LoginPage } from './pages/Login.js';
import { DashboardPage } from './pages/Dashboard.js';
import { PipelinePage } from './pages/Pipeline.js';
import { TeamPage } from './pages/Team.js';
import { SettingsPage } from './pages/Settings.js';

class App {
  constructor() {
    this.appEl = document.getElementById('app');
    this.modalRoot = document.getElementById('modal-root');
    this.currentRoute = '/dashboard';

    this.routes = {
      '/login': LoginPage,
      '/dashboard': DashboardPage,
      '/pipeline': PipelinePage,
      '/team': TeamPage,
      '/settings': SettingsPage
    };

    this.init();
  }

  async init() {
    // Ensure storage structure is initialized
    StorageService.init();

    // Restore sidebar collapsed preference
    if (localStorage.getItem('techcrm_sidebar_collapsed') === 'true') {
      document.body.classList.add('sidebar-collapsed');
    }

    // Mount permanent modal & drawer containers
    this.mountModals();

    // Register global event listeners
    this.registerGlobalEvents();

    // Router listeners
    window.addEventListener('hashchange', () => this.handleRoute());

    // Initial route handling with session verification
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    } else {
      await this.handleRoute();
    }
  }

  mountModals() {
    if (this.modalRoot) {
      this.modalRoot.innerHTML = `
        ${LeadDrawer.render()}
        ${AddLeadModal.render()}
        ${LostReasonModal.render()}
        ${ScheduleFollowupModal.render()}
        ${DeleteConfirmModal.render()}
      `;

      // Initialize modal event listeners
      LeadDrawer.initGlobalListeners();
      AddLeadModal.initListeners();
      LostReasonModal.initListeners();
      ScheduleFollowupModal.initListeners();
      DeleteConfirmModal.initListeners();
    }
  }

  registerGlobalEvents() {
    window.addEventListener('techcrm:open-add-lead', () => {
      if (!AuthService.isAuthenticated()) {
        window.location.hash = '#/login';
        return;
      }
      AddLeadModal.open();
    });

    window.addEventListener('techcrm:open-schedule-followup', () => {
      if (!AuthService.isAuthenticated()) {
        window.location.hash = '#/login';
        return;
      }
      ScheduleFollowupModal.open();
    });

    window.addEventListener('techcrm:confirm-delete', (e) => {
      if (!AuthService.isAuthenticated()) {
        window.location.hash = '#/login';
        return;
      }
      if (e.detail?.leadId) {
        DeleteConfirmModal.open(e.detail.leadId);
      }
    });

    window.addEventListener('techcrm:data-changed', () => {
      // Re-render the active page to keep view updated
      this.renderCurrentView();
    });
  }

  getRoutePath() {
    const hash = window.location.hash.slice(1);
    if (!hash) return '/dashboard';
    const cleanPath = hash.split('?')[0];
    return cleanPath || '/dashboard';
  }

  async handleRoute() {
    const path = this.getRoutePath();

    // If a token exists, validate session against /api/auth/me
    if (AuthService.getToken()) {
      try {
        const user = await AuthService.validateSession();
        if (!user && path !== '/login') {
          window.location.hash = '#/login';
          return;
        }
      } catch {
        AuthService.clearSession();
        if (path !== '/login') {
          window.location.hash = '#/login';
          return;
        }
      }
    }

    // Auth guard
    if (path !== '/login' && !AuthService.isAuthenticated()) {
      window.location.hash = '#/login';
      return;
    }

    if (path === '/login' && AuthService.isAuthenticated()) {
      window.location.hash = '#/dashboard';
      return;
    }

    this.currentRoute = path;

    // Fetch team data if navigating to team page
    if (path === '/team') {
      try {
        await TeamPage.fetchData();
      } catch (e) {
        console.warn('Team data preload error:', e);
      }
    }

    // Fetch user's CRM data only when authenticated
    if (AuthService.isAuthenticated() && path !== '/login') {
      Promise.all([
        LeadsService.fetchFromMongoDB(),
        FollowUpsService.fetchFromMongoDB()
      ]).then(() => {
        this.renderCurrentView();
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
      }).catch(err => {
        console.warn('Error fetching CRM data:', err.message);
      });
    }

    this.renderCurrentView();
  }

  renderCurrentView() {
    const pageComponent = this.routes[this.currentRoute] || DashboardPage;

    if (this.currentRoute === '/login') {
      this.appEl.innerHTML = pageComponent.render();
      pageComponent.initListeners();
      return;
    }

    // Standard App Shell
    this.appEl.innerHTML = `
      <div class="app-shell">
        ${Sidebar.render(this.currentRoute)}
        <div class="main-wrapper">
          ${Header.render()}
          <main id="main-content-area">
            ${pageComponent.render()}
          </main>
        </div>
        ${MobileNav.render(this.currentRoute)}
      </div>
    `;

    // Initialize listeners
    Header.initListeners();
    Sidebar.initListeners();

    if (pageComponent.initListeners) {
      pageComponent.initListeners();
    }
  }
}

// Start application
new App();
