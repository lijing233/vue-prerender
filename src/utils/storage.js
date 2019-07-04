/* cookie & storage 统一管理和处理 */
import jsCookie from 'js-cookie'
const TOKEN = 'mytoken'

export const getCookieToken = () => {
  return jsCookie.get(TOKEN)
}

export const getStorageToken = () => {
  return localStorage.getItem(TOKEN)
}
