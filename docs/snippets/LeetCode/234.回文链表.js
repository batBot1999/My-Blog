/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 拆分成数组,数组判断回文
var isPalindrome = function (head) {
  let list = [], cur = head;
  while (cur) {
    list.push(cur.val)
    cur = cur.next;
  }   // 拆数组
  let l = -1, r = list.length;
  while (l < r) {
    if (list[l++] !== list[r--]) return false
  }   // 判断回文
  return true;
};
// @lc code=end

 