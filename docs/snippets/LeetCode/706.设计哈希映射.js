/*
 * @lc app=leetcode.cn id=706 lang=javascript
 *
 * [706] 设计哈希映射
 */

// @lc code=start

var MyHashMap = function () {
  this._mapKeys = []
  this._mapValues = []
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  if (this._mapKeys.includes(key)) {
    let idx = this._mapKeys.indexOf(key)
    this._mapValues[idx] = value;
  } else {
    this._mapKeys.push(key)
    this._mapValues.push(value)
  }
};

/** 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  let idx = this._mapKeys.indexOf(key)
  if (idx >= 0) {
    return this._mapValues[idx]
  } else {
    return -1
  }
};

/** 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  let idx = this._mapKeys.indexOf(key)
  if (idx >= 0) {
    this._mapKeys.splice(idx, 1)
    this._mapValues.splice(idx, 1)
  }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
// @lc code=end

