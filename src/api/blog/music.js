import request from '@/utils/request'
import axios from 'axios'

// 获取文章列表
export const getMusic = (parms) => {
    axios.get('https://api.i-meto.com/meting/api',{       // 还可以直接把参数拼接在url后边
    params:{
      server:'netease',
      type:'playlist',
      id:'35798529',
    }
  }).then(function(res){
    return  res.data;
  }).catch(function (error) {
   return [];
  });
}
