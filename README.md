[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DlFCTo_q)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14046832&assignment_repo_type=AssignmentRepo)
### 2024 MDDN342 Project 1: Parameterised Space

Initial Ideas:

I've come up with a few different concepts and I'm still not sure this is the direction I want to go in. My idea is to have falling blocks that stack into towers at the bottom of the screen. As this is happening the screen will scroll up slowly, deleting the bottom row and preventing too much buildup. I was thinking that if blocks of the same shape make a line of 3 they will also be deleted. Along with this I would have trails, particle effects and background effects to elevate it.

Experimenting with the Code:

Before attempting to get my initial idea to work, I decided to experiment with the code to see which effects I could create. To start with, I made a rectangle grow from nothing to fill the screen, once the screen was filled it would become the new background. The colour of the rectangle would alternate from black to white every loop. I expanded on this idea by changing the black and white rectangles to randomly coloured circles. My goal with this was to create a looping effect that would change the animation beyond the 24 frame loop.

In order to achieve my initial idea I would need to create block objects that would persist and update beyond the 24 given frames. I have some idea of how I could do this, however the animation would have to be very long to appreciate the effect. Due to this I'm thinking of doing something completely different.

With the introduction of noise I decided to play around with curves. I was able to create a curve as a row of points along the width of the screen. By getting the noise value at each of these points I could change the height offset of the point to change the curve. Then by animating the curve down the screen it would change shape as it moved over the noise map. In order for the curve to change shape but stay in place, I got the value of the noise at each point as if the curve was moving down the screen but only used it as an offset. This creates a wiggling effect across the line. 

My first use of this wiggling line effect was over the top of my previous experiment with the colour changing circles. I used a loop to create multiple rows of lines, adjusting the height that the noise value was taken from accordingly. With a greater number of lines the shape of the noise became more clear, as if they were a topological map showing the height of terrain. While I liked this effect in particular, the overall animation felt lacking in focus. The colour changing background distracts from the lines, which are more interesting. So I removed the changing background, replaced it with a simple light blue and made the lines bolder. I then made the program create the lines a second time, rotated and scaled to fit on the screen vertically. Immediately this resembled the way the tiles at the bottom of a pool are distorted by the water. 

Developing the Pool Effect:


