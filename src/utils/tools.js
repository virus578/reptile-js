// 函数版if else witch
export function condition(object, key) {
  return object[key]
}
// 数组判断是否包含某个元素
export function equation(list, item) {
  return list.includes(item)
}

// 倒序取array元素
Array.prototype.$get = function(i) {
  if (i > 0) {
    console.error('请输入小于0的数')
    return
  }
  return this[this.length + i]
}
// 伪数组转为数组

// 函数式虽然无副作用 但是需要声明一个新变量  当数据大的时候 操作很慢(创建多个变量)
Array.prototype.$concat = function(...list) {
  console.log(4545)
  const _arr = [...this]
  list.forEach(item => {
    if (item instanceof Array) {
      item.forEach(row => {
        temArr.push(row)
      })
    } else {
      console.error('请检查参数必须为数组')
      return
    }
  })
  return _arr
}
// 深复制
// 实现一个map
// 实现一个forEach
// 1+"" 转为字符串
// +"123" 转为数字
// +true 转为数字
// !!1 转为布尔值
