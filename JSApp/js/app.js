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
        var observableOptions = {};
        for (var index in options) {
            if (options.hasOwnProperty(index)) {
                observableOptions[index] = ko.numericObservable(options[index]);
                observableOptions[index].subscribe(function (propertyName, newValue) {
                    options[propertyName] = newValue;
                }.bind(null, index));
            }
        }

        ko.applyBindings(observableOptions, window.document.body);
    }
})(window.App = window.App || {}, window);