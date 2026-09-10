import { AuthService } from '../services/auth.js';
import { Toast } from '../components/Toast.js';

export const LoginPage = {
  render() {
    return `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-main); padding: 20px;">
        <div style="width: 100%; max-width: 400px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 32px; box-shadow: var(--shadow-lg);">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366F1, #4F46E5); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 8px rgba(99, 102, 241, 0.25); margin-bottom: 12px;">
              🚀
            </div>
            <h1 style="font-size: 22px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">TechCRM</h1>
            <p style="font-size: 14px; color: var(--text-secondary);">LinkedIn Outreach & Pipeline System</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Welcome back</h2>
            <p style="font-size: 13px; color: var(--text-secondary);">Sign in to your outreach workspace</p>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <input type="email" id="login-email" class="input" value="neha.jain@techcrm.io" required />
            </div>

            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="form-label" for="login-password" style="margin-bottom: 0;">Password</label>
                <a href="javascript:void(0)" style="font-size: 12px; color: var(--primary); font-weight: 500;">Forgot password?</a>
              </div>
              <div style="position: relative;">
                <input type="password" id="login-password" class="input" value="••••••••••••" required />
                <button type="button" id="btn-toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px;">
                  👁
                </button>
              </div>
            </div>

            <div style="margin-bottom: 20px; font-size: 12px; color: var(--text-secondary); background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              👤 <strong>Demo Login:</strong> Neha Jain (Sales / Web Dev) pre-filled.
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px; font-size: 14px; justify-content: center;">
              Sign In to TechCRM
            </button>
          </form>
        </div>
      </div>
    `;
  },

  initListeners() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const toggleBtn = document.getElementById('btn-toggle-password');

    if (toggleBtn && pwdInput) {
      toggleBtn.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = pwdInput ? pwdInput.value : 'password';
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Signing In...';
        }

        try {
          const res = await AuthService.login(email, password);
          const userName = res.user?.name || 'Neha';
          Toast.show(`Welcome back, ${userName}! 👋`);
          window.location.hash = '#/dashboard';
        } catch (err) {
          Toast.show(err.message || 'Login failed', 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Sign In to TechCRM';
          }
        }
      });
    }
  }
};
