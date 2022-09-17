// 方法一: 链表转成数组求和,在重新构造出新链表
var addTwoNumbers = function (l1, l2) {
  // 链表转数组函数
  let forEach = ll => {
    let list = [], cur = ll;
    while (cur) {
      list.push(cur.val)
      cur = cur.next
    }
    return list
  }
  // 数组相加函数
  let add = (arr1, arr2) => {
    let arr = new Array(Math.max(arr1.length, arr2.length)).fill(0)
    for (var i = 0, next = 0; i < arr.length; i++) {
      if (!arr1[i]) arr1[i] = 0
      if (!arr2[i]) arr2[i] = 0
      let sum = arr1[i] + arr2[i] + next;
      if (sum > 9) {
        arr[i] = sum - 10
        next = 1
      } else {
        arr[i] = sum
        next = 0;
      }
    }
    if (next) arr.push(1)
    return arr
  }
  let arr = add(forEach(l1), forEach(l2)).map(i => new ListNode(i, null));
  // 串链表
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i].next = arr[i + 1]
  }
  return arr[0]
};
 

// 方法二: 三指针遍历累加
var addTwoNumbers = function (l1, l2) {
  let head = new ListNode(0), cur = head;   // 创建新链表存取新数据
  let cur1 = l1, cur2 = l2, carry = 0;    // 两个指针,carry用来存取进位信息
  while (cur1 || cur2 || carry) {     // 只要还有节点没有遍历到,并且还有位没有进完,就一直执行
    let sum = 0;      // 存放两个节点的和
    if (cur1) {       // 节点一此时的值
      sum += cur1.val
      cur1 = cur1.next;
    }
    if (cur2) {       // 节点二此时的值
      sum += cur2.val;
      cur2 = cur2.next;
    }
    sum += carry    // 把进位累加到和中
    cur.next = new ListNode(sum % 10)   // 创立新节点串到结果链表的当前指针上
    carry = Math.trunc(sum / 10)    // 更新进位信息
    cur = cur.next      // 结果链表指针后移
  }
  return head.next;
};

 