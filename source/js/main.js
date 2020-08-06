// import
// $(document).ready(function () {
//   /* WHEN DEVICE WIDTH CHANGED */
//   let windowWidth = 0;
//   getWinWidth();
//   $(window).resize(getWinWidth);

//   const MOBILE_WIDTH = 'isMobile',
//     TABLET_WIDTH = 'isTablet',
//     DESKTOP_WIDTH = 'isDesktop';

//   let deviceByWidth = identDeviceByWidth();

//   $(window).resize(function () {
//     if (deviceByWidth != identDeviceByWidth()) {
//       deviceByWidth = identDeviceByWidth();
//       // Код при смене ширины
//     }
//   });

//   /* MENU */
//   const menu = $('.mobileMenu'),
//     menuOpenBtn = $('.menuToggleBtn'),
//     menuOverlay = $('.menuOverlay');

//   menuOpenBtn.click(function (evt) {
//     evt.preventDefault();

//     if ($(this).hasClass('active')) {
//       $(this).removeClass('active');
//       unlockBodyScroll();
//       menu.removeClass('active');
//       menuOverlay.fadeOut('slow');
//     } else {
//       $(this).addClass('active');
//       lockBodyScroll('.mobileMenu');
//       menu.addClass('active');
//       menuOverlay.fadeIn('slow');
//     }
//   });

//   /* MODAL */
//   $('.modalOverlay, .closeModalBtn').click(function () {
//     $('.modal').fadeOut(300);
//     unlockBodyScroll();
//   });

//   /* FUNCTIONS */
//   function getWinWidth() {
//     windowWidth = $(window).outerWidth();
//   }

//   function identDeviceByWidth() {
//     if (windowWidth < 768) {
//       return MOBILE_WIDTH;
//     } else if (windowWidth >= 768 && windowWidth < 940) {
//       return TABLET_WIDTH;
//     } else if (windowWidth >= 940) {
//       return DESKTOP_WIDTH;
//     }
//   }

//   function lockBodyScroll(selector) {
//     scrollLock(selector);
//   }

//   function scrollLock(selector) {
//     return bodyScrollLock.disableBodyScroll(document.querySelector(selector));
//   } // iOS blocking body scroll function.

//   function unlockBodyScroll() {
//     bodyScrollLock.clearAllBodyScrollLocks();
//   }
// });
