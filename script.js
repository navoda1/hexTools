/* 
    Author: Navoda Perera
    Description: Conversion scripts 
    Features: 
        - Update converted values in real-time while typing, deleting, cutting and pasting.
        - Option to show decimal values separated into bytes
        - Option to type in decimal values along with characters, that get ignored 
            (e.g. IP address: 192.169.1.2 -> C0A80102)
        - Option to add a custom delimiter for hex bytes (space, 0x)
*/

/* Input elements */
const decimalInput = document.getElementById("decimal-input");
const hexInput = document.getElementById("hex-input");
const asciiInput = document.getElementById("ascii-input");

/* Add event listeners */
decimalInput.addEventListener("input", handleDecimalInput);
decimalInput.addEventListener("propertychange", handleDecimalInput);

hexInput.addEventListener("input", handleHexInput);
hexInput.addEventListener("propertychange", handleHexInput);

asciiInput.addEventListener("input", handleAsciiInput);
asciiInput.addEventListener("propertychange", handleAsciiInput);


function handleDecimalInput(e) {
    var decVal = e.target.value;
    decVal = parseInt(decVal);
    
    if (isNaN(decVal)) {
        hexInput.value = "";
        asciiInput.value = "";
    }
    else {
        /* Decimal -> Hex */
        var hexVal = decVal.toString(16);
        if (hexVal.length % 2 != 0) {
            hexVal = '0' + hexVal;
        }

        /* Hex -> ASCII */
        var asciiVal = "";
        for (var i = 0; i < hexVal.length; i += 2) {
            hexChar = hexVal.substr(i, 2);
            asciiChar = String.fromCharCode(parseInt(hexChar, 16));
            asciiVal += asciiChar;
        }

        hexInput.value = hexVal;
        asciiInput.value = asciiVal;
    }
};

function handleHexInput(e) {
    var hexVal = e.target.value;

    /* Strip any spaces */
    hexVal = hexVal.replaceAll(' ', '');

    /* Make sure it is a hex string */
    if (!hexVal.match(`[0-9A-Fa-f]{${hexVal.length}}`) || hexVal.length == 0) {
        decimalInput.value = "";
        asciiInput.value = "";
        return;
    }

    /* Hex -> Decimal */
    decVal = parseInt(hexVal, 16);

    /* Hex -> ASCII */
    var paddedHexVal = hexVal;
    /* Front pad with a zero if the length is not even */
    if (hexVal.length % 2 != 0) {
        paddedHexVal = '0' + paddedHexVal;
    }
    var asciiVal = "";
    for (var i = 0; i < paddedHexVal.length; i += 2) {
        hexChar = paddedHexVal.substr(i, 2);
        asciiChar = String.fromCharCode(parseInt(hexChar, 16));
        asciiVal += asciiChar;
    }

    decimalInput.value = decVal;
    asciiInput.value = asciiVal
    
};

function handleAsciiInput(e) {
    var asciiVal = e.target.value;
    var hexVal = "";

    /* ASCII -> Hex */
    for (var i = 0; i < asciiVal.length; i++) {
        hexVal += asciiVal.charCodeAt(i).toString(16);
    }

    /* Hex -> Decimal */
    const decVal = parseInt(hexVal, 16);

    decimalInput.value = decVal;
    hexInput.value = hexVal;
};

