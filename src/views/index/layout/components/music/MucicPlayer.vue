<template>
  <div class="aplayer">
    <div
      class="mucic-contr"
      :style="{position:'fixed',left:musicCtrl.left+'px',bottom:musicCtrl.bottom+'px'} "
      @mouseover="changeActive($event)"
      @mouseout="removeActive"
    >

      <div style="float: left">
        <el-form>
          <el-form-item>
            <el-switch
              v-model="floatMusic"
              inactive-text="悬浮"
            />
          </el-form-item>
          <el-form-item>
            <el-switch
              v-model="mini"
              inactive-text="mini"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="music-ctrl-text">
        <<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>
        <br><
      </div>
    </div>
    <aplayer
      v-if="muclicViewVisiable"
      :music="musicList?musicList[0]:music"
      :list="musicList"
      list-max-height="156px"
      repeat="repeat-all"
      :show-lrc="true"
      :list-folded="true"
      :controls="true"
      :mini="mini"
      :float="floatMusic"
    >
      <!--          <div slot="display" slot-scope="props" style="font-size: 12px;" >
                      {{props.currentMusic.title}}
                      {{props.props}}
                  <a style="float: right">mini</a>
                  <a style="float: right">悬浮</a>
                </div>-->
    </aplayer>

  </div>
</template>

<script>
import axios from 'axios'
import Aplayer from 'vue-aplayer'
export default {
  name: 'MucicPlayer',
  components: {
    Aplayer
  },
  data() {
    return {

      muclicViewVisiable: false,
      floatMusic: true,
      mini: true,
      musicCtrl: {
        left: -120,
        bottom: 0
      },
      music: {
        title: 'ドラマ「アンナチュラル」',
        artist: '米津玄師',
        src: 'http://m10.music.126.net/20200328184558/e7ff69325e0908f95a0b5012fe8abf1b/ymusic/6eed/4ef2/d8ae/b85b958a70552f7e002e33d35075086c.mp3',
        pic: 'https://api.dongmanxingkong.com/suijitupian/acg/1080p/index.php'
      },
      musicList: []
    }
  },
  created() {
    // 默认添加一个音乐
    this.musicList.push(this.music)
    Aplayer.disableVersionBadge = true
  },
  async mounted() {
    // 异步加载，先加载出player再使用
    await this.getMusicList()
    const aplayer = this.$refs.player.control
    aplayer.play()
  },
  methods: {
    getMusicList() {
      const params = new URLSearchParams()
      const that = this
      axios.get('https://api.i-meto.com/meting/api?server=netease', { // 还可以直接把参数拼接在url后边
        params: {}
      }).then(function(data) {
        const res = data.data
        that.musicList.shift()
        for (let i = 0; i < res.length; i++) {
          const music = {}
          music.title = res[i].title
          music.artist = res[i].author
          music.src = res[i].url
          music.pic = res[i].pic
          music.lrc = res[i].lrc
          that.musicList.push(music)
        }
        that.muclicViewVisiable = true
      }).catch(function(error) {
        // alert('获取失败' + error)
        that.$message.warning('音乐接口已变更~')
      })
    },
    // 鼠标移入
    changeActive(e) {
      this.musicCtrl.left = 5
    },
    // 鼠标移出
    removeActive() {
      this.musicCtrl.left = -120
    }
  }
}
</script>

<style scoped>
  .aplayer{
    position: fixed;
    bottom: 20px;
    left: 0px;
  }

  .mucic-contr{
    opacity: 1;
    color: black;
    font-size: 20px;
    text-align: center;
  }

  .music-ctrl-text{
    float: right;
    margin-left: 10px;
    line-height: 30px;
    width: 30px;
  }
</style>
