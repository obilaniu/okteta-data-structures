/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

UUID = importScript("uuid.js").UUID;


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_sb_layout{}
 * Size:        512
 */

function bch_sb_layout(){
    return struct({
        magic           : UUID(),
        layout_type     : uint8(),             /* Only known type: 0 */
        sb_max_size_bits: uint8(),             /* "base 2 of 512 byte sectors" */
        nr_superblocks  : uint8(),
        pad             : array(uint8(), 5),
        sb_offset       : array(pointer(uint64(), uint8(), 512), 61),
    }).set({typeName: "struct bch_sb_layout", byteOrder: "little-endian"});
}
