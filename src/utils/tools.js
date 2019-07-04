/* 此文件添加常用方法 */

/**
 * 获取浏览器信息
 * @returns {{type: string, version: string}}
 */
export const getExplorerInfo = () => {
  const explorer = window.navigator.userAgent.toLowerCase()
  let ver = ''
  let type = ''
  // ie
  if (explorer.indexOf('msie') >= 0) {
    ver = explorer.match(/msie ([\d.]+)/)[1]
    type = 'IE'
  } else if (explorer.indexOf('firefox') >= 0) {
    ver = explorer.match(/firefox\/([\d.]+)/)[1]
    type = 'Firefox'
  } else if (explorer.indexOf('chrome') >= 0) {
    ver = explorer.match(/chrome\/([\d.]+)/)[1]
    type = 'Chrome'
  } else if (explorer.indexOf('opera') >= 0) {
    ver = explorer.match(/opera.([\d.]+)/)[1]
    type = 'Opera'
  } else if (explorer.indexOf('safari') >= 0) {
    if (explorer.match(/version\/([\d.]+)/)) {
      ver = explorer.match(/version\/([\d.]+)/)[1]
    } else if (explorer.match(/crios\/([\d.]+)/)) {
      ver = explorer.match(/crios\/([\d.]+)/)[1]
    }
    type = 'Safari'
  } else if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
    ver = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i)[1]
    type = 'Wechat'
  }
  return { type: type, version: ver }
}

/**
 * 获取Url参数
 */
export const getUrlParams = () => {
  const q = {}
  /* eslint-disable-next-line */
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = v)
  console.log(q)
}
