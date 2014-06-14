(function (fw, window) {
    var script = document.createElement('script');
    script.type = "text/javascript";

    script.src = "https://rawgithub.com/JS2014TeamDaegon/JSApp/master/JSApp/js/fireworks-js/release/fireworks-js.min.js";
    //script.src = "http://localhost:5039/js/fireworks-js/release/fireworks-js.min.js";

    script.onload = function () {
        setTimeout(window.Fireworks.init);
    };

    window.document.head.appendChild(script);
})(window.Fireworks = window.Fireworks || {}, window);