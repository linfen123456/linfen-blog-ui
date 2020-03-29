<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="2" >
        <h2>关于</h2>
        <div>
          <el-card class="card">
            <div class="text" v-for="item in linkList">
              <b>{{item.title}}</b>
            <p v-html="item.content"></p>
            </div>
            <p v-if="!linkList">这个人很懒，什么也没有留下~</p>

          </el-card>
        </div>

        <el-col :span="24" >

          <div class="a-cup-tea">
           <div> 请我喝一杯奶茶！</div>
            <div>
              <el-image src="http://img4.imgtn.bdimg.com/it/u=3675443935,3277664425&fm=26&gp=0.jpg"></el-image>
            </div>
          </div>


        </el-col>

      </el-col>
    </el-row>
  </div>
</template>

<script>

  import { getAllAboutMe } from '@/api/blog/aboutMe'

  export default {
    name: 'about',
    data() {
      return {
        linkList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0, // 总数量
      }
    },
    created() {
      this.getAboutMeList()
    },
    methods:{
      getAboutMeList: function() {
        const params = new URLSearchParams()
        params.append('current', this.currentPage)
        params.append('size', this.pageSize)

        getAllAboutMe(params).then(response => {
          if (response.data.code === 200) {
            this.linkList = response.data.data
            this.total = response.data.data.length
          } else {

          }

        })
      },
    }
  }
</script>

<style scoped>
.text{
  font-size: 16px;
  color: black;
  line-height: 25px;
  font-family: "Adobe 宋体 Std L";
}

.a-cup-tea{
  margin: 50px auto;
  width: 100%;
  text-align: center;
  justify-content: center;
}
</style>
