console.log('Hello World!');
const toggle = document.querySelector('#toggle');
const sidebar = document.querySelector('#sidebar');
toggle.onclick = function (){
     toggle.classList.toggle('active');
     sidebar.classList.toggle('active');
}
// document.onclick = function (e) {
    // if (e.target.id !== 'sidebar' && e.target.id !== 'toggle'){
    //  toggle.classList.remove('active');
    //  sidebar.classList.remove('active');
       
    // }
// }