/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_btree_ptr{}
 * Size:        8
 */

function bch_btree_ptr(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_btree_ptr", byteOrder: "little-endian"});
}
