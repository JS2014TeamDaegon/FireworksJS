(function (app, window) {
    var defaultPage = "www.telerik.com";
    var hash = window.location.hash.substr(1);
    hash = hash || defaultPage;
    window.location.hash = hash;

    // Init
    window.Fireworks.init("http://" + hash);
})(window.App = window.App || {}, window);