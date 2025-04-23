/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_alloc{}
 * Size:        8
 */

function bch_alloc(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_alloc", byteOrder: "little-endian"});
}
