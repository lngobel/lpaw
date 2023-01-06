import Enemy from "./Enemy"
import Smile from "./Smile"
import { keyPress, key } from "./keyboard"
import Gold from "./Gold"

let CTX
let CANVAS
const FRAMES = 60

const qtdEnemies = 10

let enemies = Array.from({length:qtdEnemies});

const smile = new Smile(300, 100, 20, 5,'yellow')

let gameover = false
let anime;
let boundaries
let gold;
let point=0;
let t;

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	enemies = enemies.map(i=>new Enemy(
			Math.random()*CANVAS.width,
			Math.random()*CANVAS.height,
			10, 5, 'red'
		))

	gold = new Gold(Math.random()*CANVAS.width, Math.random()*CANVAS.height, 5, 0, '#ff0')
	
	keyPress(window)
	loop()
}

const loop = () => {
	setTimeout(() => {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		t = texto(15, "Pontos: " + point)

		CTX.fillText(t, CANVAS.width - 80, 20 )

		smile.move(boundaries, key)
		smile.paint(CTX)

		gold.draw(CTX)

		if(gold.colide(smile)){
			smile.size += 1
			gold.x = Math.random()*CANVAS.width
			gold.y = Math.random()*CANVAS.height
			point++;
		}

		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
			 //var = teste?verdadeiro:falso;
			 gameover = !gameover 
			 		? e.colide(smile)
					: true;
		})

		if (gameover) {
			console.error('DEAD!!!')
			cancelAnimationFrame(anime)
		} else	anime = requestAnimationFrame(loop)

	}, 1000 / FRAMES)
}

function texto(font, text){ 
	CTX.font = `bold ${font}px sans`
	CTX.baseline = 'top'
	CTX.fillStyle = '#000' 
	let t = text
	return t;
}

export { init }