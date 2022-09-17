/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let map = new Map()
  for (let item of nums) {
    map.set(item, map.get(item) + 1 || 1)
  }
  return Array.from(map).sort((a, b) => b[1] - a[1]).map(i => i[0]).slice(0,k)
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))
// @lc code=end

