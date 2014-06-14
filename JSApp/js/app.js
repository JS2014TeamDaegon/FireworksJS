(function (app, window) {
    var hash = window.location.hash.substr(1);
    if (hash) {
        // Load iframe
        var iframe = window.document.getElementById("fireworks-target");
        iframe.src = "http://" + hash;
    }

    // Init
    window.Fireworks.init({ width: -400 });
})(window.App = window.App || {}, window);