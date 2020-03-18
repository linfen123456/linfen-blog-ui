<template>
    <div>
      <el-row>
        <el-col :span="18" :offset="2" >
          <h2>友联</h2>
          <div v-for="item in 10" >
            <el-card class="card">
              <el-divider content-position="left"><h3>后端</h3></el-divider>
              <ul class="dividers" >
                <li v-for="item in 6" style="font-size: 16px;margin: 10px 0px;">
                  <el-link type="primary" :underline="false"><b>周立|Spring Cloud</b></el-link>--一个不错的网站<span style="margin-left: 35px">12人访问</span>
                </li>
              </ul>
            </el-card>
          </div>

        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'link'
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
