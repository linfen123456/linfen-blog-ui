import request from '@/utils/request'

/*
 * 标签管理模块
 */

// 保存标签
export const saveAboutMe = (data) => {
  return request({
    url: '/blog/about-me',
    method: 'post',
    data: data
  })
}
// 获取标签列表
export const getAboutMe = (parms) => {
  return request({
    url: '/blog/about-me',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getAllAboutMe = (parms) => {
  return request({
    url: '/blog/about-me/all',
    method: 'get',
    params: parms
  })
}

// 更新标签
export const updateAboutMe = (data) => {
  return request({
    url: '/blog/about-me',
    method: 'put',
    data: data
  })
}
// 根据主键删除标签
export const deleteAboutMe = (id) => {
  return request({
    url: '/blog/about-me/' + id,
    method: 'delete'
  })
}

