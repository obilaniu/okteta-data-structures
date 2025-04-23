/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_csum{}
 * Size:        16
 */

function bch_csum(){
    return union({
        crc32                : uint32(),
        crc64                : uint64(),
        chacha20_poly1305_80 : array(uint8(), 10),
        chacha20_poly1305_128: array(uint8(), 16),
        generic              : array(uint64(), 2),
        bytes                : array(uint8(), 16),
    }).set({typeName: "struct bch_csum", byteOrder: "little-endian"});
}
