import { LeadsService } from '../services/leads.js';
import { StorageService } from '../services/storage.js';
import { KanbanColumn } from '../components/KanbanColumn.js';
import { LeadDrawer } from '../components/LeadDrawer.js';
import { LostReasonModal } from '../components/LostReasonModal.js';
import { Toast } from '../components/Toast.js';

export const PipelinePage = {
  currentSearch: '',
  currentPriority: 'all',
  currentRequirement: 'all',
  draggedLeadId: null,

  render() {
    const allLeads = LeadsService.getAll();
    const stages = StorageService.get(StorageService.KEYS.PIPELINE_STAGES, [
      { id: 'new', name: 'New Leads' },
      { id: 'request_sent', name: 'Request Sent' },
      { id: 'connected', name: 'Connected' },
      { id: 'qualified', name: 'Qualified' },
      { id: 'proposal', name: 'Proposal' },
      { id: 'won', name: 'Won' }
    ]);

    // Apply client filters
    let filtered = allLeads.filter(lead => {
      const matchesSearch = !this.currentSearch ||
        lead.name.toLowerCase().includes(this.currentSearch) ||
        lead.company.toLowerCase().includes(this.currentSearch);

      const matchesPriority = this.currentPriority === 'all' || lead.priority === this.currentPriority;

      const matchesReq = this.currentRequirement === 'all' ||
        (Array.isArray(lead.requirements) && lead.requirements.some(r => r.toLowerCase().includes(this.currentRequirement.toLowerCase())));

      return matchesSearch && matchesPriority && matchesReq;
    });

    const lostCount = allLeads.filter(l => l.status === 'lost').length;
    const wonCount = allLeads.filter(l => l.status === 'won').length;

    return `
      <div class="page-container">
        <!-- Page Header & Actions -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Outreach Pipeline</h1>
            <p>Jira-style relationship pipeline: Discovery → Connection → Conversation → Proposal → Won</p>
          </div>
          <button class="btn btn-primary" id="btn-pipeline-add-lead">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Add Lead
          </button>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: var(--space-20); flex-wrap: wrap;">
          <div style="display: flex; gap: 12px; align-items: center; flex: 1; min-width: 280px; max-width: 500px;">
            <div class="search-input-wrapper" style="width: 100%;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="pipeline-search" class="input" placeholder="Search leads by name or company..." value="${this.currentSearch}" />
            </div>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <!-- Priority Filter -->
            <select id="pipeline-filter-priority" class="select" style="width: auto; font-size: 13px;">
              <option value="all" ${this.currentPriority === 'all' ? 'selected' : ''}>All Priorities</option>
              <option value="high" ${this.currentPriority === 'high' ? 'selected' : ''}>🔥 High Priority</option>
              <option value="medium" ${this.currentPriority === 'medium' ? 'selected' : ''}>Medium Priority</option>
              <option value="low" ${this.currentPriority === 'low' ? 'selected' : ''}>Low Priority</option>
            </select>

            <!-- Tech Requirement Filter -->
            <select id="pipeline-filter-tech" class="select" style="width: auto; font-size: 13px;">
              <option value="all" ${this.currentRequirement === 'all' ? 'selected' : ''}>All Services</option>
              <option value="website" ${this.currentRequirement === 'website' ? 'selected' : ''}>🌐 Website</option>
              <option value="mobile" ${this.currentRequirement === 'mobile' ? 'selected' : ''}>📱 Mobile App</option>
              <option value="ai" ${this.currentRequirement === 'ai' ? 'selected' : ''}>🤖 AI/ML</option>
              <option value="ui/ux" ${this.currentRequirement === 'ui/ux' ? 'selected' : ''}>🎨 UI/UX</option>
              <option value="software" ${this.currentRequirement === 'software' ? 'selected' : ''}>💻 Software</option>
            </select>

            <button id="btn-reset-filters" class="btn btn-ghost btn-sm" style="font-size: 12px;">Reset</button>
          </div>
        </div>

        <!-- Kanban Board Area -->
        <div class="kanban-wrapper">
          <div class="kanban-board" id="kanban-board-container">
            ${stages.map(stage => KanbanColumn.render(stage, filtered)).join('')}
          </div>
        </div>

        <!-- Won & Lost Drop Zones Bar -->
        <div class="won-lost-drop-bar">
          <div class="outcome-drop-zone won" data-stage="won" title="Drop here to mark as Won">
            <span style="font-size: 18px;">🏆</span>
            <span>WON STAGE (${wonCount} Deals)</span>
          </div>
          <div class="outcome-drop-zone lost" data-stage="lost" title="Drop here to record Lost reason">
            <span style="font-size: 18px;">🔴</span>
            <span>LOST STAGE (${lostCount} Leads) — Drop to record reason</span>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    // Add lead button
    const addLeadBtn = document.getElementById('btn-pipeline-add-lead');
    if (addLeadBtn) {
      addLeadBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'));
      });
    }

    // Search filter
    const searchInput = document.getElementById('pipeline-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentSearch = e.target.value.toLowerCase().trim();
        this.refreshBoard();
      });
    }

    // Priority filter
    const prioritySelect = document.getElementById('pipeline-filter-priority');
    if (prioritySelect) {
      prioritySelect.addEventListener('change', (e) => {
        this.currentPriority = e.target.value;
        this.refreshBoard();
      });
    }

    // Tech filter
    const techSelect = document.getElementById('pipeline-filter-tech');
    if (techSelect) {
      techSelect.addEventListener('change', (e) => {
        this.currentRequirement = e.target.value;
        this.refreshBoard();
      });
    }

    // Reset filters
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.currentSearch = '';
        this.currentPriority = 'all';
        this.currentRequirement = 'all';
        this.refreshBoard();
      });
    }

    this.bindKanbanInteractions();
  },

  bindKanbanInteractions() {
    const container = document.getElementById('app');
    if (!container) return;

    // Card Click -> Open Drawer
    container.querySelectorAll('.lead-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent opening if user was finishing a drag
        if (card.classList.contains('is-dragging')) return;
        const leadId = card.getAttribute('data-id');
        if (leadId) LeadDrawer.open(leadId);
      });

      // Drag Start
      card.addEventListener('dragstart', (e) => {
        this.draggedLeadId = card.getAttribute('data-id');
        card.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.draggedLeadId);
      });

      // Drag End
      card.addEventListener('dragend', () => {
        card.classList.remove('is-dragging');
        this.draggedLeadId = null;
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      });
    });

    // Drop Targets (Columns & Outcome Zones)
    const dropZones = container.querySelectorAll('.kanban-column, .outcome-drop-zone');
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('drag-over');
      });

      zone.addEventListener('dragleave', (e) => {
        if (!zone.contains(e.relatedTarget)) {
          zone.classList.remove('drag-over');
        }
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');

        const leadId = e.dataTransfer.getData('text/plain') || this.draggedLeadId;
        const newStage = zone.getAttribute('data-stage');

        if (leadId && newStage) {
          this.handleLeadDrop(leadId, newStage);
        }
      });
    });
  },

  handleLeadDrop(leadId, newStage) {
    const lead = LeadsService.getById(leadId);
    if (!lead || lead.status === newStage) return;

    if (newStage === 'lost') {
      // Open lost reason modal
      LostReasonModal.open(leadId);
    } else {
      LeadsService.updateStatus(leadId, newStage);
      const stageName = newStage.replace('_', ' ');
      Toast.show(`✓ Lead "${lead.name}" moved to ${stageName.toUpperCase()}`);
      window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
    }
  },

  refreshBoard() {
    const kanbanWrapper = document.querySelector('.kanban-wrapper');
    if (kanbanWrapper) {
      const stages = StorageService.get(StorageService.KEYS.PIPELINE_STAGES, [
        { id: 'new', name: 'New Leads' },
        { id: 'request_sent', name: 'Request Sent' },
        { id: 'connected', name: 'Connected' },
        { id: 'qualified', name: 'Qualified' },
        { id: 'proposal', name: 'Proposal' },
        { id: 'won', name: 'Won' }
      ]);
      const allLeads = LeadsService.getAll();
      const filtered = allLeads.filter(lead => {
        const matchesSearch = !this.currentSearch ||
          lead.name.toLowerCase().includes(this.currentSearch) ||
          lead.company.toLowerCase().includes(this.currentSearch);
        const matchesPriority = this.currentPriority === 'all' || lead.priority === this.currentPriority;
        const matchesReq = this.currentRequirement === 'all' ||
          (Array.isArray(lead.requirements) && lead.requirements.some(r => r.toLowerCase().includes(this.currentRequirement.toLowerCase())));
        return matchesSearch && matchesPriority && matchesReq;
      });

      const boardContainer = document.getElementById('kanban-board-container');
      if (boardContainer) {
        boardContainer.innerHTML = stages.map(stage => KanbanColumn.render(stage, filtered)).join('');
        this.bindKanbanInteractions();
      }
    }
  }
};
