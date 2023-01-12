import Enemy from "./Enemy"
import { keyPress, key } from "./keyboard"
import Hero from "./Hero"
import Cogu from "./Cogu"

let CTX
let CANVAS
const FRAMES = 60

const qtdEnemies = 10

let enemies = Array.from({length:qtdEnemies});

const hero = new Hero(100,30,4,60,100,'img/mario/mario.png',FRAMES)

let gameover = false
let anime;
let boundaries
let cogu
let point = 0
let text

const init = () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')
	
	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}

	cogu = new Cogu(Math.random()*(CANVAS.width - 35), Math.random()*(CANVAS.height - 40), 10, 0, "rgba(0,0,0,1)", 100, 100)

	enemies = enemies.map(i=>new Enemy(
			Math.random()*(CANVAS.width - 35),
			Math.random()*(-500),
			12, 3, 'rgba(0,0,0,0)', 100, 86
		))
	
	keyPress(window)
	loop()
}

const loop = () => {
	setTimeout(() => {

		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)

		text = texto(15, "Pontos: " + point)

		CTX.fillText(text, CANVAS.width - 80, 20 )

		hero.move(boundaries, key)
		hero.draw(CTX)

		cogu.draw(CTX)
		if(hero.colide(cogu)){
			cogu.x = Math.random()*(CANVAS.width - 35)
			cogu.y = Math.random()*(CANVAS.height - 40)
			point++;
		}
		
		enemies.forEach(e =>{
			e.move(boundaries, 0) 
			e.draw(CTX)
			 //var = teste?verdadeiro:falso;
			 gameover = !gameover 
			 		? hero.colide(e)
					: true;
		})
	
		if (gameover) {
			console.error('DEAD!!!')
			let over = texto(40, "GAME OVER")
			let score = texto(20, `Your score: ${point}`)
			CTX.fillText(over, (CANVAS.width/3) + 30, CANVAS.height-50)
			CTX.fillText(score, (CANVAS.width/3) + 33, (CANVAS.height-30))
			cancelAnimationFrame(anime)
		} else	anime = requestAnimationFrame(loop)

	}, 1000 / FRAMES)
}

function texto(font, text){ 
	CTX.font = `bold ${font}px sans`
	CTX.baseline = 'top'
	CTX.fillStyle = '#fff' 
	let t = text
	return t;
}

export { init }