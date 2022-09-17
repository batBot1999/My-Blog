/*
 * @lc app=leetcode.cn id=1721 lang=javascript
 *
 * [1721] 交换链表中的节点
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
// 把遍历到的节点都存放数组中,交换目标值
var swapNodes = function (head, k) {
  let list = [], cur = head;
  while (cur) {
    list.push(cur)
    cur = cur.next
  }
  [list[k - 1].val, list[list.length - k].val] = [list[list.length - k].val, list[k - 1].val]
  return list[0]
};
// @lc code=end


// 方法二: 快慢指针
var swapNodes = function (head, k) {
  let left, right = head;   // 左指针用来查找正数第k个,右指针查询倒数第k个元素
  let cur = head, count = 1;
  while (cur) {
    if (count === k) left = cur   // 找到前面的第k个节点
    if (count > k) right = right.next   // 找到倒数第k个节点,当count > k的时候,右指针开始移动
    cur = cur.next
    count++
  }
  // 交换节点val
  [left.val, right.val] = [right.val, left.val]
  return head
};

// 题解: https://leetcode-cn.com/problems/swapping-nodes-in-a-linked-list/solution/js-zui-xiang-xi-jie-da-kan-bu-hui-suan-w-y470/