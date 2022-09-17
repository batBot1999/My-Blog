/*
 * @lc app=leetcode.cn id=1394 lang=javascript
 *
 * [1394] 找出数组中的幸运数
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  let map = new Map()
  // map统计出词频
  for (let item of arr) {
    map.set(item, map.get(item) + 1 || 1);
  }
  // 构造成数组
  let list = Array.from(map).sort((a, b) => b[1] - a[1])
  // 遍历找出值和频率一致的数
  for (let [val, times] of list) {
    if (val === times) return val
  }
  return -1
};
// @lc code=end

