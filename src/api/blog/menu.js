import request from '@/utils/request'

/*
 * 菜单管理模块
 */

// 保存
export const saveMenu = (data) => {
  return request({
    url: '/blog/menu',
    method: 'post',
    data: data
  })
}
// 删除
export const deleteMenu = (id) => {
  return request({
    url: '/blog/menu/' + id,
    method: 'delete'
  })
}
// 查找导航菜单树
export const getMenuTree = () => {
  return request({
    url: '/blog/menu',
    method: 'get'
  })
}

// 更新菜单
export function updateMenu(data) {
  return request({
    url: '/blog/menu',
    method: 'put',
    data: data
  })
}

// 获取路由
export const getIndexRouters = () => {
  return request({
    url: '/blog/menu/tree',
    method: 'get'
  })
}
