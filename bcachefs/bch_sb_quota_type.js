/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K                    = importScript("bcachefs/const.js");
bch_sb_quota_counter = importScript("bcachefs/bch_sb_quota_counter.js").bch_sb_quota_counter;


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_sb_quota_type{}
 * Size:        8+8*Q_COUNTERS (== 24 with Q_COUNTERS==2)
 */

function bch_sb_quota_type(){
    return struct({
        flags: uint64(),
        c:     array(bch_sb_quota_counter(), K.quota_counters.Q_COUNTERS),
    }).set({typeName: "struct bch_sb_quota_type", byteOrder: "little-endian"});
}
