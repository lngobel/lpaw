import Circle from "./geometries/Circle";
import { loadImage } from "./loaderAssets";

export default class Cogu extends Circle{
	constructor(x, y, size, speed = 0, color = "rgba(0,0,0,1)", width, height) {
		super(x,y,size,speed,color)
		this.line = 1
        this.width = width
        this.height = height
        this.imgUrl = 'img/cogu/cogu.png'
        loadImage(this.imgUrl)
        .then(img=>{
			this.img = img
		})
		
        this.hit = new Circle(
			this.x + this.width/2,
			this.y + this.height/2,
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
}