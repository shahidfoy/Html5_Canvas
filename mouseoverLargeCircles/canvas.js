var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/*
c.fillStyle = 'rgba(255, 0 , 0, 0.5)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(0, 255 , 0, 0.5)';
c.fillRect(900, 300, 100, 100);
c.fillStyle = 'rgba(0, 0 , 255, 0.5)';
c.fillRect(800, 100, 100, 100);
c.fillRect(400, 500, 100, 100);

// Line 
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 200);
c.strokeStyle = "red";
c.stroke();

// Arc / Circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke();

for (var i = 0; i < 100; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	var size = Math.random() * 10;
	var color = 'blue';
	if(i % 3 == 0) {
		color = 'blue';
	} else if(i % 3 == 1) {
		color = 'red';
	} else {
		color = 'green';
	}

	c.beginPath();
	c.arc(x, y, size, 0, Math.PI * 2, false);
	c.strokeStyle = color;
	c.stroke();
}


	c.beginPath();
	c.arc(200, 200, 30, 0, Math.PI * 2, false);
	c.strokeStyle = 'blue';
	c.stroke();

*/
	var mouse = {
		x: undefined,
		y: undefined
	}

	window.addEventListener('mousemove', function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	});

	function Circle(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius

		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.strokeStyle = 'blue';
			c.stroke();
		}

		this.update = function() {
			if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
				this.dx = -dx;
			}

			if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

			// interactivity
			if(mouse.x - this.x < 50) {
				this.radius += 1;
			}

			this.draw();
		}
	}

	

	var circleArray = [];
	for (var i = 0; i < 100; i++) {
		var radius = 30;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 5;
		var dy = (Math.random() - 0.5) * 5;

		circleArray.push(new Circle(x, y, dx, dx, radius));
		// var circle = new Circle(x, y, dx, dx, radius);
	}
	

	
	
	function animate() {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);

		for(var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();

			var color = 'blue';
			if(i % 3 == 0) {
				color = 'blue';
			} else if(i % 3 == 1) {
				color = 'red';
			} else {
				color = 'green';
			}
			c.strokeStyle = color;
			c.stroke();
			c.fillStyle = 'snow';
			c.fill();
		}
		// console.log('animate');
	}


	animate();

	