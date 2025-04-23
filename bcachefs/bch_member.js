/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

UUID = importScript("uuid.js").UUID;


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_member{}
 * Size:        56
 */

function bch_member(){
    return struct({
        uuid            : UUID(),
        nbuckets        : uint64(),
        first_bucket    : uint16(),
        bucket_size     : uint16(),
        pad             : uint32(),
        last_mount      : uint64(),
        flags           : array(uint64(), 2),
    }).set({typeName: "struct bch_member", byteOrder: "little-endian"});
}
