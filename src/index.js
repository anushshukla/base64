// ref: https://www.quora.com/How-does-base64-encoding-work
import { isBase64Supported } from './utils';

let encodeToBase64;
let decodeFromBase64;

if (isBase64Supported) {
    encodeToBase64 = data => Buffer.from(data).toString('base64');
    decodeFromBase64 = b64string => Buffer.from(b64string, 'base64').toString('ascii');
} else {
    encodeToBase64 = require('./encodeToBase64');
    decodeFromBase64 = require('./decodeFromBase64');
}

export {
    encodeToBase64,
    decodeFromBase64
};
