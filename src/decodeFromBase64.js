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
    binaryTo8Bit
} from './utils';

export default string => {
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