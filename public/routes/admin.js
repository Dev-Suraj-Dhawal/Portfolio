// working code below

// const form = document.getElementById("contactForm");
// const tbody = document.querySelector("#contactsTable tbody");
// const socket = io(); // ✅ connect to backend via socket.io
// above is the working code


// Submit form via fetch
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = Object.fromEntries(new FormData(form).entries());

//   await fetch("/save", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });

//   form.reset();
// });

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const formData = Object.fromEntries(new FormData(form).entries());

//   await fetch("/save", { 
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//    }); // <--- This triggers the POST
//   form.reset();
// });

// working code below
// Render table with contacts
// function renderTable(contacts) {
//   tbody.innerHTML = contacts
//     .map(
//       (c) => `
//       <tr>
//         <td>${c.id}</td>
//         <td>${c.name}</td>
//         <td>${c.email}</td>
//         <td>${c.message}</td>
//         <td>${new Date(c.created_at).toLocaleString()}</td>
//       </tr>`
//     )
//     .join("");
// }
// above is the working code


// ✅ On connect or update, refresh full table
// socket.on("contacts_update", (contacts) => {
//   console.log("📩 Updated contact list received:", contacts);
//   renderTable(contacts);
// });

// working code below
// socket.on("contacts_update", (contacts) => {
//   renderTable(contacts);
// });
// above is the working code




// public/js/admin.js
document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('contactsBody');
  if (!tbody) {
    console.warn('contactsBody element not found');
    return;
  }

  // connect to socket.io
  const socket = io();

  // Render table with contacts
  function renderTable(contacts) {
    if (!Array.isArray(contacts)) return;
    tbody.innerHTML = contacts
      .map((c) => `
        <tr>
          <td class="p-2 border-b">${c.id ??''}</td>
          <td class="p-2 border-b">${c.name ?? ''}</td>
          <td class="p-2 border-b">${c.email ?? ''}</td>
          <td class="p-2 border-b">${c.message ?? ''}</td>
          <td class="p-2 border-b">${c.created_at ? new Date(c.created_at).toLocaleString() : ''}</td>
        </tr>`)
      .join('');
  }

  // On initial load, fetch current contacts (optional)
  fetch('/contacts')
    .then((r) => r.json())
    .then((data) => renderTable(data))
    .catch((err) => console.error('Failed to fetch contacts:', err));

  // Real-time updates
  socket.on('contacts_update', (contacts) => {
    renderTable(contacts);
  });
});
