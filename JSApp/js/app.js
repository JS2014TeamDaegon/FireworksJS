(function (app, window) {
    // Url fetch
    var hash = window.location.hash.substr(1);
    if (hash) {
        // Load iframe
        var iframe = window.document.getElementById("fireworks-target");
        iframe.src = "http://" + hash;
    }

    // Init
    window.Fireworks.init({ width: -400 });

    // Knockout
    ko.numericObservable = function (initialValue) {
        var _actual = ko.observable(initialValue);

        var result = ko.dependentObservable({
            read: function () {
                return _actual();
            },
            write: function (newValue) {
                var parsedValue = parseFloat(newValue);
                _actual(isNaN(parsedValue) ? newValue : parsedValue);
            }
        });

        return result;
    };

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
})(window.App = window.App || {}, window);