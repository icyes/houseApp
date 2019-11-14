import Vue from 'vue'

const objFilter = function(obj) {
	let newObj = {};
	for (let i in obj) {
		if (obj[i] != null) newObj[i] = obj[i];
	}
	return newObj;
}

  /**
   * 将数字分段显示，每三位用逗号隔开
   * @param {Number} value
   */
 const formatNumber = function (value) {
    if (!value) return '0'
    let intPart = null
    if (value.toString().indexOf('.') === -1) {     // 判断是否是整数并获取整数部分
      intPart = value
    } else {
      intPart = Number(value).toFixed(0)
    }
    // 将整数部分逢三一断
    const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

    let floatPart = ''       // '' | '.00':预定义小数部分
    const value2Array = value.toString().split('.')

    // =2表示数据有小数位
    if (value2Array.length === 2) {
      floatPart = value2Array[1].toString()       // 拿到小数部分

      if (floatPart.length === 1) {     // 补0
        return intPartFormat + '.' + floatPart + '0'
      } else {
        return intPartFormat + '.' + floatPart
      }
    } else {
      return intPartFormat + floatPart
    }
  }



Vue.prototype.objFilter = objFilter;

Vue.prototype.$formatNumber = formatNumber;