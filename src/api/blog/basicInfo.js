import request from '@/utils/request'

/*
 * 基本信息管理模块
 */

// 保存基本信息
export const saveBasicInfo = (data) => {
  return request({
    url: '/blog/basic-info',
    method: 'post',
    data: data
  })
}
// 获取基本信息列表
export const getBasicInfo = (parms) => {
  return request({
    url: '/blog/basic-info',
    method: 'get',
    params: parms
  })
}

// 获取基本信息列表
export const getBasicInfoKeyValueList = (parms) => {
  return request({
    url: '/blog/basic-info/keyValueList',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getAllBasicInfo = (parms) => {
  return request({
    url: '/blog/basic-info/all',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getorderByAllBasicInfo = (parms) => {
  return request({
    url: '/blog/basic-info/orderByAll',
    method: 'get',
    params: parms
  })
}

// 更新基本信息
export const updateBasicInfo = (data) => {
  return request({
    url: '/blog/basic-info',
    method: 'put',
    data: data
  })
}
// 根据主键删除基本信息
export const deleteBasicInfo = (id) => {
  return request({
    url: '/blog/basic-info/' + id,
    method: 'delete'
  })
}

