import Vue from "vue";
import Router from "vue-router";
import Newsong from "../components/Newsong";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Newsong",
      name: "Newsong",
      component: Newsong
    },
    {
      path: "/Ranking",
      name: "Ranking",
      component: () => import("../components/Ranking"),
    },
    {
      path: "/Recommend",
      name: "Recommend",
      component: () => import("../components/Recommend")
    },
    {
      path: "/SingerList",
      name: "SingerList",
      component: () => import("../components/SingerList")
    },
    {
      path: "/",
      redirect: "Newsong"
    },
    {
      path: "/songlist/1/:id",
      component: () => import("../views/SongList")
    },
    {
      path:'/songlist/2/:id',
      component: () => import("../views/SongListB")
    },
    {
      path:'/songlist/3/:id',
      component: () => import("../views/SongListC")
    },
    {
      path:'/search',
      component:()=> import("../components/Search")
    },
    {
      path:'/collect',
      component:()=> import("../views/Collect")
    }
  ],
  linkActiveClass: "link-active"
});
