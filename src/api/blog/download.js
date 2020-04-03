import request from '@/utils/request'

/*
 * 下载管理模块
 */

// 保存下载
export const saveDownload = (data) => {
  return request({
    url: '/blog/download',
    method: 'post',
    data: data
  })
}
// 获取下载列表
export const getDownload = (parms) => {
  return request({
    url: '/blog/download',
    method: 'get',
    params: parms
  })
}

// 获取分类列表
export const getAllDownload = (parms) => {
  return request({
    url: '/blog/download/all',
    method: 'get',
    params: parms
  })
}

// 更新下载
export const updateDownload = (data) => {
  return request({
    url: '/blog/download',
    method: 'put',
    data: data
  })
}
// 根据主键删除下载
export const deleteDownload = (id) => {
  return request({
    url: '/blog/download/' + id,
    method: 'delete'
  })
}

