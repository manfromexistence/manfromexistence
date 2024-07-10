// alert("Emon Bhaifsdfdsaf!");
let world;
let FPS = 67,
    lastTime = 0,

loop = (timestamp) => {
    requestAnimationFrame(loop);
    if (timestamp - lastTime < 1000 / FPS) {
        return;
    }
    world.doOneCycle();
    lastTime = Math.max(
        lastTime + 1000 / FPS,
        timestamp - 1000 / FPS
    );
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
world = new WorldMorph(document.getElementById('world'));
new IDE_Morph().openIn(world);
requestAnimationFrame(loop);