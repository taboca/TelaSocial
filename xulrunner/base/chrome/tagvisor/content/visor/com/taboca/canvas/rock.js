c     = require("choreographer");
timer = require("timer");

var rock_Widget =  {

	name   : __appName,
        target : __targetName,
	_coreWin: null, 

	code : " int numBalls = 12; float spring = 0.05; float gravity = 0.03; Ball[] balls = new Ball[numBalls]; void setup() { size(200, 200); noStroke(); smooth(); for (int i = 0; i < numBalls; i++) { balls[i] = new Ball(random(width), random(height), random(20, 40), i, balls); } } void draw() { background(0); for (int i = 0; i < numBalls; i++) { balls[i].collide(); balls[i].move(); balls[i].display();  } } class Ball { float x, y; float diameter; float vx = 0; float vy = 0; int id; Ball[] others; Ball(float xin, float yin, float din, int idin, Ball[] oin) { x = xin; y = yin; diameter = din; id = idin; others = oin; } void collide() { for (int i = id + 1; i < numBalls; i++) { float dx = others[i].x - x; float dy = others[i].y - y; float distance = sqrt(dx*dx + dy*dy); float minDist = others[i].diameter/2 + diameter/2; if (distance < minDist) { float angle = atan2(dy, dx); float targetX = x + cos(angle) * minDist; float targetY = y + sin(angle) * minDist; float ax = (targetX - others[i].x) * spring; float ay = (targetY - others[i].y) * spring; vx -= ax; vy -= ay; others[i].vx += ax; others[i].vy += ay; } }   } void move() { vy += gravity; x += vx; y += vy; if (x + diameter/2 > width) { x = width - diameter/2; vx += -0.9; } else if (x - diameter/2 < 0) { x = diameter/2; vx *= -0.9; } if (y + diameter/2 > height) { y = height - diameter/2; vy *= -0.9; } else if (y - diameter/2 < 0) { y = diameter/2; vy *= -0.9; } } void display() { fill(255, 204); ellipse(x, y, diameter, diameter); } } ",
	code : "// All Examples Written by Casey Reas and Ben Fry // unless otherwise stated.  void setup() { size(400, 300); noStroke(); smooth(); noLoop(); } void draw() { drawCircle(126, 170, 6); } void drawCircle(int x, int radius, int level) {                    float tt = 126 * level/4.0; fill(tt); ellipse(x, 100, radius*2, radius*2);      if(level > 1) { level = level - 1; drawCircle(x - radius/2, radius/2, level); drawCircle(x + radius/2, radius/2, level); } } ",

	code:"// All Examples Written by Casey Reas and Ben Fry // unless otherwise stated.  size(200, 200); smooth(); background(0); strokeWeight(10); for(int i = 0; i < width; i++) { float r = random(255); float x = random(0, width); stroke(r, 100); line(i, 0, x, height); }",

	kill : function () { 
		c.kill(this);
	},
	start : function () { 

			


		this.element = this._coreDoc.createElement('canvas');
		this.element.setAttribute("style","border:30px solid black");
		this.element.setAttribute("width","400");
		this.element.setAttribute("height","300");

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this._coreWin(this.element, this.code);
		//this.tick();

	} ,

	tick : function () {

		this.data = new Date();
		var text = this.data.toLocaleTimeString();
		text = text.replace(/:..( [AP]M)$/, '$1');
		this.element.innerHTML = text;

		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() }, 1000);

	},

	init : function () { 

	} 

}

c.register(rock_Widget);
