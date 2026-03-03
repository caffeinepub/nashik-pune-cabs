import '../index.css';
import { renderLanding } from './sections';
import { renderAdmin } from './admin';
import { initBookingForm } from './booking';

// Simple hash-based routing
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  const hash = window.location.hash;

  if (hash === '#/admin') {
    app.innerHTML = renderAdmin();
    // Admin initialization happens in admin.ts
    import('./admin').then(({ initAdmin }) => initAdmin());
  } else {
    app.innerHTML = renderLanding();
    initBookingForm();
  }
}

// Initial render
render();

// Listen for hash changes
window.addEventListener('hashchange', render);
