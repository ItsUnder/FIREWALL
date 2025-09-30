document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');


  document.querySelectorAll('.checkboxItem').forEach(cb => {
    if(cb.dataset.key && localStorage.getItem(cb.dataset.key) === 'true') {
      cb.checked = true;
    }
  });


  container.addEventListener('change', e => {
    if(e.target.classList.contains('checkboxItem') && e.target.dataset.key) {
      localStorage.setItem(e.target.dataset.key, e.target.checked);
    }
  });


  document.getElementById('clearBtn').addEventListener('click', () => {
    document.querySelectorAll('.checkboxItem').forEach(cb => {
      cb.checked = false;
      if(cb.dataset.key) localStorage.removeItem(cb.dataset.key);
    });
  });
});