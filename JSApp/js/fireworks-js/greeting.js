(function (fw) {
    fw.greeting = greeting;

    function greeting() {
        var userScreenWidth = fw.canvasWidth;
        var userScreenHeight = fw.canvasHeight;
        var textInput = document.getElementById('heading').value;
        var wishes = document.getElementById('wishes').value;
        var wishesColor = "#d1fe01";
        var svgNameSpace = 'http://www.w3.org/2000/svg';
        var svg = document.getElementById('the-svg');
        svg.innerHTML = "";
        var textFont = "Verdana";
        var textRowWidth = 10;
        var textFontSize = 34;
        var update = 2;
        var textSpeed = 30; // frame rate for the animation
        var animationCounter = 100; // how many frames before it disappears
        var MAX_FONT_SIZE = 72; // max size the text will grow to
        var MIN_FONT_SIZE = 32; // min size the text will go to
        var text;
        var greetings;

        text = drawText(userScreenWidth / 8 - textFontSize, userScreenHeight / 2.5, textInput, "#aaaf18", textFontSize, "bold", textFont);
        svg.appendChild(text);

        greetings = drawText(userScreenWidth / 8 - textFontSize, userScreenHeight / 2 + textFontSize, wishes, wishesColor, textFontSize, "bold", "Verdana");
        svg.appendChild(greetings);

        function createMultilineText(output, inputText, coordinateX, coordinateY, size) {
            var words = inputText.split(' ');
            var word = words.shift();
            var newTSElement = document.createElementNS(svgNameSpace, "tspan");
            var textNode = document.createTextNode(word + " ");
            var tSpanElement = newTSElement.cloneNode(true);
            //var dy = 0;

            tSpanElement.setAttribute('x', coordinateX);
            tSpanElement.setAttribute('y', coordinateY);
            //tSpanElement.setAttribute('dy', dy);
            tSpanElement.appendChild(textNode);
            output.appendChild(tSpanElement);
            coordinateY += textFontSize;
            //dy +=30;

            while (words.length > 0) {
                word = words.shift();
                console.log(textNode.data.length);
                textNode = document.createTextNode(word + " ");
                if (tSpanElement.innerHTML.length + word.length + size/20 > userScreenWidth/35) {
                    tSpanElement.setAttribute('x', coordinateX);
                    tSpanElement.setAttribute('y', coordinateY);
                    //dy +=30;
                    coordinateY += textFontSize;
                    output.appendChild(tSpanElement);
                    tSpanElement = newTSElement.cloneNode(true);
                }
                //tSpanElement.firstChild.data += " " + word;
                tSpanElement.appendChild(textNode);
            }
            output.appendChild(tSpanElement);
        }

        function drawText(coordinateX, coordinateY, input, fill, fontSize, fontWeight, fontFamily, stroke, sWidth) {
            var text,
                strokeColor = stroke || 'black',
                strokeWidth = sWidth || 3;
            text = document.createElementNS(svgNameSpace, 'text');
            //text.innerHTML = input;
            createMultilineText(text, input, coordinateX, coordinateY, fontSize);
            text.setAttribute('x', coordinateX);
            text.setAttribute('y', coordinateY);
            text.setAttribute('fill', fill);
            text.setAttribute('font-size', fontSize);
            text.setAttribute('font-weight', fontWeight);
            text.setAttribute('font-family', fontFamily);
            text.setAttribute('stroke', strokeColor);
            text.setAttribute('stroke-width', strokeWidth);
            return text;
        }

        function updateText() {
            if (animationCounter > 0) {
                if (update > 0) {
                    if (textFontSize < MAX_FONT_SIZE) {
                        textFontSize += update;
                    }
                    else {
                        update = -update;
                    }
                }
                else {
                    if (textFontSize > MIN_FONT_SIZE) {
                        textFontSize += update;
                    }
                    else {
                        update = -update;
                    }
                }
                text.parentNode.removeChild(text);
                animationCounter--;
                text = drawText(userScreenWidth / 8 - textFontSize, userScreenHeight / 2.5, textInput, getRandomColor(), textFontSize, "bold", textFont);
                svg.appendChild(text);
                //                text.setAttribute("fill", getRandomColor());
                //                text.setAttribute('x', userScreenWidth/8 - (textFontSize));
                //                text.setAttribute('font-size', textFontSize);
            }
            else {
                text.innerHTML = "";
                greetings.innerHTML = "";
            }
        }

        setInterval(function () {
            updateText();
        }, textSpeed);
    }

    function getRandomColor() {
        var red = Math.floor(Math.random() * 256),
            green = Math.floor(Math.random() * 256),
            blue = Math.floor(Math.random() * 256);
        //transparency = Math.random();
        //return 'rgba(' + red + ',' +  green + ',' + blue + ',' + transparency +')';

        return 'rgb(' + red + ',' + green + ',' + blue + ')';
    }
})(window.Fireworks = window.Fireworks || {});