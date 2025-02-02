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
        
        // Grawitacja
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            // Stop spadania
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

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

// Funckja w której odgrywać się będzie całą gra
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 2;
    }
    if (keys.a.pressed) {
        player.velocity.x = -2;
    }
}

// Odpalanie funkcji
animate();

// Reakcja na naciśnięcie przycisku
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
        break;
        case 'a':
            keys.a.pressed = true
        break;
        case 'w': 
        player.velocity.y = -10;

    }
})

// Reakcja na wypuszczenie przycisku
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;
    }
})

// let ctx = 
// ctx.fillStyle = "#FF0000";
// ctx.beginPath();
// ctx.arc(150, 150, 50, 0, Math.PI * 2); // Środek (150,150), promień 50
// ctx.fill(); // Wypełnienie kolorem