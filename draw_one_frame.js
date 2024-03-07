var backgroundColor = 300;
var shapeColor = 0;
var gridSize = 20;
var numCurves = 20;

function draw_one_frame(cur_frac) {
	colorMode(HSB, 300);

	// set background colour to last shape colour on first frame	
	//if(cur_frac == 0) color_change();

	// draw background using a rect
	strokeWeight(0);
	fill(160, 150, 300);
	rect(0, 0, width, height);

	// draw circles
	//drawCircles(cur_frac);

	// curve
	drawCurves(cur_frac);
	push();
	angleMode(DEGREES);
	translate(height*(width/height), 0);
	rotate(90);
	scale(width/height);
	drawCurves(cur_frac);
	pop();
	
}

function drawCircles(cur_frac) {
	ellipseMode(CENTER);
	fill(shapeColor);

	for(let i = 0; i < gridSize; i++) {		
		for(let j = 0; j < gridSize*2; j++){
			ellipseSize = map(cur_frac, 0, 1, 0, 2* width/gridSize);
			scrollAmount = map(cur_frac, 0, 1, 0, 2 * width/gridSize);

			if(i % 2 == 1) {
				ellipse(i*(width/gridSize) + (width/gridSize/2), j*(width/gridSize) - scrollAmount, ellipseSize);
			} else {
				ellipse(i*(width/gridSize) + (width/gridSize/2), j*(width/gridSize) + scrollAmount - width, ellipseSize);
			}
		}
	}	
}

function color_change(cur_frac) {
	backgroundColor = shapeColor;
	shapeColor = color(random(150, 200), 150, 300);
}

function drawCurves(cur_frac) {
	for(let j = 0; j < numCurves; j++) {
		let curveHeight = map(cur_frac, 0, 1, 0, height);

		push();

		//translate(0, curveHeight);
		stroke(0, 0, 300, 150);
		strokeWeight(width/200);
		noFill();

		beginShape();
		for(let i = -1; i <= gridSize+1; i++) {	
			curveVertex(i*(width/gridSize), getNoiseValue(i*(width/gridSize), curveHeight + j*(height/numCurves), 0, "curveNoise", -25, 25, 200) + j*(height/numCurves));
		}

		endShape();

		pop();
	}
}

