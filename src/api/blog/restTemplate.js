import request from '@/utils/request'
// 获取下载列表
export const getIamge = (parms) => {
  return request({
    url: '/restTemplate/image',
    method: 'get',
    params: parms
  })
}
