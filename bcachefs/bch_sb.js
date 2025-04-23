/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

UUID          = importScript("uuid.js").UUID;
U             = importScript("bcachefs/utils.js");
K             = importScript("bcachefs/const.js");
bch_csum      = importScript("bcachefs/bch_csum.js").bch_csum;
bch_member    = importScript("bcachefs/bch_member.js").bch_member;
bch_sb_layout = importScript("bcachefs/bch_sb_layout.js").bch_sb_layout;
bch_sb_field  = importScript("bcachefs/bch_sb_field.js").bch_sb_field;



/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_sb{}
 * Size:        1008 + 8*this->u64s
 */

function bch_sb(){
    return struct({
        csum            : bch_csum(),
        version         : uint16(),
        version_min     : uint16(),
        pad             : array(uint16(), 2),
        magic           : UUID(),
        uuid            : UUID(),
        user_uuid       : UUID(),
        label           : U.BCH_LABEL(K.BCH_SB_LABEL_SIZE),
        offset          : uint64(),
        seq             : uint64(),
        
        block_size      : uint16(),
        dev_idx         : uint8(),
        nr_devices      : uint8(),
        u64s            : uint32(),
        
        time_base_lo    : uint64(),
        time_base_hi    : uint32(),
        time_precision  : uint32(),
        
        flags           : array(uint64(), 8),
        features        : array(uint64(), 2),
        compat          : array(uint64(), 2),
        
        layout          : bch_sb_layout(),
        
        data            : union({
            _data            : array(uint64(),
                                     function(){
                                         return this.parent.parent.u64s.value;
                                     }),
            start            : array(bch_sb_field(),
                                     function(){
                                         const N = this.parent.parent.u64s.value;
                                         var   T = 0, i = 0, l;
                                         while(T<N){
                                             l  = this.parent._data[T].value & 0xFFFFFFFF;
                                             if(l <= 0)
                                                 break;
                                             T += l;
                                             i++;
                                         }
                                         return i;
                                     }),
        }),
    }).set({typeName: "struct bch_sb", byteOrder: "little-endian",
            defaultLockOffset: K.BCH_SB_SECTOR * 512});
}
