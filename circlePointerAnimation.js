//central control values
var circlePointerAnimation = {
  parentDIV: undefined,
  ctx: undefined,
  canvas: undefined,
  canvasID: "circlePointerAnimation",
  canvasZIndex: 2,
  circleList: [],
  mouseX: undefined,
  mouseY: undefined,
  circleProperty: {
    colorList: ["#6BB251", "#40A819", "#45FF00", "#B2009E", "#FF00E2"],
    largestPosiibleRadius: 30,
    largestPosiibleStroke: 5,
  },
};
window.addEventListener("load", init);
function init(e) {
  //creating a canvas element and setting its required attributes and style **Adding to body**
  //prarent
  circlePointerAnimation.parentDIV = document.createElement("div");
  circlePointerAnimation.parentDIV.style.position = "absolute";
  circlePointerAnimation.parentDIV.style.width = "100%";
  circlePointerAnimation.parentDIV.style.height = "100%";
  circlePointerAnimation.parentDIV.style.pointerEvents = "none";
  circlePointerAnimation.parentDIV.style.zIndex =
    circlePointerAnimation.canvasZIndex;
  document.querySelector("body").appendChild(circlePointerAnimation.parentDIV);
  //canvas
  circlePointerAnimation.canvas = document.createElement("canvas");
  circlePointerAnimation.canvas.id = circlePointerAnimation.canvasID;
  circlePointerAnimation.canvas.style.pointerEvents = "none";

  parentDimension = circlePointerAnimation.parentDIV.getBoundingClientRect();
  circlePointerAnimation.canvas.height =
    parentDimension.bottom - parentDimension.top;
  circlePointerAnimation.canvas.width =
    parentDimension.right - parentDimension.left;
  circlePointerAnimation.parentDIV.appendChild(circlePointerAnimation.canvas);

  //setting the canvas context
  circlePointerAnimation.ctx = circlePointerAnimation.canvas.getContext("2d");
  circlePointerAnimation.mouseX = e.clientX;
  circlePointerAnimation.mouseY = e.clientY;
  pointerAnimation();
}
//create a circle every time the mouse moves
window.addEventListener("mousemove", updatePointer);
function updatePointer(e) {
  circlePointerAnimation.mouseX = e.clientX;
  circlePointerAnimation.mouseY = e.clientY;
  var dx = (Math.random() - 0.5) * 5;
  var dy = (Math.random() - 0.5) * 5;
  var maxRadius =
    Math.random() * circlePointerAnimation.circleProperty.largestPosiibleRadius;
  var lineWidth =
    Math.random() * circlePointerAnimation.circleProperty.largestPosiibleStroke;
  var color =
    circlePointerAnimation.circleProperty.colorList[
      Math.floor(
        (Math.random() * 100) %
          circlePointerAnimation.circleProperty.colorList.length
      )
    ];
  circlePointerAnimation.circleList.push(
    new Circle(
      circlePointerAnimation.mouseX,
      circlePointerAnimation.mouseY,
      dx,
      dy,
      maxRadius,
      color,
      lineWidth
    )
  );
}
function Circle(x, y, dx, dy, maxRadius, color, lineWidth) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = 1;
  this.maxRadius = maxRadius;
  this.lineWidth = lineWidth;
  this.color = color;
  this.draw = function () {
    circlePointerAnimation.ctx.beginPath();
    circlePointerAnimation.ctx.strokeStyle = this.color;
    circlePointerAnimation.ctx.lineWidth = this.lineWidth;
    circlePointerAnimation.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    circlePointerAnimation.ctx.stroke();

    this.update();
  };
  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.radius += 1;
  };
}

function pointerAnimation() {
  requestAnimationFrame(pointerAnimation);
  circlePointerAnimation.ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  for (var i = 0; i < circlePointerAnimation.circleList.length; i++) {
    if (
      circlePointerAnimation.circleList[i].radius >
      circlePointerAnimation.circleList[i].maxRadius
    ) {
      circlePointerAnimation.circleList.splice(i, 1);
      i--;
      continue;
    }
    circlePointerAnimation.circleList[i].draw();
  }
}
