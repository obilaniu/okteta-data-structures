/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_inline_data{}
 * Size:        8
 */

function bch_inline_data(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_inline_data", byteOrder: "little-endian"});
}
