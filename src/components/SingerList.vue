<template>
  <div>
    <Header />
    <Tab />
    <div class="singer_body">
      <div class="singer_layout" ref="menu">
        <Loading v-if="show" />
        <ul v-else class="ul_items">
          <li class="list_wrapper">
            <div class="title">
              <h2>热门歌手</h2>
            </div>

            <ul>
              <li
                v-for="(items,index) in singerList"
                :key="index"
                class="list"
                @click.stop="jump(items.id)"
              >
                <img v-lazy="items.picUrl" alt />
                <span>{{items.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/KugouHeader";
import Tab from "../views/Tab";
import Bscroll from "better-scroll";
export default {
  name: "SingerList",
  data() {
    return {
      singerList: {},
      show: true
    };
  },
  components: {
    Header,
    Tab
  },
  mounted() {
    this.axios.get("/toplist/artist").then(res => {
      if (res.data.code == 200) {
        this.singerList = res.data.list.artists;
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
        this.scroll = new Bscroll(this.$refs.menu, { click: "true" });
      }
    },
    jump(id) {
      this.$router.push("/songlist/3/" + `${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.singer_body {
  width: 100%;
  .singer_layout {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .ul_items {
      padding: 5.25rem 0.3125rem 2.5rem 0.3125rem;
    }
    .list_wrapper {
      width: 100%;
      .list {
        display: flex;
        align-items: center;
        margin-bottom: 0.3125rem;
        padding: 0.3125rem 0;
        border-bottom: 0.0625rem solid #e4e4e4;
        img {
          width: 3.125rem;
          height: 3.125rem;
          border-radius: 0.1875rem;
        }
        span {
          margin-left: 1.25rem;
          font-size: 0.875rem;
          color: #666;
          // line-height: 3.875rem;
          display: inline-block;
          vertical-align: top;
        }
      }
    }
    .title {
      width: 100%;
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
  }
}
</style>