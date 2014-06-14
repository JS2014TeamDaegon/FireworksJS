(function (fw) {
    fw.Firework = Firework;

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
        this.distanceToTarget = fw.calculateDistance(sx, sy, tx, ty);
        this.distanceTraveled = 0;

        // Trail effect
        this.coordinates = [];
        this.coordinateCount = fw.options.fireworkTrailLength;

        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y])
        }

        // Launching angle
        this.angle = Math.atan2(ty - sy, tx - sx)

        //Speed and acceleration
        this.speed = fw.options.fireworkSpeed;
        this.acceleration = fw.options.fireworkAcceleration;

        // Brightness
        this.brightness = fw.random(fw.options.fireworkBrightnessRange[0], fw.options.fireworkBrightnessRange[1]);

        // Circle target indicator radius
        this.targetRadius = fw.options.fireworkTargetRadius;
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
        this.distanceTraveled = fw.calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

        // Reaching the target point when the explosion have to occur
        if (this.distanceTraveled > this.distanceToTarget) {
            // Explode
            fw.createParticles(this.tx, this.ty);
            // Remove target
            fw.fireworks.splice(index, 1);
        } else {
            this.x += vx;
            this.y += vy;
        }
    }

    // Draw firework
    Firework.prototype.draw = function () {
        fw.ctx.beginPath();
        fw.ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        fw.ctx.lineTo(this.x, this.y);
        fw.ctx.strokeStyle = 'hsl(' + fw.hue + ',100%,' + this.brightness + '%)';
        fw.ctx.stroke();

        // Draw the pulsing target circle
        fw.ctx.beginPath();
        fw.ctx.arc(this.tx, this.ty, this.targetRadius, 0, 360 * Math.PI / 180);
        fw.ctx.stroke();
    }
})(window.Fireworks = window.Fireworks || {});