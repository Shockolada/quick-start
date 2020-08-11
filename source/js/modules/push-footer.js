const pushFooterDown = () => {
  function footer(footerSelector) {
    try {
      const windowHeight = document.documentElement.clientHeight,
        footer = document.querySelector(footerSelector),
        footerHeight = footer.offsetHeight;

      let footerTop = footer.offsetTop + footerHeight;

      if ((window.getComputedStyle(footer).marginTop).replace(/\D/g, "") > 0) {
        footerTop = footer.offsetTop + footerHeight - Number((window.getComputedStyle(footer).marginTop).replace(/\D/g, ""));
      }

      if (footerTop < windowHeight) {
        footer.style.marginTop = `${windowHeight - footerTop}px`;
      }
    } catch (err) {}
  }

  footer('.page-footer');
  window.onresize = () => footer('.page-footer');
};

export default pushFooterDown;
