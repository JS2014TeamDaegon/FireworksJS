(function (fw) {
    fw.Options = Options;

    // Default options
    function Options(options) {
        if (options === undefined) {
            options = {};
        }

        // Canvas size (undefined => full screen)
        if (options.width !== undefined) {
            if (options.width < 0) {
                options.width = fw.cw + options.width;
            }

            this.width = options.width;
            fw.cw = options.width;
            fw.canvas.width = options.width;
        }
        if (options.height !== undefined) {
            if (options.height < 0) {
                options.height = fw.ch + options.height;
            }

            this.height = options.height;
            fw.ch = options.height;
            fw.canvas.height = options.height;
        }

        // Launch limeter -> 1 launch per 5 ticks
        this.limiterTotal = options.limiterTotal || 5;
        this.limiterTick = options.limiterTick || 0;

        // Optional auto launcher -> 1 launch every 100 ticks
        this.timerTotal = options.timerTotal || 100;
        this.timerTick = options.timerTick || 0;

        // Hue start value
        this.hue = options.hue || 180;
        this.hueStep = options.hueStep || 0.5;

        // Canvas Context
        this.ctxFillStyle = options.ctxFillStyle || 'rgba(0,0,0,0.4)';

        // Firework
        // Trail
        this.fireworkTrailLength = options.fireworkTrailLength || 3;
        // Speed
        this.fireworkSpeed = options.fireworkSpeed || 2;
        this.fireworkAcceleration = options.fireworkAcceleration || 1.05;
        // Brightness -> Lightning effect 0 goes black and 100 goes white so we have number between 50 and 80 representing the actual color
        this.fireworkBrightnessRange = options.fireworkBrightnessRange || [50, 80];
        // Circle target indicator radius
        this.fireworkTargetRadius = options.fireworkTargetRadius || 1;

        // Particle
        // Trail
        this.particleTrailLength = options.particleTrailLength || 5;
        // Count
        this.particleCount = options.particleCount || 30;
        // Speed
        this.particleSpeedRange = options.particleSpeedRange || [1, 10];
        // Friction (slowing down)
        this.particleFriction = options.particleFriction || 0.95;
        // Gravity
        this.particleGravity = options.particleGravity || 1;
        // Hue, brightness, alpha
        this.particleHueRange = options.particleHueRange || [15, 15];
        this.particleBrightnessRange = options.particleBrightnessRange || [50, 80];
        this.particleAlpha = options.particleAlpha || 1;
        // Particle lifetime
        this.particleDecayRange = options.particleDecayRange || [0.015, 0.03];
    }
})(window.Fireworks = window.Fireworks || {});