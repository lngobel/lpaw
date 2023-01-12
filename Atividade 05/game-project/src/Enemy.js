import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Enemy extends Circle{
	constructor(x, y, size, speed = 3, color = "rgba(0,0,0,0)", width, height) {
		super(x,y,size,speed,color)
		this.line = 1
        this.imgUrl = 'img/turtle/turtle.png'
		// console.log('enemy',this) 
        loadImage(this.imgUrl)
		.then(img=>{
			this.img = img
		})

        this.width = width
		this.height = height

		this.hit = new Circle(
			this.x + 15,
			this.y + 17,
			this.size,
			0,"rgba(0,0,0,0)"
		)
	}

    draw(CTX){
		CTX.drawImage(
			this.img,
			0,
			0,
			this.width,
			this.height,
			this.x,
			this.y,
			30,
			30,
		)

		this.hit.draw(CTX)
	}


	move(limits){
		this.y +=this.speed
        this.updateHit()
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height ){
			this.y = -2*this.size
			this.x = Math.random()*(limits.width - 35);
		}
	}

    updateHit(){
		this.hit.x = this.x + 15
		this.hit.y = this.y + 17
	}
}
