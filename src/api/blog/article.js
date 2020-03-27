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

// 获取分页所有文章列表
export const getAllPageArticle = (parms) => {
  return request({
    url: '/blog/article/allPage',
    method: 'get',
    params: parms
  })
}

// 通过文章ID文章
export const getOneArticleById = (parms) => {
  return request({
    url: '/blog/article/oneArticleById',
    method: 'get',
    params: parms
  })
}

// 获取归档查询文章列表
export const getArticlePigeonhole = (parms) => {
  return request({
    url: '/blog/article/queryArticlePigeonhole',
    method: 'get',
    params: parms
  })
}

// 获取归档查询文章列表
export const getArticleByTagId = (parms) => {
  return request({
    url: '/blog/article/queryArticleById',
    method: 'get',
    params: parms
  })
}

export const queryArticleItemByArticleName = (articleName) => {
  return request({
    url: '/blog/article/queryArticleByName/' + articleName,
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

// 根据主键查询文章
export const getArticleById = (id) => {
  return request({
    url: '/blog/article/' + id,
    method: 'get'
  })
}

// 根据主键删除文章
export const deleteArticle = (id) => {
  return request({
    url: '/blog/article/' + id,
    method: 'delete'
  })
}

