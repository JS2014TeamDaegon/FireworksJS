(function (fireworks) {
    fireworks.Particle = Particle;

    // Particle creator
    function Particle(x, y) {
        this.x = x;
        this.y = y;

        // Trail effect
        this.coordinates = [];
        this.coordinateCount = fireworks.options.particleTrailLength;

        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }

        // Random angle for the exloding particles
        this.angle = fireworks.random(0, 360 * Math.PI / 180);
        this.speed = fireworks.random(fireworks.options.particleSpeedRange[0], fireworks.options.particleSpeedRange[1]);

        // Friction (slowing down)
        this.friction = fireworks.options.particleFriction;

        // Gravity
        this.gravity = fireworks.options.particleGravity;

        // Hue, brightness, alpha
        this.hue = fireworks.random(fireworks.options.hue - fireworks.options.particleHueRange[0], fireworks.options.hue + fireworks.options.particleHueRange[1]);
        this.brightness = fireworks.random(fireworks.options.particleBrightnessRange[0], fireworks.options.particleBrightnessRange[1]);
        this.alpha = fireworks.options.particleAlpha;

        // Particle lifetime
        this.decay = fireworks.random(fireworks.options.particleDecayRange[0], fireworks.options.particleDecayRange[1]);
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
            fireworks.particles.splice(index, 1);
        }
    };

    // Draw particle
    Particle.prototype.draw = function () {
        fireworks.ctx.beginPath();
        fireworks.ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        fireworks.ctx.lineTo(this.x, this.y);
        fireworks.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        fireworks.ctx.stroke();
    };
})(window.Fireworks = window.Fireworks || {});