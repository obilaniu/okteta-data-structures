/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K = importScript("bcachefs/const.js");
U = importScript("bcachefs/utils.js");


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_disk_groups{}
 * Size:        48
 */

function bch_disk_groups(){
    return struct({
        label : U.BCH_LABEL(K.BCH_SB_LABEL_SIZE),
        flags : array(uint64(), 2),
    }).set({typeName: "struct bch_disk_groups", byteOrder: "little-endian"});
}
