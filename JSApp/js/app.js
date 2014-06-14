(function (app, window) {
    var defaultPage = "www.telerik.com";
    var hash = window.location.hash.substr(1);
    hash = hash || defaultPage;
    window.location.hash = hash;

    // Load iframe
    var iframe = window.document.getElementById("fireworks-target");
    iframe.src = "http://" + hash;

    // Init
    window.Fireworks.init();
})(window.App = window.App || {}, window);