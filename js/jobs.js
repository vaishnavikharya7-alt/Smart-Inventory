// ===== JOBS MODULE =====
const Jobs = {

  // Render job list
  render(list) {
    const container = document.getElementById('jobsList');
    if (!list) list = JOBS;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <p>Koi result nahi mila. Filters change karo.</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map(j => `
      <div class="card job-card" onclick="Jobs.openDetail(${j.id})">
        <div class="job-top">
          <div>
            <div class="job-title">${j.title}</div>
            <div class="job-meta">
              <span class="badge b-a">${j.cat}</span>
              <span style="font-size:11px;color:var(--fg3)"><i class="fas fa-clock" style="margin-right:3px"></i>${j.duration}</span>
              <span style="font-size:11px;color:var(--fg3)"><i class="fas fa-paper-plane" style="margin-right:3px"></i>${j.proposals} proposals</span>
            </div>
          </div>
          <div class="job-budget">${Utils.formatBudget(j.budget)}</div>
        </div>
        <p class="job-desc">${j.desc}</p>
        <div class="fl-skills" style="margin-bottom:12px">
          ${j.skills.map(s => `<span class="badge" style="background:var(--bg2);color:var(--fg3)">${s}</span>`).join('')}
        </div>
        <div class="job-bottom">
          <div class="job-client">
            <span style="font-size:12px;color:var(--fg3)">${j.client}</span>
            ${Utils.stars(j.rating)}
            <span style="font-size:11px;color:var(--fg3)">${j.rating}</span>
          </div>
          <span style="font-size:11px;color:var(--fg3)">${j.posted}</span>
        </div>
      </div>
    `).join('');
  },

  // Filter jobs
  filter() {
    const q = document.getElementById('jobSearch').value.toLowerCase();
    const cat = document.getElementById('jobCat').value;
    const bud = document.getElementById('jobBudget').value;
    const sort = document.getElementById('jobSort').value;

    let list = [...JOBS];

    // Search
    if (q) {
      list = list.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.desc.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Category
    if (cat !== 'all') list = list.filter(j => j.cat === cat);

    // Budget
    if (bud === 'u10') list = list.filter(j => j.budget < 10000);
    else if (bud === '10-50') list = list.filter(j => j.budget >= 10000 && j.budget <= 50000);
    else if (bud === '50-1l') list = list.filter(j => j.budget >= 50000 && j.budget <= 100000);
    else if (bud === 'a1l') list = list.filter(j => j.budget > 100000);

    // Sort
    if (sort === 'budget-h') list.sort((a, b) => b.budget - a.budget);
    else if (sort === 'budget-l') list.sort((a, b) => a.budget - b.budget);
    else if (sort === 'proposals') list.sort((a, b) => a.proposals - b.proposals);

    Jobs.render(list);
  },

  // Open job detail modal
  openDetail(id) {
    const j = JOBS.find(x => x.id === id);
    if (!j) return;

    const applied = Auth.myApplications.some(a => a.jobId === id);

    Utils.openModal(`
      <div style="padding:28px">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:16px;flex-wrap:wrap;gap:8px">
          <div>
            <h3 style="font-size:18px;font-weight:700;margin-bottom:6px">${j.title}</h3>
            <span class="badge b-a">${j.cat}</span>
          </div>
          <div style="font-size:22px;font-weight:700;font-family:'Space Grotesk',sans-serif;color:var(--accent)">
            ${Utils.formatBudget(j.budget)}
          </div>
        </div>
        <div style="display:flex;gap:16px;margin-bottom:16px;flex-wrap:wrap">
          <span style="font-size:12px;color:var(--fg2)"><i class="fas fa-clock" style="color:var(--fg3);margin-right:5px"></i>${j.duration}</span>
          <span style="font-size:12px;color:var(--fg2)"><i class="fas fa-paper-plane" style="color:var(--fg3);margin-right:5px"></i>${j.proposals} proposals</span>
          <span style="font-size:12px;color:var(--fg2)"><i class="fas fa-user" style="color:var(--fg3);margin-right:5px"></i>${j.client}</span>
          <span style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--fg2)">${Utils.stars(j.rating)} <span style="color:var(--fg3)">${j.rating}</span></span>
        </div>
        <div style="margin-bottom:16px">
          <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Description</h4>
          <p style="font-size:13px;color:var(--fg2);line-height:1.7">${j.desc}</p>
        </div>
        <div style="margin-bottom:20px">
          <h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Required Skills</h4>
          <div class="fl-skills">${j.skills.map(s => `<span class="badge b-a">${s}</span>`).join('')}</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:var(--bg2);border-radius:8px;margin-bottom:16px">
          <span style="font-size:12px;color:var(--fg3)">Posted ${j.posted}</span>
          <button class="btn btn-g btn-sm" onclick="Utils.toast('Job saved to bookmarks','success')">
            <i class="fas fa-bookmark"></i> Save
          </button>
        </div>
        ${applied
          ? `<div style="text-align:center;padding:12px;background:var(--accentg);border-radius:8px;font-size:13px;color:var(--accent);font-weight:600">
               <i class="fas fa-check-circle" style="margin-right:6px"></i>Already Applied
             </div>`
          : `<div>
               <label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Cover Letter</label>
               <textarea class="inp" id="coverLetter" rows="3" placeholder="Yeh project ke liye kyun perfect ho..."></textarea>
               <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
                 <button class="btn btn-o" onclick="Utils.closeModal()">Cancel</button>
                 <button class="btn btn-p" onclick="Jobs.apply(${j.id})"><i class="fas fa-paper-plane"></i> Apply Now</button>
               </div>
             </div>`
        }
      </div>
    `);
  },

  // Apply to a job
  apply(id) {
    if (!Auth.isLoggedIn()) {
      Utils.toast('Pehle login karo', 'warning');
      Utils.closeModal();
      Auth.openLogin();
      return;
    }

    const cover = document.getElementById('coverLetter').value.trim();
    if (!cover) { Utils.toast('Cover letter likho', 'warning'); return; }
    if (Auth.myApplications.some(a => a.jobId === id)) { Utils.toast('Already applied hai', 'warning'); return; }

    Auth.myApplications.push({
      jobId: id,
      status: 'pending',
      cover: cover,
      time: new Date().toLocaleString()
    });

    Utils.closeModal();
    Utils.toast('Application submitted!', 'success');

    // Refresh dashboard if visible
    if (document.getElementById('sec-dashboard').style.display !== 'none') {
      Dashboard.render();
    }
  },

  // Open post job modal
  openPostJob() {
    Utils.openModal(`
      <div style="padding:28px">
        <h3 style="font-size:18px;font-weight:700;margin-bottom:18px">Post a New Job</h3>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Job Title</label>
            <input class="inp" id="pjTitle" placeholder="e.g. Website Development"></div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Category</label>
            <select class="inp" id="pjCat"><option>Web Development</option><option>Mobile App</option><option>Design</option><option>Writing</option><option>Marketing</option><option>Data Science</option></select></div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Description</label>
            <textarea class="inp" id="pjDesc" rows="4" placeholder="Project ki details likho..."></textarea></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Budget (₹)</label>
              <input class="inp" type="number" id="pjBudget" placeholder="50000"></div>
            <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Duration</label>
              <select class="inp" id="pjDur"><option>1-2 weeks</option><option>3-4 weeks</option><option>1-2 months</option><option>3-6 months</option><option>Ongoing</option></select></div>
          </div>
          <div><label style="font-size:11px;color:var(--fg2);display:block;margin-bottom:5px">Required Skills (comma separated)</label>
            <input class="inp" id="pjSkills" placeholder="React, Node.js, MongoDB"></div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px">
          <button class="btn btn-o" onclick="Utils.closeModal()">Cancel</button>
          <button class="btn btn-p" onclick="Jobs.submit()"><i class="fas fa-plus"></i> Post Job</button>
        </div>
      </div>
    `);
  },

  // Submit new job
  submit() {
    const title = document.getElementById('pjTitle').value.trim();
    const cat = document.getElementById('pjCat').value;
    const desc = document.getElementById('pjDesc').value.trim();
    const budget = document.getElementById('pjBudget').value;
    const dur = document.getElementById('pjDur').value;
    const skills = document.getElementById('pjSkills').value.split(',').map(s => s.trim()).filter(Boolean);

    if (!title) { Utils.toast('Job title enter karo', 'warning'); return; }
    if (!desc) { Utils.toast('Description likho', 'warning'); return; }
    if (!budget || budget <= 0) { Utils.toast('Valid budget enter karo', 'warning'); return; }
    if (!skills.length) { Utils.toast('Kam se kam 1 skill add karo', 'warning'); return; }

    JOBS.unshift({
      id: JOBS.length + 1,
      title, cat, budget: +budget,
      duration: dur, proposals: 0,
      desc, skills,
      posted: 'Just now',
      client: Auth.currentUser.name,
      rating: 5.0
    });

    Utils.closeModal();
    Jobs.render(JOBS);
    Utils.toast('Job posted successfully!', 'success');
    App.goTo('jobs');
  }
};