<template>
  <div class="search_body">
    <div class="search_layout">
      <div class="search_header">
        <!-- {{this.$store.state.hostName}} -->
        <span class="iconfont icon-right" @click.stop="back" ref="inp"></span>
        <div class="search_box">
          <input type="text" v-model="hostName" placeholder="搜索你喜欢的..." ref="inp" value />
        </div>
        <i class="icon" v-show="show" @click.stop="goBack">x</i>
      </div>
      <div class="search_host_layout" v-show="change">
        <div class="search_host">
          <p class="title">热门搜索</p>
          <span
            class="items"
            v-for="(items,index) in hostList"
            :key="index"
            @click.stop="jump(items.first)"
          >{{items.first}}</span>
        </div>
      </div>
      <div class="search_suggest" v-show="show">
        <div class="menu" ref="menu">
          <div class="better">
            <p class="title">最佳匹配</p>
            <div class="suggest-item" v-for="(items,i) in singer" :key="i" @click.stop='jumpSinger(items.id)'>
              <img :key="i" v-lazy="items.picUrl" alt />
              <span>歌手:{{items.name}}</span>
            </div>
            <div class="suggest-item" v-for="item in songSheet" :key="item.id" @click.stop="jumpSong(item.id)">
              <img v-lazy="item.coverImgUrl" alt />
              <div class="text">
                <p class="song">歌单:{{item.name}}</p>
                <p class="singer" v-for="(items,j) in singer" :key="j">{{items.name}}</p>
              </div>
            </div>
            <ul class="songList">
              <li
                v-for="(items,index) in songList"
                :key="index"
                @click.stop="changeSong(index)"
              >
                <div class="name">
                  <p class="song">{{items.name}}</p>
                  <p class="singer" v-for="(item,i) in items.artists" :key="i">{{item.name}}/</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ADD_HOST_NAME } from "../store/mutation-types";
import { ADD_ID_ISCHANGE } from "../store/mutation-types";
import Bscroll from "better-scroll";
export default {
  name: "Search",
  data() {
    return {
      show: false,
      hostList: {},
      hostName: "",
      srearchList: {},
      songList: {},
      change: true,
      bool: true,
      singer: [],
      songSheet: [],
      songIds:null
    };
  },
  mounted() {
    this.axios.get("/search/hot").then(res => {
      if (res.data.code == 200) {
        this.hostList = res.data.result.hots;
        //   console.log(this.hostList)
      }
    });
  },
  watch: {
    hostName(newValue, oldValue) {
      if (!this.hostName == "") {
        this.show = true;
        this.change = false;
        this.axios.get("/search?keywords= " + `${newValue}`).then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.result.songs);
            this.songList = res.data.result.songs;
            this.songIds=res.data.result.songs;
          }
          this.$nextTick(() => {
            this.initBetterScroll();
          });
        });
        this.axios
          .get("/search/suggest?keywords=" + `${newValue}`)
          .then(res => {
            if (res.data.code == 200) {
              var data = res.data.result.albums;
              var datas = res.data.result.playlists;
              var { singers } = this.getData(data);
              var { songSheets } = this.getDatas(datas);
              this.singer = singers;
              this.songSheet = songSheets;
              // console.log( this.songSheet);
            }
          });
      } else {
        this.show = false;
        this.change = true;
        // return;
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    jump(name) {
      //   this.$store.commit(ADD_HOST_NAME, name);
      //   window.localStorage.setItem("name", name);
      this.show = true;
      this.change = false;
      this.hostName = name;
    },
    goBack() {
      console.log(this.$refs.inp.value);
      this.hostName = "";
      this.show = false;
      this.change = true;
    },
    changeSong(index) {
      this.$store.commit(ADD_ID_ISCHANGE, {
        isShow: this.bool,
        songIds: this.songIds,
        Index: index
      });
    },
    initBetterScroll() {
      if (this.scroll) {
        this.scroll.refresh();
      } else {
        this.scroll = new Bscroll(this.$refs.menu, { click: true });
      }
    },
    getData(data) {
      var singers = [];

      if (data[0].artist.length !== 0) {
        singers.push(data[0].artist);
      }

      return { singers };
    },
    getDatas(data) {
      var songSheets = [];
      if (data[0].lenght !== 0) {
        songSheets.push(data[0]);
      }
      return {
        songSheets
      };
    },
    jumpSinger(id){
      this.$router.push("/songlist/3/" + `${id}`)
    },
    jumpSong(id){
      this.$router.push("songlist/2/" + `${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.search_body {
  width: 100%;
  .search_layout {
    width: 100%;
  }
  .search_header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 2.75rem;
    background-color: $kg_blue;
    .icon-right {
      color: #fff;
      font-size: 1.25rem;
      line-height: 2.75rem;
    }
    .search_box {
      width: 80%;
      display: inline-block;
      vertical-align: middle;
      margin-left: 0.625rem;
      height: 1.5625rem;
      border-bottom: 0.0625rem solid #ebebeb;
      input {
        width: 100%;
        color: #fff;
        font-size: 0.875rem;
        padding: 0rem 0.25rem;
        border: none;
        outline: medium;
        background-color: $kg_blue;
      }
    }
    .icon {
      font-size: 1.25rem;
      color: #fff;
      margin-left: 0.625rem;
    }
  }
  .search_host_layout {
    width: 100%;
    margin-top: 2.75rem;
  }
  .search_host {
    margin: 0 1.25rem;
    p {
      padding: 0.9375rem 0.3125rem 0;
      height: 1.875rem;
      line-height: 1.875rem;
      font-size: 0.75rem;
      color: #666;
      margin-bottom: 0.625rem;
    }
    span {
      display: inline-block;
      padding: 0.1875rem 0.3125rem;
      color: #666;
      border: 0.05rem solid #666;
      border-radius: 0.3125rem;
      font-size: 0.875rem;
      margin: 0.3125rem 0.3125rem;
      line-height: 1.25rem;
    }
  }
  .search_suggest {
    margin-top: 2.875rem;
    // padding-bottom: 1.875rem;
    width: 100%;
    .suggest-item {
      display: flex;
      border-bottom: 0.0625rem solid #e4e4e4;
      align-items: center;
      height: 3.75rem;
      padding-left: 1.25rem;
      img {
        flex: 0 0 4.0625rem;
        width: 4.0625rem;
        height: 3.125rem;
        padding-right: 0.9375rem;
      }
      .text {
        font-size: 1rem;
        .singer {
          display: inline-block;
          font-size: 0.75rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.25rem;
        }
      }
    }
    .menu {
      height: 100vh;
      overflow: hidden;
    }
    .title {
      padding-left: 1.25rem;
      color: $kg_blue;
      margin: 0.3125rem 0;
    }
    .better {
      padding-bottom: 1.25rem;
    }
    .songList {
      width: 100%;
      border-top: 0.0625rem solid #e4e4e4;

      li {
        padding: 0 1.25rem;
        height: 3.75rem;
        border-bottom: 0.0625rem solid #e4e4e4;

        .name {
          width: 100%;
          height: 2.75rem;
          overflow: hidden;
        }
        .song {
          font-size: 1rem;
          color: #2e3030;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.75rem;
          // display: inline-block;
        }
        .singer {
          display: inline-block;
          font-size: 0.75rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.25rem;
        }
      }
    }
  }
}
</style>