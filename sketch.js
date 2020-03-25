var objects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var direction = 0;
var velocity = 0;
var carouselWidth = 400;
var carouselHeight = 75;
var boxWidth = 75;
var boxHeight = 100;

var centerX;
var centerY;
var itens;

function setup() {
  createCanvas(600, 400);
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  clear();
  background(0);

  createItens();
  renderItens();
}

function createItens(){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)
    direction = ((centerX - mouseX) / 1000);
  else
    direction *= .95;

  velocity += direction;

  itens = new Array();
  
  let totalItens = objects.length;
  let increment = (Math.PI * 2) / totalItens;
  for (let i = 0; i < totalItens; i++) {
    itens.push({
      value: objects[i],
      x: centerX + sin((i * increment) + (velocity / 10)) * (carouselWidth / 2),
      y: centerY + cos((i * increment) + (velocity / 10)) * (carouselHeight / 2)
    });
  }

  // Sort Z
  itens.sort(function(a, b) {
    if (a.y > b.y) return 1;
    else if (a.y < b.y) return -1;
    else return 0;
  });
}

function renderItens(){
  rectMode(CENTER);
  for (let i in itens) {
    let transparency = map(itens[i].y, centerY - (carouselHeight / 2), centerY, 0, 255);
    let halfBoxWidth = boxWidth / 2;
    let halfBoxHeight = boxHeight / 2;

    stroke(100, transparency);
    fill(255, transparency);

    // Mouse Over
    if (i >= (itens.length / 2) &&
      mouseX > itens[i].x - halfBoxWidth && mouseX < itens[i].x + halfBoxWidth &&
      mouseY > itens[i].y - halfBoxHeight && mouseY < itens[i].y + halfBoxHeight)
      fill(240, transparency);

    rect(itens[i].x, itens[i].y, boxWidth, boxHeight);

  }
}