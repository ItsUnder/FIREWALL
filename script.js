document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const clearBtn = document.getElementById('clearBtn');


  let isComplex = localStorage.getItem('modoComplexo') === 'false' ? false : true;
  
  function initCheckboxes() {
    document.querySelectorAll('.checkboxItem').forEach(cb => {
      const label = cb.closest('.item').querySelector('label');


      if(cb.dataset.key && localStorage.getItem(cb.dataset.key) === 'true') {
        cb.checked = true;
        label.classList.add('checked-label');
      }


      cb.addEventListener('change', () => {
        if(cb.dataset.key) localStorage.setItem(cb.dataset.key, cb.checked);
        if(cb.checked) label.classList.add('checked-label');
        else label.classList.remove('checked-label');
      });
    });
  }

 
  function updateCheckboxesMode() {
    document.querySelectorAll('.item').forEach(item => {
      const label = item.querySelector('label');
      const wrapper = item.querySelector('.checkbox-wrapper');


      wrapper.querySelectorAll('.checkboxItem').forEach(cb => cb.remove());

      if(isComplex) {
   
        for(let i = 1; i <= 3; i++) {
          const cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.classList.add('checkboxItem');
          cb.dataset.key = label.textContent + '-cb' + i; 
          wrapper.appendChild(cb);
        }
      } else {

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.classList.add('checkboxItem');
        cb.dataset.key = label.textContent + '-cb1';
        wrapper.appendChild(cb);
      }
    });

    initCheckboxes();
  }

  updateCheckboxesMode();

  const complexOption = document.getElementById('complexOption');
  complexOption.textContent = isComplex ? 'Modo Simples' : 'Modo Complexo';
  complexOption.addEventListener('click', () => {
    isComplex = !isComplex;
    localStorage.setItem('modoComplexo', isComplex); 
    complexOption.textContent = isComplex ? 'Modo Simples' : 'Modo Complexo';
    updateCheckboxesMode();
    sidebar.classList.remove('active');
  });


  const manualOption = document.getElementById('manualOption');
  manualOption.addEventListener('click', () => {
    window.location.href= "./pages/manual.html"
    sidebar.classList.remove('active');
  });


  clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.checkboxItem').forEach(cb => {
      cb.checked = false;
      const label = cb.closest('.item').querySelector('label');
      label.classList.remove('checked-label');
      if(cb.dataset.key) localStorage.removeItem(cb.dataset.key);
    });
    updateCheckboxesMode(); // Reseta para modo atual
  });


  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

});