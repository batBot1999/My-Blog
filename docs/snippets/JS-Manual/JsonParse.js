/* 
  tip: 默认解析的JSON数据都是严格正确的,没有进行错误判断
  思路: 
      用指针遍历字符串,根据当前位置的符号确定数据类型
      对于不同类型的值,分别写出解析函数
      当前值解析完毕后,指针后移到解析值得下一位
  "递归下降"
*/
function ParseJSON(str) {
  // 定义一个全局的指针
  var i = 0;

  // 返回解析值函数
  return parseValue()

  // 解析Value: 从某个位置开始解析出一个值,类型取决于当前符号
  function parseValue() {
    skipWhiteSpace();         // 先对字符串进行去空白

    if (str[i] === '"') return parseString()
    if (str[i] === 't') return parseTrue()
    if (str[i] === 'f') return parseFalse()
    if (str[i] === 'n') return parseNull()
    if (str[i] === '[') return parseArray()
    if (str[i] === '{') return parseObject()
    if (/\d/.test(str[i])) return parseNumber()
  }

  // 去除空格
  function skipWhiteSpace() {
    str = str.replace(/\s/g, '');
  }

  // 解析字符串
  function parseString() {
    let res = ''
    if (str[i] === '"') {
      i++;      // 跳过开始的 "
      while (str[i] !== '"') {
        res += str[i]
        i++
      }
      i++     // 跳过结束的 ",移动指针
    }
    return res;
  }
  
  // 解析数字
  function parseNumber() {
    let res = ''
    while (/\d/.test(str[i])) {
      res += str[i]
      i++
    }
    return +res
  }

  // 解析Array
  function parseArray() {
    let res = [];
    i++     // skip [
    if (str[i] === ']') {
      i++
      return res    // 如果即刻遇到对应的 ] 直接返回结果
    }
    while (true) {
      const value = parseValue()    // 对数组中的值进行解析
      res.push(value)
      if (str[i] === ',') {
        i++
        continue
      }
      if (str[i] === ']') {
        i++
        return res
      }
    }
  }

  // 解析对象
  function parseObject() {
    let obj = {}
    i++
    if (str[i] === '}') {
      i++
      return obj
    }
    while (true) {
      const key = parseString()     // 解析到 "对象键"
      i++       // 遇到冒号,指针后移并继续解析后面的值
      const value = parseValue()    // 解析 "对象值"
      obj[key] = value;
      if (str[i] === ',') {     // 遇到 , 指针后移再继续解析
        i++
        continue
      }
      if (str[i] === '}') {
        i++     // 跳过 }
        return obj
      }
    }
  }

  // 解析true
  function parseTrue() {
    i += 4;
    return true
  }

  // 解析false
  function parseFalse() {
    i += 5;
    return false;
  }


  // 解析Null
  function parseNull() {
    i += 4;
    return null;
  }
}

// 掘金上更完善的JSONParse方法: https://juejin.cn/post/6936881136945594382