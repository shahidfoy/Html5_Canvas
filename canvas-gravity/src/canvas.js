// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 1
const friction = 0.79

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('click', function() {
    init();
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction

        } else {
            this.dy += gravity
            // console.log(this.dy)
        }

        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx
        }
        this.x += this.dx
        this.y += this.dy
        this.draw()
    }

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke();
        c.closePath()
    }
}

/*
Object.prototype.update = function() {
    this.draw()
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}
*/

// Implementation
let ball
let ballArray
function init() {
    ballArray = []
    for(var i = 0; i < 500; i++) {
        var radius = randomIntFromRange(8, 20)
        var x = randomIntFromRange(radius, canvas.width - radius)
        var y = randomIntFromRange(0, canvas.height - radius)
        var dx = randomIntFromRange(-2, 2)
        var dy = randomIntFromRange(-2, 2)
        var color = randomColor(colors);
        ballArray.push(new Ball(x, y, dx, dy, radius, color))
    }
    console.log(ballArray)
    // ball = new Ball(canvas.width / 2, canvas.height / 2, 30, 'red')
    // console.log(ball);

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    for(var i = 0; i < ballArray.length; i++) {
        ballArray[i].update()
    }

    // ball.update()
    // objects.forEach(object => {
    //  object.update();
    // });
}

init()
animate()
