(function (app, window) {
    // Knockout context
    var appContext = {};

    window.onload = function () {
        // Check for page embeding
        setIFrameSource();

        // Init Fireworks
        window.Fireworks.init({ width: -400 });

        // Knockout
        applyKnockoutBindings();
    };

    app.generateScript = function () {
        var scriptContainer = $("#generateScript").find(".modal-body").first();
        var scriptTemplate = "(function (w) { var s = document.createElement('script'); s.src = 'https://rawgithub.com/JS2014TeamDaegon/JSApp/master/JSApp/js/fireworks-js/release/fireworks-js.min.js'; s.onload = function () { setTimeout(window.Fireworks.init(optionsPlaceHolder)); }; w.document.head.appendChild(s); })(window);";
        var options = "{";

        var defaultOptions = new window.Fireworks.Options();
        var currentOptions = window.Fireworks.options;

        for (var property in defaultOptions) {
            if (defaultOptions.hasOwnProperty(property)) {
                // Ignore dynamic options and ranges
                if (property != "hue" && property.indexOf("Range") === -1) {
                    var defaultValue = defaultOptions[property];
                    var currentValue = currentOptions[property];

                    if (defaultValue !== currentValue) {
                        options += property + ":" + currentValue + ",";
                    }
                }
            }
        }

        options += "}";

        // Set script in the container
        scriptContainer.html(scriptTemplate.replace("optionsPlaceHolder", options));
    }

    app.copyPresetToCustom = function () {
        var customPreset = appContext.presets()[appContext.presets().length - 1];
        var selectedPreset = appContext.selectedPreset();

        for (var property in appContext.options) {
            if (appContext.options.hasOwnProperty(property)) {
                appContext.options[property](selectedPreset.options[property]);
                customPreset.options[property] = selectedPreset.options[property];
            }
        }

        appContext.selectedPreset(customPreset);
    }

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
        var disablePresetChangeToCustom = false;

        // Options
        var observableOptions = {};
        // Map Current options to observables
        for (var property in options) {
            if (options.hasOwnProperty(property)) {
                observableOptions[property] = ko.numericObservable(options[property]);
                // On observable change
                observableOptions[property].subscribe(function (propertyName, newValue) {
                    if (!disablePresetChangeToCustom) {
                        // Change the preset to Custom
                        if (appContext.selectedPreset().name != "Custom") {
                            appContext.selectedPreset(appContext.presets()[appContext.presets().length - 1])
                        }
                    }

                    // Update current option's value
                    options[propertyName] = newValue;
                }.bind(null, property));
            }
        }
        appContext.options = observableOptions;

        // Predefined settings
        var presets = ko.observableArray(window.FireworkPresets);
        appContext.presets = presets;

        // Choose current preset => Default
        appContext.selectedPreset = ko.observable(presets()[0]);
        // On current preset change
        appContext.selectedPreset.subscribe(function (newValue) {
            // Disable the auto change to Custom preset on option's value change
            disablePresetChangeToCustom = true;

            // Foreach observable option
            for (var property in observableOptions) {
                if (observableOptions.hasOwnProperty(property)) {
                    // Get the new option value
                    var value = newValue.options[property];

                    // Update the observable option
                    observableOptions[property](value);
                    // Update the fireworks option
                    window.Fireworks.options[property] = value;
                }
            }

            // Enable preset auto change
            disablePresetChangeToCustom = false;
        });

        ko.applyBindings(appContext, window.document.body);
    }
})(window.App = window.App || {}, window);