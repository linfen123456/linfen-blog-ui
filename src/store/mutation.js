
export const BASIC_INFO = 'BASIC_INFO'
export const ARTICLE_HALF = 'ARTICLE_HALF'

/**
 * 获取网站基本信息
 * @param name
 * @param defaultValues
 * @returns {*}
 */
export function getBasicInfo(name, defaultValues) {
  const item = localStorage.getItem(BASIC_INFO)
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
