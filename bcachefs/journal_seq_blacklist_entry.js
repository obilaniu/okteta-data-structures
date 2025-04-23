/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct journal_seq_blacklist_entry{}
 * Size:        16
 */

function journal_seq_blacklist_entry(){
    return struct({
        start : uint64(),
        end   : uint64(),
    }).set({typeName: "struct journal_seq_blacklist_entry", byteOrder: "little-endian"});
}
