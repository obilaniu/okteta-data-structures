/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bpos{}
 * Size:        20
 */

function bpos(){
    return struct({
        snapshot: uint32(),
        offset:   uint64(),
        inode:    uint64(),
    }).set({typeName: "struct bpos", byteOrder: "little-endian"});
}
