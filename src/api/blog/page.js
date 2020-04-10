import request from '@/utils/request'

/*
 * 页面管理模块
 */

// 保存页面
export const savePage = (data) => {
  return request({
    url: '/blog/page',
    method: 'post',
    data: data
  })
}
// 获取页面列表
export const getPage = (parms) => {
  return request({
    url: '/blog/page',
    method: 'get',
    params: parms
  })
}

// 获取页面列表
export const getAllPage = (parms) => {
  return request({
    url: '/blog/page/all',
    method: 'get',
    params: parms
  })
}

// 更新页面
export const updatePage = (data) => {
  return request({
    url: '/blog/page',
    method: 'put',
    data: data
  })
}

// 根据主键查询页面
export const getPageById = (id) => {
  return request({
    url: '/blog/page/' + id,
    method: 'get'
  })
}

// 获取页面列表
export const getPageByLink = (parms) => {
  return request({
    url: '/blog/page/link',
    method: 'get',
    params: parms
  })
}

// 根据主键删除页面
export const deletePage = (id) => {
  return request({
    url: '/blog/page/' + id,
    method: 'delete'
  })
}

