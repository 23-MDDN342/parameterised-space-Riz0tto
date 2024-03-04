var backgroundColor = 0;
var shapeColor = 0;
var gridSize = 10;

function draw_one_frame(cur_frac) {
	// set background colour to last shape colour on first frame	
	if(cur_frac == 0) color_change();

	// draw background using a rect
	strokeWeight(0);
	fill(backgroundColor);
	rect(0, 0, width, height);

	// draw circles
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

function color_change() {
	backgroundColor = shapeColor;
	shapeColor = color(random(255), random(255), random(255));
}

