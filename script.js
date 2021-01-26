const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pontos = document.getElementById('pontos');

const boxSize = 10;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class Snake {
    length = 5;
    positions = [{x: 50, y: 50}, {x: 50, y: 60}, {x: 50, y: 70}, {x: 50, y: 80}, {x: 50, y: 90}];
    direction = 3; // 0 = cima, 1 = direita, 2 = baixo, 3 = esquerda;

    constructor() {}

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.positions.forEach(pos => {
            ctx.fillRect(pos.x, pos.y, boxSize, boxSize);
        });
    }

    move() {
        pontos.innerHTML = Math.round(Math.random() * 100);

        let { x, y } = this.positions[0];

        switch (this.direction) {
            case 0:
                if (y - boxSize > 0)
                y -= boxSize;
                break;

            case 1:
                if (x + boxSize < canvas.width)
                x += boxSize;
                break;

            case 2: 
                if (y + boxSize < canvas.height)
                y += boxSize;
                break;

            case 3:
                if (x - boxSize > 0)
                x -= boxSize;
                break;
        }

        this.positions.unshift({x, y});
        if(this.positions.length > this.length) {
            this.positions.pop();
        }
        
    }
}

async function run() {
    const snake = new Snake();

    document.addEventListener("keydown", direction);

    function direction(event){
        let key = event.keyCode;
        if( key == 37){
            //esquerda
            snake.direction = 3;
        }else if(key == 38){
            // cima
            snake.direction = 0;
        }else if(key == 39){
            //direita
            snake.direction = 1;
        }else if(key == 40){
            //baixo
            snake.direction = 2;
        }
    }

    let x = 0;
    while (true) {
        // Atualizar as posições e pontos
        // Movimentar o jogo
        snake.move();
        snake.draw();

        x += 0.1;
        await sleep(1000/5);
    }
}

run();

