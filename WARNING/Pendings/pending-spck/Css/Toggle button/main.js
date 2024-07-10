console.log('Hello World!');
const toggle = document.querySelector('#toggle');
const body = document.querySelector('body');
const indicator = document.querySelector('.indicator');

toggle.onclick = function(){
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    indicator.classList.toggle('active');
    
}