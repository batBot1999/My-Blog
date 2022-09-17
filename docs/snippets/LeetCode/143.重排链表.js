/*
 * @lc app=leetcode.cn id=143 lang=javascript
 *
 * [143] 重排链表
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let res = [], list = [];
  let cur = head;
  while (cur) {
    list.push(cur.val)
    cur = cur.next;
  }
  let i = 0;
  while (list.length) {
    res.push(list[i], list[i])
    if (list.length === 1) res.push(list.pop())
  }
  let idx = head;
  while (idx) {
    idx.val = res.shift()
    idx = idx.next
  }
};
// @lc code=end

