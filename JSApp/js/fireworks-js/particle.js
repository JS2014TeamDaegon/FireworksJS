(function (fw) {
    fw.Particle = Particle;

    // Particle creator
    function Particle(x, y) {
        this.x = x;
        this.y = y;

        // Trail effect
        this.coordinates = [];
        this.coordinateCount = fw.options.particleTrailLength;

        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y])
        }

        // Random angle for the exloding particles
        this.angle = fw.random(0, 360 * Math.PI / 180);
        this.speed = fw.random(fw.options.particleSpeedRange[0], fw.options.particleSpeedRange[1]);

        // Friction (slowing down)
        this.friction = fw.options.particleFriction;

        // Gravity
        this.gravity = fw.options.particleGravity;

        // Hue, brightness, alpha
        this.hue = fw.random(fw.hue - fw.options.particleHueRange[0], fw.hue + fw.options.particleHueRange[1])
        this.brightness = fw.random(fw.options.particleBrightnessRange[0], fw.options.particleBrightnessRange[1]);
        this.alpha = fw.options.particleAlpha;

        // Particle lifetime
        this.decay = fw.random(fw.options.particleDecayRange[0], fw.options.particleDecayRange[1]);
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