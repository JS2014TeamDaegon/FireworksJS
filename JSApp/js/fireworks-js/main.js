(function (fw, window) {
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
    })();

    // Set width and height
    (function setWidthHeight() {
        var docElement = window.document.documentElement,
            body = window.document.getElementsByTagName('body')[0],
            width = window.innerWidth || docElement.clientWidth || body.clientWidth,
            height = window.innerHeight || docElement.clientHeight || body.clientHeight;

        // Canvas
        fw.canvas = document.createElement("canvas");
        fw.canvas.id = "fireworks-field";
        setPositionAndAppendToDocument(fw.canvas);

        fw.canvas.width = width;
        fw.canvas.height = height;

        // SVG
        fw.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        fw.svg.id = "the-svg";
        setPositionAndAppendToDocument(fw.svg);

        fw.svg.style.width = width;
        fw.svg.style.height = height;
    })();

    // Context
    fw.ctx = fw.canvas.getContext('2d');

    // Dimensions
    fw.cw = fw.canvas.clientWidth;
    fw.ch = fw.canvas.clientHeight;

    // Options
    fw.options = new fw.Options();

    // Collections
    // Fireworks
    fw.fireworks = [];

    // Particles
    fw.particles = [];

    // Random generator
    fw.random = function random(min, max) {
        return Math.random() * (max - min) + min;
    };

    // Distance calculator between two points
    fw.calculateDistance = function calculateDistance(p1x, p1y, p2x, p2y) {
        var xD = p1x - p2x;
        var yD = p1y - p2y;

        return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
    }

    // Explosion particles
    fw.createParticles = function createParticles(x, y) {
        var particleCount = fw.options.particleCount;

        while (particleCount--) {
            fw.particles.push(new fw.Particle(x, y))
        }
    }

    var limiterTick = fw.options.limiterTick;
    var timerTick = fw.options.timerTick;

    // Mouse coordinates
    var mx;
    var my;
    var mousedown = false;

    // Main loop
    fw.init = function loop(options) {
        if (options != null) {
            fw.options = new fw.Options(options);
        }

        window.requestAnimationFrame(loop.bind(null, null));

        fw.options.hue += fw.options.hueStep;

        // Clearing the fw.canvas for redraw ...
        fw.ctx.globalCompositeOperation = 'destination-out';
        fw.ctx.fillStyle = fw.options.ctxFillStyle;
        fw.ctx.fillRect(0, 0, fw.cw, fw.ch);

        fw.ctx.globalCompositeOperation = 'lighter'
        // Update and draw every firework
        var fireworkIndex = fw.fireworks.length;
        while (fireworkIndex--) {
            fw.fireworks[fireworkIndex].draw();
            fw.fireworks[fireworkIndex].update(fireworkIndex);
        }

        // Update and draw every particle
        var particleIndex = fw.particles.length;
        while (particleIndex--) {
            fw.particles[particleIndex].draw();
            fw.particles[particleIndex].update(particleIndex);
        }

        // This is autolauncher
        if (timerTick >= fw.options.timerTotal) {
            if (!mousedown) {
                fw.fireworks.push(new fw.Firework(fw.cw / 2, fw.ch, fw.random(0, fw.cw), fw.random(0, fw.ch / 2)));
                timerTick = fw.options.timerTick;
            }
        } else {
            timerTick++;
        }

        // Mouse launcher
        if (limiterTick >= fw.options.limiterTotal) {
            if (mousedown) {
                // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
                fw.fireworks.push(new fw.Firework(fw.cw / 2, fw.ch, mx, my));
                limiterTick = fw.options.fw.options.limiterTick;
            }
        } else {
            limiterTick++;
        }
    }

    // Mouse events
    // Update mouse coordinates on move
    fw.canvas.addEventListener('mousemove', function (e) {
        mx = e.pageX - fw.canvas.offsetLeft;
        my = e.pageY - fw.canvas.offsetTop;
    });

    fw.canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        mousedown = true;
    });

    fw.canvas.addEventListener('mouseup', function (e) {
        e.preventDefault();
        mousedown = false;
    });

    function setPositionAndAppendToDocument(element) {
        element.style.position = "fixed";
        element.style.top = 0;
        element.style.left = 0;
        element.style.zIndex = 100000;
        element.style.pointerEvents = "none";
        window.document.body.appendChild(element);
    }
})(window.Fireworks = window.Fireworks || {}, window);