window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
				    window.setTimeout(callback, 1000 / 60);
				};
})();

var canvas = document.getElementById('the-canvas');
var ctx = canvas.getContext('2d');

// Dimensions
var cw = canvas.clientWidth;
var ch = canvas.clientHeight;

// Colections 
// Fireworks
var fireworks = [];

// Particles
var particles = [];

// Hue start value -> could be added a slider to change it, for now I set it to 180
var hue = 180;

// Launch limeter -> 1 launch per 5 ticks
var limiterTotal = 5;
var limiterTick = 0;

// Optional auto launcher -> 1 launch every 80 ticks  -> can be added slider to change the launcher speed 
var timerTotal = 100;
var timerTick = 0;

// Mouse coordinates
var mx;
var my;
var mousedown = false;

// Random generator
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Distance calculator between two points
function calculateDistance(p1x, p1y, p2x, p2y) {
    var xD = p1x - p2x;
    var yD = p1y - p2y;

    return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
}

// Fireworks creator
function Firework(sx, sy, tx, ty) {

    // Actual coordinates
    this.x = sx;
    this.y = sy;

    // Starting coordinates
    this.sx = sx;
    this.sy = sy;

    // Target coordinates 
    this.tx = tx;
    this.ty = ty;

    // Distance to target
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;

    // Trail effect
    this.coordinates = [];
    this.coordinateCount = 3;

    while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y])
    }

    // Launching angle
    this.angle = Math.atan2(ty - sy, tx - sx)

    //Speed and acceleration -> could be added slider for them 
    this.speed = 2;
    this.acceleration = 1.05;

    // Brightness -> Lightning effect 0 goes black and 100 goes white so we have number between 50 and 80 representing the actual color
    this.brightness = random(50, 80);

    // Circle target indicator radius
    this.targetRadius = 1;
}

// Updater for the fireworks
Firework.prototype.update = function (index) {

    // Remove last particle coords
    this.coordinates.pop();

    // Add new one
    this.coordinates.unshift([this.x, this.y])

    // Target radius change
    if (this.targetRadius < 5) {
        this.targetRadius += 0.3;
    } else {
        this.targetRadius = 1;
    }

    // Speed
    this.speed *= this.acceleration;

    // Velocity (rate of change of the position)
    var vx = Math.cos(this.angle) * this.speed;
    var vy = Math.sin(this.angle) * this.speed;

    // Distance traveled with velocities applied
    this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

    // Reaching the target point when the explosion have to occur
    if (this.distanceTraveled > this.distanceToTarget) {
        // Explode
        createParticles(this.tx, this.ty);
        // Remove target
        fireworks.splice(index, 1);
    } else {
        this.x += vx;
        this.y += vy;
    }
}

// Draw firework
Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'hsl(' + hue + ',100%,' + this.brightness + '%)';
    ctx.stroke();

    // Draw the pulsing target circle
    ctx.beginPath();
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, 360 * Math.PI / 180);
    ctx.stroke();
}

// Particle creator
function Particle(x, y) {
    this.x = x;
    this.y = y;

    // Trail effect
    this.coordinates = [];
    this.coordinateCount = 5;

    while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y])
    }

    // Random angle for the exloding particles
    this.angle = random(0, 360 * Math.PI / 180);
    this.speed = random(1, 10);

    // Friction (slowing down)
    this.friction = 0.95;

    // Gravity 
    this.gravity = 1;

    // Hue, brightness, alpha
    this.hue = random(hue - 15, hue + 15)
    this.brightness = random(50, 80);
    this.alpha = 1;

    // Particle lifetime
    this.decay = random(0.015, 0.03);
}

// Updater for the particle
Particle.prototype.update = function (index) {

    // Remove last element
    this.coordinates.pop();

    // Add actual coords
    this.coordinates.unshift([this.x, this.y]);

    // Slowing down
    this.speed *= this.friction;

    // Velocity
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    // Particle fading
    this.alpha -= this.decay;

    if (this.alpha <= this.decay) {
        particles.splice(index, 1);
    }
}

// Draw particle
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    ctx.stroke();
}

// Explosion particles
function createParticles(x, y) {
    var particleCount = 30;

    while(particleCount--) {
        particles.push(new Particle(x, y))
    }
}

// Main loop
function loop() {

    requestAnimFrame(loop)

    hue += 0.5;

    // Clearing the canvas for redraw ...
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, cw, ch);

    ctx.globalCompositeOperation = 'lighter'
    // Update and draw every firework
    var fw = fireworks.length;
    while (fw--) {
        fireworks[fw].draw();
        fireworks[fw].update(fw);
    }

    // Update and draw every particle
    var p = particles.length;
    while (p--) {
        particles[p].draw();
        particles[p].update(p);
    }

    // This is autolauncher
    if (timerTick >= timerTotal) {
        if (!mousedown) {
            fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
            timerTick = 0;
        }

    } else {
        timerTick++;
    }

    // Mouse launcher
    if (limiterTick >= limiterTotal) {
        if (mousedown) {
            // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
            fireworks.push(new Firework(cw / 2, ch, mx, my));
            limiterTick = 0;
        }
    } else {
        limiterTick++;
    }
}

// Mouse events
// Update mouse coordinates on move
canvas.addEventListener('mousemove', function (e) {
    mx = e.pageX - canvas.offsetLeft;
    my = e.pageY - canvas.offsetTop;
})

canvas.addEventListener('mousedown', function (e) {
    e.preventDefault();
    mousedown = true;
})

canvas.addEventListener('mouseup', function (e) {
    e.preventDefault();
    mousedown = false;
})

// This is how we start --> could be even a single click, for now is when page loads

window.onload = loop;