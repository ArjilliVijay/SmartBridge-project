// js/login.js
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = e.target.name.value.trim();  // Get the actual full name

  alert(`${fullName}, login successful!`);
  window.location.href = 'dashboard.html';
});
