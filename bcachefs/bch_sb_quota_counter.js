/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_sb_quota_counter{}
 * Size:        8
 */

function bch_sb_quota_counter(){
    return struct({
        timelimit : uint32(),
        warnlimit : uint32(),
    }).set({typeName: "struct bch_sb_quota_counter", byteOrder: "little-endian"});
}
