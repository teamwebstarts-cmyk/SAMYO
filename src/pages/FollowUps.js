import { FollowUpsService } from '../services/followups.js';
import { Toast } from '../components/Toast.js';

export const FollowUpsPage = {
  currentTab: 'today', // today, upcoming, completed

  render() {
    const tasks = FollowUpsService.getByCategory(this.currentTab);
    const todayCount = FollowUpsService.getByCategory('today').length;
    const upcomingCount = FollowUpsService.getByCategory('upcoming').length;
    const completedCount = FollowUpsService.getByCategory('completed').length;

    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Outreach Follow-ups</h1>
            <p>Task manager to ensure zero LinkedIn prospects slip through the cracks</p>
          </div>
          <button class="btn btn-primary" id="btn-schedule-followup-trigger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Schedule Follow-up
          </button>
        </div>

        <!-- Filter Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-24);">
          <button class="btn btn-ghost ${this.currentTab === 'today' ? 'active' : ''}" id="tab-today" style="border-bottom: 2px solid ${this.currentTab === 'today' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentTab === 'today' ? 'var(--primary)' : 'var(--text-secondary)'};">
            Today (${todayCount})
          </button>
          <button class="btn btn-ghost ${this.currentTab === 'upcoming' ? 'active' : ''}" id="tab-upcoming" style="border-bottom: 2px solid ${this.currentTab === 'upcoming' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentTab === 'upcoming' ? 'var(--primary)' : 'var(--text-secondary)'};">
            Upcoming (${upcomingCount})
          </button>
          <button class="btn btn-ghost ${this.currentTab === 'completed' ? 'active' : ''}" id="tab-completed" style="border-bottom: 2px solid ${this.currentTab === 'completed' ? 'var(--primary)' : 'transparent'}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentTab === 'completed' ? 'var(--primary)' : 'var(--text-secondary)'};">
            Completed (${completedCount})
          </button>
        </div>

        <!-- Tasks List -->
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 800px;">
          ${tasks.length === 0 ? `
            <div class="empty-state">
              <div class="empty-icon">🎉</div>
              <div class="empty-title">All caught up!</div>
              <div class="empty-desc">You have no pending follow-up tasks in this category.</div>
              <button class="btn btn-secondary btn-sm" id="btn-schedule-empty">+ Schedule New Task</button>
            </div>
          ` : tasks.map(task => {
            let priorityBadge = '';
            if (task.priority === 'overdue') {
              priorityBadge = `<span class="badge" style="background: #FEE2E2; color: #DC2626;"><span class="badge-dot" style="background: #DC2626;"></span> 🔴 Overdue</span>`;
            } else if (task.priority === 'today') {
              priorityBadge = `<span class="badge" style="background: #FEF3C7; color: #D97706;"><span class="badge-dot" style="background: #F59E0B;"></span> 🟠 Due Today</span>`;
            } else {
              priorityBadge = `<span class="badge" style="background: #EEF2FF; color: #4F46E5;"><span class="badge-dot" style="background: #6366F1;"></span> 🔵 Upcoming</span>`;
            }

            return `
              <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 20px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 12px; position: relative;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main);">${task.leadName}</h3>
                      <span style="font-size: 13px; color: var(--text-secondary);">•</span>
                      <span style="font-size: 13px; color: var(--text-secondary);">${task.company}</span>
                    </div>
                    <p style="font-size: 14px; color: var(--text-main); font-weight: 500;">
                      ${task.task}
                    </p>
                  </div>
                  <div>
                    ${priorityBadge}
                  </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 4px; flex-wrap: wrap; gap: 8px;">
                  <span style="font-size: 12px; color: var(--text-muted);">
                    Scheduled: <strong>${task.dueLabel || 'Today'}</strong>
                  </span>

                  <div style="display: flex; gap: 8px; align-items: center;">
                    ${task.linkedinUrl ? `
                      <a href="${task.linkedinUrl}" target="_blank" class="btn btn-secondary btn-sm" style="gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg>
                        Open LinkedIn
                      </a>
                    ` : ''}

                    ${!task.completed ? `
                      <button class="btn btn-ghost btn-sm btn-snooze-task" data-id="${task.id}">
                        Snooze
                      </button>
                      <button class="btn btn-primary btn-sm btn-complete-task" data-id="${task.id}" style="background: #16A34A;">
                        ✓ Complete
                      </button>
                    ` : `
                      <span style="font-size: 12px; color: #16A34A; font-weight: 600;">✓ Completed</span>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  initListeners() {
    // Tab toggles
    const tabToday = document.getElementById('tab-today');
    const tabUpcoming = document.getElementById('tab-upcoming');
    const tabCompleted = document.getElementById('tab-completed');

    if (tabToday) {
      tabToday.addEventListener('click', () => {
        this.currentTab = 'today';
        this.reRender();
      });
    }
    if (tabUpcoming) {
      tabUpcoming.addEventListener('click', () => {
        this.currentTab = 'upcoming';
        this.reRender();
      });
    }
    if (tabCompleted) {
      tabCompleted.addEventListener('click', () => {
        this.currentTab = 'completed';
        this.reRender();
      });
    }

    // Schedule modal triggers
    const trigger = document.getElementById('btn-schedule-followup-trigger');
    const emptyTrigger = document.getElementById('btn-schedule-empty');
    if (trigger) trigger.addEventListener('click', () => window.dispatchEvent(new CustomEvent('techcrm:open-schedule-followup')));
    if (emptyTrigger) emptyTrigger.addEventListener('click', () => window.dispatchEvent(new CustomEvent('techcrm:open-schedule-followup')));

    // Complete action
    document.querySelectorAll('.btn-complete-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        FollowUpsService.complete(id);
        Toast.show('✓ Follow-up marked complete!');
        this.reRender();
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
      });
    });

    // Snooze action
    document.querySelectorAll('.btn-snooze-task').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        FollowUpsService.snooze(id, 2);
        Toast.show('Task snoozed by 2 days');
        this.reRender();
        window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
      });
    });
  },

  reRender() {
    const app = document.getElementById('app');
    if (app && window.location.hash.startsWith('#/followups')) {
      app.querySelector('.page-container').outerHTML = this.render();
      this.initListeners();
    }
  }
};
