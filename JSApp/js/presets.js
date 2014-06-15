(function (window) {
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
                    lineWidth: 4,
                    fireworkTrailLength: 10,
                    fireworkSpeed: 10,
                    fireworkAcceleration: 1,
                    fireworkTargetRadius: 10,
                    particleTrailLength: 30,
                    particleCount: 150,
                    particleGravity: -2.5
                })
            },
            {
                name: "NewYear",
                options: new window.Fireworks.Options({
                    particleTrailLength: 10,
                    timerTotal: 10
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
                    particleCount: 300,
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