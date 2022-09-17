/*
 * @lc app=leetcode.cn id=451 lang=javascript
 *
 * [451] 根据字符出现频率排序
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  let map = {};
  // 对象统计词频
  for (let char of s) {
    map[char] = map[char] + 1 || 1;
  }
  // 统计好的数据装载到数组中排序
  let arr = Object.entries(map).sort((a, b) => b[1] - a[1])
  return arr.reduce((acc, cur) => acc + cur[0].repeat(cur[1]), '')
};
// @lc code=end

console.log(frequencySort('cccaaa'))