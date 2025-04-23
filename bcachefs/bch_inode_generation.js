/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_inode_generation{}
 * Size:        8
 */

function bch_inode_generation(){
    return struct({
        bi_generation: uint32(),
        pad:           uint32(),
    }).set({typeName: "struct bch_inode_generation", byteOrder: "little-endian"});
}
