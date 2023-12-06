// Rectangle Collision (Easier)
// When rectangle Collides with a wall, teleport back to original position

// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

// Create Food
let circles = [];
for (let n = 1; n <= 50; n++) {
  circles.push(randomCircle());
}

// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC

  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Food
  for (let i = 0; i < circles.length; i++) {
    moveCircle(circles[i]);
    drawCircle(circles[i]);
 }

  // Draw Player
  ctx.fillStyle = "rgb(221, 17, 143)";
  ctx.fillRect(rectX, rectY, size, size);

  //Check if Player collides with any wall
  for (let i = 0; i <walls.length; i++) {
    let wall = walls[i];
    if (rectX < wall.x + wall.w &&
      rectX + size > wall.x &&
      rectY < wall.y + wall.h &&
      rectY + size > wall.y
  ) {
      rectX = 20;
      rectY = 300;
   }
  }

  if (rectX < 0 ||
    rectX + size > cnv.width ||
    rectY < 0 ||
    rectY + size > cnv.height) {
    rectX = 20;
    rectY = 300;
  }
  // Animation Loop
  requestAnimationFrame(draw);
}

//Circle Stuff

function drawCircle(aCircle) {
  ctx.lineWidth = 3;   
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(aCircle.x, aCircle.y, aCircle.r, 0, 2 * Math.PI)
  ctx.fill();
}
 
function moveCircle(aCircle) {
  aCircle.y += aCircle.ys;
  aCircle.x += aCircle.xs;
 
  //Check for collisions with canvas boundaries
  if (aCircle.x - aCircle.r < 0 || aCircle.x + aCircle.r > cnv.width) {
    aCircle.xs = -aCircle.xs;
  }
 
  if (aCircle.y - aCircle.r < 0 || aCircle.y + aCircle.r > cnv.height) {
    aCircle.ys = -aCircle.ys;
  }
}

function randomCircle() {
  return {
    x: randomInt(0, cnv.width),
    y: randomInt(0, cnv.height),
    r: randomInt(1, 5),
    xs: randomInt(1, 3),
    ys: randomInt(1, 3),
    c: 
  }
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowUp") {
      upPressed = true;
    } else if (e.code === "ArrowDown") {
      downPressed = true;
    } else if (e.code === "ArrowLeft") {
      leftPressed = true;
    } else if (e.code === "ArrowRight") {
      rightPressed = true;
  }

  if (upPressed) {
      rectY -= 7;
    } else if (downPressed) {
      rectY += 7;
    } else if (leftPressed) {
      rectX -= 7;
    } else if (rightPressed) {
      rectX += 7;
    }
}

function keyupHandler(e) {
    //Check for keys pressed
    if (e.code === "ArrowUp") {
        upPressed = false;
    } else if (e.code === "ArrowDown") {
        downPressed = false;
    } else if (e.code === "ArrowLeft") {
      leftPressed = false;
  } else if (e.code === "ArrowRight") {
      rightPressed = false;
  } 
}