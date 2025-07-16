// js/register.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (!form) {
    console.error('registerForm not found in DOM');
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();                     // stop the default reload

    const fullName = e.target.elements['name'].value.trim();
    if (!fullName) {
      alert('Please enter your full name');
      return;
    }

    alert(`Hi ${fullName}, your registration was successful!`);

    // give the alert time to paint before navigating
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 100);
  });
});
