import {
    isBase64Supported,
cleanStringForBase64,
charToDecimal,
charToDecimalDecode,
decimalToCharDecode,
decimalToChar,
decimalToBinary,
padBitBinary,
pad6BitBinary,
pad8BitBinary,
binaryToDecimal,
chunkString,
binaryTo6Bit,
binaryTo8Bit } from './utils';

export default string => {
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