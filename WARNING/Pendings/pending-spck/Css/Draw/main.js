const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-60;
canvas.height = 300;




// console.log(canvas);
// console.log(ctx);
ctx.fillstyle = "red";
ctx.fillReact = (0,0, canvas.height, canvas.width); 

let h1 = document.querySelector('h1')
let draw_color = 'blue';
let draw_width = 2;
let is_drawing = false;


canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

function start(e){
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft,
               e.clientY - canvas.offsetTop);
    e.preventDefault();
    console.log('yes');
}

function draw(e){
    if (is_drawing = true){
        ctx.lineTo(e.clientX - canvas.offsetLeft,
                   e.clientY - canvas.offsetTop);
        ctx.strokeStyle = draw_color;
        ctx.line_width = draw_width;
        ctx.linecap = 'round';
        ctx.linejoin = 'round';
        ctx.strokeStyle = draw_color;
        ctx.stroke();
        ctx.fillStyle = '#eff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        console.log('yeh');
        h1.innerHTML = 'Hello';
    }
}























