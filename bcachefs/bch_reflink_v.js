/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_reflink_v{}
 * Size:        8
 */

function bch_reflink_v(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_reflink_v", byteOrder: "little-endian"});
}
