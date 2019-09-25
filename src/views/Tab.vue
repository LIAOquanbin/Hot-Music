<template>
  <div class="tab_laytou">
      <KugouHeader/>
    <ul>
      <router-link to="/Newsong" tag="li">新歌</router-link>
      <router-link to="/Ranking" tag="li">排行</router-link>
      <router-link to="/Recommend" tag="li">推荐</router-link>
      <router-link to="/SingerList" tag="li">歌手</router-link>
    </ul>
    <!-- <router-view></router-view> -->
      <router-view></router-view>
  </div>
</template>

<script>
import KugouHeader from '../components/KugouHeader'
export default {
    components:{
        KugouHeader
    }
};
</script>

<style lang="scss" scoped>
.tab_laytou{
    width: 100%;
    // margin-top: 2.75rem;
    position: fixed;
    top:2.75rem;
    left: 0;
    z-index: 20;
      background-color: #fff;
    ul{
        display: flex;
        height: 2.5rem;
        line-height: 2.5rem;
        padding: 0 0.25rem;
        li{
          text-align: center;
            flex: 1;
            font-size: 0.875rem;
            color:#666;
        }
        li.link-active{
          border-bottom: 0.1875rem solid $kg_blue;
        }
    }
}
</style>