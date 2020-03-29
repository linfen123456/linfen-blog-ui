import request from '@/utils/request'

/*
 * 标签管理模块
 */

// 保存标签
export const saveLink = (data) => {
  return request({
    url: '/blog/link',
    method: 'post',
    data: data
  })
}
// 获取标签列表
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


// 更新标签
export const updateLink = (data) => {
  return request({
    url: '/blog/link',
    method: 'put',
    data: data
  })
}
// 根据主键删除标签
export const deleteLink = (id) => {
  return request({
    url: '/blog/link/' + id,
    method: 'delete'
  })
}

