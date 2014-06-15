(function ($) {
    $.fn.writeText = function (content) {
        var contentArray = content.split(""),
            current = 0,
            elem = this;
        var intervalID = setInterval(function () {
            if (current < contentArray.length) {
                elem.text(elem.text() + contentArray[current++]);
            }
            else {
                clearInterval(intervalID);
                setTimeout(function () {
                    elem.text("");
                }, 3000);
            }
        }, 100);
    };
})(jQuery);