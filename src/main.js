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
      '/settings': SettingsPage
    };

    this.init();
  }

  init() {
    // Ensure seed data is ready
    StorageService.init();
    // Restore sidebar collapsed preference
    if (localStorage.getItem('techcrm_sidebar_collapsed') === 'true') {
      document.body.classList.add('sidebar-collapsed');
    }

    // Sync fresh leads and followups from MongoDB Atlas cloud database
    Promise.all([
      LeadsService.fetchFromMongoDB(),
      FollowUpsService.fetchFromMongoDB()
    ]).then(() => {
      this.renderCurrentView();
      // Notify components that MongoDB data is ready
      window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
    });

    // Mount permanent modal & drawer containers
    this.mountModals();

    // Register global event listeners
    this.registerGlobalEvents();

    // Router listeners
    window.addEventListener('hashchange', () => this.handleRoute());

    // Initial route handling
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    } else {
      this.handleRoute();
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
      if (!AuthService.isAdmin()) {
        Toast.show('Action restricted: Only administrators can create leads', 'warning');
        return;
      }
      AddLeadModal.open();
    });

    window.addEventListener('techcrm:open-schedule-followup', () => {
      if (!AuthService.isAdmin()) {
        Toast.show('Action restricted: Only administrators can schedule tasks', 'warning');
        return;
      }
      ScheduleFollowupModal.open();
    });

    window.addEventListener('techcrm:confirm-delete', (e) => {
      if (!AuthService.isAdmin()) {
        Toast.show('Action restricted: Only administrators can delete records', 'warning');
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

  handleRoute() {
    const path = this.getRoutePath();

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
