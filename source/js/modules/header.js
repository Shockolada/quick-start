const pageHeader = () => {
  const header = document.querySelector('.page-header');

  document.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop > 200 && !header.classList.contains('scrolled')) {
      header.classList.add('scrolled');
    } else if (scrollTop <= 200 && header.classList.contains('scrolled')) {
      header.classList.remove('scrolled');
    }
  });
};

export default pageHeader;