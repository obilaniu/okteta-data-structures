/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_quota_counter{}
 * Size:        16
 */

function bch_quota_counter(){
    return struct({
        hardlimit : uint64(),
        softlimit : uint64(),
    }).set({typeName: "struct bch_quota_counter", byteOrder: "little-endian"});
}
