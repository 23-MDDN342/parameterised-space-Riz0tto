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

I decided to develop this pool effect further. First I integrated the vertical lines into the line drawing function, rather than using rotation and scaling. This means I have much more control over the lines and their scale will be uniform. What makes the effect so interesting to me is how it looks like the lines are distorted by water, or as if there is a filter over a static grid of lines. In reality it's just the lines moving. My next goal was to build on this by adding in more effects to make it look more like water.

To make it look like there's a shiny surface to the water, I added a glistening effect. In order to achieve this effect I used animated noise again, placing down points in a grid and using the noise to move them and change their opacity. This looks like sparkly reflections popping in and out as the surface of the water changes, or at least that's my intention.

Another effect that I created was chromatic aberration. Chromatic aberration occurs when a lens doesn't converge all the wavelengths of light. Thiss is often seen on the fringes of the lenses view as colours emerging either side of objects. To create the effect in my pool, I create two more identical grids of pool lines, one red, one green and slightly scale them up and down respectively from the center of the screen. My intention with this effect is just to add another physically based effect in order to make the water more realistic feeling.

I spent some time considering adding more elements but decided to keep it simple. My final touches were improving the smoothness of the effect and making sure all the parameters can be changed without affecting the motion. Overall, I'm very happy with the result and can see it being used as a nice calm background that's not too distracting.