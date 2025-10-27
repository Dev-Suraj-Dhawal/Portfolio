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