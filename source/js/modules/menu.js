const menu = () => {
  const menu = document.querySelector('.menu-mobile'),
    menuTrigger = document.querySelector('[data-menu-trigger]');

  menuTrigger.addEventListener('click', (evt) => {
    if (evt.target) {
      // evt.preventDefault();
    }

    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      // document.removeEventListener('click', onOutClick);
    } else {
      menu.classList.add('active');
      // document.addEventListener('click', onOutClick);
    }
  });

  // const onOutClick = (evt) => {
  //   const target = evt.target,
  //     element = document.querySelector('.menu-mobile');
  //   if ((target && !target.closest('.menu-mobile')) || (target && !target.matches('.menu-mobile'))) {
  //     console.log(target);
  //     element.classList.remove('active');
  //   }
  // };
};

export default menu;
