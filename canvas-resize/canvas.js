var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


c.fillRect(100, 100, 100, 100);
c.fillRect(900, 300, 100, 100);
c.fillRect(800, 100, 100, 100);
c.fillRect(400, 500, 100, 100);