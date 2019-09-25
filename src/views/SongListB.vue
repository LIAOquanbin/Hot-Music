<template>
  <div class="songList_body">
    <div class="song_top" @click.stop="back" ref="header">
      <span class="iconfont icon-right">歌单</span>
    </div>
    <div class="menu_wrapper" ref="isMenu">
      <div class="song_menu">
        <Loading v-if="show" />
        <div v-else class="song_layput">
          <div class="top_img">
            <img :src="songList.coverImgUrl" alt />
            <div class="filter"></div>
            <div class="text">
              <h2>尽情享受!!!</h2>
              <p>{{songList.name}}</p>
            </div>
          </div>
          <div class="song_list_layout">
            <div class="song_list">
              <div class="sequence-play">
                <i class="fa fa-play"></i>
                <span class="play" @click.stop="allSong">播放全部歌曲</span>
                <span>({{songList.tracks&&songList.tracks.length}}首)</span>
              </div>
              <div class="song_list_wrapper">
                <ul>
                  <li
                    v-for="(item,index) in songList.tracks"
                    :key="index"
                    class="lists"
                    ref="aLi"
                    @click.stop="changeSong(item.id,index)"
                  >
                    <p class="num">{{index+1}}</p>
                    <div class="text">
                      <h3>{{item.al.name}}</h3>
                      <p v-for="items in item.ar" :key="items.id">{{items.name}}/</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_ID_ISCHANGE } from "../store/mutation-types";
export default {
  name: "SongListB",
  data() {
    return {
      songList: {},
      show: true,
      bool: true,
      songIds: null
    };
  },
  mounted() {
    this.axios
      .get("/playlist/detail?id=" + `${this.$route.params.id}`)
      .then(res => {
        if (res.data.code == 200) {
          this.songList = res.data.playlist;
          // console.log(res.data)
          this.songIds = res.data.playlist.trackIds;
          setTimeout(() => {
            this.show = false;
          }, 1000);
          this.$nextTick(() => {
            window.onscroll = function() {
              let header = document.querySelector(".songList_body .song_top");
              if (window.pageYOffset >= 200) {
                header.classList.add("song_bg_top");
              } else {
                header.classList.remove("song_bg_top");
              }
            };
          });
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    // initBettorScroll() {
    //   if (this.scroll) {
    //     this.scroll.refresh();
    //   } else {
    //     this.scroll = new ISBscroll(this.$refs.isMenu, { click: true });
    //   }
    // },
    changeSong(id, index) {
      this.$store.commit(ADD_ID_ISCHANGE, {
        id,
        isShow: this.bool,
        songIds: this.songIds,
        Index: index
      });
    },
    allSong() {
      this.$store.commit(ADD_ID_ISCHANGE, {
        isShow: this.bool,
        songIds: this.songIds,
        Index: 0
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.songList_body {
  position: relative;
  width: 100%;
  .song_top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.75rem;
    color: #fff;
    z-index: 100;

    span {
      color: #fff;
      font-size: 1.25rem;
      line-height: 2.75rem;
    }
  }
  .song_top.song_bg_top {
    background-color: $kg_blue;
    opacity: 0.8;
    span {
      // color: #222;
      font-size: 1.25rem;
      line-height: 2.75rem;
    }
  }
  .menu_wrapper {
    width: 100%;
    // height: 100vh;
    // overflow: hidden;
  }
  .song_menu {
    width: 100%;
    .song_layput {
      width: 100%;
    }
    .top_img {
      width: 100%;
      height: 20rem;
      position: relative;
      img {
        width: 100%;
        height: 20rem;
        // height: 100%;
      }
      .filter {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20rem;
        background: #000;
        opacity: 0.2;
      }
      .text {
        position: absolute;
        bottom: 0.625rem;
        left: 0.3125rem;
        color: #fff;
        margin-right: 0.3125rem;
        h2 {
          // width: 80%;
          font-style: italic;
          font-size: 1rem;
          letter-spacing: 0.0625rem;
          margin-bottom: 0.3125rem;
        }
        p {
          letter-spacing: 0.0625rem;
          margin-bottom: 0.3125rem;
        }
      }
    }
    .song_list_layout {
      width: 100%;
      position: absolute;
      top: 19.75rem;
    }
    .song_list {
      width: 100%;
      border-top: 0.0625rem solid #e4e4e4;
      border-top-left-radius: 0.3125rem;
      border-top-right-radius: 0.3125rem;
      z-index: 300;
      background-color: #fff;
      .sequence-play {
        // display: flex;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        padding-left: 0.3125rem;
        color: #2e3030;
        border-bottom: 0.0625rem solid #e4e4e4;
      }
      .play {
        margin: 0 0.625rem;
      }
    }
    .song_list_wrapper {
      width: 100%;
      ul {
        padding: 0 0.3125rem;
      }
      .lists {
        display: flex;
        border-bottom: 0.0625rem solid #e4e4e4;
        .num {
          flex: 0 0 3.125rem;
          width: 3.125rem;
          text-align: center;
          color: #757575;
          font-size: 1rem;
          line-height: 3.75rem;
        }
        .text {
          flex: 1;
          line-height: 1.5625rem;
          width: 80%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          h3 {
            margin-top: 0.25rem;
            color: #2e3030;
          }
          p {
            display: inline-block;
            font-size: 0.75rem;
            color: #757575;
          }
        }
      }
    }
  }
  @keyframes move {
    0% {
    }
  }
}
</style>