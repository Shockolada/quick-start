import calcScrollWidth from '../services/calc-scroll-width';

const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector) {

    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelectorAll(closeSelector),
      overlay = document.querySelector('.modal-overlay'),
      scrollWidth = calcScrollWidth();

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

    try {
      modal.addEventListener('click', (evt) => {
        if (evt.target === modal) {
          closeModal();
        }
      });
    } catch (err) {}

    function openModal() {
      document.body.style.paddingRight = `${scrollWidth}px`;
      modal.style.paddingRight = `${scrollWidth}px`;
      modal.classList.add('active');
      overlay.classList.add('active');

      document.body.classList.add('scroll-lock');
      document.addEventListener('keydown', onEscPress);
    }

    function closeModal() {
      document.body.style.paddingRight = '';
      modal.style.paddingRight = '';
      modal.classList.remove('active');
      overlay.classList.remove('active');

      document.body.classList.remove('scroll-lock');
      document.removeEventListener('keydown', onEscPress);
    }

    function onEscPress(evt) {
      if (evt.which === 27 && modal.classList.contains('active')) {
        closeModal();
      }
    }
  }


  bindModal('[data-trigger-modal', '#modal', '.modal__close');
  bindModal('[data-trigger-modal-2', '#modal-2', '.modal__close');
};

export default modals;
