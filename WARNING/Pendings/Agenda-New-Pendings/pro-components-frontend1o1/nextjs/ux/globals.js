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
let segment_items = document.querySelectorAll('.segment-item');
let segment_indicator = document.querySelector('#segment-indicator');



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
if (marker !== 'undefined' && items !== 'undefined') {
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
if (segment_items !== 'undefined' && segment_indicator !== 'undefined') {
    function indicator(e) {
        let ifcon1 = 50;
        let ifcon2 = 140;
        let ifcon3 = 160;
        let first = 1.3;
        let second = 8.9;
        let third = 15.6;
        
        
        let width_rule = 20;
        
        // segment_indicator.style.left = e.offsetLeft - rule1 + 'px';
        
        if (e.offsetLeft > ifcon1 ) {
            if (e.offsetLeft > ifcon2 ) {
                console.log('80');
                segment_indicator.style.left = second + 'rem';
            
            } 
            if (e.offsetLeft > ifcon3) {
                console.log('80+');
                segment_indicator.style.left = third + 'rem';
            
            }
            
        }else{
            console.log('1st');
            // segment_indicator.style.right = e.offsetLeft - rule1 + 'px';
            segment_indicator.style.left = first + 'rem';
            
            
        }
        
        
        
        segment_indicator.style.width = e.offsetWidth + width_rule + 'px';
        
        
        console.log(segment_indicator.style.left);
        console.log(segment_indicator.style.width);
        
        
    };
    segment_items.forEach(link => {
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