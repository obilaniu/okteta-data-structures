/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_reservation{}
 * Size:        8
 */

function bch_reservation(){
    return struct({
        generation:  uint32(),
        nr_replicas: uint8(),
        pad:         array(uint8(), 3),
    }).set({typeName: "struct bch_reservation", byteOrder: "little-endian"});
}
