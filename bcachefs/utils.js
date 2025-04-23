/**
 * BcacheFS Javascript utilities for Okteta data structures.
 */


/* Stolen from https://stackoverflow.com/a/59186929 */
function utf8ArrayToString(aBytes) {
    var sView = "";
    for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
        nPart = aBytes[nIdx];
        sView += String.fromCharCode(
            nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
                 /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
                 (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
            : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
                 (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
            : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
                 (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
            : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
                 (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
            : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
                 (nPart - 192 << 6) + aBytes[++nIdx] - 128
            : /* nPart < 127 ? */ /* one byte */
                 nPart
        );
    }
    return sView;
}


/**
 * Display BCacheFS volume label.
 */

function BCH_LABEL(len){
    function byteArrayToString() {
        var bytes = [];
        for(var i=0;i<len;i++){
            b = this[i].value;
            if(b != 0)  bytes.push(b);
            else        break;
        }
        return utf8ArrayToString(bytes);
    }
    
    label = array(uint8(), len);
    label.toStringFunc = byteArrayToString;
    label.typeName     = "Label";
    return label;
}
