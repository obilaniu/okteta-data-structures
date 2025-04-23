/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K                           = importScript("bcachefs/const.js");
bch_member                  = importScript("bcachefs/bch_member.js").bch_member;
bch_encrypted_key           = importScript("bcachefs/bch_encrypted_key.js").bch_encrypted_key;
bch_replicas_entry_v0       = importScript("bcachefs/bch_replicas_entry_v0.js").bch_replicas_entry_v0;
bch_replicas_entry          = importScript("bcachefs/bch_replicas_entry.js").bch_replicas_entry;
bch_sb_quota_type           = importScript("bcachefs/bch_sb_quota_type.js").bch_sb_quota_type;
bch_disk_groups             = importScript("bcachefs/bch_disk_groups.js").bch_disk_groups;
jset_entry                  = importScript("bcachefs/jset_entry.js").jset_entry;
journal_seq_blacklist_entry = importScript("bcachefs/journal_seq_blacklist_entry.js").journal_seq_blacklist_entry;



/**
 * Helpers
 */

function fixed_size_entry_length(numBytesPerEntry){
    return function(){
        v = Math.max(1, this.parent.u64s.value)-1;
        v = v*8;
        return Math.floor(v / numBytesPerEntry);
    };
}
function default_field_fields(){
    return {
        _data: array(uint64(), function(){return this.parent.u64s.value-1;})
    };
}
function field_alternative(name, code, fields){
    var selectClosure = function(){
        return this.wasAbleToRead && this.u64s.value > 0 && this.type.value == code;
    };
    
    return alternative(selectClosure, fields, name);
}
function bch_sb_field_replicas__data_length(){
    return function(){
        return (Math.max(1, this.parent.parent.u64s.value)-1)*8;
    };
}
function bch_sb_field_replicas_entry_length(version){
    /**
     * Array of bch_replicas_entry_v0 or later (?) Length Computation
     *
     * Apply length rule until termination by BCH_DATA_none or overlength. The
     * difference between
     *
     *   - bch_replicas_entry_v0 and
     *   - bch_replicas_entry
     *
     * is that in bch_replicas_entry_v0, there is an absent uint8() nr_required
     * immediately after uint8() nr_dev, so the fixed length is 2 bytes and not 3.
     */
    
    return function(){
        const N = (Math.max(1, this.parent.parent.u64s.value)-1)*8;
        const F = version==0 ? 2 : 3;
        var   T = 0, i = 0, l, t;
        while(T+F < N){
            t  = this.parent._data[T+0].value;
            l  = this.parent._data[T+1].value;
            if(t == K.bch_data_type.BCH_DATA_none || T+F+l > N)
                break;
            T += F+l;
            i++;
        }
        return i;
    };
}
function bch_sb_field_clean__data_length(){
    return function(){return this.parent.parent.u64s.value-3;};
}
function bch_sb_field_clean_start_length(){
    /**
     * Array of jset_entry Length Computation.
     * 
     * The fixed-length header of struct bch_sb_field_clean{} is 3 u64s long, so
     * we subtract that. However, and very annoyingly, the u64s filed at the
     * beginning of jset_entry is not *inclusive* of itself, like most other
     * u64s fields in superblock fields; Rather, it is the exact length of the
     * __u64 _data array, which begins at an offset of 1 u64 into jset_entry.
     * Moreover, the u64s count is a 16-bit quantity in the LSBs assuming LE,
     * so we must mask to extract it.
     *
     * Therefore, yet another, again subtly different, length function is
     * required here.
     */
    
    return function(){
        const N = (Math.max(3, this.parent.parent.u64s.value)-3);
        var   T = 0, i = 0, l, t;
        while(T < N){
            t  = (this.parent._data[T].value & 0x00FF00000000) >> 32;
            l  = (this.parent._data[T].value & 0x00000000FFFF) >>  0;
            if(T+1+l > N || !l)
                break;
            T += 1+l;
            i++;
        }
        return i;
    };
}



/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_sb_field{}
                struct bch_sb_field_*()  (subtypes)
 * Size:        8*this->u64s, minimum 8 (practically, 16 for it to be useful)
 */

function bch_sb_field(){
    return taggedUnion({
            u64s : uint32(),
            type : enumeration("bch_sb_field_type", uint32(), K.bch_sb_field_type),
        },
        [
            field_alternative("bch_sb_field_journal",               K.bch_sb_field_type.BCH_SB_FIELD_journal, {
                buckets: array(uint64(), fixed_size_entry_length(8)),
            }),
            field_alternative("bch_sb_field_members",               K.bch_sb_field_type.BCH_SB_FIELD_members, {
                members: array(bch_member(), fixed_size_entry_length(56)),
            }),
            field_alternative("bch_sb_field_crypt",                 K.bch_sb_field_type.BCH_SB_FIELD_crypt, {
                flags:     uint64(),
                kdf_flags: uint64(),
                key:       bch_encrypted_key(),
            }),
            field_alternative("bch_sb_field_replicas_v0",           K.bch_sb_field_type.BCH_SB_FIELD_replicas_v0, {
                data: union({
                    _data:   array(uint8(),                 bch_sb_field_replicas__data_length()),
                    entries: array(bch_replicas_entry_v0(), bch_sb_field_replicas_entry_length(0)),
                }),
            }),
            field_alternative("bch_sb_field_quota",                 K.bch_sb_field_type.BCH_SB_FIELD_quota, {
                q: array(bch_sb_quota_type(), K.quota_types.QTYP_NR),
            }),
            field_alternative("bch_sb_field_disk_groups",           K.bch_sb_field_type.BCH_SB_FIELD_disk_groups, {
                entries: array(bch_disk_groups(), fixed_size_entry_length(48)),
            }),
            field_alternative("bch_sb_field_clean",                 K.bch_sb_field_type.BCH_SB_FIELD_clean, {
                flags:        uint32(),
                read_clock:   uint16(),
                write_clock:  uint16(),
                journal_seq:  uint64(),
                data:         union({
                    _data: array(uint64(),     bch_sb_field_clean__data_length()),
                    start: array(jset_entry(), bch_sb_field_clean_start_length()),
                }),
            }),
            field_alternative("bch_sb_field_replicas",              K.bch_sb_field_type.BCH_SB_FIELD_replicas, {
                data: union({
                    _data:   array(uint8(),              bch_sb_field_replicas__data_length()),
                    entries: array(bch_replicas_entry(), bch_sb_field_replicas_entry_length(1)),
                }),
            }),
            field_alternative("bch_sb_field_journal_seq_blacklist", K.bch_sb_field_type.BCH_SB_FIELD_journal_seq_blacklist, {
                entries: array(journal_seq_blacklist_entry(), fixed_size_entry_length(16)),
            }),
        ]
    ).set({byteOrder: "little-endian"});
}
