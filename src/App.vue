<template>
  <div id="app">
    <!-- {{this.$store.state.songIds}} -->
    <MusicBox :show="this.$store.state.newShow" :songUrl="this.$store.state.newID" :songIds="this.$store.state.songIds" :indexs="this.$store.state.index"/>
    <router-view />
  </div>
</template>
<script>
import MusicBox from './views/Music-box'
export default {
  components:{
   MusicBox
  }
};
</script>
<style>
/* #app{
  /* max-width: 960px; */
/* } */ 
</style>
