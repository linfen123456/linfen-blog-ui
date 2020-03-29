
export  const BASIC_INFO='BASIC_INFO'

/**
 * 获取网站基本信息
 * @param name
 * @param defaultValues
 * @returns {*}
 */
export function getBasicInfo(name,defaultValues) {
  let item = localStorage.getItem(BASIC_INFO)
  try {
    if (item) {
      const data = JSON.parse(item).data[name]
      if (data) {
        return data.content
      } else {
        return defaultValues
      }
    } else {
      return defaultValues
    }
  } catch (e) {
    return defaultValues
  }
}
