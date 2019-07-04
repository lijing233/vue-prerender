class Calculation {
  /**
     * 处理浮点相加
     * @param a
     * @param b
     * @returns {number}
     */
  add (a, b) {
    let c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    e = Math.pow(10, Math.max(c, d))
    return (this.mul(a, e) + this.mul(b, e)) / e
  }

  /**
     * 处理浮点相减
     * @param a
     * @param b
     * @returns {number}
     */
  sub (a, b) {
    let c, d, e
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    e = Math.pow(10, Math.max(c, d))
    return (this.mul(a, e) - this.mul(b, e)) / e
  }

  /**
     * 处理浮点相乘
     * @param a
     * @param b
     * @returns {number}
     */
  mul (a, b) {
    let c = 0
    let d = a.toString()
    let e = b.toString()
    try {
      c += d.split('.')[1].length
    } catch (f) {
    }
    try {
      c += e.split('.')[1].length
    } catch (f) {
    }
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
  }

  /**
     * 处理浮点相除
     * @param a
     * @param b
     * @returns {number}
     */
  division (a, b) {
    let c, d
    let e = 0
    let f = 0
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {
    }
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {
    }
    c = Number(a.toString().replace('.', ''))
    d = Number(b.toString().replace('.', ''))
    return this.mul(c / d, Math.pow(10, f - e))
  }
}

export const instance = new Calculation()
export default instance
