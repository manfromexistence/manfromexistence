const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const ParticlesArray = [];
let hue = 0;

window.addEventListener('resize',function(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
})


class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 10;
        this.weight = 0.2;
        this.directionX = 1;
        
        
       
    }
    update(){
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.width = 1;
            this.x = Math.random() * canvas.width;
        }
        
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;
        
    }
    draw(){
        ctx.fillStyle = '#eff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}
const Particle1 = new Particle(100,1);
const Particle2 = new Particle(200,20);
const Particle3 = new Particle(300,30);


function animate(){
    Particle1.update();
    Particle3.update();
    Particle3.draw();
    Particle1.draw();
    Particle2.update();
    Particle2.draw();
    requestAnimationFrame(animate);
}
animate();
































// const touch = {
//     x : undefined,
//     y : undefined,
// }
// canvas.addEventListener('click', function(event){
//     touch.x = event.x;
//     touch.y = event.y;
//     drawCircle();
//     console.table(event);
//     handleParticles();
// })

// function drawCircle(){
//     ctx.fillStyle = ('blue');
//     ctx.beginPath();
//     ctx.arc(touch.x, touch.y, 20, 0, Math.PI * 2);
//     ctx.fill();
    
// }
// drawCircle();
// function init(){
    // for (let i = 0; i < 100; i++){
        // ParticlesArray.push(new Particle());
    // }
// }
// init();
// console.log(ParticlesArray);
// function handleParticles(){
    // for (let i = 0; i < ParticlesArray.length; i++){
        // ParticlesArray[i].update();
        // ParticlesArray[i].draw();
        // console.log('Hello World!');
        
    // }
// }
// handleParticles();
// this.x = Math.random() * canvas.width;
// this.y = Math.random() * canvas.height;
// this.size = Math.random() * 5 + 1;
// this.speedX = Math.random() * 3 + 1.5;
// this.speedY = Math.random() * 3 + 1.5;


// ctx.fillStyle = ('blue');
// ctx.beginPath();
// ctx.arc(touch.x, touch.y, 20, 0, Math.PI * 2);
// ctx.fill();



// this.x += this.speedX;
// this.y += this.speedY;