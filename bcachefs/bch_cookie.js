/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_cookie{}
 * Size:        8
 */

function bch_cookie(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_cookie", byteOrder: "little-endian"});
}
