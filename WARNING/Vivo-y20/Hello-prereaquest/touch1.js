console.log('Hi');
let t = document.getElementById("touch")
let body = document.querySelector('body')

// t.style.left = "100px";
// t.style.top = `${window.innerWidth}px`;





window.addEventListener('click', (e)=>{
    
    // let cx = e.clientX;
    // let cy = e.clientY;
    
    
    
    
    
    let cx = e.offsetX;
    let cy = e.offsetY;
    
    
    t.style.left = `${cx}px`;
    t.style.top = `${cy}px`;
    
    
    
    
    
    
    
    // console.log(cx);
    // console.log(cy);
    e.preventDefault();
});



    window.addEventListener('touchmove',(e)=>{
        // console.log('gux');
        // document.createElement('div').setAttribute("id", "touch");
        // console.log(body);
        
        
        
        // if (t !== null) {
        //     console.log('hj');
        // }
        
        // let cx = e.touches[0].offsetX;
        // let cy = e.touches[0].offsetY;
        
        
        // t.style.left = `${cx}px`;
        // t.style.top = `${cy}px`;
        
        t.style.left='300px';
        
        // console.log(cx);
        // console.log(cy);
        
        
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            // var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
            
            
            if (e.touches.length >= 2) {
                
                 let a = e.touches[1].clientX;
                let b = e.touches[1].clientY;
                
                t.style.left =`${a}px`;
                t.style.top =`${b}px`;
                
                
                
                
                console.log('xutxr8z5e%e');
            }
        
            
            t.style.left =`${x}px`;
            t.style.top =`${y}px`;

            
            // console.log(x,y);
            // console.log('hhh');
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            x = e.clientX;
            y = e.clientY;
            
            
            
            
            
            
            
            console.log(x,y);
            // console.log('iiu');
        }
        
        
        
        
        e.preventDefault();
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        function touchstart(evt) {
        
        // startingY = evt.touches[0]. clientY;
        
        
        if (evt.touches.length >= 2) {
            // starting2Y = evt.touches[1].clientY;
            // p2.style.opacity = "1";
            
            console.log('start');
        }
        // here evt.touches[0] means touch of finger one 
    }
    function touchmove(evt) {
        
        
        console.log('moving');
        // for second finger
        if (evt.touches.length >= 2) {
            
        }
        
        evt.preventDefault();
    }
    function touchend() {
        // p2.style.opacity = "0";
        t.touch.display='none';
        console.log('end');
        
        
    }
