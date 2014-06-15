(function (fireworks) {
    fireworks.greeting = greeting;

    // Svg
    var svg = null;

    // Width and height
    var width = null;
    var height = null;

    // Title and subtitle
    var greetingTitle = null;
    var greetingTitleX = null;
    var greetingTitleY = null;

    var greetingSubtitle = null;
    var greetingSubtitleX = null;
    var greetingSubtitleY = null;

    // Colors
    var greetingTitleColor = "#aaaf18";
    var greetingSubtitleColor = "lightblue";

    var font = {
        family: "Verdana",
        weight: "bold",
        size: 34
    };

    var animationDirection = 2;
    // Frame rate for the animation
    var textAnimationSpeed = 30;
    // How many frames before it disappears
    var animationCounter = null;
    // Max size the textElementTitle will grow to
    var maxFontSize = 72;
    // Min size the textElementTitle will go to
    var minFontSize = 32;

    var textElementTitle = null;
    var textElementSubtitle = null;

    var animationID = null;

    function greeting() {
        if (!fireworks.options.greeting) {
            return;
        }

        // How many frames before it disappears
        animationCounter = 130;

        // Svg
        svg = fireworks.svg;

        // Width and height
        width = fireworks.canvasWidth;
        height = fireworks.canvasHeight;

        // Title and subtitle
        greetingTitle = fireworks.options.greetingTitle;
        greetingSubtitle = fireworks.options.greetingSubtitle;

        var greetingTitleLength = getTextLength(greetingTitle);
        greetingTitleX = getXCoordinate(greetingTitleLength);
        greetingTitleY = getYCoordinate(2);

        var greetingSubtitleLength = getTextLength(greetingSubtitle);
        greetingSubtitleX = getXCoordinate(greetingSubtitleLength);
        greetingSubtitleY = getYCoordinate(1);

        textElementTitle = createTextElement(greetingTitleX, greetingTitleY, greetingTitle, greetingTitleColor, font);
        svg.appendChild(textElementTitle);

        textElementSubtitle = createTextElement(greetingSubtitleX, greetingSubtitleY, greetingSubtitle, greetingSubtitleColor, font);
        svg.appendChild(textElementSubtitle);

        var fontCopy = {
            family: font.family,
            weight: font.weight,
            size: font.size
        };

        animationID = setInterval(function () {
            animateText.call(fontCopy);
        }, textAnimationSpeed);
    }

    function createMultilineText(textElement, text, coordinateX, coordinateY, size) {
        var words = text.split(' ');
        var word = words.shift();
        var newTSElement = createSvgNSTag("tspan");
        var textNode = document.createTextNode(word + " ");
        var tSpanElement = newTSElement.cloneNode(true);

        tSpanElement.setAttribute('x', coordinateX);
        tSpanElement.setAttribute('y', coordinateY);

        tSpanElement.appendChild(textNode);
        textElement.appendChild(tSpanElement);
        coordinateY += size;

        while (words.length > 0) {
            word = words.shift();
            console.log(textNode.data.length);
            textNode = document.createTextNode(word + " ");
            if (tSpanElement.innerHTML.length + word.length + size / 20 > width / 35) {
                tSpanElement.setAttribute('x', coordinateX);
                tSpanElement.setAttribute('y', coordinateY);

                coordinateY += size;
                textElement.appendChild(tSpanElement);
                tSpanElement = newTSElement.cloneNode(true);
            }
            tSpanElement.appendChild(textNode);
        }
        textElement.appendChild(tSpanElement);
    }

    function createTextElement(coordinateX, coordinateY, text, fill, font) {
        var textElementTitle,
            strokeColor = 'black',
            strokeWidth = 1;

        textElementTitle = createSvgNSTag('text');
        createMultilineText(textElementTitle, text, coordinateX, coordinateY, font.size);

        textElementTitle.setAttribute('x', coordinateX);
        textElementTitle.setAttribute('y', coordinateY);
        textElementTitle.setAttribute('fill', fill);
        textElementTitle.setAttribute('font-size', font.size);
        textElementTitle.setAttribute('font-weight', font.weight);
        textElementTitle.setAttribute('font-family', font.family);
        textElementTitle.setAttribute('stroke', strokeColor);
        textElementTitle.setAttribute('stroke-width', strokeWidth);
        return textElementTitle;
    }

    function animateText() {
        if (animationCounter > 0) {
            if (animationDirection > 0) {
                if (this.size < maxFontSize) {
                    this.size += animationDirection;
                }
                else {
                    animationDirection = -animationDirection;
                }
            }
            else {
                if (this.size > minFontSize) {
                    this.size += animationDirection;
                }
                else {
                    animationDirection = -animationDirection;
                }
            }

            // Remove element
            textElementTitle.parentNode.removeChild(textElementTitle);
            // Decrease animation counter
            animationCounter--;

            // Recalculate greeting title x
            var greetingTitleLength = getTextLength(greetingTitle, this.size);
            greetingTitleX = getXCoordinate(greetingTitleLength);

            // Create new element
            textElementTitle = createTextElement(greetingTitleX, greetingTitleY, greetingTitle, getRandomColor(), this);
            svg.appendChild(textElementTitle);
        }
        else {
            // Clear
            svg.innerHTML = "";
            clearInterval(animationID);
        }
    }

    function getXCoordinate(textLength) {
        return (width / 2) - (textLength / 2);
    }

    function getYCoordinate(linePosition) {
        var center = height / 2;

        for (; linePosition > 0; linePosition--) {
            center -= 80;
        }

        return center;
    }

    function getTextLength(text, fontSize) {
        var textWidth = null;

        // Create span
        var span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.fontSize = (fontSize || font.size) + "px";
        span.style.fontWeight = font.weight;
        span.style.fontFamily = font.family;
        span.innerText = text;

        // Append to body
        document.body.appendChild(span);
        // Get width
        textWidth = span.clientWidth || span.offsetWidth;
        // Remove
        document.body.removeChild(span);

        return textWidth;
    }

    function getRandomColor() {
        var red = Math.floor(Math.random() * 256),
            green = Math.floor(Math.random() * 256),
            blue = Math.floor(Math.random() * 256);
        return 'rgb(' + red + ',' + green + ',' + blue + ')';
    }

    function createSvgNSTag(tagName) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }
})(window.Fireworks = window.Fireworks || {});