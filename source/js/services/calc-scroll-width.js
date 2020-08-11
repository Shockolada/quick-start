const calcScrollWidth = () => {
  let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  
  return scrollWidth;
};

export default calcScrollWidth;