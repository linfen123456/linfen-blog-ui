<template>
  <div >
    <el-row>
      <el-col :span="24" >
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

</style>
