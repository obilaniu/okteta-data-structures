/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_inode{}
 * Size:        8
 */

function bch_inode(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_inode", byteOrder: "little-endian"});
}
