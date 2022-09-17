/*
 * @lc app=leetcode.cn id=1704 lang=javascript
 *
 * [1704] 判断字符串的两半是否相似
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
  let countA = 0, countB = 0;
  for (let i = 0; i < s.length; i++) {
    if (['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(s[i])) {
      i < s.length / 2 ? countA++ : countB++;
    }
  }
  return countA === countB
};
console.log(halvesAreAlike('book'))
// @lc code=end

