/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

bch_key = importScript("bcachefs/bch_key.js").bch_key;


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_encrypted_key{}
 * Size:        40
 */

function bch_encrypted_key(){
    return struct({
        magic: array(char(), 8).setValidation(function(){
            return this[0].value == 'b' && this[1].value == 'c' &&
                   this[2].value == 'h' && this[3].value == '*' &&
                   this[4].value == '*' && this[5].value == 'k' &&
                   this[6].value == 'e' && this[7].value == 'y';
        }),
        key:   bch_key(),
    }).set({typeName: "struct bch_encrypted_key", byteOrder: "little-endian"});
}
