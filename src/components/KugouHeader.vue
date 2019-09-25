<template>
  <div class="layout">
    <div class="header">
      <span :class="leftClass" @click.stop="jumps"></span>
      <h2>{{title}}</h2>
      <span class="iconfont icon-sousuo" @click.stop="jump"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "KugouHeader",
  data() {
    return {
      title: "Hot-Music",
      leftClass:"fa fa-list-ul"
    };
  },
  methods: {
    jump() {
      this.$router.push("/search");
    },
    jumps(){
      this.$router.push('/collect')
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 2.75rem;
  width: 100%;
  background-color: $kg_blue;
  color: #fff;
  line-height: 2.75rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  // overflow: hidden;
  display: flex;
  
  h2 {
    flex: 1;
    font-weight: 700;
    text-align: center;
  }
  .fa {
    width: 1rem;
    height: 2.75rem;
    margin: 0 0.5rem;

    color: #fff;
   line-height: 2.75rem;
  }
  .icon-sousuo {
    font-size: 1.375rem;
    margin-right: 0.3125rem;
  }
}
</style>