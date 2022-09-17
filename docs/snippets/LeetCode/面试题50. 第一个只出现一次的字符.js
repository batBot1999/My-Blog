/**
* @param {string} s
* @return {character}
*/
var firstUniqChar = function (s) {
  let map = new Map()
  for (let char of s) {
    map.set(char, map.get(char) + 1 || 1)
  }
  for (let [key, val] of map.entries()) {
    if (val === 1) return key
  }
  return ' '
};