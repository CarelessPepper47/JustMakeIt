const canvas = document.querySelector('canvas');

// Łapanie API "2d"
const c = canvas.getContext('2d');


// Wielkość okna gry
canvas.width = 800;
canvas.height = 600;

// Grawitacja
const gravity = 0.5

// Tworzenie gracza i jego ruch
class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }

        // Wysokość gracza
        this.height = 100
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        this.draw()

        // if (this.position.y + this.velocity.y >= canvas.height) {
        //     this.velocity.y = 0;
        //     this.position.y = canvas.height - 100;
        // } else {
        //     this.position.y += this.velocity.y;
        //     this.velocity.y += gravity;
        // };

        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}

// Zmienna gracza i jego koordynaty
const player = new Player({
    x: 0,
    y: 0,
});

let y = 100;

// Funckja w której odgrywać się będzie całą gra
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
}

// Odpalanie funkcji
animate();

window.addEventListener('keydown', (event) => {
    console.log(event);
})

// let ctx = 
// ctx.fillStyle = "#FF0000";
// ctx.beginPath();
// ctx.arc(150, 150, 50, 0, Math.PI * 2); // Środek (150,150), promień 50
// ctx.fill(); // Wypełnienie kolorem