    let marker = document.querySelector('#marker');
    let items = document.querySelectorAll('.op');

    function indicator(e) {

        marker.style.left = e.offsetLeft + 'px';
        marker.style.width = e.offsetWidth + 'px';
    };

    items.forEach(link => {
        link.addEventListener('click', (e) => {
            indicator(e.target);
        })
        link.addEventListener('dbclick', (e) => {
            indicator(e.target);
            console.log('dbl');
        })
    });




    // let marker = document.querySelector('#marker');
    // let items = document.querySelectorAll('.op');

    // function indicator(e) {
    // if (e.offsetLeft > window.innerWidth) {
    // console.log('no');
    // marker.style.right = `${e.}px`;
    // marker.style.width = e.offsetWidth + 'px';

    // console.log(marker.style.right);
    // }
    // else {
    // marker.style.left = e.offsetLeft + 'px';
    // marker.style.width = e.offsetWidth + 'px';
    // console.log(marker.style.width);
    // }

    // };

    // items.forEach(link => {
    // link.addEventListener('click', (e) => {
    // indicator(e.target);
    // })
    // });        