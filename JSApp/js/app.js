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