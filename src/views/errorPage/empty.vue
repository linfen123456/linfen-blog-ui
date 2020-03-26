<template>
  <div class="errPage-container">
    <img :src="empty">
    <div>什么也没有？</div>
  </div>
</template>

<script>
  import empty from '@/assets/empty/empty.svg'
  export default {
    name: 'empty',
    data() {
      return{
        empty: empty
      }
    }
  }
</script>

<style scoped>
.errPage-container{
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
}
</style>
