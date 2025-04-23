UUID     = importScript("uuid.js");
PARTTYPE = importScript("gpt/gpt-guid.js").PARTTYPE;
GUID     = UUID.GUID;



/**
 * Basic checks for GPT header.
 * Does not include many possible checks, including CRC-32.
 */

function validateGPTHeader() {
  var Signature  = this["Signature"];
  var Revision   = this["Revision"];
  var HeaderSize = this["HeaderSize"];

  var SignatureValid  = Signature[0].value == 0x45 && // 'E'
                        Signature[1].value == 0x46 && // 'F'
                        Signature[2].value == 0x49 && // 'I'
                        Signature[3].value == 0x20 && // ' '
                        Signature[4].value == 0x50 && // 'P'
                        Signature[5].value == 0x41 && // 'A'
                        Signature[6].value == 0x52 && // 'R'
                        Signature[7].value == 0x54;   // 'T'
  var RevisionValid   = Revision.value == 0x00010000;
  var HeaderSizeValid = HeaderSize.value >= 92;

  Signature.valid  = SignatureValid;
  Revision.valid   = RevisionValid;
  HeaderSize.valid = HeaderSizeValid;
  this.valid       = SignatureValid &&
                     RevisionValid  &&
                     HeaderSizeValid;
}

/**
 * Display GPT Partition Type GUID with interpretation
 */

function parttypeGUIDToString(){
  /* Copied from uuid.js because no obvious way to do supermethod calls */
  function padNumber(number, numDigits) {
    var ret = number;
    while (ret.length < numDigits) {
      ret = '0' + ret;
    }
    return ret;
  }
  var ret = padNumber(this.data1.value.toString(16), 8) + "-"
          + padNumber(this.data2.value.toString(16), 4) + "-"
          + padNumber(this.data3.value.toString(16), 4) + "-"
          + padNumber(this.data4[0].value.toString(16), 2)
          + padNumber(this.data4[1].value.toString(16), 2) + "-";
  for (var i = 2; i < 8; i++) {
    ret += padNumber(this.data4[i].value.toString(16), 2);
  }

  var s = ret.toUpperCase();
  if(PARTTYPE.hasOwnProperty(s)){
    return PARTTYPE[s];
  }else{
    return "{" + ret + "}";
  }
}

/**
 * Interpret GUID Partition Name (UTF-16 LE, up to 36 characters, NUL-terminated)
 */

function partNameToString(){
  var s = "";
  for(var i=0;i<this.length;i++)
    if(this[i].value != 0)
      s += String.fromCharCode(this[i].value);
    else
      return s;
  return s;
}


/**
 * Define and return GPT Partition Entry for a given LBA Size.
 */

function GPTPartEntry(LBASize) {
  var obj = struct({
    PartitionTypeGUID:   GUID().set({toStringFunc: parttypeGUIDToString}),
    UniquePartitionGUID: GUID(),
    StartingLBA:         pointer(uint64(), uint8(), LBASize),
    EndingLBA:           pointer(uint64(), uint8(), LBASize),
    Attributes:          flags("Attributes", uint64(), {
      "Required":             1<<0,
      "No Block IO":          1<<1,
      "Legacy BIOS Bootable": 1<<2,
      "3":                    1<<3,
      "4":  "0x0000000000000010",  "5": "0x0000000000000020",  "6": "0x0000000000000040", "7":  "0x0000000000000080",
      "12": "0x0000000000000100",  "9": "0x0000000000000200", "10": "0x0000000000000400", "11": "0x0000000000000800",
      "12": "0x0000000000001000", "13": "0x0000000000002000", "14": "0x0000000000004000", "15": "0x0000000000008000",
      "16": "0x0000000000010000", "17": "0x0000000000020000", "18": "0x0000000000040000", "19": "0x0000000000080000",
      "20": "0x0000000000100000", "21": "0x0000000000200000", "22": "0x0000000000400000", "23": "0x0000000000800000",
      "24": "0x0000000001000000", "25": "0x0000000002000000", "26": "0x0000000004000000", "27": "0x0000000008000000",
      "28": "0x0000000010000000", "29": "0x0000000020000000", "30": "0x0000000040000000", "31": "0x0000000080000000",
      "32": "0x0000000100000000", "33": "0x0000000200000000", "34": "0x0000000400000000", "35": "0x0000000800000000",
      "36": "0x0000001000000000", "37": "0x0000002000000000", "38": "0x0000004000000000", "39": "0x0000008000000000",
      "40": "0x0000010000000000", "41": "0x0000020000000000", "42": "0x0000040000000000", "43": "0x0000080000000000",
      "44": "0x0000100000000000", "45": "0x0000200000000000", "46": "0x0000400000000000", "47": "0x0000800000000000",
      "48": "0x0001000000000000", "49": "0x0002000000000000", "50": "0x0004000000000000", "51": "0x0008000000000000",
      "52": "0x0010000000000000", "53": "0x0020000000000000", "54": "0x0040000000000000", "55": "0x0080000000000000",
      "56": "0x0100000000000000", "57": "0x0200000000000000", "58": "0x0400000000000000", "59": "0x0800000000000000",
      "Read Only":            "0x1000000000000000",
      "Shadow Copy":          "0x2000000000000000",
      "Hidden":               "0x4000000000000000",
      "No Drive Letter":      "0x8000000000000000",
    }),
    PartitionName:       array(uint16(), 36).set({toStringFunc: partNameToString}),
    Reserved:            array(uint8(), function(gptHeader){return gptHeader.SizeOfPartitionEntry.value-128;}),
  });
  obj.name = "GPT Partition Entry" + (LBASize == 4096 ? " (4Kn)" : "");
  obj.toStringFunc = function(){
    var n = this.PartitionName    .toStringFunc();
    var t = this.PartitionTypeGUID.toStringFunc();
    if(t == "") // NULL GUID
      return "";
    else if(n == "")
      return "<" + t +">";
    else
      return "\"" + n + "\" <" + t + ">";
  };
  return obj;
}


/**
 * Define and return GPT Header for a given LBA Size.
 */

function GPT(LBASize) {
  var obj = struct({
    Signature:                array(char(), 8).set({toStringFunc: function(){return "EFI PART";}}),
    Revision:                 uint32().set({toStringFunc: function(){return (this.value>>16)+"."+(this.value&0xFFFF);}}),
    HeaderSize:               uint32(),
    HeaderCRC32:              uint32(),
    Reserved:                 uint32(),
    MyLBA:                    pointer(uint64(), uint8(), LBASize),
    AlternateLBA:             pointer(uint64(), uint8(), LBASize),
    FirstUsableLBA:           pointer(uint64(), uint8(), LBASize),
    LastUsableLBA:            pointer(uint64(), uint8(), LBASize),
    DiskGUID:                 GUID(),
    PartitionEntryLBA:        pointer(uint64(), array(
                                        GPTPartEntry(LBASize),
                                        function(gptHeader){
                                          return gptHeader.NumberOfPartitionEntries.value;
                                        }
                                      ), LBASize),
    NumberOfPartitionEntries: uint32(),
    SizeOfPartitionEntry:     uint32(),
    PartitionEntryArrayCRC32: uint32(),
  }).setValidation(validateGPTHeader);
  obj.name              = "GPT Header" + (LBASize == 4096 ? " (4Kn)" : "");
  obj.byteOrder         = "little-endian";
  obj.defaultLockOffset = LBASize;
  return obj;
}
