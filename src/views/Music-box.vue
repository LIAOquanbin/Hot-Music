<template>
  <div class="music-box-body">
    <!-- {{this.$store.state.songIds}} -->
    <div class="music-box" v-show="show||bool">
      <div class="music-box-layout" v-for="items in songInfo" :key="items.id">
        <div class="songImg animation" ref="Img" @touchstart.stop="isShowB">
          <img v-lazy="items.al.picUrl" alt />
        </div>
        <div class="text">
          <h2>{{items.al.name}}</h2>
          <span v-for="item in items.ar" :key="item.id">{{item.name}}/</span>
        </div>
        <div class="play_icon" @touchstart="changeImg">
          <!-- <img src="../../public/images/play_icon.png" alt ref="icon" /> -->
          <span class="fa fa-pause" ref="pause"></span>
          <span class="fa fa-play hide" ref="play"></span>
        </div>
      </div>
    </div>
    <audio
      v-for="(item,index) in song"
      :key="index"
      :src="item.url"
      autoplay="autoplay"
      ref="audio"
      @timeupdate="updatedTime"
    ></audio>
    <div class="music_msk" v-show="Show">
      <div class="background" v-for="msgs in songInfo" :key="msgs.id">
        <div class="fllter"></div>
        <img :src="msgs.al.picUrl" alt />
      </div>
      <div class="text_top" v-for="msg in songInfo" :key="msg.fee">
        <div class="left_icon">
          <i class="iconfont icon-right" @touchstart="isShow"></i>
        </div>
        <h1>{{msg.al.name}}</h1>
        <h2 v-for="items in msg.ar" :key="items.id">{{items.name}}/</h2>
      </div>
      <div class="rotate_img_layout" @click.stop="changeLyricShow" v-show="lyricsShow">
        <div class="img_wrapper animation" v-for="imgs in songInfo" :key="imgs.cd" ref="animation">
          <img alt v-lazy="imgs.al.picUrl" />
        </div>
      </div>
      <Scroll :style="{display:lyricsShow?'none':'block'}" class="lyric_wrapper" ref="lyricList">
        <div ref="lyricLine" @click="changeLyricShow">
          <div class="lyric_list">
            <p v-for="(items,k) in lyrics" :key="k">{{items.txt}}</p>
          </div>
        </div>
      </Scroll>
      <div class="progress">
        <span class="totol-time">{{current}}</span>
        <div class="btn-move" ref="btnMove">
          <div class="btn-progress" ref="btnWidth" :style="{width:left+'px'}"></div>
          <div class="bar" ref="btn"></div>
        </div>
        <span class="current-time">{{total}}</span>
      </div>
      <div class="bottom">
        <div class="fa fa-plus-circle">
 
        </div>
        <div class="fa fa-backward" @click.stop="miniIndex"></div>
        <div class="fa fa-pause" ref="icons" @touchstart.stop="changeClass"></div>
        <div class="fa fa-forward" @click.stop="addIndex"></div>
        <div :class="showHeart?'fa fa-heart':'fa fa-heart red'" @click.stop="isShowHeart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ADD_INDEX,
  REDUCE_INDEX,
  GET_INDEX,
  ADD_SONG
} from "../store/mutation-types";
import { mapMutations } from "vuex";
import Lyric from "lyric-parser";
import Scroll from "../components/scroll";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    songUrl: {
      type: Number
    },
    songImg: {
      type: String
    },
    songIds: {
      type: Array || Object
    },
    indexs: {
      type: Number
    }
  },
  data() {
    return {
      change: false,
      song: "",
      songInfo: "",
      Show: false,
      bool: false,
      nums: 1,
      songMsk: "",
      num: 0,
      time: null,
      songIdItems: {},
      total: "",
      current: "",
      left: 0,
      isNum: null,
      currents: null,
      totals: null,
      isLyric: null,
      lyric: null,
      lyrics: null,
      lyricsShow: true,
      playingLyric: null,
      currentLineNum: null,
      showHeart: true,
      index:null
    };
  },
  mounted() {},
  beforeUpdate() {},
  computed: {},
  components: {
    Scroll
  },
  methods: {
    isShowHeart() {
      if (this.showHeart) {
        this.showHeart = !this.showHeart;
        this.$store.commit("ADD_SONG", { songList: this.songInfo,index:this.index });
        console.log(this.index)
      }
    },
    changeImg() {
      // console.log(this.change);
      if (!this.change) {
        this.change = true;
        this.$refs.audio[0].pause();
        this.$refs.pause[0].classList.add("hide");
        this.$refs.play[0].classList.remove("hide");
        this.$refs.Img[0].classList.remove("animation");
        this.$refs.animation[0].classList.remove("animation");
        this.$refs.icons.classList.remove("fa-pause");
        this.$refs.icons.classList.add("fa-play");
      } else {
        this.change = false;
        this.$refs.audio[0].play();
        this.$refs.pause[0].classList.remove("hide");
        this.$refs.play[0].classList.add("hide");
        this.$refs.Img[0].classList.add("animation");
        this.$refs.animation[0].classList.add("animation");
        this.$refs.icons.classList.add("fa-pause");
        this.$refs.icons.classList.add("fa-play");
      }
    },
    isShow() {
      this.Show = false;
      this.bool = true;
    },
    isShowB() {
      this.Show = true;
      this.bool = false;
    },
    changeClass() {
      if (this.nums === 1) {
        this.$refs.icons.classList.remove("fa-pause");
        this.$refs.icons.classList.add("fa-play");
        this.$refs.animation[0].classList.remove("animation");
        this.$refs.Img[0].classList.remove("animation");
        this.$refs.pause[0].classList.add("hide");
        this.$refs.play[0].classList.remove("hide");
        this.$refs.audio[0].pause();
        this.nums = 0;
      } else {
        this.$refs.icons.classList.add("fa-pause");
        this.$refs.icons.classList.remove("fa-play");
        this.$refs.animation[0].classList.add("animation");
        this.$refs.Img[0].classList.add("animation");
        this.$refs.pause[0].classList.remove("hide");
        this.$refs.play[0].classList.add("hide");
        this.$refs.audio[0].play();
        this.nums = 1;
      }
    },

    getDuration() {},
    updatedTime(e) {
      let min = Math.floor((this.$refs.audio[0].duration % 3600) / 60);
      let sec = Math.floor(this.$refs.audio[0].duration % 60);
      sec = sec < 10 ? "0" + sec : sec;
      this.totals = this.$refs.audio[0].duration;
      this.total = min + ":" + sec;
      let mixs = Math.floor((e.target.currentTime % 3600) / 60);
      let secs = Math.floor(e.target.currentTime % 60);
      secs = secs < 10 ? "0" + secs : secs;
      this.currents = e.target.currentTime;
      this.current = mixs + ":" + secs;
      let time = this.currents / this.totals;
      this.left =
        time * (this.$refs.btnMove.offsetWidth - this.$refs.btn.offsetWidth);
      this.$refs.btn.style.left = this.left + "px";
      this.nextSong();
    },
    ...mapMutations(["ADD_INDEX", "REDUCE_INDEX", "GET_INDEX"]),
    addIndex() {
      this.$refs.icons.classList.add("fa-pause");
      this.$refs.animation[0].classList.add("animation");
      console.log(this.$store.state.newID)
      this.showHeart = !this.showHeart;
      if (this.address.indexs > this.address.songIds.length - 1) {
        this.GET_INDEX();
      } else {
        this.ADD_INDEX();
      }
    },
    miniIndex() {
      this.$refs.icons.classList.add("fa-pause");
      this.$refs.animation[0].classList.add("animation");
      this.showHeart = !this.showHeart;
      if (this.addIndex.indexs < 0) {
        this.GET_INDEX();
      } else {
        this.REDUCE_INDEX();
      }
    },
    nextSong() {
      if (this.currents == this.totals) {
        if (this.address.indexs > this.address.songIds.length - 1) {
          this.REDUCE_INDEX();
        } else {
          this.ADD_INDEX();
        }
      }
    },

    // 歌词部分
    getLyric() {
      this.isLyric = new Lyric(this.lyric, this.handleLyric);
      this.lyrics = this.isLyric.lines;
      if (this.isLyric) {
        console.log("123");
        this.isLyric.play();
        this.currentLineNum = 0;
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > 7) {
        // 结合better-scroll，滚动歌词
        let lineEl = this.$refs.lyricLine[lineNum - 7];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
      console.log(this.playingLyric);
    },
    changeLyricShow() {
      this.lyricsShow = !this.lyricsShow;
      console.log(this.lyricsShow);
    }
  },
  computed: {
    address() {
      const { songIds, indexs } = this;
      return {
        songIds,
        indexs
      };
    }
  },
  watch: {
    address(newVal, oldVal) {
      if (newVal) {
        this.axios
          .get("/song/url?id=" + `${newVal.songIds[newVal.indexs].id}`)
          .then(res => {
            this.song = res.data.data;
            // this.index=newVal.songIds[newVal.indexs].id
            // console.log(this.index)
          });
        this.axios
          .get("/song/detail?ids=" + `${newVal.songIds[newVal.indexs].id}`)
          .then(res => {
            this.songInfo = res.data.songs;
            // console.log(this.songInfo)
            this.songMsk = res.data.songs;
          });
        this.axios
          .get("/lyric?id=" + `${newVal.songIds[newVal.indexs].id}`)
          .then(res => {
            this.lyric = res.data.lrc.lyric;
            this.getLyric();
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.music-box-body {
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  z-index: 10000;
  .music-box {
    width: 100%;
    height: 3.333333rem;
    background-color: #666;
    .music-box-layout {
      position: relative;
      display: flex;
    }
    .songImg {
      flex: 0 0 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      margin: 0.375rem 0.625rem;
      vertical-align: middle;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
      }
    }
    .text {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      h2 {
        margin-bottom: 0.125rem;
        line-height: 0.875rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.875rem;
        color: #fff;
        margin-top: 0.555556rem;
      }
      > span {
        display: inline-block;
        font-size: 0.625rem;
        color: #fff;
      }
    }
    .play_icon {
      width: 1.875rem;
      height: 1.875rem;
      border: 0.125rem solid #fff;
      border-radius: 50%;
      text-align: center;
      margin: 0.75rem 0.625rem;
      color: #fff;
      position: relative;
      span {
        position: absolute;
        top: 0.3125rem;
        left: 0.4rem;
        &.hide {
          display: none;
        }
      }
    }
  }
  .music_msk {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 150;
    background: #222;
    .background {
      position: absolute;
      left: -50%;
      right: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      -webkit-filter: blur(1.875rem);
      filter: blur(1.875rem);
    }
    img {
      width: 100%;
      height: 100%;
    }
    .text_top {
      position: relative;
      margin-bottom: 1.5625rem;
      text-align: center;
      .left_icon {
        position: absolute;
        top: 0;
        left: 0.375rem;
        z-index: 56;
        i {
          display: block;
          padding: 0.3125rem 0.5625rem;
          font-size: 1.25rem;
          color: #fff;
        }
      }
      h1 {
        // text-align: center;
        width: 70%;
        margin: 0.3125rem auto;
        line-height: 1.25rem;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #f1f1f1;
        font-size: 0.875rem;
        font-weight: 500;
      }
      h2 {
        // text-align: center;
        display: inline-block;
        // width: 70%;
        margin: 0 auto;
        line-height: 1.25rem;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #f1f1f1;
        font-size: 0.75rem;
      }
    }
    .rotate_img_layout {
      width: 100%;
      margin-top: 25%;
      .img_wrapper {
        width: 15.625rem;
        height: 15.625rem;
        margin: 0 auto;
        border: 1.25rem solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        img {
          width: 13.125rem;
          height: 13.125rem;
          border-radius: 50%;
        }
      }
    }
    .lyric_wrapper {
      padding: 0 0.555556rem;
      width: 100%;
      position: fixed;
      top: 60px;
      left: 0;
      .lyric_list {
        width: 100%;
        height: 24rem;
        overflow: hidden;
      }
      p {
        text-align: center;
        margin-top: 1rem;
        color: #fff;
      }
    }
    .progress {
      width: 100%;
      height: 1.875rem;
      position: fixed;
      bottom: 4.875rem;
      padding: 0 3.125rem;
      .totol-time {
        position: absolute;
        left: 1rem;
        top: -0.1875rem;
        color: #fff;
        font-size: 0.75rem;
      }
      .current-time {
        position: absolute;
        right: 1rem;
        top: -0.1875rem;
        color: #fff;
        font-size: 0.75rem;
      }
      .btn-move {
        position: relative;
        top: 0rem;
        height: 0.25rem;
        background: rgba(0, 0, 0, 0.3);
        .btn-progress {
          // width: 0;
          position: relative;
          top: 0rem;
          height: 100%;

          background-color: $kg_blue;
        }
        .bar {
          position: absolute;
          top: -0.375rem;
          left: -0.3125rem;
          width: 1rem;
          height: 1rem;
          border: 0.3125rem solid #f1f1f1;
          border-radius: 50%;
          background: $kg_blue;
        }
      }
    }
    .bottom {
      position: fixed;
      bottom: 3.125rem;
      width: 100%;
      font-size: 1.25rem;
      text-align: center;
      color: #fff;

      > div {
        font-size: 1.5rem;
        margin: 0 0.5rem;
      }
      .red {
        color: red;
      }
    }
  }
}
.animation {
  animation: 8s move linear infinite;
}
@keyframes move {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>