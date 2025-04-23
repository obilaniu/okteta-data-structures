/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_xattr{}
 * Size:        8
 */

function bch_xattr(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_xattr", byteOrder: "little-endian"});
}
