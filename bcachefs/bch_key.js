/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_key{}
 * Size:        32
 */

function bch_key(){
    return struct({
        key:   array(uint64(),  4),
        bytes: array(uint8(),  32),
    }).set({byteOrder: "little-endian"});
}
