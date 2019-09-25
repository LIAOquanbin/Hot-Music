<template>
  <div id="newsong_body">
    <Tab />

    <div class="box">
      <div class="menu" ref="menu">
        <div class="newsong_layout">
          <Loading v-if="bool" />
          <div v-else class="banner">
            <mt-swipe>
              <mt-swipe-item v-for="(item,index) in banner" :key="index">
                <div class="img_layout">
                  <img :src="item.imageUrl" alt />
                </div>
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="title">
            <h2>最新歌曲</h2>
          </div>
          <div class="newsongList">
            <ul>
              <li v-for="(item,index) in newsongList" :key="index">
                <p class="num">{{index+1}}</p>
                <div class="layout" @click.stop="change(item.id,index)">
                  <h3>{{item.name}}</h3>
                  <p v-for="items in item.ar" :key="items.id">{{items.name}}/</p>
                </div>
                <div class="player" @touchstart.stop="change(item.id)">
                  <img src="../../public/images/play_play.png" alt />
                </div>
                <i></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- <keep-alive>
        <MusiBox :show="show" :songUrl="urlId" />
    </keep-alive>-->

    <!-- <div class="btn" @click.stop="isChange">
      <img src="../../public/images/to_top.png" alt ref="icon" />
    </div>-->
  </div>
</template>

<script>
import Tab from "../views/Tab";
import Bscroll from "better-scroll";
import { ADD_ID_ISCHANGE } from "../store/mutation-types";
export default {
  name: "Newsong",
  data() {
    return {
      newsongList: {},
      banner: {},
      Song: "",
      show: true,
      urlId: null,
      bool: true,
      songIds:null
    };
  },
  components: {
    Tab
  
  },
  created() {},
  mounted() {
    this.axios.get("/banner").then(res => {
      if (res.status === 200) {
        this.banner = res.data.banners;
        setTimeout(() => {
          this.bool = false;
        }, 1000);
      }
    });
    this.axios.get("/top/list?idx=0").then(item => {
      if (item.status === 200) {
        var data=item.data.playlist.tracks;
        this.newsongList = data;
        this.songIds=data
        this.$nextTick(() => {
         this.initBetterScroll()
        });
      }
    });
  },
  methods: {
    change(id,index) {
      this.$store.commit(ADD_ID_ISCHANGE, { id, isShow: this.show,songIds:this.songIds,Index:index});
      this.urlId = id;
 
    },
    initBetterScroll() {
      if (this.scroll) {
        this.scroll.refresh();
      } else {
         this.scroll = new Bscroll(this.$refs.menu, { click: true });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#newsong_body {
  margin-top: 5.25rem;
  width: 100%;
  .menu {
    height: 100vh;
    overflow: hidden;
  }
  .newsong_layout {
    width: 100%;
    position: relative;
    padding-bottom: 4.444444rem;
    .banner {
      width: 100%;
      height: 7.5rem;
      padding: 0.25rem;
      .img_layout {
        width: 100%;
        height: 7.5rem;
        // height: .555556rem
      }
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .mint-swipe-indicator {
        // background-color: $kg_blue;
        height: 0.555556rem;
      }
    }
    .title {
      width: 100%;
      //
      padding: 0.375rem 0;
      color: #666;
      font-size: 0.875rem;
      &::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin-left: 0.25rem;
        width: 0.375rem;
        height: 0.875rem;
        background-color: $kg_blue;
      }
      h2 {
        vertical-align: middle;
        margin-left: 0.25rem;
        display: inline-block;
      }
    }
    .newsongList {
      width: 100%;
      border-top: 0.0625rem solid #e4e4e4;
      border-radius: 0.625rem;
      padding: 0.3125rem;
      ul {
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
  .btn {
    position: fixed;
    right: 0.5556rem;
    top: 22.222222rem;
    width: 2.7778rem;
    height: 2.7778rem;
    border-radius: 50%;
    background-color: #666;
    opacity: 0.5;
    padding: 2px;
    img {
      width: 100%;
      height: 100%;
      transition: 1s ease;
      transition-property: transform;
      border: 1px solid #fff;
      border-radius: 50%;
    }
  }
}
</style>