var backgroundColor = 300;
var shapeColor = 0;
var numPoolLines = 20;

function draw_one_frame(cur_frac) {

	colorMode(HSB, 300);

	// draw background using a rect
	strokeWeight(0);
	fill(160, 150, 300);
	rect(0, 0, width, height);

	let yScroll = map(cur_frac, 0, 1, 0, height/numPoolLines);

	// scrolls effects slowly for subtle vertical movement
	push();	
	translate(0, yScroll); 

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

	// whater glistening effect
	push();
	translate(0, yScroll); 
	waterGlisten(yScroll);	
	pop();
	
}

function drawPoolLines(cur_frac) {	
	let scrollOffset = 0 - (height/numPoolLines);
	for (let j = 0; j < numPoolLines; j++) {	
		
		strokeWeight(width/200);
		noFill();

		beginShape();
		for (let i = -1; i <= numPoolLines+1; i++) {	
			let curveHeight = getAnimatedNoiseValue(cur_frac, i*(width/numPoolLines), j*(height/numPoolLines), width);
			curveVertex(i*(width/numPoolLines), curveHeight + j*((height + Math.abs(scrollOffset))/numPoolLines) + (0.5*height/numPoolLines) + scrollOffset);
		}
		endShape();

		beginShape();
		for (let i = -1; i <= numPoolLines+1; i++) {	
			let curveHeight = getAnimatedNoiseValue(cur_frac, i*(width/numPoolLines), j*(height/numPoolLines), height);
			curveVertex(curveHeight + j*(width/numPoolLines) + (0.5*width/numPoolLines), i*((height + Math.abs(scrollOffset))/numPoolLines) + scrollOffset);
		}
		endShape();
	}
}

function getAnimatedNoiseValue(cur_frac, posX, posY, resolutionValue) {

	let animScroll;
	if (cur_frac <= 0.5){
		animScroll = map(cur_frac, 0, 0.5, 0, resolutionValue);
		} 			
	else animScroll = map(cur_frac, 0.5, 1, resolutionValue, 0);

	if (resolutionValue == width) return getNoiseValue(posX + animScroll, posY, 1, "animatedNoise", -20, 20, 1000);
	if (resolutionValue == height) return getNoiseValue(posX, posY + animScroll, 1, "animatedNoise", -20, 20, 1000);

}

function waterGlisten(yScroll) {

	push();

	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 20; j++) {

			let noiseValue = getNoiseValue(i*width/20, j*height/20 + yScroll, 1, "glistenNoise", -1, 1, 100);			
			strokeWeight(width/100 * (noiseValue));
			stroke(300, 0, 300, 300 * noiseValue);
			point(i*width/20 + (width/20 * noiseValue), j*height/20 + (height/20 * noiseValue));
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