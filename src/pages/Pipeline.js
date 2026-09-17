import { LeadsService } from '../services/leads.js';
import { StorageService } from '../services/storage.js';
import { AuthService } from '../services/auth.js';
import { KanbanColumn } from '../components/KanbanColumn.js';
import { LeadDrawer } from '../components/LeadDrawer.js';
import { LostReasonModal } from '../components/LostReasonModal.js';
import { Toast } from '../components/Toast.js';

export const PipelinePage = {
  currentSearch: '',
  currentPriority: 'all',
  currentRequirement: 'all',
  currentDateRange: 'all',
  draggedLeadId: null,

  // Helper to fetch stages with default visibility
  getStages() {
    return StorageService.get(StorageService.KEYS.PIPELINE_STAGES, [
      { id: 'new', name: 'New Leads', visible: true },
      { id: 'request_sent', name: 'Request Sent', visible: true },
      { id: 'connected', name: 'Connected', visible: true },
      { id: 'qualified', name: 'Qualified', visible: true },
      { id: 'proposal', name: 'Proposal', visible: true },
      { id: 'won', name: 'Won', visible: true }
    ]);
  },

  // Helper to check if a lead matches the selected date range
  matchesDateRange(lead) {
    if (this.currentDateRange === 'all') return true;
    const dateValue = lead.addedDate || lead.createdAt;
    if (!dateValue) return false;

    const leadTime = new Date(dateValue).getTime();
    const now = Date.now();
    const diffDays = (now - leadTime) / (1000 * 60 * 60 * 24);

    if (this.currentDateRange === '7days') {
      return diffDays <= 7;
    } else if (this.currentDateRange === '30days') {
      return diffDays <= 30;
    } else if (this.currentDateRange === '1year') {
      return diffDays <= 365;
    }
    return true;
  },

  render() {
    const allLeads = LeadsService.getAll();
    const stages = this.getStages();
    const isAdmin = AuthService.isAdmin();
    // Filter only columns that are checked/visible (default true)
    const visibleStages = stages.filter(s => s.visible !== false);

    // Apply client filters
    let filtered = allLeads.filter(lead => {
      const q = this.currentSearch.toLowerCase();
      const matchesSearch = !q ||
        (lead.name && lead.name.toLowerCase().includes(q)) ||
        (lead.company && lead.company.toLowerCase().includes(q));

      const matchesPriority = this.currentPriority === 'all' || lead.priority === this.currentPriority;

      const matchesReq = this.currentRequirement === 'all' ||
        (Array.isArray(lead.requirements) && lead.requirements.some(r => r.toLowerCase().includes(this.currentRequirement.toLowerCase())));

      const matchesDate = this.matchesDateRange(lead);

      return matchesSearch && matchesPriority && matchesReq && matchesDate;
    });

    const lostCount = allLeads.filter(l => l.status === 'lost').length;
    const wonCount = allLeads.filter(l => l.status === 'won').length;

    return `
      <div class="page-container">
        <!-- Page Header & Actions -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Lead Board</h1>
            <p>Discovery → Connection → Conversation → Proposal → Won</p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            ${isAdmin ? `
              <!-- Customize Columns Dropdown -->
              <div style="position: relative;">
                <button class="btn btn-secondary" id="btn-toggle-column-menu" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/>
                  </svg>
                  Columns ▾
                </button>

                <div id="column-customize-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); width: 330px; z-index: 100; background: #ffffff; border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.14); padding: 16px;">
                  <div style="font-size: 13px; font-weight: 600; color: var(--text-main); margin-bottom: 2px;">Customize Columns</div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Toggle visibility, reorder (↑/↓) or delete any column</div>

                  <!-- Column Checkboxes & Reorder List -->
                  <div id="column-checkboxes-container" style="display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; padding-right: 4px;">
                    <!-- Dynamically rendered items -->
                  </div>

                  <div style="border-top: 1px solid var(--border-subtle); margin: 14px 0 12px;"></div>

                  <!-- Add New Column Form -->
                  <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--text-main);">Add New Column</div>
                  <div style="display: flex; gap: 8px;">
                    <input type="text" id="input-new-column-name" class="input" placeholder="Column name (e.g. In Review)..." style="font-size: 12px; padding: 6px 10px; height: 32px; flex: 1;" />
                    <button id="btn-submit-new-column" class="btn btn-primary" style="font-size: 12px; padding: 0 14px; height: 32px; white-space: nowrap;">+ Add</button>
                  </div>
                </div>
              </div>

              <button class="btn btn-primary" id="btn-pipeline-add-lead">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Lead
              </button>
            ` : `
              <span style="font-size: 12px; color: #854D0E; background: #FEF9C3; border: 1px solid #FEF08A; padding: 6px 12px; border-radius: 8px; font-weight: 600;">
                👁️ View Only
              </span>
            `}
          </div>
        </div>

        ${!isAdmin ? `
          <!-- Read-Only Banner for Viewers -->
          <div style="background: #FEF9C3; border: 1px solid #FEF08A; border-radius: 10px; padding: 12px 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #854D0E;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 18px;">👁️</span>
              <span><strong>Viewer (Read-Only) Mode:</strong> You can view all live leads, stages, and metrics. Modifying leads, drag-and-drop, and column editing are restricted to Admin.</span>
            </div>
            <span style="font-size: 11px; font-weight: 700; background: #FEF08A; color: #713F12; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Read Only</span>
          </div>
        ` : ''}

        <!-- Filter & Search Controls Bar -->
        <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: var(--space-20); flex-wrap: wrap;">
          <div style="display: flex; gap: 12px; align-items: center; flex: 1; min-width: 280px; max-width: 450px;">
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

            <!-- Date Range Filter (Last 7 days, Last month, Last year) -->
            <select id="pipeline-filter-date" class="select" style="width: auto; font-size: 13px;">
              <option value="all" ${this.currentDateRange === 'all' ? 'selected' : ''}>🕒 All Time</option>
              <option value="7days" ${this.currentDateRange === '7days' ? 'selected' : ''}>📅 Last 7 Days</option>
              <option value="30days" ${this.currentDateRange === '30days' ? 'selected' : ''}>📅 Last Month</option>
              <option value="1year" ${this.currentDateRange === '1year' ? 'selected' : ''}>📅 Last Year</option>
            </select>

            <button id="btn-reset-filters" class="btn btn-ghost btn-sm" style="font-size: 12px;">Reset</button>
          </div>
        </div>

        <!-- Kanban Board Area -->
        <div class="kanban-wrapper">
          <div class="kanban-board" id="kanban-board-container">
            ${visibleStages.length === 0 ? `
              <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
                No columns selected. Click <strong>Columns ▾</strong> above to show columns.
              </div>
            ` : visibleStages.map(stage => KanbanColumn.render(stage, filtered)).join('')}
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

    // Date range filter
    const dateSelect = document.getElementById('pipeline-filter-date');
    if (dateSelect) {
      dateSelect.addEventListener('change', (e) => {
        this.currentDateRange = e.target.value;
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
        this.currentDateRange = 'all';

        const sInput = document.getElementById('pipeline-search');
        if (sInput) sInput.value = '';
        const pSelect = document.getElementById('pipeline-filter-priority');
        if (pSelect) pSelect.value = 'all';
        const tSelect = document.getElementById('pipeline-filter-tech');
        if (tSelect) tSelect.value = 'all';
        const dSelect = document.getElementById('pipeline-filter-date');
        if (dSelect) dSelect.value = 'all';

        this.refreshBoard();
      });
    }

    // Initialize Column Customizer
    this.initColumnCustomizer();

    this.bindKanbanInteractions();
  },

  initColumnCustomizer() {
    const toggleBtn = document.getElementById('btn-toggle-column-menu');
    const dropdown = document.getElementById('column-customize-dropdown');
    const addBtn = document.getElementById('btn-submit-new-column');
    const input = document.getElementById('input-new-column-name');

    if (!toggleBtn || !dropdown) return;

    // Toggle menu dropdown
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
      dropdown.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        this.renderColumnCheckboxes();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== toggleBtn) {
        dropdown.style.display = 'none';
      }
    });

    // Render initial checkbox list
    this.renderColumnCheckboxes();

    // Add new column logic with position selection
    const handleAdd = () => {
      const name = input.value.trim();
      if (!name) return;

      const newId = 'stage_' + Date.now();
      const newStage = { id: newId, name, visible: true };
      const stages = this.getStages();
      stages.push(newStage);


      StorageService.set(StorageService.KEYS.PIPELINE_STAGES, stages);

      input.value = '';
      this.renderColumnCheckboxes();
      this.refreshBoard();
      Toast.show(`✓ Added column "${name}"`);
    };

    if (addBtn) addBtn.addEventListener('click', handleAdd);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAdd();
        }
      });
    }
  },

  renderColumnCheckboxes() {
    const container = document.getElementById('column-checkboxes-container');
    if (!container) return;

    const stages = this.getStages();
    // Default columns jinhe delete nahi kiya ja sakta
    const DEFAULT_STAGE_IDS = ['new', 'request_sent', 'connected', 'qualified', 'proposal', 'won'];

    // 1. Render Columns List with Drag Handle (⠿), Checkbox, and Conditional Delete
    container.innerHTML = stages.map((stage, index) => {
      const isDefault = DEFAULT_STAGE_IDS.includes(stage.id);

      return `
        <div class="col-drag-item" draggable="true" data-index="${index}" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; font-size: 13px; background: #F8FAFC; border: 1px solid var(--border-subtle); cursor: grab; user-select: none; transition: background 0.15s ease;">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; overflow: hidden;">
            <!-- Drag & Drop Handle Icon -->
            <span title="Drag to reorder" style="color: var(--text-muted); font-size: 14px; cursor: grab; padding: 0 2px;">⠿</span>
            
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; margin: 0; overflow: hidden;">
              <input type="checkbox" class="column-visibility-toggle" data-stage-id="${stage.id}" ${stage.visible !== false ? 'checked' : ''} style="cursor: pointer;" />
              <span style="color: var(--text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${stage.name}
              </span>
            </label>
          </div>

          <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;">
            <!-- Move Up / Down Buttons (Alternative to Drag) -->
            <button class="btn-move-col-up" data-index="${index}" title="Move up" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${index === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"' : ''}>↑</button>
            <button class="btn-move-col-down" data-index="${index}" title="Move down" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${index === stages.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"' : ''}>↓</button>
            
            <!-- Delete Button: SIRF custom added columns ke liye dikhega, default columns ke liye nahi -->
            ${!isDefault ? `
              <button class="btn-delete-column" data-stage-id="${stage.id}" title="Delete column" style="background: #FEE2E2; border: 1px solid #FECACA; border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; color: #DC2626; cursor: pointer; font-size: 12px; font-weight: bold;">✕</button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // 3. Drag and Drop Listeners for Columns Reordering
    let draggedColIndex = null;
    const dragItems = container.querySelectorAll('.col-drag-item');

    dragItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        draggedColIndex = parseInt(item.getAttribute('data-index'), 10);
        e.dataTransfer.effectAllowed = 'move';
        item.style.opacity = '0.4';
      });

      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
        dragItems.forEach(el => {
          el.style.borderTop = '1px solid var(--border-subtle)';
          el.style.background = '#F8FAFC';
        });
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        item.style.background = '#EEF2FF';
      });

      item.addEventListener('dragleave', () => {
        item.style.background = '#F8FAFC';
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.style.background = '#F8FAFC';
        const targetIndex = parseInt(item.getAttribute('data-index'), 10);

        if (draggedColIndex !== null && draggedColIndex !== targetIndex) {
          const currentStages = this.getStages();
          const [movedItem] = currentStages.splice(draggedColIndex, 1);
          currentStages.splice(targetIndex, 0, movedItem);

          StorageService.set(StorageService.KEYS.PIPELINE_STAGES, currentStages);
          this.renderColumnCheckboxes();
          this.refreshBoard();
          Toast.show(`✓ Column moved to position ${targetIndex + 1}`);
        }
      });
    });

    // 4. Checkbox toggling
    container.querySelectorAll('.column-visibility-toggle').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const stageId = cb.getAttribute('data-stage-id');
        const currentStages = this.getStages();
        const stage = currentStages.find(s => s.id === stageId);
        if (stage) {
          stage.visible = e.target.checked;
          StorageService.set(StorageService.KEYS.PIPELINE_STAGES, currentStages);
          this.refreshBoard();
        }
      });
    });

    // 5. Move column Up
    container.querySelectorAll('.btn-move-col-up').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        const currentStages = this.getStages();
        if (index > 0) {
          const temp = currentStages[index];
          currentStages[index] = currentStages[index - 1];
          currentStages[index - 1] = temp;
          StorageService.set(StorageService.KEYS.PIPELINE_STAGES, currentStages);
          this.renderColumnCheckboxes();
          this.refreshBoard();
        }
      });
    });

    // 6. Move column Down
    container.querySelectorAll('.btn-move-col-down').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        const currentStages = this.getStages();
        if (index < currentStages.length - 1) {
          const temp = currentStages[index];
          currentStages[index] = currentStages[index + 1];
          currentStages[index + 1] = temp;
          StorageService.set(StorageService.KEYS.PIPELINE_STAGES, currentStages);
          this.renderColumnCheckboxes();
          this.refreshBoard();
        }
      });
    });

    // 7. Delete Custom Column
    container.querySelectorAll('.btn-delete-column').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const stageId = btn.getAttribute('data-stage-id');
        let currentStages = this.getStages();

        if (DEFAULT_STAGE_IDS.includes(stageId)) {
          Toast.show('Default columns cannot be deleted', 'warning');
          return;
        }

        const stageName = currentStages.find(s => s.id === stageId)?.name || 'Column';
        currentStages = currentStages.filter(s => s.id !== stageId);
        StorageService.set(StorageService.KEYS.PIPELINE_STAGES, currentStages);
        this.renderColumnCheckboxes();
        this.refreshBoard();
        Toast.show(`✓ "${stageName}" removed`);
      });
    });
  },


  bindKanbanInteractions() {
    const container = document.getElementById('app');
    if (!container) return;
    const isAdmin = AuthService.isAdmin();

    // Card Click -> Open Drawer (always available)
    container.querySelectorAll('.lead-card').forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('is-dragging')) return;
        const leadId = card.getAttribute('data-id');
        if (leadId) LeadDrawer.open(leadId);
      });

      // Drag Start only if Admin
      if (isAdmin) {
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
      } else {
        // Prevent accidental drag for viewers
        card.addEventListener('dragstart', (e) => e.preventDefault());
      }
    });

    // Drop Targets (only active if Admin)
    if (isAdmin) {
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
    }
  },

  async handleLeadDrop(leadId, newStage) {
    if (!AuthService.isAdmin()) {
      Toast.show('Access Denied: Only Admin can move leads to another stage', 'error');
      return;
    }

    const lead = LeadsService.getById(leadId);
    if (!lead || lead.status === newStage) return;

    if (newStage === 'lost') {
      LostReasonModal.open(leadId);
    } else {
      await LeadsService.updateStatus(leadId, newStage);
      const stageName = newStage.replace('_', ' ');
      Toast.show(`✓ Lead "${lead.name}" moved to ${stageName.toUpperCase()}`);
      window.dispatchEvent(new CustomEvent('techcrm:data-changed'));
    }
  },

  refreshBoard() {
    const kanbanWrapper = document.querySelector('.kanban-wrapper');
    if (kanbanWrapper) {
      const stages = this.getStages();
      const visibleStages = stages.filter(s => s.visible !== false);
      const allLeads = LeadsService.getAll();
      const filtered = allLeads.filter(lead => {
        const matchesSearch = !this.currentSearch ||
          (lead.name && lead.name.toLowerCase().includes(this.currentSearch)) ||
          (lead.company && lead.company.toLowerCase().includes(this.currentSearch));
        const matchesPriority = this.currentPriority === 'all' || lead.priority === this.currentPriority;
        const matchesReq = this.currentRequirement === 'all' ||
          (Array.isArray(lead.requirements) && lead.requirements.some(r => r.toLowerCase().includes(this.currentRequirement.toLowerCase())));
        const matchesDate = this.matchesDateRange(lead);

        return matchesSearch && matchesPriority && matchesReq && matchesDate;
      });

      const boardContainer = document.getElementById('kanban-board-container');
      if (boardContainer) {
        boardContainer.innerHTML = visibleStages.length === 0 ? `
          <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
            No columns selected. Click <strong>Columns ▾</strong> above to show columns.
          </div>
        ` : visibleStages.map(stage => KanbanColumn.render(stage, filtered)).join('');
        this.bindKanbanInteractions();
      }
    }
  }
};
