(function (fw) {
    fw.Particle = Particle;

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
        this.angle = fw.random(0, 360 * Math.PI / 180);
        this.speed = fw.random(1, 10);

        // Friction (slowing down)
        this.friction = 0.95;

        // Gravity
        this.gravity = 1;

        // Hue, brightness, alpha
        this.hue = fw.random(fw.hue - 15, fw.hue + 15)
        this.brightness = fw.random(50, 80);
        this.alpha = 1;

        // Particle lifetime
        this.decay = fw.random(0.015, 0.03);
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
            fw.particles.splice(index, 1);
        }
    }

    // Draw particle
    Particle.prototype.draw = function () {
        fw.ctx.beginPath();
        fw.ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        fw.ctx.lineTo(this.x, this.y);
        fw.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        fw.ctx.stroke();
    }
})(window.Fireworks = window.Fireworks || {});