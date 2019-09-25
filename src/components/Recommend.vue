<template>
  <div class="song_body">
    <Header />
    <Tab />
    <div class="song_wrapper" ref="isMenu">
      <Loading v-if="show" />
      <div v-else class="scroll">
        <div class="song_layout">
          <div class="title">
            <h2>推荐歌单</h2>
          </div>
          <ul class="song_list">
            <li v-for="(items,index) in songList" :key="index" @click.stop="jump(items.id)">
              <div class="icon">
                <img v-lazy="items.picUrl" alt />
              </div>
              <div class="play-count">
                <i class="fa fa-headphones" >{{items.playCount}}</i>
              </div>
              <div class="text">
                <p>{{items.name}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/KugouHeader";
import Tab from "../views/Tab";
import ISBscroll from "better-scroll";
export default {
  name: "Recommend",
  data() {
    return {
      songList: {},
      num: null,
      isShow: true,
      show: true
    };
  },
  components: {
    Header,
    Tab
  },
  mounted() {
    this.axios.get("/personalized").then(res => {
      if (res.data.code == 200) {
        let data = res.data.result;
        this.songList = data;
        setTimeout(() => {
          this.show = false;
        }, 1000);
        var { num } = this.getData(data);
        this.$nextTick(() => {
          setTimeout(() => {
            this.initBettorScroll();
          }, 1500);
        });
      }
    });
  },
  methods: {
    getData(data) {
      var num = [];
      for (var i = 0; i < data.length; i++) {
        data[i].playCount = Math.round((data[i].playCount / 10000) * 100) / 100;
        data[i].playCount = data[i].playCount + "万";
        num.push(data[i].playCount);
       
      }
       return { num };
    },
    initBettorScroll() {
      if (this.scroll) {
        this.scroll.refresh();
      } else {
        this.scroll = new ISBscroll(this.$refs.isMenu, { click: true });
      }
    },
    jump(id) {
      this.$router.push("songlist/2/" + `${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.song_body {
  width: 100%;
  .song_wrapper {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .song_layout {
      width: 100%;
        padding: 5.25rem 0.3125rem 2.5rem 0.3125rem;
    }
    .title {
      width: 100%;
      // padding: 0.375rem 0;
      color: #666;
      font-size: 0.875rem;
      h2 {
        vertical-align: middle;
        margin-left: 0.25rem;
        display: inline-block;
        &::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: 0.25rem;
          width: 0.375rem;
          height: 0.875rem;
          background-color: #2ca2f9;
        }
      }
    }
    .song_list {
      width: 100%;
      margin-top: 0.3125rem;
      li {
        width: 33%;
        position: relative;
        display: inline-block;
        vertical-align: top;
        padding: 0 1%;
      }
      .icon {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3125rem;
        }
      }
      .play-count {
        position: absolute;
        top: 0.3125rem;
        right: 0.5rem;
        font-size: 0.625rem;
        color: #f1f1f1;
        i {
          display: inline-block;
          font: normal normal normal 0.875rem/1 FontAwesome;
          font-size: inherit;
          text-rendering: auto;
        }
      }
      .text {
        text-align: left;
        height: 40px;
        line-height: 1rem;
        overflow: hidden;
        margin-bottom: 0.625rem;
        font-size: 0.6875rem;
        color: #666;
        p {
          height: 2.1875rem;
          text-overflow: ellipsis;
          overflow: hidden;
          // white-space: nowrap;
        }
      }
    }
  }
}
</style>