// // Login Modal Script
// document.addEventListener('DOMContentLoaded', () => {
//   // const dashboardLink = document.querySelector('a[href="/ven.html"]');
//   // window.location.href = '/ven.html'; // match the server route
//   const dashboardLink = document.querySelector('a[href="/ven"]'); // ✅ updated to match server route
//   const loginModal = document.getElementById('loginModal');
//   const closeModal = document.getElementById('closeLoginModal');
//   const loginForm = document.getElementById('loginForm');
//   const loginError = document.getElementById('loginError');

//   // Show modal when Dashboard is clicked
//   dashboardLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     loginModal.classList.remove('hidden');
//     loginError.textContent = '';
//   });

//   // Close modal
//   closeModal.addEventListener('click', () => {
//     loginModal.classList.add('hidden');
//   });

//   // Close modal when clicking outside
//   loginModal.addEventListener('click', (e) => {
//     if (e.target === loginModal) {
//       loginModal.classList.add('hidden');
//     }
//   });

//   // Handle login form submission
//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(loginForm);
//     const email = formData.get('email');
//     const password = formData.get('password');

//     try {
//       const response = await fetch('/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();
//       if (response.ok && data.token) {
//         localStorage.setItem('auth_token', data.token);
//         window.location.href = '/ven.html'; // ✅ fix 404
//       }
//       // if (response.ok && data.token) {
//       //   localStorage.setItem('auth_token', data.token);
//       //   window.location.href = '/ven'; // ✅ Use dynamic route
//       // }
//       // if (response.ok && data.token) {
//       //   localStorage.setItem('auth_token', data.token);
//       //   window.location.href = '/ven'; // ✅ Use dynamic route
//       // }

//       else {
//         loginError.textContent = data.message || 'Login failed';
//       }
//     } catch (error) {
//       loginError.textContent = 'Network error. Please try again.';
//     }
//   });
// });




// // public/login-modal.js
// document.addEventListener('DOMContentLoaded', () => {
//   const dashboardLink = document.querySelector('a[href="/ven.html"]');
//   const loginModal = document.getElementById('loginModal');
//   const closeModal = document.getElementById('closeLoginModal');
//   const loginForm = document.getElementById('loginForm');
//   const loginError = document.getElementById('loginError');
//   const mobileMenu = document.getElementById("mobileMenu");
//   const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
//   const mobileLinks = document.querySelectorAll(".mobile-link");

//   // Show modal when Dashboard is clicked
//   if (dashboardLink) {
//     dashboardLink.addEventListener('click', (e) => {
//       e.preventDefault();
//       loginModal.classList.remove('hidden');
//       loginError.textContent = '';
//     });
//   }

//   // Close modal
//   if (closeModal) {
//     closeModal.addEventListener('click', () => {
//       loginModal.classList.add('hidden');
//     });
//   }

//   // Close modal when clicking outside
//   if (loginModal) {
//     loginModal.addEventListener('click', (e) => {
//       if (e.target === loginModal) {
//         loginModal.classList.add('hidden');
//       }
//     });
//   }

//   // Handle mobile link clicks
//   mobileLinks.forEach(link => {
//     link.addEventListener("click", (e) => {
//       // Always close the mobile menu
//       mobileMenu.classList.add("hidden");

//       // Check if user clicked "Dashboard"
//       if (link.textContent.trim().toLowerCase() === "dashboard") {
//         e.preventDefault(); // prevent default # behavior
//         loginModal.classList.remove("hidden"); // open login modal
//       }
//     });
//   });

//   // Close mobile menu
//   closeMobileMenuBtn?.addEventListener("click", () => {
//     mobileMenu.classList.add("hidden");
//   });

//   // Handle login form submission
//   if (loginForm) {
//     loginForm.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const formData = new FormData(loginForm);
//       const email = formData.get('email');
//       const password = formData.get('password');

//       try {
//         const response = await fetch('/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//           credentials: 'include' // <--- critical: allow cookie to be set
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // server sets HTTP-only cookie; client should not rely on localStorage for the token
//           // Redirect to protected page (server authenticates cookie)
//           window.location.href = '/ven.html';
//           return;
//         } else {
//           loginError.textContent = data.message || 'Login failed';
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         loginError.textContent = 'Network error. Please try again.';
//       }
//     });
//   }
// });





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
      loginError.classList.remove('opacity-100');
      loginError.classList.add('opacity-0');
      loginBtn.disabled = true;
      loginBtn.innerHTML = `
        <span class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing In...
        </span>
      `;

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
          loginBtn.innerHTML = `
            <span class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Success!
            </span>
          `;
          setTimeout(() => {
            hideLoginModal();
            window.location.href = '/ven.html';
          }, 800);
        } else {
          loginError.textContent = data.message || 'Invalid credentials';
          loginError.classList.remove('opacity-0');
          loginError.classList.add('opacity-100');
        }
      } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'Network error. Please try again.';
        loginError.classList.remove('opacity-0');
        loginError.classList.add('opacity-100');
      } finally {
        if (!response?.ok) {
          loginBtn.disabled = false;
          loginBtn.innerHTML = `
            <span class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              Sign In
            </span>
          `;
        }
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