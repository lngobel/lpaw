import Circle from "./geometries/Circle";

export default class Gold extends Circle{
	constructor(x, y, size, speed = 0, color = "#0f2") {
		super(x,y,size,speed,color)
		this.line = 1
		// console.log('enemy',this) 
	}
}
