/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_dirent{}
 * Size:        8
 */

function bch_dirent(){
    return struct({
        cookie: uint64(),
    }).set({typeName: "struct bch_dirent", byteOrder: "little-endian"});
}
