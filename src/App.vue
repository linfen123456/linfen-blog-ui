<template>

    <div id="app">

      <router-view />
      <mucic-player />
      <keep-alive>

      </keep-alive>

    </div>


</template>

<script>



import MucicPlayer from '@/views/index/layout/components/music/MucicPlayer'

export default {
  name: 'App',
  components: {
    MucicPlayer,
  },

}
</script>

<style scoped>

</style>
