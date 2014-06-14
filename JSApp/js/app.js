(function (app, window) {
    window.onload = function () {
        // Check for page embeding
        setIFrameSource();

        // Init Fireworks
        window.Fireworks.init({ width: -400 });

        // Knockout
        applyKnockoutBindings();
    };

    function setIFrameSource() {
        var hash = getUrlFromHash();
        if (hash) {
            // Load iframe
            var iframe = window.document.getElementById("fireworks-target");
            iframe.src = "http://" + hash;
        }
    }

    function getUrlFromHash() {
        return window.location.hash.substr(1);
    }

    function applyKnockoutBindings() {
        var options = window.Fireworks.options;
        var appContext = {};

        // Options
        var observableOptions = {};
        for (var index in options) {
            if (options.hasOwnProperty(index)) {
                observableOptions[index] = ko.numericObservable(options[index]);
                observableOptions[index].subscribe(function (propertyName, newValue) {
                    options[propertyName] = newValue;
                }.bind(null, index));
            }
        }
        appContext.options = observableOptions;

        // Presets
        var presets = ko.observableArray([
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
                    particleTrailLength: 30,
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
            }
        ]);
        appContext.presets = presets;
        appContext.selectedPreset = ko.observable(presets()[0]);
        appContext.selectedPreset.subscribe(function (newValue) {
            for (var index in observableOptions) {
                if (observableOptions.hasOwnProperty(index)) {
                    var value = newValue.options[index];
                    observableOptions[index](value);
                    window.Fireworks.options[index] = value;
                }
            }
        });

        ko.applyBindings(appContext, window.document.body);
    }
})(window.App = window.App || {}, window);