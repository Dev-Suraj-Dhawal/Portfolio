// // public/routes/admin.js
// public/login-modal.js
document.addEventListener('DOMContentLoaded', () => {
  const dashboardLink = document.querySelector('a[href="/ven.html"]');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeLoginModal');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  /** ==============================
   *  🧭 Show Modal (Desktop View)
   *  ============================== */
  if (dashboardLink) {
    dashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
      showLoginModal();
    });
  }

  /** ==============================
   *  📱 Mobile Menu Links
   *  ============================== */
  mobileLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      mobileMenu.classList.add("hidden");
      if (link.textContent.trim().toLowerCase() === "dashboard") {
        e.preventDefault();
        showLoginModal();
      }
    });
  });

  closeMobileMenuBtn?.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });

  /** ==============================
   *  🔐 Login Form Submission
   *  ============================== */
  if (loginForm) {
    const loginBtn = loginForm.querySelector('button[type="submit"]');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      loginError.textContent = '';
      loginBtn.disabled = true;
      loginBtn.innerHTML = `<i class="fa fa-spinner fa-spin mr-2"></i> Logging in...`;

      const formData = new FormData(loginForm);
      const email = formData.get('email');
      const password = formData.get('password');

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Successful login — cookie set securely
          hideLoginModal();
          setTimeout(() => {
            window.location.href = '/ven.html';
          }, 400);
        } else {
          loginError.textContent = data.message || 'Invalid credentials';
        }
      } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'Network error. Please try again.';
      } finally {
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Login';
      }
    });
  }

  /** ==============================
   *  ❌ Close Modal (Click / Outside / ESC)
   *  ============================== */
  if (closeModal) {
    closeModal.addEventListener('click', hideLoginModal);
  }

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) hideLoginModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideLoginModal();
  });

  /** ==============================
   *  🎬 Helper Functions
   *  ============================== */
  function showLoginModal() {
    loginModal.classList.remove('hidden');
    loginError.textContent = '';
    document.body.classList.add('overflow-hidden'); // Prevent background scroll
    loginModal.classList.add('fade-in');
    loginModal.classList.remove('fade-out');
  }

  function hideLoginModal() {
    loginModal.classList.add('fade-out');
    loginModal.classList.remove('fade-in');
    setTimeout(() => {
      loginModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  }
});
// above is the working code