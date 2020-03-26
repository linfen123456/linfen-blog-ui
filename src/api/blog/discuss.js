import request from '@/utils/request'

/*
 * 标签管理模块
 */

// 保存标签
export const saveDiscuss = (data) => {
  return request({
    url: '/blog/discuss',
    method: 'post',
    data: data
  })
}


