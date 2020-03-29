<template>
  <div>
    <el-popover
      placement="top"
      title="摘要"
      width="200"
      trigger="hover">
      {{ text}}
      <span slot="reference">{{ textData}}{{textValue()}}</span>
    </el-popover>
  </div>

</template>

<script>
export default {
  name: 'TextThumbnail',
  data() {
    return {
      textData:''
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    lengths: {
      type: Number,
      default: 15
    },
    endStr: {
      type: String,
      default: '..'
    },
  },
  computed: {
    textValue() {
      this.textData= this.text
      if (this.text!=null&&this.text!==undefined&& this.text.length > this.lengths) {
        this.textData = this.text.substring(0, this.lengths)+this.endStr
      }

      return  this.textData
    }
  },
  watch: {
    text(newValue) {
      this.textData=newValue

    }
  },
}
</script>

<style scoped>

</style>
