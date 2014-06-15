(function ($) {
    $.fn.writeText = function (content, callback) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        var intervalID = setInterval(function () {
            if (current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            }
            else {
                clearInterval(intervalID);

                if (callback) {
                    callback();
                }

                setTimeout(function () {
                    elem.text("");
                }, 3000);
            }
        }, 100);
    };
})(jQuery);