const canvas = document.querySelector('canvas');

document.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false }); 

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

        // Rozmiary gracza
        this.height = 100
	this.width = 100
	this.isDragging = false; // Dodaj flagę dla drag and drop
        this.offset = { x: 0, y: 0 }; // Offset podczas przeciągania
	
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        this.draw()

        // Grawitacja jesli nie przeciagamy
	if (!this.isDragging) { // Tylko jeśli nie przeciągamy
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
        
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            // Stop spadania
            this.velocity.y = 0;
        }
    } else {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    // Ograniczenie pozycji gracza wewnątrz canvasu
    if (this.position.x < 0) {
        this.position.x = 0;
    }
    if (this.position.x + this.width > canvas.width) {
         this.position.x = canvas.width - this.width;
     }
     if (this.position.y < 0) {
         this.position.y = 0
     }
      if (this.position.y + this.height > canvas.height && !this.isDragging) {
       this.position.y = canvas.height - this.height
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

// Obsługa dotyku
canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

     // Sprawdzenie czy dotykamy gracza
    if (touchX >= player.position.x &&
        touchX <= player.position.x + player.width &&
        touchY >= player.position.y &&
        touchY <= player.position.y + player.height) {

        player.isDragging = true;
         player.offset.x = touchX - player.position.x; // Oblicz offset
        player.offset.y = touchY - player.position.y;
    }
});

canvas.addEventListener('touchmove', (event) => {
    if (player.isDragging) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
          // Ustaw pozycję gracza z uwzględnieniem offsetu
        player.position.x = touchX - player.offset.x;
         player.position.y = touchY - player.offset.y;

         // Ograniczenie, aby gracz nie wychodził poza canvas
         if (player.position.x < 0) {
             player.position.x = 0
          }
          if (player.position.x + player.width > canvas.width) {
              player.position.x = canvas.width - player.width
          }
          if(player.position.y < 0) {
              player.position.y = 0
          }
         if(player.position.y + player.height > canvas.height) {
             player.position.y = canvas.height - player.height
         }
    }
});

canvas.addEventListener('touchend', () => {
    player.isDragging = false; // Przestań przeciągać, pozwól grawitacji działać
    player.velocity.y = 0; // Wyzeruj prędkość pionową
});