const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

// const player = new Player{
//     construct[    
//         x:0,
//         y:0];
// };

let y = 100;
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'red';
    c.fillRect(200, y, 100, 100);
    y++
}

animate();

// let ctx = 
// ctx.fillStyle = "#FF0000";
// ctx.beginPath();
// ctx.arc(150, 150, 50, 0, Math.PI * 2); // Środek (150,150), promień 50
// ctx.fill(); // Wypełnienie kolorem