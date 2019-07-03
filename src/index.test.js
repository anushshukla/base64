import { encodeToBase64 as encode, decodeFromBase64 as decode } from './index';

describe('base64', () => {
    describe('encoding', () => {
        it('should return YWNl on encoding ace', () => {
            expect(encode('ace')).toEqual('YWNl');
        });
        it('should return YWJjZA== on encoding abcd', () => {
            expect(encode('abcd')).toEqual('YWJjZA==');
        });
    });
    describe('decoding', () => {
        it('should return ace on encoding YWNl', () => {
            expect(decode('YWNl')).toEqual('ace');
        });
        it('should return abcd on encoding YWJjZA==', () => {
            expect(decode('YWJjZA==')).toEqual('abcd');
        });
    });
});
