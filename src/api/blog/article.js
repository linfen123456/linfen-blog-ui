import request from '@/utils/request'

/*
 * 文章管理模块
 */

// 保存文章
export const saveArticle = (data) => {
  return request({
    url: '/blog/article',
    method: 'post',
    data: data
  })
}
// 获取文章列表
export const getArticle = (parms) => {
  return request({
    url: '/blog/article',
    method: 'get',
    params: parms
  })
}

// 根据文章id获取文章详情列表
export const queryArticleItemList = (parms) => {
  return request({
    url: '/blog/article/queryArticleById',
    method: 'get',
    params: parms
  })
}
export const queryArticleItemByArticleName = (articleName) => {
  return request({
    url: '/blog/article/queryArticleItemByName/' + articleName,
    method: 'get'
  })
}

// 更新文章
export const updateArticle = (data) => {
  return request({
    url: '/blog/article',
    method: 'put',
    data: data
  })
}
// 根据主键删除文章
export const deleteArticle = (id) => {
  return request({
    url: '/blog/article/' + id,
    method: 'delete'
  })
}

