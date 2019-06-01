let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

function anim() {
  this.arrayPoint = [];
}

anim.prototype.generatePoint = function() {
  let counter = 0;
  for (let index = 1; index < 10; index++) {
    for (let i = 0; i < 10; i++) {
      this.arrayPoint[counter] = {
        x: (canvas.width / 10) * index,
        y: (canvas.height / 10) * i
      };
      counter++;
    }
  }
};

anim.prototype.drow = function() {
  context.save();
  context.fillStyle = "white";
  for (let index = 0; index < this.arrayPoint.length; index++) {
    context.beginPath();
    context.arc(
      this.arrayPoint[index].x,
      this.arrayPoint[index].y,
      canvas.width / 500,
      0,
      Math.PI * 2
    );
    context.fill();
  }
  context.restore();
};

anim.prototype.move = function() {
  for (let index = 0; index < this.arrayPoint.length; index++) {
    this.arrayPoint[index].x += Math.random() > 0.5 ? 1 : -1;
    this.arrayPoint[index].y += Math.random() > 0.5 ? 1 : -1;
  }
};

anim.prototype.check = function() {
  context.save();
  context.strokeStyle = "white";

  for (let index = 0; index < this.arrayPoint.length; index++) {
    for (let i = 0; i < this.arrayPoint.length; i++) {
      let condition =
        (this.arrayPoint[index].x - this.arrayPoint[i].x) *
          (this.arrayPoint[index].x - this.arrayPoint[i].x) +
        (this.arrayPoint[index].y - this.arrayPoint[i].y) *
          (this.arrayPoint[index].y - this.arrayPoint[i].y);

      if (condition < (canvas.width / 15) * (canvas.width / 15)) {
        context.beginPath();
        context.moveTo(this.arrayPoint[index].x, this.arrayPoint[index].y);
        context.lineTo(this.arrayPoint[i].x, this.arrayPoint[i].y);
        context.stroke();
      }
    }
  }
};

let a = new anim();
a.generatePoint();
a.drow();

setInterval(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  a.move();
  a.drow();
  a.check();
}, 20);
