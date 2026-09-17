import { AuthService } from '../services/auth.js';
import { Toast } from '../components/Toast.js';

export const LoginPage = {
  activeTab: 'signin', // 'signin' or 'signup'

  render() {
    return `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%); padding: 24px;">
        <div style="width: 100%; max-width: 440px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 16px; padding: 36px; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.08);">
          
          <!-- Logo & Header -->
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #6366F1, #4F46E5); display: inline-flex; align-items: center; justify-content: center; font-size: 26px; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25); margin-bottom: 12px;">
              🚀
            </div>
            <h1 style="font-size: 24px; font-weight: 700; color: var(--text-main); margin-bottom: 4px; letter-spacing: -0.02em;">TechCRM</h1>
            <p style="font-size: 13.5px; color: var(--text-secondary);">LinkedIn Outreach & Pipeline System</p>
          </div>

          <!-- Auth Mode Tabs -->
          <div style="display: flex; background: #F1F5F9; padding: 4px; border-radius: 10px; margin-bottom: 24px;">
            <button type="button" id="tab-btn-signin" class="btn btn-ghost" style="flex: 1; padding: 8px 12px; font-size: 13.5px; font-weight: 600; border-radius: 7px; transition: all 0.2s ease; ${this.activeTab === 'signin' ? 'background: #FFFFFF; color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.06);' : 'color: var(--text-secondary);'}">
              Sign In
            </button>
            <button type="button" id="tab-btn-signup" class="btn btn-ghost" style="flex: 1; padding: 8px 12px; font-size: 13.5px; font-weight: 600; border-radius: 7px; transition: all 0.2s ease; ${this.activeTab === 'signup' ? 'background: #FFFFFF; color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.06);' : 'color: var(--text-secondary);'}">
              Create Account
            </button>
          </div>

          <!-- SIGN IN FORM -->
          <div id="signin-container" style="display: ${this.activeTab === 'signin' ? 'block' : 'none'};">
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Welcome back</h2>
              <p style="font-size: 13px; color: var(--text-secondary);">Sign in to access your outreach pipeline</p>
            </div>

            <form id="signin-form">
              <div class="form-group">
                <label class="form-label" for="signin-email">Email Address <span style="color: #EF4444;">*</span></label>
                <input type="email" id="signin-email" class="input" placeholder="e.g. neha.jain@techcrm.io" required />
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="form-label" for="signin-password" style="margin-bottom: 0;">Password <span style="color: #EF4444;">*</span></label>
                </div>
                <div style="position: relative;">
                  <input type="password" id="signin-password" class="input" placeholder="Enter your password" required />
                  <button type="button" class="btn-toggle-pwd" data-target="signin-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; font-size: 14px;">
                    👁
                  </button>
                </div>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 11px; font-size: 14px; font-weight: 600; justify-content: center; border-radius: 8px; margin-top: 10px;">
                Sign In to TechCRM
              </button>
            </form>
          </div>

          <!-- SIGN UP FORM -->
          <div id="signup-container" style="display: ${this.activeTab === 'signup' ? 'block' : 'none'};">
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Create New Account</h2>
              <p style="font-size: 13px; color: var(--text-secondary);">Join the team to manage your outreach pipeline</p>
            </div>

            <form id="signup-form">
              <div class="form-group">
                <label class="form-label" for="signup-name">Full Name <span style="color: #EF4444;">*</span></label>
                <input type="text" id="signup-name" class="input" placeholder="e.g. Rohit Mehra" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="signup-email">Email Address <span style="color: #EF4444;">*</span></label>
                <input type="email" id="signup-email" class="input" placeholder="e.g. rohit@company.com" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="signup-password">Password <span style="color: #EF4444;">*</span></label>
                <div style="position: relative;">
                  <input type="password" id="signup-password" class="input" placeholder="At least 6 characters" minlength="6" required />
                  <button type="button" class="btn-toggle-pwd" data-target="signup-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; font-size: 14px;">
                    👁
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="signup-role">Role / Title <span class="optional">(Optional)</span></label>
                <input type="text" id="signup-role" class="input" placeholder="e.g. Outreach Specialist / Web Developer" />
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 11px; font-size: 14px; font-weight: 600; justify-content: center; border-radius: 8px; margin-top: 10px;">
                Create Account & Enter CRM
              </button>
            </form>
          </div>

        </div>
      </div>
    `;
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    const signinContainer = document.getElementById('signin-container');
    const signupContainer = document.getElementById('signup-container');
    const signinTab = document.getElementById('tab-btn-signin');
    const signupTab = document.getElementById('tab-btn-signup');

    if (tabName === 'signin') {
      if (signinContainer) signinContainer.style.display = 'block';
      if (signupContainer) signupContainer.style.display = 'none';
      if (signinTab) {
        signinTab.style.background = '#FFFFFF';
        signinTab.style.color = 'var(--primary)';
        signinTab.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)';
      }
      if (signupTab) {
        signupTab.style.background = 'transparent';
        signupTab.style.color = 'var(--text-secondary)';
        signupTab.style.boxShadow = 'none';
      }
    } else {
      if (signinContainer) signinContainer.style.display = 'none';
      if (signupContainer) signupContainer.style.display = 'block';
      if (signupTab) {
        signupTab.style.background = '#FFFFFF';
        signupTab.style.color = 'var(--primary)';
        signupTab.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)';
      }
      if (signinTab) {
        signinTab.style.background = 'transparent';
        signinTab.style.color = 'var(--text-secondary)';
        signinTab.style.boxShadow = 'none';
      }
    }
  },

  initListeners() {
    // Tab switching
    const signinTab = document.getElementById('tab-btn-signin');
    const signupTab = document.getElementById('tab-btn-signup');

    if (signinTab) signinTab.addEventListener('click', () => this.switchTab('signin'));
    if (signupTab) signupTab.addEventListener('click', () => this.switchTab('signup'));

    // Toggle password view
    document.querySelectorAll('.btn-toggle-pwd').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          const isPwd = input.getAttribute('type') === 'password';
          input.setAttribute('type', isPwd ? 'text' : 'password');
        }
      });
    });

    // Sign In Form Submission
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
      signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email')?.value.trim();
        const password = document.getElementById('signin-password')?.value;
        const submitBtn = signinForm.querySelector('button[type="submit"]');

        if (!email || !password) {
          Toast.show('Please enter your email and password', 'error');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Signing in...';
        }

        try {
          const res = await AuthService.login(email, password);
          Toast.show(`Welcome back, ${res.user?.name || 'User'}!`);
          window.location.hash = '#/dashboard';
          window.location.reload();
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

    // Sign Up Form Submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name')?.value.trim();
        const email = document.getElementById('signup-email')?.value.trim();
        const password = document.getElementById('signup-password')?.value;
        const role = document.getElementById('signup-role')?.value.trim() || 'Team Member';
        const submitBtn = signupForm.querySelector('button[type="submit"]');

        if (!name || !email || !password) {
          Toast.show('Name, email and password are required', 'error');
          return;
        }

        if (password.length < 6) {
          Toast.show('Password must be at least 6 characters long', 'error');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Creating account...';
        }

        try {
          const res = await AuthService.register(name, email, password, role);
          Toast.show(`Account created! Welcome, ${res.user?.name}!`);
          window.location.hash = '#/dashboard';
          window.location.reload();
        } catch (err) {
          Toast.show(err.message || 'Registration failed', 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account & Enter CRM';
          }
        }
      });
    }
  }
};

