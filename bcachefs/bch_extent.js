/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_extent{}
 * Size:        8
 */

function bch_extent(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_extent", byteOrder: "little-endian"});
}
