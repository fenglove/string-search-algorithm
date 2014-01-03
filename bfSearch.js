// Brute Force string search algorithm
function bruteForce(string, pattern) {
  var str = string.split("")
  var pat = pattern.split("")
  var sl = str.length
  var pl = pat.length

  var i = 0
  var j = 0
  while(i + j < sl) {
    if(pat[i] === str[i + j]) {
      i++
      if(i === pl) {
        return j
      }
    } else {
      j++
      i = 0
    }
  }
  return -1
}