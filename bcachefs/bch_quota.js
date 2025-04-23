/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K                 = importScript("bcachefs/const.js");
bch_quota_counter = importScript("bcachefs/bch_quota_counter.js").bch_quota_counter;


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_quota{}
 * Size:        32 (with Q_COUNTERS==2)
 */

function bch_quota(){
    return struct({
        c: array(bch_quota_counter(), K.quota_counters.Q_COUNTERS),
    }).set({typeName: "struct bch_quota", byteOrder: "little-endian"});
}
