var fillColor = 0;

function draw_one_frame(cur_frac) {
	strokeWeight(0);
	if(cur_frac == 0) color_flip();
	if(fillColor == 0) fill(255);
	else fill(0);
	rect(0, 0, width, height);

	rectWidth = map(cur_frac, 0, 1, 0, width);
	rectHeight = map(cur_frac, 0, 1, 0, height);
	fill(fillColor);
	rect(width/2-rectWidth/2, height/2-rectHeight/2, rectWidth, rectHeight);
}

function color_flip() {
	if(fillColor == 0) fillColor = 255;
	else fillColor = 0;
}

