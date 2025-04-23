/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bversion{}
 * Size:        12
 */

function bversion(){
    return struct({
        lo: uint64(),
        hi: uint32(),
    }).set({typeName: "struct bversion", byteOrder: "little-endian"});
}
