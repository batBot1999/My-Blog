/*
 * @lc app=leetcode.cn id=2150 lang=javascript
 *
 * [2150] 找出数组中的所有孤独数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findLonely = function (nums) {
  let map = new Map(), res = [];
  for (let num of nums) {
    map.set(num, map.get(num) + 1 || 1)
  }
  for (let [val, count] of map) {
    if (!map.get(+val + 1) && !map.get(+val - 1) && count === 1) {
      res.push(+val)
    }
  }
  return res
};
// @lc code=end
 