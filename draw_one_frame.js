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

	push();	
	translate(0, yScroll);
	drawPoolLines(cur_frac);
	waterGlisten(cur_frac);		
	pop();
	
	
}

function drawPoolLines(cur_frac) {	
	let scrollOffset = 0 - (height/numPoolLines);
	for (let j = 0; j < numPoolLines; j++) {		

		stroke(0, 0, 300, 150);
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

function waterGlisten() {
	push();

	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 20; j++) {
			if (random(1) > 0.95) {
				strokeWeight(width/100 * random(1));
				stroke(300, 0, 300, 300 * random(1));
				point(i*width/20, j*height/20);
			}
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