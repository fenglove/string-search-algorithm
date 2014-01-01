// Knuth-Morris-Pratt string search algorithm (a.k.a. KMP algorithm)
function kmpSearch(string, pattern) {
  var str = string.split("")
  var pat = pattern.split("")
  var sl = str.length
  var pl = pat.length

  // construct the lookup table
  var t = new Array(pl)
  t[0] = -1
  t[1] = 0
  for(var pos = 2, cnd = 0; pos < pl; ) {
    if(pat[pos - 1] === pat[cnd]) {
      cnd++
      t[pos] = cnd
      pos++
    } else if(cnd > 0) {
      cnd = t[cnd]
    } else {
      t[pos] = 0
      pos++
    }
  }

  // perform the search
  var i = 0
  var j = 0
  while(i + j < sl) {
    if(pat[i] === str[i + j]) {
      i++
      if(i === pl) {
        return j
      }
    } else {
      j = i + j - t[i]
      i = (t[i] > -1) ? t[i] : 0 // i = Math.max(t[i], 0)
    }
  }
  return -1
}