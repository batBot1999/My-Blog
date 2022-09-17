/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 方法一: 数组中push到数组中再返回对应节点
var getKthFromEnd = function (head, k) {
  let list = [], cur = head;
  while (cur) {
    list.push(cur)
    cur = cur.next
  }
  return list[list.length - k]
};

// 方法二: 快慢指针
var getKthFromEnd = function (head, k) {
  let slow = head, fast = head;     // 快指针,慢指针
  while (fast) {      // 快指针一直向后移动
    if (k <= 0) slow = slow.next      // 当两指针的步长等于K的时候,慢指针也开始移动
    fast = fast.next
    k--                 // k充当累计步长的作用
  }
  return slow
};
