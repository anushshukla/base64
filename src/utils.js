// ref: https://www.quora.com/How-does-base64-encoding-work
import base64EncodingValueMap from './base64EncodingValueMap.json';
import base64DecodingCharMap from './base64DecodingCharMap.json';

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

export const padBitBinary = (decimal, bits) => {
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

export const chunkString = (str, length) => {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

export const binaryTo6Bit = binaryStr => {
    return binaryStr.match(/.{1,6}/g);
}

export const binaryTo8Bit = binaryStr => {
    return binaryStr.match(/.{1,8}/g);
}
