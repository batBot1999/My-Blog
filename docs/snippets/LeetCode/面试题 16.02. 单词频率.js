/**
 * @param {string[]} book
 */
var WordsFrequency = function (book) {
  this.list = {}
  for (let item of book) {
    this.list[item] = this.list[item] + 1 || 1;
  }
};

/** 
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function (word) {
  // 返回第一个真值,如果对象中没有找到就返回最后一个
  return this.list[word] || 0
};

/**
 * Your WordsFrequency object will be instantiated and called as such:
 * var obj = new WordsFrequency(book)
 * var param_1 = obj.get(word)
 */