/**
 * BcacheFS data structures definitions in Javascript for Okteta.
 */

/**
 * main.js must have a function init() that returns the root datastructure of
 * the analysis.
 * 
 * For the BcacheFS filesystem, return an instance of the superblock structure
 * (bch_sb) as the starting point. By default, its defaultLockOffset is set to
 * BCH_SB_SECTOR * 512 (4096 bytes) in bch_sb.js, but this can be overridden
 * here.
 */

function init(){
    return importScript("bcachefs/bch_sb.js").bch_sb();
}
