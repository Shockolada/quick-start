import svgxuse from 'svgxuse';
import $ from 'jquery';
import modals from './modules/modal';
import pageHeader from './modules/header';
import menu from './modules/menu';


window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  modals();
  pageHeader();
  menu();
});

console.log('test');



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
