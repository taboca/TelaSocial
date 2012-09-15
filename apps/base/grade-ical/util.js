function eventsBySortedHours(values) {
   var array_with_keys = [];
   for (var i = 0; i < values.length; i++) {
       array_with_keys.push({ key: i, value: values[i] });
   }
   array_with_keys.sort(function(a, b) {
      if (parseInt(a.value) < parseInt(b.value)) { return -1; }
      if (parseInt(a.value) > parseInt(b.value)) { return  1; }
      return 0;
   });
   var keys = [];
   for (var i = 0; i < array_with_keys.length; i++) {
       keys.push(array_with_keys[i].key);
   }
   return keys;
}

function getUnicodeCharacter(cp) {

    if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
        return String.fromCharCode(cp);
    } else if (cp >= 0x10000 && cp <= 0x10FFFF) {

        // we substract 0x10000 from cp to get a 20-bits number
        // in the range 0..0xFFFF
        cp -= 0x10000;

        // we add 0xD800 to the number formed by the first 10 bits
        // to give the first byte
        var first = ((0xffc00 & cp) >> 10) + 0xD800

        // we add 0xDC00 to the number formed by the low 10 bits
        // to give the second byte
        var second = (0x3ff & cp) + 0xDC00;

        return String.fromCharCode(first) + String.fromCharCode(second);
    }
}

function strToMins(item) { 
	var currHour  = item.split(':'); 
 	return parseInt(currHour[0])*60+parseInt(currHour[1]);
} 

