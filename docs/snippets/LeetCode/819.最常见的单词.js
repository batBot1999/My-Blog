/*
 * @lc app=leetcode.cn id=819 lang=javascript
 *
 * [819] 最常见的单词
 */

// @lc code=start
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  let list = paragraph.toLowerCase().match(/\w+/g)
  let map = new Map()
  for (let char of list) {
    if (!banned.includes(char)) {
      map.set(char, map.get(char) + 1 || 1)
    }
  }
  return Array.from(map).sort((a, b) => b[1] - a[1])[0][0]
};

// @lc code=end