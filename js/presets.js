(function (window) {
    window.FireworkPresets = [
            {
                name: "Default",
                options: new window.Fireworks.Options()
            }, {
                name: "Supersonic",
                options: new window.Fireworks.Options({
                    timerTotal: 46,
                    ctxLineWidth: 1,
                    fireworkTrailLength: 1,
                    fireworkSpeed: 30,
                    fireworkAcceleration: 1.2,
                    fireworkTargetRadius: 8,
                    fireworkShowTarget: false,
                    particleTrailLength: 30,
                    particleCount: 300,
                    particleFriction: 1.01,
                    particleGravity: 0.4,
                    particleAlpha: 0.3
                })
            }, {
                name: "Rain effect",
                options: new window.Fireworks.Options({
                    timerTotal: 40,
                    ctxLineWidth: 1,
                    fireworkTrailLength: 2,
                    fireworkSpeed: 3,
                    fireworkShowTarget: false,
                    particleTrailLength: 7,
                    particleCount: 227,
                    particleGravity: 4.7
                })
            }, {
                name: "Inversed Gravity",
                options: new window.Fireworks.Options({
                    timerTotal: 140,
                    ctxLineWidth: 1,
                    ctxShadow: false,
                    fireworkSpeed: 5,
                    fireworkShowTarget: false,
                    particleTrailLength: 6,
                    particleCount: 154,
                    particleSpeedRange: [1, 37],
                    particleFriction: 0.81,
                    particleGravity: -3.1,
                    particleAlpha: 0.9,
                    particleDecayRange: [0.015, 0.025]
                })
            },
            {
                name: "Rocket Launcher",
                options: new window.Fireworks.Options({
                    ctxLineWidth: 2,
                    timerTotal: 150,
                    fireworkTrailLength: 1,
                    fireworkSpeed: 1,
                    fireworkAcceleration: 1.07,
                    fireworkTargetRadius: 20,
                    particleTrailLength: 30,
                    particleCount: 140,
                    particleFriction: 0.99,
                    particleGravity: -0.5,
                    particleAlpha: 0.9
                })
            },
            {
                name: "New Year",
                options: new window.Fireworks.Options({
                    timerTotal: 20,
                    ctxLineWidth: 1,
                    fireworkTrailLength: 2,
                    fireworkSpeed: 4,
                    fireworkAcceleration: 1.07,
                    fireworkTargetRadius: 4,
                    particleTrailLength: 11,
                    particleCount: 78,
                    particleGravity: 0.2,
                    particleAlpha: 0.8
                })
            },
            {
                name: "Distortion",
                options: new window.Fireworks.Options({
                    ctxLineWidth: 6,
                    fireworkTrailLength: 2,
                    fireworkSpeed: 4,
                    fireworkAcceleration: 1.02,
                    fireworkShowTarget: false,
                    particleTrailLength: 1,
                    particleCount: 130,
                    particleFriction: 0.89,
                    particleGravity: 0.4,
                    particleAlpha: 0.7
                })
            },
            {
                name: "Exploding Star",
                options: new window.Fireworks.Options({
                    timerTotal: 150,
                    ctxLineWidth: 1,
                    ctxShadow: false,
                    fireworkTargetRadius: 4,
                    particleTrailLength: 14,
                    particleCount: 300,
                    particleFriction: 1,
                    particleGravity: 0.5,
                    particleAlpha: 0.7
                })
            }, {
                name: "Circle Path",
                options: new window.Fireworks.Options({
                    timerTotal:103,
                    ctxLineWidth:1,
                    ctxShadow:false,
                    fireworkTrailLength:1,
                    fireworkSpeed:7,
                    fireworkTargetRadius:20,
                    particleTrailLength:11,
                    particleCount:239,
                    particleSpeedRange: [1,1],
                    particleFriction:1.01,
                    particleGravity:-0.1,
                    particleDecayRange: [0.015,0.01]
                })

            }, {
                name: "Super Nova",
                options: new window.Fireworks.Options({
                    ctxLineWidth: 1,
                    fireworkTrailLength: 5,
                    fireworkSpeed: 4,
                    fireworkShowTarget: false,
                    particleTrailLength: 30,
                    particleCount: 101,
                    particleFriction: 1.14,
                    particleGravity: 8.2
                })
            },
            {
                name: "Custom",
                options: new window.Fireworks.Options()
            }
    ];
})(window);
