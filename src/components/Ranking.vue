<template>
  <div class="ranking_body">
    <Tab />
    <div class="ranking_layout" ref="menus">
      <Loading v-if="show" />
      <div v-else class="ranking_menu">
        <ul>
          <li class="title">官方榜</li>
          <li
            class="items"
            v-for="(item, index) in songDetail"
            :key="index"
            @click.stop="jump(item.idx)"
          >
            <div class="left_img">
              <span class="text">{{item.updateFrequency}}</span>
              <img :src="item.coverImgUrl" alt />
            </div>
            <ul class="right_songList">
              <li class="song" v-for="items in item.tracks" :key="items.id">
                <span>{{items.first}}</span>-
                <span>{{items.second}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="new_list">
           <li class="title">全球榜</li>
           <li v-for="(items,i) in songImg" :key="i" class="items" @click.stop="jump(items.idx)">
            <div class="item_img">
              <span class="text">{{items.updateFrequency}}</span>
              <img :src="items.coverImgUrl" alt />
            </div>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscrolls from "better-scroll";
import Tab from "../views/Tab";
export default {
  components: {
    Tab
  },
  data() {
    return {
      songDetail: [
        {
          coverImgUrl:
            "http://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg",
          updateFrequency: "每天更新",
          name: "云音乐飙升榜",
          idx: 3,
          id: 19723756,
          tracks: [
            {
              first: "引路的风筝",
              second: "张韶涵"
            },
            {
              first: "Wanted",
              second: "OneRepublic"
            },
            {
              first: "几十亿份的孤单",
              second: "茶茶"
            }
          ]
        },
        {
          updateFrequency: "每天更新",
          coverImgUrl:
            "http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg",
          name: "云音乐新歌榜",
          id: 3779629,
          idx: 0,
          tracks: [
            {
              first: "这一生关于你的风景",
              second: "隔壁老樊"
            },
            {
              first: "不得不爱",
              second: "Lambert"
            },
            {
              first: "迷人的危险",
              second: "尚士达"
            }
          ]
        },
        {
          updateFrequency: "每周四更新",
          coverImgUrl:
            "http://p2.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg",
          name: "网易原创歌曲榜",
          id: 2884035,
          idx: 2,
          tracks: [
            {
              first: "剃须刀",
              second: "沈以诚"
            },
            {
              first: "π",
              second: "孟子坤"
            },
            {
              first: "刺猬",
              second: "陈鸿宇"
            }
          ]
        },
        {
          updateFrequency: "每周四更新",
          coverImgUrl:
            "http://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg",
          name: "云音乐热歌榜",
          id: 3778678,
          idx: 1,
          tracks: [
            {
              first: "芒种",
              second: "音阙诗听/赵方婧"
            },
            {
              first: "山楂树之恋",
              second: "程佳佳"
            },
            {
              first: "野狼disco",
              second: "宝石gem"
            }
          ]
        }
      ],
      songImg: [
        {
          updateFrequency: "每周五更新",
          coverImgUrl:
            "http://p2.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg",
          name: "云音乐电音榜",
          id: 1978921795,
          idx: 4
        },
        {
          updateFrequency: "每周四更新",
          coverImgUrl:
            "http://p2.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg",
          name: "云音乐ACG音乐榜",
          id: 71385702,
          idx: 22
        },
        {
          updateFrequency: "每周一更新",
          coverImgUrl:
            "http://p2.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg",
          name: "UK排行榜周榜",
          id: 180106,
          idx: 5
        },
        {
          updateFrequency: "每周四更新",
          coverImgUrl:
            "http://p2.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg",
          name: "美国Billboard周榜",
          id: 60198,
          idx: 6
        },
        {
          updateFrequency: "每周三更新",
          coverImgUrl:
            "http://p2.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg",
          name: "日本Oricon周榜",
          id: 60131,
          idx: 10
        },
        {
          updateFrequency: "每周一更新",
          coverImgUrl:
            "http://p2.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg",
          name: "台湾Hito排行榜",
          id: 112463,
          idx: 20
        }
      ],
      show: true
    };
  },
  mounted() {
    this.axios.get("/toplist/detail").then(res => {
      if (res.data.code == 200) {
        var Data = res.data.list;
        // this.songDetail = Data;
        // console.log(this.songDetail);
        // var { songData } = this.getData(Data);
        // this.songDetail = songData;
        // this.songImg = songImg;
        // console.log(this.songDetail)
        setTimeout(() => {
          this.show = false;
        }, 1000);
        this.$nextTick(() => {
          setTimeout(() => {
            this.initBetterScroll();
          }, 1500);
        });
      }
    });
  },
  methods: {
    initBetterScroll() {
      if (this.scroll) {
        this.scroll.refresh();
      } else {
        this.scroll = new Bscrolls(this.$refs.menus, { click: true });
      }
    },
    jump(index) {
      this.$router.push("songlist/1/" + `${index}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.ranking_body {
  width: 100%;
  .ranking_layout {
    height: 100vh;
    // overflow: hidden;
    .ranking_menu {
      width: 100%;
      padding: 5.375rem 0.3125rem 0rem 0.3125rem;
      > ul {
        width: 100%;
      }
      .new_list {
        width: 100%;
        // text-align: center;
        .items {
          width: 31%;
          margin-right: 0.4375rem;
          text-align: center;
          display: inline-block;
          position: relative;
          color: #fff;
          font-size: 0.75rem;
          &:first-child {
            margin-left: 0;
          }
          img {
            width: 6.25rem;
            height: 6.25rem;
          }
          .text {
            position: absolute;
            bottom: 0.625rem;
            right: 0.3125rem;
          }
        }
      }
      .title {
        margin: 0.25rem;
        font-size: 1rem;
        color: #666;

        &::before {
          content: "";
          display: inline-block;
          vertical-align: bottom;
          margin-right: 0.25rem;
          width: 0.375rem;
          height: 0.875rem;
          background-color: $kg_blue;
        }
      }
      .items {
        display: flex;
        width: 100%;
        margin-bottom: 0.3125rem;
        border-bottom: 0.0625rem solid #e4e4e4;
        padding-bottom: 0.25rem;
        &:last-child {
          border-bottom: 0rem solid #e4e4e4;
          padding-bottom: 0rem;
        }
        .left_img {
          flex: 0 0 6.25rem;
          width: 6.25rem;
          height: 6.25rem;
          position: relative;
          color: #fff;
          font-size: 0.75rem;
          .text {
            position: absolute;
            bottom: 0.3125rem;
            right: 0.3125rem;
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.3125rem;
        }
        .right_songList {
          flex: 1;
          flex-direction: column;
          justify-content: center;
          padding: 0 0.625rem;
          color: #2e3030;
          font-size: 0.75rem;
          .song {
            line-height: 2.125rem;
          }
        }
      }
    }
  }
}
</style>