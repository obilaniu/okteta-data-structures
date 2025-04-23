/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

K = importScript("bcachefs/const.js");


/**
 * Header:      #include "bcachefs_format.h"
 * Declaration: struct bch_replicas_entry{}
 * Size:        3+this->nr_devs
 */

function bch_replicas_entry(){
    return struct({
        data_type   : enumeration("bch_data_type", uint8(), K.bch_data_type),
        nr_devs     : uint8(),
        nr_required : uint8(),
        devs        : array(uint8(), function(){return this.parent.nr_devs.value;}),
    }).set({typeName: "struct bch_replicas_entry"});
}
