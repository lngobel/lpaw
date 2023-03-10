import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Hero extends Circle{

	constructor(x, y, speed = 7, width, height,imgUrl,FRAMES) {
		super(x, y, 15, speed)
        this.size = 15
		this.imgUrl = imgUrl
		loadImage(this.imgUrl)
		.then(img=>{
			this.img = img
			this.cellWidth = img.naturalWidth/this.totalSprites
			console.log('W:'+this.cellWidth)
		})

		
		this.cellHeight= 63
		this.cellX = 0
		this.totalSprites = 4
		this.spriteSpeed = 1
		console.log('H:'+this.cellHeight)
		

		this.width = width
		this.height = height

		this.status = 'down'

		this.hit = new Circle(
			this.x + this.width/2,
			this.y + this.height/2,
			this.size,
			0,"rgba(0,0,0,0)"
		)

		this.animeSprite(FRAMES)
		this.setControls()
	}

	draw(CTX){
		this.setCellY()

		CTX.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			this.cellY * this.cellHeight,
			this.cellWidth,
			this.cellHeight,
			this.x,
			this.y,
			this.width,
			this.height
		)

		this.hit.draw(CTX)
	}

	animeSprite(FRAMES){ //Controla a animacao do sprite
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 
						 ? this.cellX + 1 
						 : 0;
		}, 1000 / (FRAMES*this.spriteSpeed/10))
	}

	setControls(){
		this.controls = {
			's':'down',
			'w':'up',
			'a':'left',
			'd':'rigth'
		}
	}

	setCellY(){
		let sprites = {
			'down': 0,
			'left': 1,
			'rigth': 2,
            'up': 3
		}

		this.cellY = sprites[this.status]
	}

	move(limits, key) {

		let movements = {
			'down': {
				x: this.x,
				y: this.y + this.speed 
			},
			'up': 	{ x: this.x, y: this.y - this.speed },
			'left': { x: this.x - this.speed, y: this.y },
			'rigth': { x: this.x + this.speed, y: this.y }
		}

		this.status = this.controls[key] ? this.controls[key] : this.status

		this.x = movements[this.status].x
		this.y = movements[this.status].y

		this.updateHit()
		this.limits(limits)
	}

	limits(limits){
		this.x = this.x > (limits.width - 50) ? (limits.width - 50) : this.x
		this.x = this.x < -12 ? -12 : this.x

		this.y = this.y > (limits.height - 100) ? (limits.height - 100) : this.y
		this.y = this.y < -22 ? -22 : this.y
	}

	updateHit(){
		this.hit.x = this.x + this.width/2
		this.hit.y = this.y + this.height/2
	}

	colide(other){
		return (this.hit.size + 17 >= Math.sqrt(
			(this.hit.x-other.x-18)**2 + (this.hit.y-other.y-20)**2)
		)
	}
}