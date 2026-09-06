import { LeadCard } from './LeadCard.js';

export const KanbanColumn = {
  render(stage, leads = []) {
    const stageCards = leads.filter(l => l.status === stage.id);

    return `
      <div class="kanban-column" data-stage="${stage.id}">
        <div class="kanban-col-header">
          <div class="kanban-col-title-group">
            <span class="kanban-col-title">${stage.name}</span>
          </div>
          <span class="kanban-col-count">${stageCards.length}</span>
        </div>

        <div class="kanban-col-cards" data-stage="${stage.id}">
          ${stageCards.length === 0 ? `
            <div style="padding: 24px 8px; text-align: center; color: var(--text-muted); font-size: 12px; border: 1px dashed var(--border-color); border-radius: 8px;">
              Drop leads here
            </div>
          ` : stageCards.map(lead => LeadCard.render(lead)).join('')}
        </div>
      </div>
    `;
  }
};
