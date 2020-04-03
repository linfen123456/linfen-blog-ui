import request from '@/utils/request'

/*
 * 友联管理模块
 */

// 保存友联
export const saveLink = (data) => {
  return request({
    url: '/blog/link',
    method: 'post',
    data: data
  })
}
// 获取友联列表
export const getLink = (parms) => {
  return request({
    url: '/blog/link',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getAllLink = (parms) => {
  return request({
    url: '/blog/link/all',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getorderByAllLink = (parms) => {
  return request({
    url: '/blog/link/orderByAll',
    method: 'get',
    params: parms
  })
}

// 更新友联
export const updateLink = (data) => {
  return request({
    url: '/blog/link',
    method: 'put',
    data: data
  })
}

// 更新友联
export const updateLinkVisible = (data) => {
  return request({
    url: '/blog/link/updatevisible',
    method: 'put',
    data: data
  })
}
// 根据主键删除友联
export const deleteLink = (id) => {
  return request({
    url: '/blog/link/' + id,
    method: 'delete'
  })
}

