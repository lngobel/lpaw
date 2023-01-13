import Enemy from "./Enemy"
import Hero from "./Hero"
import Cogu from "./Cogu"
import { keyPress, key } from "./keyboard"
import { loadAudio } from "./loaderAssets"

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
let themeSong
let dieSong
let coguSong
let tryAgain

const init = async () => {
	console.log("Initialize Canvas")
	CANVAS = document.querySelector('canvas')
	CTX = CANVAS.getContext('2d')

	themeSong = await loadAudio('sounds/theme.mp3')
	themeSong.volume = .3
	dieSong = await loadAudio('sounds/die.mp3')
	dieSong.volume = .4
	coguSong = await loadAudio('sounds/cogu.mp3')
	coguSong.volume = .2

	boundaries = {
		width: CANVAS.width,
		height: CANVAS.height
	}
	
	keyPress(window)
	begin()
}

const begin = () =>{
	cogu = new Cogu(Math.random()*(CANVAS.width - 35), Math.random()*(CANVAS.height - 40), 10, 0, "rgba(0,0,0,0)", 100, 100)

	hero.x = 300
	hero.y = 100
	hero.status = 'down'

	enemies = enemies.map(i=>new Enemy(
			Math.random()*(CANVAS.width - 35),
			Math.random()*(-500),
			12, 3, 'rgba(0,0,0,0)', 100, 86
		))
	

	if(!tryAgain){
		let start = texto(10, "Press ENTER to start!")
		CTX.fillText(start, (CANVAS.width/3) + 45, (CANVAS.height-15))
	} 

	let enter = setInterval(() => {
	if(key == 'Enter'){
		themeSong.currentTime = 0
		themeSong.play()
		clearInterval(enter)
		loop()
	}
	}, 500)   
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
			coguSong.currentTime = 0
			coguSong.play()
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
			gameover = false
			tryAgain = true
			themeSong.pause()
			dieSong.play()
			cancelAnimationFrame(anime)
			console.error('DEAD!!!')
			let over = texto(40, "GAME OVER")
			let score = texto(20, `Your score: ${point}`)
			let again = texto(10, "Press ENTER to try again!")
			CTX.fillText(over, (CANVAS.width/3) + 30, CANVAS.height-50)
			CTX.fillText(score, (CANVAS.width/3) + 33, (CANVAS.height-35))
			CTX.fillText(again, (CANVAS.width/3) + 10, (CANVAS.height-15))
			point = 0 
			setTimeout(() => {
				begin()
			},1000)
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