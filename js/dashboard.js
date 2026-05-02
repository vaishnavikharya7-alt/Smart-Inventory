// ===== DASHBOARD MODULE =====
const Dashboard = {

  // Main render
  render() {
    if (!Auth.currentUser) return;

    const user = Auth.currentUser;
    const isFL = user.role === 'freelancer';

    // Name
    document.getElementById('dashName').textContent = user.name;

    // Stats
    document.getElementById('dashStats').innerHTML = [
      { label: isFL ? 'Active Proposals' : 'Posted Jobs', val: isFL ? Auth.myApplications.length : 3, icon: 'fa-paper-plane', color: 'var(--accent)' },
      { label: isFL ? 'Profile Views' : 'Total Proposals', val: isFL ? 47 : 28, icon: 'fa-eye', color: 'var(--blue)' },
      { label: isFL ? 'Earnings This Month' : 'Total Spent', val: isFL ? '₹42,500' : '₹1,85,000', icon: 'fa-wallet', color: 'var(--orange)' },
      { label: 'Completed', val: isFL ? 8 : 5, icon: 'fa-check-circle', color: 'var(--accent)' }
    ].map(s => `
      <div class="card dash-stat">
        <div class="dash-stat-top">
          <span class="dash-stat-label">${s.label}</span>
          <div class="dash-stat-icon" style="background:${s.color}14"><i class="fas ${s.icon}" style="color:${s.color}"></i></div>
        </div>
        <div class="dash-stat-val">${s.val}</div>
      </div>
    `).join('');

    // My Applications
    Dashboard.renderApps();

    // Quick Actions
    document.getElementById('quickActs').innerHTML = [
      { label: 'Edit Profile', icon: 'fa-user-pen', action: 'Dashboard.openEditProfile()' },
      { label: 'Browse Jobs', icon: 'fa-search', action: "App.goTo('jobs')" },
      { label: 'Post a Job', icon: 'fa-plus', action: 'Jobs.openPostJob()' },
      { label: 'Saved Jobs', icon: 'fa-bookmark', action: "Utils.toast('3 saved jobs','info')" },
      { label: 'Messages', icon: 'fa-envelope', action: "Utils.toast('2 unread messages','info')" },
      { label: 'Settings', icon: 'fa-gear', action: "Utils.toast('Settings page coming soon','info')" }
    ].map(a => `
      <div class="qa-item" onclick="${a.action}">
        <i class="fas ${a.icon}"></i>
        <span>${a.label}</span>
      </div>
    `).join('');

    // Profile
    Dashboard.renderProfile();
  },

  // Render applications list
  renderApps() {
    const container = document.getElementById('myApps');

    if (Auth.myApplications.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-paper-plane"></i>
          <p>Abhi tak koi application nahi hai</p>
          <button class="btn btn-p btn-sm" style="margin-top:12px" onclick="App.goTo('jobs')">Browse Jobs</button>
        </div>`;
      return;
    }

    container.innerHTML = Auth.myApplications.map(a => {
      const j = JOBS.find(x => x.id === a.jobId);
      if (!j) return '';
      return `
        <div class="app-item">
          <div>
            <div class="app-title">${j.title}</div>
            <div class="app-sub">${j.cat} · ${Utils.formatBudget(j.budget)}</div>
          </div>
          <span class="badge ${a.status === 'pending' ? 'b-o' : 'b-a'}">${a.status}</span>
        </div>`;
    }).join('');
  },

  // Render profile section
  renderProfile() {
    const user = Auth.currentUser;
    const ini = Utils.initials(user.name);
    const p = user.profile || {};

    document.getElementById('myProfile').innerHTML = `
      <div style="display:flex;gap:20px;align-items:start;flex-wrap:wrap">
        <div class="avatar" style="width:64px;height:64px;font-size:22px;background:linear-gradient(135deg,var(--accent),#08a88a);border-radius:14px">${ini}</div>
        <div style="flex:1;min-width:200px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
            <h3 style="font-size:18px;font-weight:700">${user.name}</h3>
            <span class="badge b-a">${user.role === 'freelancer' ? 'Freelancer' : 'Client'}</span>
          </div>
          <p style="font-size:13px;color:var(--fg2);margin-bottom:12px">${user.email} · ${user.joined}</p>
          <div id="profileDetails">
            ${Dashboard.getProfileHTML(p)}
          </div>
          <button class="btn btn-o btn-sm" style="margin-top:12px" onclick="Dashboard.openEditProfile()">
            <i class="fas fa-pen" style="font-size:10px"></i> Edit Profile
          </button>
        </div>
      </div>`;
  },

  // Get profile details HTML
  getProfileHTML(p) {
    if (!p.title && !p.bio && !p.skills) {
      return '<div style="font-size:12px;color:var(--fg3)">No profile details added yet.</div>';
    }
    return `
      ${p.title ? `<div style="font-size:14px;font-weight:600;color:var(--fg)">${p.title}</div>` : ''}
      ${p.bio ? `<p style="font-size:13px;color:var(--fg2);line-height:1.5">${p.bio}</p>` : ''}
      ${p.rate ? `<div style="font-size:13px;color:var(--accent);font-weight:600">₹${p.rate}/hr</div>` : ''}
      ${p.skills?.length ? `<div class="fl-skills" style="margin-top:4px">${p.skills.map(s => `<span class="badge b-a">${s}</span>`).join('')}</div>` : ''}
    `;
  },

  // Open edit profile modal
  openEditProfile() {
    const p = Auth.currentUser.profile || {};
    const isFL = Auth.currentUser.role === 'freelancer';

    Utils.openModal(`
      <div style="padding:28px">
        <h3 style="font-size:18px;font-weight:700;margin-bottom:18px">Edit Profile</h3>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Professional Title</label>
            <input class="inp" id="epTitle" placeholder="e.g. Senior React Developer" value="${p.title || ''}"></div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Bio</label>
            <textarea class="inp" id="epBio" rows="3" placeholder="Apne baare mein batao...">${p.bio || ''}</textarea></div>
          ${isFL ? `
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Hourly Rate (₹)</label>
              <input class="inp" type="number" id="epRate" placeholder="2000" value="${p.rate || ''}"></div>
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Skills (comma separated)</label>
              <input class="inp" id="epSkills" placeholder="React, Node.js, Python" value="${(p.skills || []).join(', ')}"></div>
          ` : ''}
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Location</label>
            <input class="inp" id="epLoc" placeholder="Mumbai, India" value="${p.location || ''}"></div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px">
          <button class="btn btn-o" onclick="Utils.closeModal()">Cancel</button>
          <button class="btn btn-p" onclick="Dashboard.saveProfile()"><i class="fas fa-save"></i> Save</button>
        </div>
      </div>
    `);
  },

  // Save profile
  saveProfile() {
    const user = Auth.currentUser;
    user.profile = {
      title: document.getElementById('epTitle').value.trim(),
      bio: document.getElementById('epBio').value.trim(),
      location: document.getElementById('epLoc').value.trim()
    };

    if (user.role === 'freelancer') {
      user.profile.rate = document.getElementById('epRate').value;
      user.profile.skills = document.getElementById('epSkills').value.split(',').map(s => s.trim()).filter(Boolean);
    }

    Utils.closeModal();
    Dashboard.render();
    Utils.toast('Profile updated!', 'success');
  }
};