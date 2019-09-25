<template>
  <div class="collect_body">
    <div class="header">
      <span class="iconfont icon-right" @click.stop="back"></span>
      <p>收藏歌曲</p>
    </div>
    <div class="msk" v-show="mskShow">
      <h1>收藏点歌曲吧！</h1>
    </div>
    <div class="newsongList">
      <ul>
        <li v-for="(items,index) in likeSong" :key="index" >
          <p class="num">{{index+1}}</p>
          <!--  -->
          <div
            class="layout"
            v-for="(song,i) in items"
            :key="i"
            @click.stop="change(songIndex)"
          >
            <h3>{{song.name}}</h3>
            <p v-for="item in song.ar" :key="item.id">{{item.name}}/</p>
          </div>
          <!-- /  -->
          <div class="player" @touchstart.stop="change(songIndex)">
            <img src="../../public/images/play_play.png" alt />
          </div>
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ADD_ID_ISCHANGE } from "../store/mutation-types";
export default {
  data() {
    return {
      likeSong: null,
      mskShow:true,
      songIndex:null,
      show:true
    };
  },
  mounted() {
 
    this.likeSong = this.$store.state.collectList;
    this.songIndex=this.$store.state.songIndex;
       console.log(this.likeSong)
    if(this.likeSong.length !== 0){
      this.mskShow=false
    }else{
      this.mskShow=true
    }
    // console.log(this.likeSong.songList);
  },
  methods: {
    back() {
      this.$router.back();
    },
    change(id) {
      this.$store.commit(ADD_ID_ISCHANGE, {
        id,
        isShow: this.show,
        // songIds: this.songIds,
        // Index: index
      });
      console.log(id, index)
      // this.urlId = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.collect_body {
  width: 100%;
  .header {
    width: 100%;
    height: 44px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $kg_blue;
    display: flex;
    z-index: 20;
    .icon-right {
      width: 16px;
      height: 44px;
      margin: 0 8px;
      color: #fff;
      line-height: 44px;
    }
    p {
      margin: 0 auto;
      transform: translateX(-16px);
      color: #fff;
      line-height: 44px;
    }
  }
  .msk {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    position: relative;
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 26px;
      color: #666;
      margin-left: -80px;
    }
  }
  .newsongList {
    width: 100%;
    border-top: 0.0625rem solid #e4e4e4;
    border-radius: 0.625rem;
    padding: 0.3125rem;
    ul {
      padding: 44px 0 0 0;
      font-size: 0.875rem;
      color: #222;

      li {
        border-bottom: 0.0625rem solid #e4e4e4;
        display: flex;
        height: 3.75rem;
        .layout {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 80%;
          flex: 1;
        }
        .player {
          width: 1.666667rem;
          height: 1.666667rem;
          border-radius: 50%;
          background-color: #666;
          opacity: 0.5;
          margin: 1.125rem 0.555556rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .num {
        flex: 0 0 3.125rem;
        width: 3.125rem;
        text-align: center;
        color: #757575;
        font-size: 1rem;
        line-height: 3.75rem;
        //  overflow: hidden;
      }
      h3 {
        margin-top: 0.625rem;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #2e3030;
      }
      .layout > p {
        font-size: 0.625rem;
        color: #666;
        display: inline-block;
        margin-top: 0.625rem;
      }
    }
  }
}
</style>