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
