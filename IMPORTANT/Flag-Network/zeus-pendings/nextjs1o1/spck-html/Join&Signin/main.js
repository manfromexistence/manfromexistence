let r=document.querySelector(':root');
    let main__join_signin__container = document.querySelector('#join-signin_container');

    let openBtn1 = document.querySelector('#join_toggle');
    let openBtn2 = document.querySelector('#signin_toggle');
    let form = document.querySelector('.forms');
    let cdrop = document.querySelector('.circle');
 let rs = getComputedStyle(r);
//   console.log(rs);


// let join_signup_toggle = document.querySelectorAll('.join_signup_toggle'),
    
    // join_signup_popup = op;
    
    
    
    
    
/*=============== SHOW JOIN/SIGNUP ===============*/
    
    
    
    const goSignin = ()=>{
        // console.log('gosignin');
        // openBtn2.classList.add('active1o1')
        // r.style.setProperty('--join_signin_toggle',`330px`);
        // forms.forEach.classList.add('forms_toggle');
        main__join_signin__container.classList.add('forms_toggle');
        form.classList.add('forms_toggle');
        
    }
    const goJoin = ()=>{
        // console.log('gojoin');
        // openBtn1.classList.add('active1o1')
        // r.style.setProperty('--join_signin_toggle',`0px`);
        main__join_signin__container.classList.remove('forms_toggle');
        form.classList.remove('forms_toggle');
        
        
    }
    
    openBtn1.addEventListener('click', goSignin ,false);
    openBtn2.addEventListener('click', goJoin ,false);
    
    
    
    
    
    
    
    
        // openBtn.addEventListener('click', ()=>{
        //     main__join_signin__container.classList.toggle('show_join_signin_container')
        // })



// window.addEventListener('click', ()=>{
//     console.log('op');
//     main__join_signin__container.classList.toggle('show_join_signin_container')
    
// })




// let cdrop = document.querySelectorAll(".drop");
// cdrop.forEach(drop => {
//     drop.addEventListener('click', ()=>{
//         console.log('op');
//     })
// })
// drop.forEach




let social_login_toolbar = document.querySelector('#social_login_toolbar.scale')

// document.querySelectorAll(".circle").forEach(box => 
//   box.addEventListener("click", () => social_login_toolbar.classList.forEach(op => op.addEventListener('click', () => {
//       op.classList.toggle('scale')
//   })))
// )


document.querySelectorAll(".circle").forEach(box => 
  box.addEventListener("click", () => main__join_signin__container.classList.toggle('scale'))
)
