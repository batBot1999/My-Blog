/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 数组法
var reverseVowels = function (s) {
  let arr = [...s]
  let key = [], val = [];
  for (let i = 0; i < arr.length; i++) {
    if (['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(s[i])) {
      key.push(i)
      val.unshift(arr[i])
    }
  }
  for (let i = 0; i < key.length; i++) {
    arr[key[i]] = val[i]
  }
  return arr.join('')
};
// @lc code=end

// 双指针
var reverseVowels = function (s) {
  let arr = [...s]
  let isTarget = str => ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(str)
  let l = 0, r = arr.length - 1;
  while (l < r) {
    if (!isTarget(arr[l])) l++
    if (!isTarget(arr[r])) r--
    if (isTarget(arr[l]) && isTarget(arr[r])) {
      [arr[l], arr[r]] = [arr[r], arr[l]]
      l++
      r--
    }
  }
  return arr.join('')
};
console.log(reverseVowels("hello"))