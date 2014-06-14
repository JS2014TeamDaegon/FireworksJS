(function (fireworks) {
    fireworks.Firework = Firework;

    // Fireworks creator
    function Firework(startX, startY, targetX, targetY) {
        // Actual coordinates
        this.x = startX;
        this.y = startY;

        // Starting coordinates
        this.startX = startX;
        this.startY = startY;

        // Target coordinates
        this.targetX = targetX;
        this.targetY = targetY;

        // Distance to target
        this.distanceToTarget = fireworks.calculateDistance(startX, startY, targetX, targetY);
        this.distanceTraveled = 0;

        // Trail effect
        this.coordinates = [];
        this.coordinateCount = fireworks.options.fireworkTrailLength;

        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y])
        }

        // Launching angle
        this.angle = Math.atan2(targetY - startY, targetX - startX)

        //Speed and acceleration
        this.speed = fireworks.options.fireworkSpeed;
        this.acceleration = fireworks.options.fireworkAcceleration;

        // Brightness
        this.brightness = fireworks.random(fireworks.options.fireworkBrightnessRange[0], fireworks.options.fireworkBrightnessRange[1]);

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
        if (this.targetRadius < fireworks.options.fireworkTargetRadius) {
            this.targetRadius += 0.3;
        } else {
            this.targetRadius = 1;
        }

        // Speed
        this.speed *= this.acceleration;

        // Velocity (rate of change of the position)
        var velocityX = Math.cos(this.angle) * this.speed;
        var velocityY = Math.sin(this.angle) * this.speed;

        // Distance traveled with velocities applied
        this.distanceTraveled = fireworks.calculateDistance(this.startX, this.startY, this.x + velocityX, this.y + velocityY);

        // Reaching the target point when the explosion have to occur
        if (this.distanceTraveled > this.distanceToTarget) {
            // Explode
            fireworks.createParticles(this.targetX, this.targetY);
            // Remove target
            fireworks.fireworks.splice(index, 1);
        } else {
            this.x += velocityX;
            this.y += velocityY;
        }
    }

    // Draw firework
    Firework.prototype.draw = function () {
        fireworks.ctx.beginPath();
        fireworks.ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        fireworks.ctx.lineTo(this.x, this.y);
        fireworks.ctx.strokeStyle = 'hsl(' + fireworks.options.hue + ',100%,' + this.brightness + '%)';
        fireworks.ctx.lineWidth = fireworks.options.ctxLineWidth;
        fireworks.ctx.stroke();

        // Draw the pulsing target circle
        fireworks.ctx.beginPath();
        fireworks.ctx.arc(this.targetX, this.targetY, this.targetRadius, 0, 360 * Math.PI / 180);
        fireworks.ctx.stroke();
    }
})(window.Fireworks = window.Fireworks || {});