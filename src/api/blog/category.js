import request from '@/utils/request'

/*
 * 分类管理模块
 */

// 保存分类
export const saveCategory = (data) => {
  return request({
    url: '/blog/category',
    method: 'post',
    data: data
  })
}
// 获取分类列表
export const getCategory = (parms) => {
  return request({
    url: '/blog/category',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getAllCategory = (parms) => {
  return request({
    url: '/blog/category/all',
    method: 'get',
    params: parms
  })
}

// 更新分类
export const updateCategory = (data) => {
  return request({
    url: '/blog/category',
    method: 'put',
    data: data
  })
}
// 根据主键删除分类
export const deleteCategory = (id) => {
  return request({
    url: '/blog/category/' + id,
    method: 'delete'
  })
}

