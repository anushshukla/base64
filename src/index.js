// ref: https://www.quora.com/How-does-base64-encoding-work
import base64EncodingValueMap from './base64EncodingValueMap.json';
import base64DecodingCharMap from './base64DecodingCharMap.json';

/* new Buffer(data, 'base64');
let text = buff.toString('ascii'); */

export const isBase64Supported = () => Buffer && typeof Buffer.toString === 'function';

export const cleanStringForBase64 = str => {
    return str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
}

export const charToDecimal = char => {
    return char.charCodeAt(0);
}

export const charToDecimalDecode = char => {
    return base64DecodingCharMap[char]
}

export const decimalToCharDecode = decimal => {
    return String.fromCharCode(decimal);
}

export const decimalToChar = decimal => {
    return base64EncodingValueMap[decimal];
}

export const decimalToBinary = decimal => {
    return decimal.toString(2);
}

export const padBitBinary = decimal => bits) {
    var binaryPadded = decimal;
    var bitsDiff = bits - decimal.length;
    if (bitsDiff > 0) {
        for (var index = 0; index < bitsDiff; index++) {
            binaryPadded = '0' + binaryPadded;
        }
    }
    return binaryPadded;
}

export const pad6BitBinary = decimal => {
    return padBitBinary(decimal, 6);
}

export const pad8BitBinary = decimal => {
    return padBitBinary(decimal, 8);
}

export const binaryToDecimal = binary => {
    return parseInt(binary, 2);
}

export const chunkString = str => length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

export const binaryTo6Bit = binaryStr => {
    return binaryStr.match(/.{1,6}/g);
}

export const binaryTo8Bit = binaryStr => {
    return binaryStr.match(/.{1,8}/g);
}

export const encodeToBase64 = string => {
    var encoded = '';
    var prevDecimal = '';
    var str = cleanStringForBase64(string);
    var groupOfBit = 6;
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        var decimal = charToDecimal(char);
        var binary = decimalToBinary(decimal);
        var binary8BitPadded = pad8BitBinary(binary);
        var binary6Bytes = binaryTo6Bit(prevDecimal + binary8BitPadded);
        var lastIndex = binary6Bytes.length - 1;
        var lastItemLength = binary6Bytes[lastIndex].length;
        var paddingLength = groupOfBit - lastItemLength;
        if (i === str.length - 1 && lastItemLength < groupOfBit) {
            for (var l = 0; l < paddingLength; l++) {
                binary6Bytes[lastIndex] += '0';
            }
        }
        for (var j = 0; j <= lastIndex; j++) {
            var binary6Bit = binary6Bytes[j];
            if (binary6Bit.length === groupOfBit) {
                encoded += decimalToChar(binaryToDecimal(binary6Bit));
            }
        }
        prevDecimal = lastItemLength < groupOfBit ? binary6Bytes[lastIndex] : '';
        if (i === str.length - 1 && lastItemLength < groupOfBit) {
            for (var k = 0; k < paddingLength / 2; k++) {
                encoded += '=';
            }
        }
    }
    return encoded;
}

export const decodeFromBase64 = string => {
    var decoded = '';
    var prevDecimal = '';
    var paddingCount = (string.match(/=/g) || []).length;
    var str = string.replace(/=/g, "");
    var groupOfBit = 8;
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        var decimal = charToDecimalDecode(char);
        var binary = decimalToBinary(decimal);
        var binary6BitPadded = pad6BitBinary(binary);
        var binary8Bytes = binaryTo8Bit(prevDecimal + binary6BitPadded);
        var lastIndex = binary8Bytes.length - 1;
        var lastItemLength = binary8Bytes[lastIndex].length;
        var paddingLength = groupOfBit - lastItemLength;
        if (i === str.length - 1 && lastItemLength < groupOfBit) {
            for (var l = 0; l < paddingLength; l++) {
                binary8Bytes[lastIndex] += '0';
            }
        }
        for (var j = 0; j <= lastIndex; j++) {
            var binary8Bit = binary8Bytes[j];
            if (binary8Bit.length === groupOfBit) {
                decoded += decimalToCharDecode(binaryToDecimal(binary8Bit));
            }
        }
        prevDecimal = lastItemLength < groupOfBit ? binary8Bytes[lastIndex] : '';
    }
    return decoded;
}

// console.log(encodeToBase64('ace')); // YWNl
// console.log(encodeToBase64('abcd')); // YWJjZA==


// console.log(decodeFromBase64('YWNl')); // ace
// console.log(decodeFromBase64('YWJjZA==')); // abcd
