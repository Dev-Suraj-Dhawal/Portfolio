// // Dashboard Authentication Script
// document.addEventListener('DOMContentLoaded', () => {
//   const token = localStorage.getItem('token');
//   const dashboard = document.getElementById('dashboard');

//   if (!token) {
//     // No token, redirect to home
//     window.location.href = '/';
//     return;
//   }

//   // Verify token with server
//   fetch('/auth/verify', {
//     method: 'GET',
//     headers: { 'Authorization': `Bearer ${token}` }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Invalid token');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Token is valid, show dashboard
//     dashboard.style.display = 'block';
//     // Load contacts data
//     loadContacts();
//   })
//   .catch(error => {
//     console.error('Authentication failed:', error);
//     localStorage.removeItem('token');
//     window.location.href = '/';
//   });

//   function loadContacts() {
//     fetch('/admin/contacts', {
//       method: 'GET',
//       headers: { 'Authorization': `Bearer ${token}` }
//     })
//     .then(response => response.json())
//     .then(data => {
//       const tbody = document.getElementById('contactsBody');
//       tbody.innerHTML = '';
//       data.forEach(contact => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td class="p-2">${contact.id}</td>
//           <td class="p-2">${contact.name}</td>
//           <td class="p-2">${contact.email}</td>
//           <td class="p-2">${contact.message}</td>
//           <td class="p-2">${new Date(contact.created_at).toLocaleString()}</td>
//         `;
//         tbody.appendChild(row);
//       });
//     })
//     .catch(error => {
//       console.error('Failed to load contacts:', error);
//     });
//   }
// });
