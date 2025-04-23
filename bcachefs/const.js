/**
 * BcacheFS constants/enums definitions in Javascript for Okteta.
 */


const BCH_SB_LAYOUT_SECTOR  =  7;
const BCH_SB_SECTOR         =  8;
const BCH_SB_LABEL_SIZE     = 32;

const BCH_SB_MEMBERS_MAX    = 64;

const BCH_MIN_NR_NBUCKETS   = (1 << 6);
const BCH_REPLICAS_MAX      =  4;
const BCH_BKEY_PTRS_MAX     = 16;
const BTREE_MAX_DEPTH       =  4;
const BCH_TIER_MAX          =  4;

const BCACHEFS_STATFS_MAGIC = 0xca451a4e; /* LE */


const bch_bkey_type = {
    KEY_TYPE_deleted:                0,
    KEY_TYPE_discard:                1,
    KEY_TYPE_error:                  2,
    KEY_TYPE_cookie:                 3,
    KEY_TYPE_whiteout:               4,
    KEY_TYPE_btree_ptr:              5,
    KEY_TYPE_extent:                 6,
    KEY_TYPE_reservation:            7,
    KEY_TYPE_inode:                  8,
    KEY_TYPE_inode_generation:       9,
    KEY_TYPE_dirent:                10,
    KEY_TYPE_xattr:                 11,
    KEY_TYPE_alloc:                 12,
    KEY_TYPE_quota:                 13,
    KEY_TYPE_stripe:                14,
    KEY_TYPE_reflink_p:             15,
    KEY_TYPE_reflink_v:             16,
    KEY_TYPE_inline_data:           17,
    KEY_TYPE_btree_ptr_v2:          18,
    KEY_TYPE_indirect_inline_data:  19,
};

const bch_extent_entry_type = {
    BCH_EXTENT_ENTRY_ptr:            0,
    BCH_EXTENT_ENTRY_crc32:          1,
    BCH_EXTENT_ENTRY_crc64:          2,
    BCH_EXTENT_ENTRY_crc128:         3,
    BCH_EXTENT_ENTRY_stripe_ptr:     4,
};

const quota_types = {
    QTYP_USR   : 0,
    QTYP_GRP   : 1,
    QTYP_PRJ   : 2,
    QTYP_NR    : 3,
};

const quota_counters = {
    Q_SPC      : 0,
    Q_INO      : 1,
    Q_COUNTERS : 2,
};

const fs_usage = {
    FS_USAGE_RESERVED    : 0,
    FS_USAGE_INODES      : 1,
    FS_USAGE_KEY_VERSION : 2,
    FS_USAGE_NR          : 3,
};

const bch_sb_field_type = {
    BCH_SB_FIELD_journal               :  0,
    BCH_SB_FIELD_members               :  1,
    BCH_SB_FIELD_crypt                 :  2,
    BCH_SB_FIELD_replicas_v0           :  3,
    BCH_SB_FIELD_quota                 :  4,
    BCH_SB_FIELD_disk_groups           :  5,
    BCH_SB_FIELD_clean                 :  6,
    BCH_SB_FIELD_replicas              :  7,
    BCH_SB_FIELD_journal_seq_blacklist :  8,
}

const bch_member_state = {
    BCH_MEMBER_STATE_RW     : 0,
    BCH_MEMBER_STATE_RO     : 1,
    BCH_MEMBER_STATE_FAILED : 2,
    BCH_MEMBER_STATE_SPARE  : 3,
}

const cache_replacement = {
    CACHE_REPLACEMENT_LRU    : 0,
    CACHE_REPLACEMENT_FIFO   : 1,
    CACHE_REPLACEMENT_RANDOM : 2,
}

const bch_kdf_types = {
    BCH_KDF_SCRYPT : 0,
    BCH_KDF_NR     : 1,
}

const bch_data_type = {
    BCH_DATA_none    : 0,
    BCH_DATA_sb      : 1,
    BCH_DATA_journal : 2,
    BCH_DATA_btree   : 3,
    BCH_DATA_user    : 4,
    BCH_DATA_cached  : 5,
    BCH_DATA_parity  : 6,
};

const bcachefs_metadata_version = {
    bcachefs_metadata_version_min                :  9,
    bcachefs_metadata_version_new_versioning     : 10,
    bcachefs_metadata_version_bkey_renumber      : 10,
    bcachefs_metadata_version_inode_btree_change : 11,
}

const bch_sb_feature = {
    BCH_SB_FEATURE_lz4                         :  0,
    BCH_SB_FEATURE_gzip                        :  1,
    BCH_SB_FEATURE_zstd                        :  2,
    BCH_SB_FEATURE_atomic_nlink                :  3,
    BCH_SB_FEATURE_ec                          :  4,
    BCH_SB_FEATURE_journal_seq_blacklist_v3    :  5,
    BCH_SB_FEATURE_reflink                     :  6,
    BCH_SB_FEATURE_new_siphash                 :  7,
    BCH_SB_FEATURE_inline_data                 :  8,
    BCH_SB_FEATURE_new_extent_overwrite        :  9,
    BCH_SB_FEATURE_incompressible              : 10,
    BCH_SB_FEATURE_btree_ptr_v2                : 11,
    BCH_SB_FEATURE_extents_above_btree_updates : 12,
    BCH_SB_FEATURE_btree_updates_journalled    : 13,
    BCH_SB_FEATURE_reflink_inline_data         : 14,
    BCH_SB_FEATURE_new_varint                  : 15,
    BCH_SB_FEATURE_journal_no_flush            : 16,
}

const bch_sb_compat = {
    BCH_COMPAT_FEAT_ALLOC_INFO     : 0,
    BCH_COMPAT_FEAT_ALLOC_METADATA : 1,
}

const bch_error_actions = {
    BCH_ON_ERROR_CONTINUE : 0,
    BCH_ON_ERROR_RO       : 1,
    BCH_ON_ERROR_PANIC    : 2,
}

const bch_str_hash_type = {
    BCH_STR_HASH_CRC32C      : 0,
    BCH_STR_HASH_CRC64       : 1,
    BCH_STR_HASH_SIPHASH_OLD : 2,
    BCH_STR_HASH_SIPHASH     : 3,
};

const bch_str_hash_opts = {
    BCH_STR_HASH_OPT_CRC32C  : 0,
    BCH_STR_HASH_OPT_CRC64   : 1,
    BCH_STR_HASH_OPT_SIPHASH : 2,
};

const bch_csum_type = {
    BCH_CSUM_NONE                   : 0,
    BCH_CSUM_CRC32C_NONZERO         : 1,
    BCH_CSUM_CRC64_NONZERO          : 2,
    BCH_CSUM_CHACHA20_POLY1305_80   : 3,
    BCH_CSUM_CHACHA20_POLY1305_128  : 4,
    BCH_CSUM_CRC32C                 : 5,
    BCH_CSUM_CRC64                  : 6,
}

const bch_csum_opts = {
    BCH_CSUM_OPT_NONE   : 0,
    BCH_CSUM_OPT_CRC32C : 1,
    BCH_CSUM_OPT_CRC64  : 2,
}

const bch_compression_type = {
    BCH_COMPRESSION_TYPE_none           : 0,
    BCH_COMPRESSION_TYPE_lz4_old        : 1,
    BCH_COMPRESSION_TYPE_gzip           : 2,
    BCH_COMPRESSION_TYPE_lz4            : 3,
    BCH_COMPRESSION_TYPE_zstd           : 4,
    BCH_COMPRESSION_TYPE_incompressible : 5,
}

const bch_compression_opts = {
    BCH_COMPRESSION_OPT_none : 0,
    BCH_COMPRESSION_OPT_lz4  : 1,
    BCH_COMPRESSION_OPT_gzip : 2,
    BCH_COMPRESSION_OPT_zstd : 3,
}

const bch_jset_entry_type = {
    BCH_JSET_ENTRY_btree_keys   : 0,
    BCH_JSET_ENTRY_btree_root   : 1,
    BCH_JSET_ENTRY_prio_ptrs    : 2,
    BCH_JSET_ENTRY_blacklist    : 3,
    BCH_JSET_ENTRY_blacklist_v2 : 4,
    BCH_JSET_ENTRY_usage        : 5,
    BCH_JSET_ENTRY_data_usage   : 6,
}

const btree_id = {
    BTREE_ID_EXTENTS : 0,
    BTREE_ID_INODES  : 1,
    BTREE_ID_DIRENTS : 2,
    BTREE_ID_XATTRS  : 3,
    BTREE_ID_ALLOC   : 4,
    BTREE_ID_QUOTAS  : 5,
    BTREE_ID_EC      : 6,
    BTREE_ID_REFLINK : 7,
}
