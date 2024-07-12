'use strict';
import { Robin } from './src/toogle/robin.js';
// import { Notes_page } from './tod/notes.js';//Update later





//                                All variables
const d = (e)=> {
    return document.querySelector(e);
}
const da = (e)=> {
    return document.querySelectorAll(e);
}

let r = d(':root');
let html = d('html'),
    body = d('body'),
    sidebar = d('#pro-navbartop-sidebar'),
    toggle = d('#pntcg1'),
    modeSwitch = d('.toggle-switch'),
    modeText = d('.mode-text'),
    op = 2005,
    drop_down = d('.drop-down'),
    drop_downon = d('.cross1'),
    drop_downoff = d('.cross2'),
    arrows = da('.arrows'),
    l_arrow=d('#left-arrow'),
    r_arrow=d('#right-arrow'),
    ptli=d('.ptli')

    








    toggle.addEventListener("click" , () =>{
        sidebar.classList.toggle("close");
    })
    
    modeSwitch.addEventListener("click" , () =>{
        body.classList.toggle("dark");
        
        if(body.classList.contains("dark")){
            modeText.innerText = "Buyer Mode";
        }else{
            modeText.innerText = "Seller Mode";
            
        }
    });





if (toggle != null && sidebar != null && modeSwitch != null && modeText != null && op != null && drop_downon !=  null && drop_down != null && arrows != null) {
    console.log('toggle');

        let a = 0;
        let b = 0;
        // let result;
        // result = 0;

        // a++;
        // b++;
    
    window.addEventListener('dblclick', ()=>{
        // console.log('op');
    })
    const arrow_right = ()=> {
        
        a++;
        if (a > 73) {
            a = 73;
            // console.log('op');
            
        }
        
        r.style.setProperty('--slider-left',`-100%`);
        // console.log(result);
        // console.log(a);
        // return result;
    }
    const arrow_left = ()=> {
        let leftarrow_guideline        
        a--;
        // let decress = a * 40;
        // leftarrow_guideline = result;
        // leftarrow_guideline = result - 50;
        if (a < 1) {
            a = 1;
            // console.log('op');
            
        }
        
        r.style.setProperty('--slider-left',`-100%`);
        // console.log(a);
        // console.log(leftarrow_guideline);
        // result=`-${a * 30}`;
        // if (result < -2190) {
        //     result = -2180;
        // }
        
        // r.style.setProperty('--slider-left',`${result}px`);
        // console.log(result);
        
    }
    r_arrow.addEventListener('click',arrow_right,false);
    l_arrow.addEventListener('click',arrow_left,false);
    
    
    arrow_right();
    
}
else{
    console.log('no');
}





// myFunction_get();

// Others😅😅😅
// console.log(body.clientHeight);
// Robin('Hello Robin bro')
