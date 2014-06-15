(function (fireworks, window) {
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
    })();

    // Create canvas and svg
    // Canvas
    fireworks.canvas = document.createElement("canvas");
    fireworks.canvas.id = "fireworks-field";
    setPositionAndAppendToDocument(fireworks.canvas);

    // SVG
    fireworks.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    fireworks.svg.id = "the-svg";
    setPositionAndAppendToDocument(fireworks.svg);

    // Context
    fireworks.ctx = fireworks.canvas.getContext('2d');

    // Dimensions
    setWidthAndHeight();

    // Options
    fireworks.options = new fireworks.Options();

    // Collections
    // Fireworks
    fireworks.fireworks = [];

    // Particles
    fireworks.particles = [];

    // Random generator
    fireworks.random = function random(min, max) {
        return Math.random() * (max - min) + min;
    };

    // Distance calculator between two points
    fireworks.calculateDistance = function calculateDistance(point1X, point1Y, point2X, point2Y) {
        var distanceX = point1X - point2X;
        var distanceY = point1Y - point2Y;

        return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    };

    // Explosion particles
    fireworks.createParticles = function createParticles(x, y) {
        var particleCount = fireworks.options.particleCount;

        while (particleCount--) {
            fireworks.particles.push(new fireworks.Particle(x, y));
        }
    };
    var timerTick = fireworks.options.timerTick;

    // Main loop
    fireworks.init = function loop(options) {
        if (options !== null) {
            fireworks.options = new fireworks.Options(options);
        }

        window.requestAnimationFrame(loop.bind(null, null));

        fireworks.options.hue += fireworks.options.hueStep;

        // Clearing the fireworks.canvas for redraw ...
        fireworks.ctx.globalCompositeOperation = 'destination-out';
        fireworks.ctx.fillStyle = fireworks.options.ctxFillStyle;
        fireworks.ctx.fillRect(0, 0, fireworks.canvasWidth, fireworks.canvasHeight);

        fireworks.ctx.globalCompositeOperation = 'lighter';
        // Update and draw every firework
        var fireworkIndex = fireworks.fireworks.length;
        while (fireworkIndex--) {
            fireworks.fireworks[fireworkIndex].draw();
            fireworks.fireworks[fireworkIndex].update(fireworkIndex);
        }

        // Update and draw every particle
        var particleIndex = fireworks.particles.length;
        while (particleIndex--) {
            fireworks.particles[particleIndex].draw();
            fireworks.particles[particleIndex].update(particleIndex);
        }

        // This is autolauncher
        if (timerTick >= fireworks.options.timerTotal) {
            fireworks.fireworks.push(new fireworks.Firework(fireworks.canvasWidth / 2, fireworks.canvasHeight, fireworks.random(0, fireworks.canvasWidth), fireworks.random(0, fireworks.canvasHeight / 2)));
            timerTick = fireworks.options.timerTick;
        } else {
            timerTick++;
        }
    };

    // OnResize
    window.onresize = function () {
        setWidthAndHeight();
    };

    function setWidthAndHeight() {
        var docElement = window.document.documentElement,
            body = window.document.getElementsByTagName('body')[0],
            width = window.innerWidth || docElement.clientWidth || body.clientWidth,
            height = window.innerHeight || docElement.clientHeight || body.clientHeight;

        if (fireworks.options !== undefined) {
            fireworks.options.width = width;
            fireworks.options.height = height;
        }

        fireworks.canvas.width = width;
        fireworks.canvas.height = height;

        fireworks.svg.style.width = width;
        fireworks.svg.style.height = height;

        fireworks.canvasWidth = width;
        fireworks.canvasHeight = height;
    }

    function setPositionAndAppendToDocument(element) {
        element.style.position = "fixed";
        element.style.top = 0;
        element.style.left = 0;
        element.style.zIndex = 100000;
        element.style.pointerEvents = "none";
        window.document.body.appendChild(element);
    }
})(window.Fireworks = window.Fireworks || {}, window);