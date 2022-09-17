/*
 * @lc app=leetcode.cn id=2068 lang=javascript
 *
 * [2068] 检查两个字符串是否几乎相等
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var checkAlmostEquivalent = function (word1, word2) {
  let arr = new Array(26).fill(0)
  let strToIdx = str => str.charCodeAt() - 97;
  for (let char of word1) {
    arr[strToIdx(char)]++
  }
  for (let str of word2) {
    arr[strToIdx(str)]--
  }
  let res = arr.filter(val => val > 3 || val < -3).length
  return !res
};
// @lc code=end

