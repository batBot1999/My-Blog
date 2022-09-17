/*
 * @lc app=leetcode.cn id=692 lang=javascript
 *
 * [692] 前K个高频单词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  // 哈希表存词频
  let map = new Map()
  for (let item of words) {
    map.set(item, map.get(item) + 1 || 1)
  }
  // 从map中构建二维数组 => 字符串排序 => 词频排序 => 数组切片 => 映射到单词返回
  return Array.from(map).sort().sort((a, b) => b[1] - a[1]).slice(0, k).map(i => i[0])
};
// @lc code=end


