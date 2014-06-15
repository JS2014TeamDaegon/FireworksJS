﻿(function (window) {
    window.FireworkPresets = [
            {
                name: "Default",
                options: new window.Fireworks.Options()
            }, {
                name: "Max Gravity",
                options: new window.Fireworks.Options({
                    particleGravity: 10
                })
            }, {
                name: "Inversed Gravity",
                options: new window.Fireworks.Options({
                    particleGravity: -10
                })
            },
            {
                name: "Rocket Launcher",
                options: new window.Fireworks.Options({
                    ctxLineWidth: 4,
                    fireworkTrailLength: 10,
                    fireworkSpeed: 10,
                    fireworkAcceleration: 1,
                    fireworkTargetRadius: 10,
                    particleTrailLength: 30,
                    particleCount: 100,
                    particleGravity: -2.5
                })
            },
            {
                name: "New Year",
                options: new window.Fireworks.Options({
                    particleTrailLength: 10,
                    timerTotal: 10
                })
            },
            {
                name: "Distortion",
                options: new window.Fireworks.Options({
                    limiterTotal: 9,
                    limiterTick: 1,
                    timerTotal: 59,
                    timerTick: 5,
                    ctxLineWidth: 8,
                    fireworkTrailLength: 2,
                    fireworkSpeed: 6,
                    fireworkAcceleration: 1.03,
                    fireworkTargetRadius: 1,
                    particleTrailLength: 3,
                    particleCount: 61,
                    particleFriction: 1.09,
                    particleGravity: 2.7,
                    particleAlpha: 0.3
                })
            },
            {
                name: "Exploding Star",
                options: new window.Fireworks.Options({
                    particleFriction: 1.1,
                    particleGravity: -4
                })
            },
            {
                name: "Super Nova",
                options: new window.Fireworks.Options({
                    particleTrailLength: 30,
                    particleCount: 210,
                    particleFriction: 1.1,
                    particleGravity: -4
                })
            },
            {
                name: "Custom",
                options: new window.Fireworks.Options()
            }
    ];
})(window)