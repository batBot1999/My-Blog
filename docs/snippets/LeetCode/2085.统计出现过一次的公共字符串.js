/*
 * @lc app=leetcode.cn id=2085 lang=javascript
 *
 * [2085] 统计出现过一次的公共字符串
 */

// @lc code=start`
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
var countWords = function (words1, words2) {
  // 函数统计词频,返回词频为一元素组成的数组
  var count = arr => {
    let obj = {}
    for (let item of arr) {
      obj[item] = obj[item] + 1 || 1;
    }
    return Object.entries(obj).filter(i => i[1] === 1).map(i => i[0])
  }
  let arr1 = count(words1), arr2 = count(words2);
  // 求两个数组的交集
  return arr1.reduce((acc, cur) => arr2.includes(cur) ? acc += 1 : acc, 0)
};
// @lc code=end
