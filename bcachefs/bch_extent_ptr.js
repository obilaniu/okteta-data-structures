/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Helpers
 */

function bch_extent_ptr_interpret(){
    /**
     * The definition of bch_extent_ptr{} is:
     *
     *    u64 type:           1
     *    u64 cached:         1
     *    u64 unused:         1
     *    u64 reservation:    1
     *    u64 offset:        44
     *    u64 dev:            8
     *    u64 gen:            8
     *
     * The offset is in units of 2^9=512-byte sectors but is shifted 4 bits
     * left from LSB. To interpret the pointer, extract out the 11 nibbles
     * of the offset from the hex representation, then multiply that
     * quantity by 512.
     */
    
    return (hex2dec(dec2hex(this.value).slice(-12,-1))-0)*this.scale;
}
function bch_extent_ptr_validate(){
    return (hex2dec(dec2hex(this.value).slice(-1)) & 1) == 1;// LSB set.
}
function dec2hex16(v){
    return ("000000000000000"+dec2hex(v)).slice(-16);
}
function bch_extent_ptr_toString(){
    var h = dec2hex16(this.value);
    var r = hex2dec(h.slice(15,16))-0;
    var o = hex2dec(h.slice( 4,15))-0;
    var p = dec2hex16(o*512);
    
    var a = (r & 0x8) ? "reserved " : "";
    a    += (r & 0x4) ? "unused "   : "";
    a    += (r & 0x2) ? "cached "   : "";
    
    var s = "("+h.slice(0,2)+":"+h.slice(2,4)+") @ ";
    s += p.slice(0,4)+":"+p.slice(4,8)+" "+p.slice(8,12)+":"+p.slice(12,16);
    s += (a !== "") ? " ("+a.trim()+")" : "";
    return s;
}



/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_extent_ptr{}
 * Size:        8
 */

function bch_extent_ptr(){
    return pointer(uint64(), uint8(), 512, bch_extent_ptr_interpret).set({
        typeName:       "struct bch_extent_ptr",
        byteOrder:      "little-endian",
        validationFunc: bch_extent_ptr_validate,
        toStringFunc:   bch_extent_ptr_toString,
    });
}
