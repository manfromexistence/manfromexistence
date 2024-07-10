const btn = document.querySelector('.pro_navbar_mb_btn');
const small_ul = document.querySelector('.mb_list5');
const navbar_sm = document.querySelector('.pro_navbar_main_container');
const navbar_main_content = document.querySelector('.pro_navbar_mb_main-content');
const sub = document.querySelector('.pro_navbar_sub-menu_mb');
const page_menu = document.querySelector('.pro_navbar_page-menu_mb');

btn.onclick = () => {
        btn.classList.toggle('active');
        navbar_sm.classList.toggle('active');
};




small_ul.onclick = () => {
                const pp = document.querySelector('.pro_navbar_mb_main-content').childElementCount;
                console.log(pp);
                sub.classList.toggle('toggle');
                page_menu.classList.toggle('toggle');
                navbar_sm.classList.toggle('toggle');
        }
        console.log('think hi one');