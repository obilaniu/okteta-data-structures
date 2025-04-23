/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_stripe{}
 * Size:        8
 */

function bch_stripe(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_stripe", byteOrder: "little-endian"});
}
