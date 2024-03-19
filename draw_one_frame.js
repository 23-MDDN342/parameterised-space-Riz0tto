var backgroundColor = 300;
var shapeColor = 0;
var numPoolLines = 20;
var poolLineVertices = 25;
var glistenAmount = 20;
const ease = new p5.Ease();

function draw_one_frame(cur_frac) {
	

	colorMode(HSB, 300);

	// draw background using a rect
	strokeWeight(0);
	fill(160, 150, 300);
	rect(0, 0, width, height);

	let poolLinesYScroll = map(cur_frac, 0, 1, 0, height/numPoolLines);
	let glistenYScroll = map(cur_frac, 0, 1, 0, height/glistenAmount);

	// scrolls effects slowly for subtle vertical movement
	push();	
	translate(0, poolLinesYScroll); 

	// pool line chromatic aberration

	// red shift
	push();
	translate(width/2, height/2);
	scale(1.01);
	translate(-width/2, -height/2);
	stroke(300, 200, 300, 50);
	drawPoolLines(cur_frac);
	pop();

	// green shift
	push();
	translate(width/2, height/2);
	scale(0.99);
	translate(-width/2, -height/2);
	stroke(100, 300, 300, 50);
	drawPoolLines(cur_frac);
	pop();
	
	// white pool lines
	stroke(0, 0, 300, 200);
	drawPoolLines(cur_frac);

	pop();

	// water glistening effect
	push();
	waterGlisten(glistenYScroll);	
	pop();
}

function drawPoolLines(cur_frac) {	
	let scrollOffset = 0 - (height/numPoolLines);
	for (let j = 0; j < numPoolLines; j++) {	
		
		strokeWeight(width/200);
		noFill();

		beginShape();
		for (let i = -1; i <= poolLineVertices+1; i++) {	
			let curveHeight = getAnimatedNoiseValue(cur_frac, i*(width/numPoolLines), j*(height/numPoolLines), width);
			curveVertex(i*(width/poolLineVertices), curveHeight + j*((height + Math.abs(scrollOffset))/numPoolLines) + (0.5*height/numPoolLines) + scrollOffset);
		}
		endShape();

		beginShape();
		for (let i = -1; i <= poolLineVertices+1; i++) {	
			let curveHeight = getAnimatedNoiseValue(cur_frac, i*(width/numPoolLines), j*(height/numPoolLines), height);
			curveVertex(curveHeight + j*(width/numPoolLines) + (0.5*width/numPoolLines), i*((height + Math.abs(scrollOffset))/poolLineVertices) + scrollOffset);
		}
		endShape();
	}
}

function getAnimatedNoiseValue(cur_frac, posX, posY, resolutionValue) {

	var ease_amount_forward = ease.linear(cur_frac);
	var ease_amount_back = ease.linear(1-cur_frac);

	let animScroll;

	if (cur_frac <= 0.5){
		animScroll = map(ease_amount_forward, 0, 1, 0, resolutionValue);
		} 			
	else animScroll = map(ease_amount_back, 1, 0, resolutionValue, 0);

	if (resolutionValue == width) return getNoiseValue(posX + animScroll, posY, 1, "animatedNoise", -5, 5, width/numPoolLines*10);
	if (resolutionValue == height) return getNoiseValue(posX, posY + animScroll, 1, "animatedNoise", -5, 5, width/numPoolLines*10);

	
}

function waterGlisten(yScroll) {

	push();

	for (let i = 0; i < glistenAmount; i++) {
		for (let j = 0; j < glistenAmount; j++) {

			let noiseValue = getNoiseValue(i*width/glistenAmount, (j*height/glistenAmount) + yScroll, 1, "glistenNoise", -1, 1, width/glistenAmount);			
			strokeWeight(width/100 * (noiseValue));
			stroke(300, 0, 300, 300 * noiseValue);
			point((i*width/glistenAmount) + (width/glistenAmount * noiseValue/2), j*height/glistenAmount + (height/glistenAmount * noiseValue/2) + yScroll);
		}
	}

	pop();
}

/* 
   getNoiseValue arguments:
   x: current grid location across
   y: current grid location down
   loop: can be any value from 0-1 and will loop
   name: the "name" of the lookup table. probably change this each time.
   min/max: the minimum and maximum of the value to return
   smoothness: 1 means elements are not related. larger numbers cause groupings.
*/