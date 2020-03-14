import request from '@/utils/request'

/*
 * 标签管理模块
 */

// 保存标签
export const saveTag = (data) => {
  return request({
    url: '/blog/tag',
    method: 'post',
    data: data
  })
}
// 获取标签列表
export const getTag = (parms) => {
  return request({
    url: '/blog/tag',
    method: 'get',
    params: parms
  })
}

// 更新标签
export const updateTag = (data) => {
  return request({
    url: '/blog/tag',
    method: 'put',
    data: data
  })
}
// 根据主键删除标签
export const deleteTag = (id) => {
  return request({
    url: '/blog/tag/' + id,
    method: 'delete'
  })
}

