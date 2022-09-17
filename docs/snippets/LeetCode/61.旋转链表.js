/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
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
 * @param {number} k
 * @return {ListNode}
 */
// 模拟旋转法
var rotateRight = function (head, k) {
  if (!head || !k) return head;
  let list = [], cur = head;
  while (cur) {
    list.push(cur.val)
    cur = cur.next;
  }
  k = k % list.length;
  while (k) {
    list.unshift(list.pop())
    k--
  }
  let res = list.map(i => new ListNode(i))
  for (let i = 0; i < res.length - 1; i++) {
    res[i].next = res[i + 1]
  }
  return res[0]
};
// @lc code=end


var rotateRight = function (head, k) {
  // 特殊情况处理
  if (!head || !k) return head;
  let len = 1, cur = head;
  // 求出链表的长度,并且将指针移动到尾节点
  while (cur.next) {
    cur = cur.next
    len++
  }
  let count = len - k % len;    // 因为链表是单向的,所以只能从左往右
  // 再次处理特殊情况,如果移动数刚好长度的倍数,无需移动
  if (count === len) return head;
  // 首尾衔接
  cur.next = head;
  // 移动指针到要切断的地方
  while (count) {
    cur = cur.next
    count--
  }
  head = cur.next     // 在尾部后截断,尾部的下一个节点即为头节点,并将尾节点指向null
  cur.next = null
  return head;
};
