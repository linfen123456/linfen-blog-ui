<template>
  <div >
    <el-row>
      <el-col :span="24" :offset="0" >
        <div style="margin: 0px auto;text-align: center">
          <!--svg显示文字-->
          <svg :height="width" :width="height" @mousemove='listener($event)'>
            <!--阴影效果-->
            <defs>
              <filter id="f1" x="0" y="0" width="200%" height="200%">
                <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
                <feColorMatrix result="matrixOut" in="offOut" type="matrix"
                               values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
                <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <!--文字-->
            <a :href="tag.href" v-for='tag in tags' filter="url(#f1)">
              <text :fill="tag.color" :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
            </a>
          </svg>
        </div>

      </el-col>
    </el-row>


    <!--标签内容-->
    <el-row >
      <el-col :span="16" :offset="4">
        <h3><i class="el-icon-collection-tag"></i>标签一</h3>
        <div v-for="item in 10" class="list-main-item">
          <el-card   shadow="hover">
            <div>
              <div class="float-left"><h4>更新 Github 模板</h4></div>
              <div class="float-right list-main-item-time">时间：2020-02-25</div>
            </div>

            <div class="list-main-item-abstracts">今天找到两个远古压缩包，密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。密码不记得了，又很想看看里面的内容，于是先写了个密码表生成器。 程序生成的是三段式密码，组合输出生成密码表。
              请原谅我早已回到解放前的 C++ 编程水平）</div>

            <div>
              <el-row class="margin-top-20">
                <el-col :span="24" >
                  <div class="list-main-item-tag">
                    <i class="el-icon-collection-tag"></i>
                    <el-tag type="success"  size="mini" effect="dark">标签</el-tag>
                    <el-tag type="success"  size="mini" effect="dark">标签</el-tag>
                    <el-tag type="success"  size="mini" effect="dark">标签</el-tag>
                  </div>
                  <div class="list-main-item-classify">
                    <i class="el-icon-folder"></i>
                    <el-tag type="warning"  size="mini" effect="dark"> 默认分类</el-tag>
                  </div>
                  <div class="list-main-item-classify">
                    <i class="el-icon-user"></i>
                    <el-tag type="danger"  size="mini" effect="dark"> 淋汾</el-tag>
                  </div>
                  <div class="list-main-item-visible">
                    <i class="el-icon-lollipop"></i> 0人围观
                  </div>
                  <div class="list-main-item-dicuss">
                    <i class="el-icon-chat-dot-round"></i> 0条评论
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'tag',
    data() {
      return{
        width:550,
        height:550,
        tagsNum:50,
        RADIUS:200,
        speedX:Math.PI/360,
        speedY:Math.PI/360,
        tags: [],
      }
    },
    computed:{
      CX(){
        return this.width/2;
      },
      CY(){
        return this.height/2;
      }
    },
    created(){//初始化标签位置
      let tags=[];
      for(let i = 0; i < this.tagsNum; i++){
        let tag = {};
        let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
        let a = Math.acos(k);
        let b = a * Math.sqrt(this.tagsNum * Math.PI);
        tag.text = i + 'tag';
        tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);
        tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b);
        tag.z = this.RADIUS * Math.cos(a);
        var cr=Math.floor(Math.random()*256);
        var cg=Math.floor(Math.random()*256);
        var cb=Math.floor(Math.random()*256);
        tag.color = "rgb("+cr+','+cg+','+cb+")";
        tag.href = 'https://imgss.github.io';
        tags.push(tag);
      }

      this.tags = tags;
    },
    mounted(){//使球开始旋转
      setInterval(() => {
        this.rotateX(this.speedX);
        this.rotateY(this.speedY);
      }, 17)
    },
    methods: {
      rotateX(angleX){
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        for(let tag of this.tags){
          var y1 = (tag.y- this.CY) * cos - tag.z * sin  + this.CY;
          var z1 = tag.z * cos + (tag.y- this.CY) * sin;
          tag.y = y1;
          tag.z = z1;
        }
      },
      rotateY(angleY){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for(let tag of this.tags){
          var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
          var z1 = tag.z * cos + (tag.x-this.CX) * sin;
          tag.x = x1;
          tag.z = z1;
        }
      },
      listener(event){//响应鼠标移动
        var x = event.clientX - this.CX;
        var y = event.clientY - this.CY;
        this.speedX = x*0.0001>0 ? Math.min(this.RADIUS*0.00002, x*0.0001) : Math.max(-this.RADIUS*0.00002, x*0.0001);
        this.speedY = y*0.0001>0 ? Math.min(this.RADIUS*0.00002, y*0.0001) : Math.max(-this.RADIUS*0.00002, y*0.0001);
      }
    }
  }
</script>

<style scoped>

  .list-main-item {
    margin-top: 20px;
  }

  /*摘要*/
  .list-main-item-abstracts {
    clear: both;
    margin: 18px 0px;
    font-size: 15px;
    color: #666666;
    line-height: 20px;
  }

  /*时间*/
  .list-main-item-time {
    margin-left: 8px;
    margin-top: 5px;
    font-size: 12px;
    font-family: 'Adobe 黑体 Std R';
  }

  /*标签*/
  .list-main-item-tag {
    float:left;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  /*分类*/
  .list-main-item-classify {
    float:left;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  /*分类*/
  .list-main-item-visible {
    float:right;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R';
  }

  /*浏览*/
  .list-main-item-visible {
    float:right;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R';
  }

  /*评论*/
  .list-main-item-dicuss {
    float:right;
    margin-left: 8px;
    font-size: 16px;
    font-family: 'Adobe 黑体 Std R'
  }

  .float-right{
    float: right;
  }

  .float-left{
    float: left;
  }
</style>
