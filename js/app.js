// ===== MAIN APP MODULE — sabse last mein load hota hai =====
const App = {

  // Navigate to a page section
  goTo(page) {
    // Hide all sections
    document.querySelectorAll('.page-sec').forEach(s => s.style.display = 'none');

    // Show target
    const el = document.getElementById('sec-' + page);
    if (el) {
      el.style.display = '';
      // Hero section flex banke center mein aaye
      if (page === 'home') el.style.display = 'flex';
    }

    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('act'));
    const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('act');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Initialize everything
  init() {
    // Render initial data
    Jobs.render(JOBS);
    Freelancers.render(FREELANCERS);

    // Start counter animation
    setTimeout(Utils.animateCounters, 500);

    // Keyboard shortcuts
    Utils.initKeyboard();

    // Navbar scroll effect
    window.addEventListener('scroll', App.handleNavScroll);
  },

  // Handle navbar background on scroll
  handleNavScroll() {
    const nb = document.getElementById('navbar');
    if (window.scrollY > 40) {
      nb.style.background = 'rgba(8,11,17,.92)';
      nb.style.backdropFilter = 'blur(12px)';
      nb.style.borderBottom = '1px solid var(--border)';
    } else {
      nb.style.background = 'transparent';
      nb.style.backdropFilter = 'none';
      nb.style.borderBottom = 'none';
    }
  }
};

// ===== DOM Ready pe init karo =====
document.addEventListener('DOMContentLoaded', App.init);