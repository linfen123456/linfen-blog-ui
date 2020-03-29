<template>
    <div>
      <el-row>
        <el-col :span="18" :offset="2" >
          <h2>友联</h2>
          <div v-for="item in linkList" >
            <el-card class="card">
              <el-divider content-position="left"><h3>{{item.type}}</h3></el-divider>
              <ul class="dividers" >
                <li v-for="link in item.links" style="font-size: 16px;margin: 10px 0px;">
                  <el-link type="primary" :href="link.linkAddress" :underline="false"><b>{{link.name}}</b></el-link>--{{link.descriptions}}<span style="margin-left: 35px">{{link.pv}}人访问</span>
                </li>
              </ul>
            </el-card>
          </div>

        </el-col>
      </el-row>
    </div>
</template>

<script>
  import { getorderByAllLink } from '../../api/blog/link'

  export default {
    name: 'link',
    data() {
      return {
        linkList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0, // 总数量
      }
    },
    created() {
      this.getLinkList()
    },
    methods:{
      getLinkList: function() {
        const params = new URLSearchParams()
        params.append('current', this.currentPage)
        params.append('size', this.pageSize)

        getorderByAllLink(params).then(response => {
          if (response.data.code === 200) {
            this.linkList = response.data.data.records
            this.total = response.data.data.total
          } else {
            alert("数据获取失败")
          }

        })
      },
    }
  }
</script>

<style scoped>
  .dividers{
   margin: 35px 0px;
  }

  .card{
    margin: 35px 0px;
  }
</style>
