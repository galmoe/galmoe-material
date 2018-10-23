import Vue from 'vue'
import Router from 'vue-router'
import counter from '@/components/counter'

Vue.use(Router)

// page
const Home = () => import(/* webpackChunkName: "Home" */ './views/Home.vue')
const About = () => import(/* webpackChunkName: "About" */ './views/About.vue')
const Article = () => import(/* webpackChunkName: "Article" */ './views/Article.vue')
const User = () => import(/* webpackChunkName: "User" */ './views/User.vue')
const Notification = () => import(/* webpackChunkName: "User" */ './views/Notification.vue')
const Setting = () => import(/* webpackChunkName: "Setting" */ './views/Setting.vue')
const Publish = () => import(/* webpackChunkName: "Publish" */ './views/Publish.vue')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ './views/404.vue')

// user
const uHome = () => import(/* webpackChunkName: "user" */ '@/components/user/home')
const uPost = () => import(/* webpackChunkName: "user" */ '@/components/user/post')
const fav = () => import(/* webpackChunkName: "user" */ '@/components/user/fav')
// const notification = () => import(/* webpackChunkName: "notification" */ '@/components/user/notification')
// const comment = () => import(/* webpackChunkName: "comment" */ '@/components/user/comment')
const following = () => import(/* webpackChunkName: "user" */ '@/components/user/following')
const follower = () => import(/* webpackChunkName: "user" */ '@/components/user/follower')
const uAbout = () => import(/* webpackChunkName: "user" */ '@/components/user/about')

// notification
const resent = () => import(/* webpackChunkName: "user" */ '@/components/notification/resent')
const system = () => import(/* webpackChunkName: "user" */ '@/components/notification/system')

// setting
const account = () => import(/* webpackChunkName: "setting" */ '@/components/setting/account')
const safety = () => import(/* webpackChunkName: "setting" */ '@/components/setting/safety')
const privacy = () => import(/* webpackChunkName: "setting" */ '@/components/setting/privacy')
const record = () => import(/* webpackChunkName: "setting" */ '@/components/setting/record')

// publish
const publish = () => import(/* webpackChunkName: "publish" */ '@/components/publish/publish')
const manager = () => import(/* webpackChunkName: "publish" */ '@/components/publish/manager')

// others
const upload = () => import(/* webpackChunkName: "upload" */ '@/components/upload')

// admin
const Auser = () => import(/* webpackChunkName: "admin" */ '@/components/admin/user')
const Apost = () => import(/* webpackChunkName: "admin" */ '@/components/admin/post')
const Acomment = () => import(/* webpackChunkName: "admin" */ '@/components/admin/comment')
const Anews = () => import(/* webpackChunkName: "admin" */ '@/components/admin/news')

// about
const about = () => import(/* webpackChunkName: "about" */ '@/components/about/about')
const usage = () => import(/* webpackChunkName: "about" */ '@/components/about/usage')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:cateid',
      name: 'category',
      component: Home
    },
    {
      path: '/tag/:tname',
      name: 'tag',
      component: Home
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification,
      meta: { checkLogin: true },
      redirect: '/notification/resent',
      children: [
        { path: 'resent', meta: { checkLogin: true }, component: resent },
        { path: 'system', meta: { checkLogin: true }, component: system }
      ]
    },
    {
      path: '/article/:aid',
      name: 'article',
      component: Article
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/u/:uid',
      name: 'user',
      component: User,
      redirect: '/u/:uid/home',
      children: [
        { path: 'home', meta: { 'isSelect': true }, component: uHome },
        { path: 'post', component: uPost },
        { path: 'fav', component: fav },
        // { path: 'comment', component: comment },
        { path: 'following', component: following },
        { path: 'follower', component: follower },
        { path: 'about', component: uAbout }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { checkLogin: true },
      redirect: '/setting/account',
      children: [
        { path: 'account', meta: { checkLogin: true }, component: account },
        { path: 'safety', meta: { checkLogin: true }, component: safety },
        { path: 'privacy', meta: { checkLogin: true }, component: privacy },
        { path: 'record', meta: { checkLogin: true }, component: record }
      ]
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish,
      meta: { checkLogin: true },
      redirect: '/publish/publish',
      children: [
        { path: 'publish', meta: { checkLogin: true }, component: publish },
        { path: 'manager', meta: { checkLogin: true }, component: manager },
        { path: 'edit', meta: { checkLogin: true, type: 'edit' }, component: publish }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Publish,
      meta: { checkAdmin: true },
      redirect: '/publish/post',
      children: [
        { path: 'post', meta: { checkAdmin: true }, component: Apost },
        { path: 'user', meta: { checkAdmin: true }, component: Auser },
        { path: 'comment', meta: { checkAdmin: true }, component: Acomment },
        { path: 'news', meta: { checkAdmin: true }, component: Anews }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      redirect: '/about/about',
      children: [
        { path: 'about', component: about },
        { path: 'usage', component: usage }
      ]
    },
    {
      path: '/counter',
      name: 'counter',
      component: counter
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})
