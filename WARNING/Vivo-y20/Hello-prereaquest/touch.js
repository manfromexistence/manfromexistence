    let div = document.querySelectorAll('div');

    const p1 = div[0];
    const p2 = div[1];


    let startingX, startingY, movingX, movingY;

    // now for second finger 

    let starting2X, starting2Y, moving2X, moving2Y;

    function touchstart(evt) {
        startingX = evt.touches[0].clientX;
        startingY = evt.touches[0].clientY;
        p1.style.opacity = "1";

        if (evt.touches.length >= 2) {
            starting2X = evt.touches[1].clientX;
            starting2Y = evt.touches[1].clientY;
            p2.style.opacity = "1";
        }
        // here evt.touches[0] means touch of finger one 
    }
    function touchmove(evt) {
        movingX = evt.touches[0].clientX;
        movingY = evt.touches[0].clientY;

        changingX = movingX - startingX;
        changingY = movingY - startingY;

        p1.style.left = startingX + changingX;
        p1.style.top = startingY + changingY;
        p2.style.left = startingX + changingX;
        p2.style.top = startingY + changingY;
        

        // for second finger
        if (evt.touches.length >= 2) {
            moving2X = evt.touches[1].clientX;
            moving2Y = evt.touches[1].clientY;

            changing2X = moving2X - starting2X;
            changing2Y = moving2Y - starting2Y;

            p2.style.left = starting2X + changing2X;
            p2.style.top = starting2Y + changing2Y;
        }

        evt.preventDefault();
    }
    function touchend() {
        p1.style.opacity = "0";
        p2.style.opacity = "0";
    }

    // you can increase no. of fingers by changing touches[0] value 

    /* thats all for today 
    thank you for watching...
    */
