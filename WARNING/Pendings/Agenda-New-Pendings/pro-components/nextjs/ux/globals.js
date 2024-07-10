import { Robin } from './src/toogle/robin.js';
const body = document.querySelector('body');
const btn = document.querySelector('.pro_navbar_mb_btn');
const small_ul = document.querySelector('.mb_list5');
const navbar_sm = document.querySelector('.pro_navbar_main_container');
const navbar_main_content = document.querySelector('.pro_navbar_mb_main-content');
const sub = document.querySelector('.pro_navbar_sub-menu_mb');
const page_menu = document.querySelector('.pro_navbar_page-menu_mb');
let menu = document.querySelector('span');
let navbar2 = document.querySelector('body');
let marker = document.querySelector('#marker');
let items = document.querySelectorAll('.scroll_li_a');
let navbar = document.querySelector('.sidebar-sm');



if (navbar !== null) {
    let sticky = navbar.offsetTop;
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
    window.onscroll = function() {myFunction()};
    

}
if (btn !== null) {
    btn.onclick = () => {
        navbar2.classList.toggle('active')
    };
    btn.onclick = () => {
        btn.classList.toggle('active');
        navbar_sm.classList.toggle('active');
    };
}




if (navbar === null) {
    console.log('null');
} else {
    console.log('op');
    
}








// Scroll💯
if (marker !== 'undefined') {
    function indicator(e) {
        let rule1 = 11;
        let rule2 = 9;
        
        let ifcon = 100;
        
        marker.style.left = e.offsetLeft - rule1 + 'px';
        if (e.offsetLeft > ifcon) {
            // marker.style.right = e.offsetLeft + 'px';
            console.log('working');
            
            
        }
        
        marker.style.width = 50 + 'px';
        
        
        console.log(marker.style.left);
        
    };
    items.forEach(link => {
        link.addEventListener('click', (e) => {
            indicator(e.target);
            
        })
        link.addEventListener('dbclick', (e) => {
            indicator(e.target);
        })
        
    });
    
}
    
    
    
    




console.log(body.clientHeight);
Robin('Op Argument');
