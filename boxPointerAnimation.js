//central control values
var boxPointerAnimation = {
  parentDIV: undefined,
  ctx: undefined,
  canvas: undefined,
  canvasID: "boxPointerAnimation",
  canvasZIndex: 10,
  boxList: [],
  mouseX: undefined,
  mouseY: undefined,
  boxProperty: {
    colorList: ["#6BB251", "#40A819", "#45FF00", "#B2009E", "#FF00E2"],
    largestPosiibleSize: 30,
  },
};

//box object
class BoxPointerAnimation_Box {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.opacity = 1;
    this.draw = function () {
      boxPointerAnimation.ctx.beginPath();
      boxPointerAnimation.ctx.fillStyle =
        "rgba(" +
        this.color.red +
        "," +
        this.color.green +
        "," +
        this.color.blue +
        "," +
        this.opacity +
        ")";
      boxPointerAnimation.ctx.fillRect(this.x, this.y, this.size, this.size);
      boxPointerAnimation.ctx.fill();
      this.update();
    };
    this.update = function () {
      this.opacity -= 0.03;
    };
  }
}

window.addEventListener("load", boxPointerAnimation_init);

function boxPointerAnimation_init(e) {
  boxPointerAnimation.parentDIV = document.createElement("div");
  boxPointerAnimation.parentDIV.style.position = "fixed";
  boxPointerAnimation.parentDIV.style.top = "0px";
  boxPointerAnimation.parentDIV.style.left = "0px";
  boxPointerAnimation.parentDIV.style.width = "100%";
  boxPointerAnimation.parentDIV.style.height = "100%";
  boxPointerAnimation.parentDIV.style.pointerEvents = "none";
  boxPointerAnimation.parentDIV.style.zIndex = boxPointerAnimation.canvasZIndex;
  document.querySelector("body").appendChild(boxPointerAnimation.parentDIV);
  //canvas
  boxPointerAnimation.canvas = document.createElement("canvas");
  boxPointerAnimation.canvas.id = boxPointerAnimation.canvasID;
  boxPointerAnimation.canvas.style.pointerEvents = "none";

  parentDimension = boxPointerAnimation.parentDIV.getBoundingClientRect();
  boxPointerAnimation.canvas.height =
    parentDimension.bottom - parentDimension.top;
  boxPointerAnimation.canvas.width =
    parentDimension.right - parentDimension.left;
  boxPointerAnimation.parentDIV.appendChild(boxPointerAnimation.canvas);

  //setting the canvas context
  boxPointerAnimation.ctx = boxPointerAnimation.canvas.getContext("2d");
  boxPointerAnimation.mouseX = e.clientX;
  boxPointerAnimation.mouseY = e.clientY;
  boxPointerAnimation_pointerAnimation();
}

window.addEventListener("mousemove", boxPointerAnimation_updatePointer);
function boxPointerAnimation_updatePointer(e) {
  boxPointerAnimation.mouseX = e.clientX + (Math.random() - 0.5) * 30;
  boxPointerAnimation.mouseY = e.clientY + (Math.random() - 0.5) * 30;
  var colorHex =
    boxPointerAnimation.boxProperty.colorList[
      Math.floor(
        Math.random() * boxPointerAnimation.boxProperty.colorList.length
      )
    ];
  var color = {
    red: boxPointerAnimation_hexToDec(colorHex.substring(1, 3)),
    green: boxPointerAnimation_hexToDec(colorHex.substring(3, 5)),
    blue: boxPointerAnimation_hexToDec(colorHex.substring(5, 7)),
  };
  var size =
    Math.random() * boxPointerAnimation.boxProperty.largestPosiibleSize;
  boxPointerAnimation.boxList.push(
    new BoxPointerAnimation_Box(
      boxPointerAnimation.mouseX,
      boxPointerAnimation.mouseY,
      color,
      size
    )
  );
}

//animation loop
function boxPointerAnimation_pointerAnimation() {
  requestAnimationFrame(boxPointerAnimation_pointerAnimation);
  boxPointerAnimation.ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );
  for (var i = 0; i < boxPointerAnimation.boxList.length; i++) {
    if (boxPointerAnimation.boxList[i].opacity <= 0) {
      boxPointerAnimation.boxList.splice(i, 1);
      i--;
      continue;
    }
    boxPointerAnimation.boxList[i].draw();
  }
}

//conver hex value to decimal for box coloring.
function boxPointerAnimation_hexToDec(val) {
  val = val.toUpperCase();
  var dec = 0;
  if (val.length == 2) {
    val = val[1] + val[0];
    for (var i = 0; i < val.length; i++) {
      if (val.charCodeAt(i) >= 48 && val.charCodeAt(i) <= 57) {
        dec += (val.charCodeAt(i) - 48) * Math.pow(16, i);
      } else if (val.charCodeAt(i) >= 65 && val.charCodeAt(i) <= 70) {
        dec += (10 + val.charCodeAt(i) - 65) * Math.pow(16, i);
      } else {
        console.log("error");
      }
    }
    return dec;
  } else {
    console.log("long");
  }
}
