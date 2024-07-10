const canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let draw_color;
let draw_width;
let is_drawing;

is_drawing = false;
draw_width = '6'
draw_color = 'red'
// variables💬🕸️🕸️🕷️🕷️🕷️🦹🦹‍♂️🦹‍♀️






// Some Early Access🕷️🕸️💬
canvas.width = window.innerWidth-60;
context.fillStyle = 'black';
context.fillRect(0,0, canvas.width, canvas.clientHeight);







canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);








function start(e) {
    
    is_drawing = true;
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft,
                   e.clientY - canvas.offsetTop);
    
    e.preventDefault();
    
    
    // console.log('1st');
    
}






function draw(e) {
    
    if ( is_drawing ) {
        
        context.lineTo(e.clientX - canvas.offsetLeft,
                       e.clientY - canvas.offsetTop);
      
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
        
        // console.log('00000000000000111111110110');
        
       
    }
    // console.log('done');
    
    
}












