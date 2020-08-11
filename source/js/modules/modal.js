const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector) {

    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelectorAll(closeSelector),
      overlay = document.querySelector('.modal-overlay');

    trigger.forEach(item => {
      item.addEventListener('click', (evt) => {
        if (evt.target) {
          evt.preventDefault();
        }

        openModal();
      });
    });

    close.forEach(item => {
      item.addEventListener('click', (evt) => {
        if (evt.target) {
          evt.preventDefault();
        }

        closeModal();
      });
    });

    modal.addEventListener('click', (evt) => {
      if (evt.target === modal) {
        closeModal();
      }
    });

    function openModal() {
      modal.classList.add('active');
      document.body.classList.add('scroll-lock');
      overlay.classList.add('active');
  
      document.addEventListener('keydown', closeByEsc);
    }
  
    function closeModal() {
      document.body.classList.remove('scroll-lock');
      modal.classList.remove('active');
      overlay.classList.remove('active');
  
      document.removeEventListener('keydown', closeByEsc);
    }
  
    function closeByEsc(evt) {
      console.log('closed');
      if (evt.which === 27 && modal.classList.contains('active')) {
        closeModal();
      }
    }
  }


  bindModal('[data-trigger-modal', '#modal', '.modal__close');
  bindModal('[data-trigger-modal-2', '#modal-2', '.modal__close');
};

export default modals;
