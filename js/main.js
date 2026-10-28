/**
 * MIVA OPEN UNIVERSITY - STUDENT PORTFOLIO & ACADEMIC MANAGEMENT
 * Author: Favour Adeyemi (B.Sc. Computer Science)
 * Core Shared Script (Navigation, Theme Toggle, Modal, Toasts)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initHeaderScroll();
  initCurrentYear();
  initModalHandlers();
});

/**
 * Responsive Mobile Navigation Menu
 */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  });

  // Close navigation when a link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#9776;';
    });
  });

  // Close menu if user clicks outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '&#9776;';
    }
  });
}

/**
 * Light / Dark Theme Switcher with LocalStorage Persistence
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('miva_portfolio_theme') || 'light';

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('miva_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeIcon');
  if (!themeIcon) return;
  themeIcon.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
}

/**
 * Header shadow effect on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Dynamic Footer Year
 */
function initCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Generic Toast Notification System
 */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'danger' || type === 'error') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Project / Interactive Modal Handlers
 */
function initModalHandlers() {
  const modalOverlay = document.getElementById('globalModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay || !modalCloseBtn) return;

  const closeModal = () => {
    modalOverlay.classList.remove('active');
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Open Project Simulation Modal
 */
function openProjectDemo(title, description, tags, link) {
  const modalOverlay = document.getElementById('globalModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modalOverlay || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalBody.innerHTML = `
    <p style="margin-bottom: 1.25rem; font-size: 1.05rem; color: var(--text-muted);">${description}</p>
    <div style="margin-bottom: 1.5rem;">
      <strong style="display: block; margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; color: var(--text-main);">Technologies Utilized:</strong>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${tags.map(t => `<span class="tech-badge" style="background: rgba(59,130,246,0.1); color: var(--primary-light); font-weight:600;">${t}</span>`).join('')}
      </div>
    </div>
    <div style="background: var(--bg-surface-alt); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.5rem; border-left: 4px solid var(--accent-color);">
      <strong>⚡ Live Simulation Status:</strong>
      <p style="font-size: 0.9rem; margin-bottom: 0; margin-top: 0.25rem;">Interactive demo sandbox active and running mock APIs on port 8080.</p>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button class="btn btn-secondary btn-sm" onclick="document.getElementById('globalModal').classList.remove('active')">Close</button>
      <a href="${link}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Visit Repository &rarr;</a>
    </div>
  `;

  modalOverlay.classList.add('active');
}
