/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_reflink_p{}
 * Size:        8
 */

function bch_reflink_p(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_reflink_p", byteOrder: "little-endian"});
}
