'use strict';

// navbar variables
const navbarNav = document.querySelector('.navbar-nav');
const navbarToggleBtn = document.querySelector('.nav-toggle-btn');
const notifications = document.querySelector('#notifications')


// navbar toggle functionality
navbarToggleBtn.addEventListener('click', function () {

//   navbarNav.classList.toggle('active');
  this.classList.toggle('active');

});





notifications.addEventListener('click', function () {
  navbarNav.classList.toggle('active');
  console.log('op');

});
