// ===== FREELANCERS MODULE =====
const Freelancers = {

  // Render freelancer grid
  render(list) {
    const container = document.getElementById('flList');
    if (!list) list = FREELANCERS;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <i class="fas fa-users"></i>
          <p>Koi freelancer nahi mila.</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map(f => `
      <div class="card fl-card">
        <div class="fl-top">
          <div class="avatar" style="background:${f.color};width:42px;height:42px;font-size:14px;border-radius:10px">${f.avatar}</div>
          <div class="fl-info">
            <div class="fl-name">${f.name}</div>
            <div class="fl-title">${f.title}</div>
          </div>
          ${f.available
            ? '<span class="badge b-a" style="font-size:10px">Available</span>'
            : '<span class="badge b-o" style="font-size:10px">Busy</span>'}
        </div>
        <div class="fl-rating">
          ${Utils.stars(f.rating)} <span style="color:var(--fg3)">(${f.reviews})</span>
        </div>
        <div class="fl-skills">
          ${f.skills.slice(0, 4).map(s => `<span class="badge" style="background:var(--bg2);color:var(--fg3)">${s}</span>`).join('')}
        </div>
        <div class="fl-bottom">
          <div class="fl-rate">₹${f.rate}<span>/hr</span></div>
          <div class="fl-actions">
            <button class="btn btn-g btn-sm" onclick="Freelancers.openProfile(${f.id})"><i class="fas fa-eye" style="font-size:10px"></i> View</button>
            <button class="btn btn-p btn-sm" onclick="Freelancers.hire(${f.id})"><i class="fas fa-handshake" style="font-size:10px"></i> Hire</button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // Filter freelancers
  filter() {
    const q = document.getElementById('flSearch').value.toLowerCase();
    const sk = document.getElementById('flSkill').value;
    const rt = document.getElementById('flRating').value;

    let list = [...FREELANCERS];

    if (q) {
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (sk !== 'all') {
      list = list.filter(f => f.skills.some(s => s.toLowerCase().includes(sk.toLowerCase())));
    }

    if (rt === '4.5') list = list.filter(f => f.rating >= 4.5);
    else if (rt === '4.0') list = list.filter(f => f.rating >= 4.0);
    else if (rt === '3.5') list = list.filter(f => f.rating >= 3.5);

    Freelancers.render(list);
  },

  // Open freelancer profile modal
  openProfile(id) {
    const f = FREELANCERS.find(x => x.id === id);
    if (!f) return;

    Utils.openModal(`
      <div style="padding:28px">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
          <div class="avatar" style="background:${f.color};width:56px;height:56px;font-size:20px;border-radius:14px">${f.avatar}</div>
          <div>
            <h3 style="font-size:18px;font-weight:700">${f.name}</h3>
            <p style="font-size:13px;color:var(--fg2)">${f.title}</p>
            <p style="font-size:12px;color:var(--fg3);margin-top:2px"><i class="fas fa-map-marker-alt" style="margin-right:4px"></i>${f.location}</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px">
          <div style="text-align:center;padding:10px;background:var(--bg2);border-radius:8px">
            <div style="font-size:16px;font-weight:700;color:var(--accent)">₹${f.rate}</div>
            <div style="font-size:10px;color:var(--fg3)">Per Hour</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--bg2);border-radius:8px">
            <div style="font-size:16px;font-weight:700;color:var(--orange)">${f.rating}</div>
            <div style="font-size:10px;color:var(--fg3)">${f.reviews} Reviews</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--bg2);border-radius:8px">
            <div style="font-size:16px;font-weight:700;color:var(--fg)">${f.completed}</div>
            <div style="font-size:10px;color:var(--fg3)">Completed</div>
          </div>
          <div style="text-align:center;padding:10px;background:var(--bg2);border-radius:8px">
            <div style="font-size:16px;font-weight:700;color:var(--blue)">${f.earned}</div>
            <div style="font-size:10px;color:var(--fg3)">Earned</div>
          </div>
        </div>
        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Skills</h4>
          <div class="fl-skills">${f.skills.map(s => `<span class="badge b-a">${s}</span>`).join('')}</div>
        </div>
        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Availability</h4>
          <span class="badge ${f.available ? 'b-a' : 'b-o'}">${f.available ? 'Available for new projects' : 'Currently busy'}</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-o" style="flex:1" onclick="Utils.closeModal()"><i class="fas fa-envelope" style="font-size:11px"></i> Message</button>
          <button class="btn btn-p" style="flex:1" onclick="Utils.closeModal();Freelancers.hire(${f.id})"><i class="fas fa-handshake" style="font-size:11px"></i> Hire Now</button>
        </div>
      </div>
    `);
  },

  // Hire a freelancer
  hire(id) {
    if (!Auth.isLoggedIn()) {
      Utils.toast('Pehle login karo', 'warning');
      Auth.openLogin();
      return;
    }

    const f = FREELANCERS.find(x => x.id === id);
    if (!f) return;

    Utils.openModal(`
      <div style="padding:28px">
        <h3 style="font-size:18px;font-weight:700;margin-bottom:4px">Hire ${f.name}</h3>
        <p style="font-size:13px;color:var(--fg2);margin-bottom:18px">${f.title} · ₹${f.rate}/hr</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Project Title</label>
            <input class="inp" placeholder="Project ka naam"></div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Description</label>
            <textarea class="inp" rows="3" placeholder="Project details..."></textarea></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Budget (₹)</label>
              <input class="inp" type="number" placeholder="50000"></div>
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Deadline</label>
              <input class="inp" type="date"></div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px">
          <button class="btn btn-o" onclick="Utils.closeModal()">Cancel</button>
          <button class="btn btn-p" onclick="Utils.closeModal();Utils.toast('Invitation sent to ${f.name}!','success')">
            <i class="fas fa-paper-plane"></i> Send Invite
          </button>
        </div>
      </div>
    `);
  }
};