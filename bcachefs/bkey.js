/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K        = importScript("bcachefs/const.js");
bpos     = importScript("bcachefs/bpos.js").bpos;
bversion = importScript("bcachefs/bversion.js").bversion;



/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bkey{}
 * Size:        40
 */

function bkey(){
    return struct({
        u64s          : uint8(),
        format        : bitfield("unsigned", 7),
        needs_whiteout: bitfield("bool",     1),
        type          : enumeration("bch_bkey_type", uint8(), K.bch_bkey_type),
        pad           : uint8(),
        version       : bversion(),
        size          : uint32(),
        p             : bpos(),
    }).set({typeName: "struct bkey", byteOrder: "little-endian"});
}
