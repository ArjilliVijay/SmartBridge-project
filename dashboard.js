// js/dashboard.js
// ------------------------------------------------------
//  ResolveNow – Dashboard logic
//  • Shows logged‑in user’s name
//  • Adds new complaints to the table immediately
//  • Persists complaints in localStorage
// ------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------------------------- *
   * 1.  Personal greeting & logout
   * -------------------------------------------------- */
  const userNameEl = document.getElementById('userName');
  userNameEl.textContent = localStorage.getItem('name') || 'User';

  document.getElementById('logoutBtn').addEventListener('click', () => {
    // Simple demo logout: clear storage & bounce to login page
    localStorage.clear();
    location.href = 'login.html';
  });

  /* -------------------------------------------------- *
   * 2.  Load saved complaints (if any)
   * -------------------------------------------------- */
  const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
  const tbody       = document.getElementById('complaintsBody');

  const render = () => {
    // Empty the table body then refill
    tbody.innerHTML = '';

    complaints.forEach(comp => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${comp.subject}</td>
        <td>${comp.description}</td>
        <td>${comp.status}</td>
        <td>${comp.date}</td>`;
      tbody.appendChild(tr);
    });
  };

  render();   // initial paint

  /* -------------------------------------------------- *
   * 3.  Handle “Submit Complaint”
   * -------------------------------------------------- */
  document.getElementById('complaintForm')
          .addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(e.target);
    const newComplaint = {
      subject: data.get('subject').trim(),
      description: data.get('description').trim(),
      status: 'Pending',
      date: new Date().toLocaleString('en-IN', {
        day:   '2-digit',
        month: 'short',
        year:  'numeric',
        hour:  '2-digit',
        minute:'2-digit'
      })
    };

    // Add newest complaints to the top
    complaints.unshift(newComplaint);

    localStorage.setItem('complaints', JSON.stringify(complaints));
    render();           // refresh the table
    e.target.reset();   // clear the form
  });
});
