function greet() {
    var textInput = document.getElementById('heading').value;
    var wishes = document.getElementById('wishes').value;
    var wishesColor = "#d1fe01";
    var svgNameSpace = 'http://www.w3.org/2000/svg';
    var svg = document.getElementById('the-svg');
    var textFont = "Verdana";
    var textRowWidth = 10;
    var textFontSize = 34;
    var update = 2;
    var textSpeed = 30; // frame rate for the animation
    var animationCounter = 100; // how many frames before it disappears
    var MAX_FONT_SIZE = 72; // max size the text will grow to
    var MIN_FONT_SIZE = 32; // min size the text will go to
    var text;

    function createMultilineText(output, inputText, rowWidth) {
        var words = inputText.split(' ');
        var newTSElement = document.createElementNS(svgNameSpace, "tspan");
        var textNode = document.createTextNode(words[0]);
        var tSpanElement = newTSElement;
        var word;
        var outputPositionX = output.getAttribute('x');
        var outputPositionY = output.getAttribute('y');

        tSpanElement.appendChild(textNode);
        output.appendChild(tSpanElement);
        while(words.length > 0) {
            word = words.shift();
            textNode = document.createTextNode(word + " ");
            if (tSpanElement.innerHTML.length + word.length > rowWidth) {
//                tSpanElement.setAttribute('x', outputPositionX);
//                tSpanElement.setAttribute('y', outputPositionY);
                //outputPositionY += 20;
                output.appendChild(tSpanElement);
                tSpanElement = newTSElement.cloneNode(true);
            }
            //tSpanElement.firstChild.data += " " + word;
            tSpanElement.appendChild(textNode);
        }
    }

    function drawText(coordinateX, coordinateY, input, fill, fontSize, fontWeight, fontFamily, stroke, sWidth) {
        var text,
            strokeColor = stroke || 'black',
            strokeWidth = sWidth || 3;
        text = document.createElementNS(svgNameSpace, 'text');
        text.innerHTML = input;
        //createMultilineText(text, input, textRowWidth);
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

    var greetings = drawText(250 - textFontSize, 200, wishes, wishesColor, textFontSize, "bold", "Verdana");
    svg.appendChild(greetings);

    text = drawText(250 - textFontSize, 100, textInput, "#aaaf18", textFontSize, "bold", textFont);
    svg.appendChild(text);

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
            animationCounter--;
            text.setAttribute("fill", getRandomColor());
            text.setAttribute('x', 250 - (textFontSize));
            text.setAttribute('font-size', textFontSize);
        }
        else {
            text.innerHTML = "";
            greetings.innerHTML ="";
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

    return 'rgb(' + red + ',' +  green + ',' + blue +')';
}