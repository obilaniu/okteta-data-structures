/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K                  = importScript("bcachefs/const.js");
bch_replicas_entry = importScript("bcachefs/bch_replicas_entry.js").bch_replicas_entry;
bkey_i             = importScript("bcachefs/bkey_i.js").bkey_i;



/**
 * Helpers
 */

function jset_entry_alternative(name, code, fields){
    var selectClosure = function(){
        /*if(code == K.bch_jset_entry_type.BCH_JSET_ENTRY_btree_root){
            return this.wasAbleToRead && this.u64s.value > 0 &&
                   this.data._data[0].value == 0x10001000b;
        }*/
        return this.wasAbleToRead && this.u64s.value > 0 && this.type.value == code;
    };
    
    return alternative(selectClosure, fields, name);
}



/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct jset_entry{}
 * Size:        8 + this->u64s*8
 */

function jset_entry(){
    return taggedUnion(
        {
            u64s     : uint16(),
            btree_id : enumeration("btree_id", uint8(), K.btree_id),
            level    : uint8(),
            type     : enumeration("bch_jset_entry_type", uint8(), K.bch_jset_entry_type),
            pad      : array(uint8(), 3),
        },
        [
            jset_entry_alternative("jset_entry (btree_keys)", K.bch_jset_entry_type.BCH_JSET_ENTRY_btree_keys, {
                data:  union({
                    _data: array(uint64(), function(){return this.parent.parent.u64s.value;}),
                    k:     bkey_i(),
                }),
            }),
            jset_entry_alternative("jset_entry (btree_root)", K.bch_jset_entry_type.BCH_JSET_ENTRY_btree_root, {
                data:  union({
                    _data: array(uint64(), function(){return this.parent.parent.u64s.value;}),
                    k:     bkey_i(),
                }),
            }),
            jset_entry_alternative("jset_entry (prio_ptrs)",  K.bch_jset_entry_type.BCH_JSET_ENTRY_prio_ptrs, {
                data:  union({
                    _data: array(uint64(), function(){return this.parent.parent.u64s.value;}),
                    k:     bkey_i(),
                }),
            }),
            jset_entry_alternative("jset_entry_blacklist",    K.bch_jset_entry_type.BCH_JSET_ENTRY_blacklist, {
                seq:   uint64(),
            }),
            jset_entry_alternative("jset_entry_blacklist_v2", K.bch_jset_entry_type.BCH_JSET_ENTRY_blacklist_v2, {
                start: uint64(),
                end:   uint64(),
            }),
            jset_entry_alternative("jset_entry_usage",        K.bch_jset_entry_type.BCH_JSET_ENTRY_usage, {
                v:     uint64(),
            }),
            jset_entry_alternative("jset_entry_data_usage",   K.bch_jset_entry_type.BCH_JSET_ENTRY_data_usage, {
                v:     uint64(),
                r:     union({
                    _data: array(uint64(), function(){return this.parent.parent.u64s.value-1;}),
                    r:     bch_replicas_entry(),
                }),
            }),
        ],
        {
            // Default fields.
            data: union({
                _data: array(uint64(), function(){return this.parent.parent.u64s.value;}),
                k:     bkey_i(),
            }),
        }
    ).set({byteOrder: "little-endian"});
}
