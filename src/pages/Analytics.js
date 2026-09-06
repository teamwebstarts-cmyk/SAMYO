export const AnalyticsPage = {
  render() {
    return `
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Outreach Performance Analytics</h1>
            <p>September 2026 • Real-time pipeline conversion & mentor feedback report</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <select class="select" style="width: auto; font-size: 13px;">
              <option>This Week (Sep 1 – Sep 7)</option>
              <option>Last 30 Days</option>
              <option>Q3 2026 Overview</option>
            </select>
            <button class="btn btn-secondary btn-sm" onclick="window.print()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Export Report
            </button>
          </div>
        </div>

        <!-- 💡 Mentor Insight Card (Smart UX Highlight) -->
        <div class="card" style="background: linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 100%); border: 1px solid #C7D2FE; border-radius: var(--radius-card); padding: 20px; margin-bottom: var(--space-24); box-shadow: var(--shadow-sm); display: flex; gap: 16px; align-items: flex-start;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #6366F1; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);">
            💡
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <h3 style="font-size: 15px; font-weight: 700; color: #312E81;">Mentor AI Performance Insight</h3>
              <span class="badge" style="background: #DCFCE7; color: #15803D;">High Impact</span>
            </div>
            <p style="font-size: 13.5px; color: #3730A3; line-height: 1.5; margin-bottom: 6px;">
              "Your connection acceptance rate increased by <strong>+12%</strong> compared to last week (now at 51%). However, your <strong>Connected → Conversation</strong> conversion dropped by <strong>-8%</strong>."
            </p>
            <div style="font-size: 13px; color: #4338CA; font-weight: 500;">
              👉 <strong>Action Item:</strong> Personalize your initial message right after they accept. Mention specific technologies (e.g. Next.js, Flutter, PyTorch) from their company's stack.
            </div>
          </div>
        </div>

        <!-- 4 Key Efficiency Rates -->
        <div class="kpi-grid" style="margin-bottom: var(--space-24);">
          <div class="kpi-card">
            <div class="kpi-header">Connection Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">51%</div>
              <div class="kpi-trend">↑ 12%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">48 connections / 94 sent</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">Conversation Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">64%</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--danger); background: var(--danger-light); padding: 2px 6px; border-radius: 4px;">↓ 8%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">31 conversations / 48 connected</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">Proposal Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">26%</div>
              <div class="kpi-trend">↑ 4%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">8 proposals / 31 chats</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">Win Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">62%</div>
              <div class="kpi-trend">↑ 7%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">5 won / 8 proposals</div>
          </div>
        </div>

        <!-- Conversion Funnel & Lost Breakdown Layout -->
        <div class="analytics-funnel-grid" style="display: grid; grid-template-columns: 60% calc(40% - 16px); gap: 16px;">
          <!-- Funnel Visualization -->
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <h3 class="section-heading" style="font-size: 16px;">Lead Conversion Funnel</h3>
                <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Visual drop-off across all outreach stages</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 14px;">
              <!-- Stage 1 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>1. LEADS FOUND</span>
                  <span>126</span>
                </div>
                <div style="height: 28px; background: #6366F1; border-radius: 6px; width: 100%; display: flex; align-items: center; padding: 0 12px; color: #FFFFFF; font-size: 12px; font-weight: 600;">
                  100% Top of Funnel
                </div>
              </div>

              <!-- Stage 2 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>2. REQUESTS SENT</span>
                  <span>94</span>
                </div>
                <div style="height: 28px; background: #818CF8; border-radius: 6px; width: 74.6%; display: flex; align-items: center; padding: 0 12px; color: #FFFFFF; font-size: 12px; font-weight: 600;">
                  75% Outreach Sent
                </div>
              </div>

              <!-- Stage 3 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>3. CONNECTED</span>
                  <span>48</span>
                </div>
                <div style="height: 28px; background: #A5B4FC; border-radius: 6px; width: 38%; display: flex; align-items: center; padding: 0 12px; color: #1E1B4B; font-size: 12px; font-weight: 600;">
                  51% Acceptance
                </div>
              </div>

              <!-- Stage 4 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>4. CONVERSATION</span>
                  <span>31</span>
                </div>
                <div style="height: 28px; background: #C7D2FE; border-radius: 6px; width: 24.6%; display: flex; align-items: center; padding: 0 12px; color: #1E1B4B; font-size: 12px; font-weight: 600;">
                  64% Engaged
                </div>
              </div>

              <!-- Stage 5 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>5. PROPOSAL SENT</span>
                  <span>8</span>
                </div>
                <div style="height: 28px; background: #0284C7; border-radius: 6px; width: 14%; display: flex; align-items: center; padding: 0 10px; color: #FFFFFF; font-size: 12px; font-weight: 600;">
                  8 Proposals
                </div>
              </div>

              <!-- Stage 6 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>6. WON DEALS 🏆</span>
                  <span>5 (₹8,50,000)</span>
                </div>
                <div style="height: 28px; background: #16A34A; border-radius: 6px; width: 10%; display: flex; align-items: center; padding: 0 8px; color: #FFFFFF; font-size: 12px; font-weight: 700;">
                  5 Won
                </div>
              </div>
            </div>
          </div>

          <!-- Lost Reasons & Service Demand -->
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 class="section-heading" style="font-size: 16px; margin-bottom: 4px;">Why Leads Were Lost</h3>
              <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">Breakdown of lost opportunity objections</p>

              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>Budget issue / pricing</span>
                    <strong>40%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 40%; height: 100%; background: #DC2626; border-radius: 3px;"></div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>No response after follow-up</span>
                    <strong>30%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 30%; height: 100%; background: #F59E0B; border-radius: 3px;"></div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>Went with competitor / internal</span>
                    <strong>20%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 20%; height: 100%; background: #64748B; border-radius: 3px;"></div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>No immediate requirement</span>
                    <strong>10%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 10%; height: 100%; background: #94A3B8; border-radius: 3px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Service Requirement Distribution -->
            <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Top Requested Tech Services</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">🌐 Website: 42%</span>
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">📱 Mobile App: 28%</span>
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">🤖 AI/ML: 18%</span>
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">🎨 UI/UX: 12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    // Analytics page listeners if any
  }
};
