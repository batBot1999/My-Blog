/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// 链表转成数组后对数组排序,再构造链表;
var mergeTwoLists = function (list1, list2) {
  if (!list1 && !list2) return list1
  let cur1 = list1, cur2 = list2, arr = [];
  while (cur1 || cur2) {
    if (cur1) {
      arr.push(cur1)
      cur1 = cur1.next;
    }
    if (cur2) {
      arr.push(cur2)
      cur2 = cur2.next;
    }
  }
  arr.sort((a, b) => a.val - b.val)
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i].next = arr[i + 1]
  }
  return arr[0]
};
// @lc code=end

// 双指针: 每次取遍历到的较小的数添加到新链表中
var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode(-1), pre = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      pre.next = list1;
      list1 = list1.next;
    } else {
      pre.next = list2;
      list2 = list2.next;
    }
    pre = pre.next;
  }
  pre.next = list1 === null ? list2 : list1;     // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
  return dummy.next;
};