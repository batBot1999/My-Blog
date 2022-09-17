/*
 * @lc app=leetcode.cn id=1512 lang=javascript
 *
 * [1512] 好数对的数目
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let obj = {}, res = 0
  for (let i = 0; i < nums.length; i++) {
    nums[i] in obj ? obj[nums[i]].push(i) : obj[nums[i]] = [i]
  }
  let count = arr => arr.length >= 2 ? (arr.length - 1) * arr.length / 2 : 0;
  for (let key in obj) {
    res += count(obj[key])
  }
  return res
};
// @lc code=end


