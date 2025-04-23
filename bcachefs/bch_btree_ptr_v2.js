/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

bpos           = importScript("bcachefs/bpos.js").bpos;
bch_extent_ptr = importScript("bcachefs/bch_extent_ptr.js").bch_extent_ptr;


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_btree_ptr_v2{}
 * Size:        48
 */

function bch_btree_ptr_v2(){
    return struct({
        mem_ptr:           uint64(),
        seq:               uint64(),
        sectors_written:   uint16(),
        sectors:           uint16(),
        min_key:           bpos(),
        start:             bch_extent_ptr(),
    }).set({typeName: "struct bch_btree_ptr_v2", byteOrder: "little-endian"});
}
