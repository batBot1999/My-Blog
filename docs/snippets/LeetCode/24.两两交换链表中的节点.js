/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
 * @return {ListNode}
 */
// 迭代法
var swapPairs = function (head) {
  let dummy = new ListNode(0, head), cur = dummy;   // 设立一个假节点
  while (cur.next && cur.next.next) {     // 只要第二第三指针都存在
    let one = cur.next, two = one.next;
    cur.next = two
    one.next = two.next;
    two.next = one
    cur = one;      // 每次交换过后cur指针移动到原来第一个,以便下次遍历
  }
  return dummy.next;
};
// @lc code=end

// 递归法:
var swapPairs = function (head) {
  if (!head || !head.next) return head;
  let one = head, two = one.next, three = two.next;
  two.next = one;
  one.next = swapPairs(three)
  return two
};