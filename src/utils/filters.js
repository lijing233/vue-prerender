/* Vue全局过滤器 */
const commonFilter = {
  addPercent: function (value) {
    return `${value}%`
  },

  // 每3位加逗号
  splitStr: function (data) {
    //  return data.replace(/\B(?=(?:\d{3})+\b)/g, ',')
    let strCash = `${data}` // 转换成字符串
    let retCash = ''
    let counter = 0
    for (let i = strCash.length - 1; i >= 0; i--) {
      retCash = strCash.charAt(i) + retCash
      counter++
      if (counter === 3) {
        counter = 0
        if (i !== 0) {
          retCash = `,${retCash}`
        };
      };
    };
    return retCash
  },

  // 手机号格式化 3-4-4
  formatPhone: function (data) {
    if (data === '') return ''
    return `${data.substr(0, 3)} ${data.substr(3, 4)} ${data.substr(7)}`
  },

  // 身份证格式化 111111*******0000
  formatID: function (data) {
    if (data === '') return ''
    return data.replace(/^(.{6})(?:\d+)(.{4})$/, '$1******$2')
  }
}

export default commonFilter
