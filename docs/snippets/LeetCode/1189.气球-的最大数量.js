/*
 * @lc app=leetcode.cn id=1189 lang=javascript
 *
 * [1189] “气球” 的最大数量
 */

// @lc code=start
/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
  let map = new Map()
  for (let char of text) {
    if ('balloon'.includes(char)) {
      map.set(char, map.get(char) + 1 || 1)
    }
  }
  map.set('l', Math.floor(map.get('l') / 2))
  map.set('o', Math.floor(map.get('o') / 2))
  let arr = [...map].map(i => i[1])
  return arr.length === 5 ? Math.min(...arr) : 0;
};
// @lc code=end
