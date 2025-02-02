const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const gravity = 0.5

class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, 100)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.velocity.y += gravity
    }
}

const player = new Player({
    x: 0,
    y: 0,
});

let y = 100;
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
}

animate();

// let ctx = 
// ctx.fillStyle = "#FF0000";
// ctx.beginPath();
// ctx.arc(150, 150, 50, 0, Math.PI * 2); // Środek (150,150), promień 50
// ctx.fill(); // Wypełnienie kolorem