// ===== AUTHENTICATION MODULE =====
const Auth = {

  currentUser: null,
  myApplications: [],

  // Open login modal
  openLogin() {
    Utils.openModal(`
      <div style="padding:28px">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:4px">Welcome Back</h3>
        <p style="font-size:13px;color:var(--fg2);margin-bottom:22px">Apne account mein login karo</p>
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:20px">
          <div>
            <label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Email</label>
            <input class="inp" type="email" id="loginEmail" placeholder="aapka@email.com">
          </div>
          <div>
            <label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Password</label>
            <input class="inp" type="password" id="loginPass" placeholder="Password enter karo">
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--fg2);cursor:pointer">
              <input type="checkbox" style="accent-color:var(--accent)"> Remember me
            </label>
            <span style="font-size:12px;color:var(--accent);cursor:pointer" onclick="Utils.toast('Password reset link sent','info')">Forgot password?</span>
          </div>
        </div>
        <button class="btn btn-p" style="width:100%;justify-content:center;padding:12px" onclick="Auth.doLogin()">Log In</button>
        <div style="text-align:center;margin-top:16px;font-size:13px;color:var(--fg2)">
          Account nahi hai? <span style="color:var(--accent);cursor:pointer;font-weight:600" onclick="Utils.closeModal();Auth.openSignup()">Sign Up karo</span>
        </div>
      </div>
    `);
  },

  // Open signup modal
  openSignup() {
    Utils.openModal(`
      <div style="padding:28px">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:4px">Create Account</h3>
        <p style="font-size:13px;color:var(--fg2);margin-bottom:22px">Free mein shuru karo — 2 minute</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">First Name</label><input class="inp" id="sigFName" placeholder="Pehla naam"></div>
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Last Name</label><input class="inp" id="sigLName" placeholder="Last name"></div>
          </div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Email</label><input class="inp" type="email" id="sigEmail" placeholder="aapka@email.com"></div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Password</label><input class="inp" type="password" id="sigPass" placeholder="Kam se kam 6 characters"></div>
          <div>
            <label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Main ek hun...</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <label style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:13px;color:var(--fg2)">
                <input type="radio" name="role" value="freelancer" style="accent-color:var(--accent)" checked> Freelancer
              </label>
              <label style="display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;cursor:pointer;font-size:13px;color:var(--fg2)">
                <input type="radio" name="role" value="client" style="accent-color:var(--accent)"> Client
              </label>
            </div>
          </div>
        </div>
        <button class="btn btn-p" style="width:100%;justify-content:center;padding:12px" onclick="Auth.doSignup()">Create Account</button>
        <div style="text-align:center;margin-top:16px;font-size:13px;color:var(--fg2)">
          Already have account? <span style="color:var(--accent);cursor:pointer;font-weight:600" onclick="Utils.closeModal();Auth.openLogin()">Log In</span>
        </div>
      </div>
    `);
  },

  // Handle login
  doLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value;
    if (!email) { Utils.toast('Email enter karo', 'warning'); return; }
    if (!pass) { Utils.toast('Password enter karo', 'warning'); return; }
    if (!email.includes('@')) { Utils.toast('Valid email enter karo', 'warning'); return; }
    const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    const role = localStorage.getItem('wh_role') || 'freelancer';
    Auth.loginUser({ name, email, role, joined: 'Member since 2024' });
  },

  // Handle signup
  doSignup() {
    const f = document.getElementById('sigFName').value.trim();
    const l = document.getElementById('sigLName').value.trim();
    const email = document.getElementById('sigEmail').value.trim();
    const pass = document.getElementById('sigPass').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    if (!f || !l) { Utils.toast('Naam enter karo', 'warning'); return; }
    if (!email || !email.includes('@')) { Utils.toast('Valid email enter karo', 'warning'); return; }
    if (pass.length < 6) { Utils.toast('Password kam se kam 6 characters ka ho', 'warning'); return; }

    localStorage.setItem('wh_role', role);
    Auth.loginUser({ name: f + ' ' + l, email, role, joined: 'Member since 2024' });
    Utils.toast('Account created successfully!', 'success');
  },

  // Set logged in state
  loginUser(user) {
    Auth.currentUser = user;
    Utils.closeModal();

    document.getElementById('navRight').innerHTML = `
      <span style="font-size:13px;color:var(--fg2);margin-right:4px" class="hide-m">${user.name}</span>
      <div class="avatar" style="background:linear-gradient(135deg,var(--accent),#08a88a);cursor:pointer;width:32px;height:32px;font-size:11px" onclick="App.goTo('dashboard')">
        ${Utils.initials(user.name)}
      </div>
      <button class="btn btn-o btn-sm" onclick="Auth.logout()"><i class="fas fa-sign-out-alt" style="font-size:11px"></i></button>
    `;

    App.goTo('dashboard');
    Dashboard.render();
  },

  // Logout
  logout() {
    Auth.currentUser = null;
    Auth.myApplications = [];
    document.getElementById('navRight').innerHTML = `
      <button class="btn btn-o btn-sm" onclick="Auth.openLogin()">Log In</button>
      <button class="btn btn-p btn-sm" onclick="Auth.openSignup()">Sign Up</button>
    `;
    App.goTo('home');
    Utils.toast('Logged out successfully', 'info');
  },

  // Check if logged in — if not, show login
  isLoggedIn() {
    return Auth.currentUser !== null;
  },

  // Require login before action, then call callback
  requireThen(callback) {
    if (!Auth.isLoggedIn()) {
      Utils.toast('Pehle login karo', 'warning');
      Auth.openLogin();
      return;
    }
    if (callback) callback();
  },

  // Require client role
  requireClient() {
    if (Auth.currentUser && Auth.currentUser.role !== 'client') {
      Utils.toast('Sirf clients job post kar sakte hain', 'warning');
      return false;
    }
    return true;
  }
};