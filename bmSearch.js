// Boyer-Moore string search algorithm
function bmSearch(string, pattern) {
  var str = string.split("")
  var pat = pattern.split("")
  var sl = str.length
  var pl = pat.length

  // construct the jump table based on the mismatched character information
  var charTable = {}
  for(var i = 0; i < pl - 1; i++) {
    charTable[pat[i]] = pl - 1 - i
  }

  // construct the jump table based on the scan offset which mismatch occurs
  var offsetTable = new Array(pl)
  for(var i = pl - 1, last = pl; i >= 0; i--) {
    if(isPrefix(pat, i + 1)) {
      last = i + 1
    }
    offsetTable[pl - 1 - i] = pl - 1 - i + last
  }
  for(var i = 0; i < pl; i++) {
    var slen = suffixLength(pat, i)
    offsetTable[slen] = pl - 1 - i + slen
  }

  // whether s[p:end] is also a prefix of s
  function isPrefix(s, p) {
    for(var i = p, j = 0; i < s.length; i++, j++) {
      if(s[i] !== s[j]) {
        return false
      }
    }
    return true
  }

  // returns the maximum length of the substring ends at p and is a suffix
  function suffixLength(s, p) {
    var len = 0
    for(var i = p, j = s.length - 1; i >= 0; i--, j--) {
      if(s[i] !== s[j]) {
        break
      }
      len++
    }
    return len
  }

  // perform the search
  for(var i = pl - 1; i < sl; ) {
    for(var j = pl - 1; pat[j] === str[i]; i--, j--) {
      if(j === 0) {
        return i
      }
    }
    i += Math.max(offsetTable[pl - 1 - j], (str[i] in charTable ? charTable[str[i]] : pl)) // i += pl - j
  }
  return -1
}