<template>
  <div class="layoutAside">
    <div class="logo">
      <a href>
        <img :src="changeover?defaultSmallImg:defaulBigImg" alt />
      </a>
    </div>
    <el-menu  router background-color="#353b4e"
      text-color="#adafb5"
      active-text-color='#ffd04b'
      :collapse="changeover"
      :style="{'width': changeover ? '60px' : '230px'}"
      style="border-right:none; transition:all 0.5s;"
    >
      <el-menu-item index='/home'>
      <i class='el-icon-s-home'></i>
      <span>首页</span>
      </el-menu-item>
      <el-submenu index=1>
        <!-- 具名插槽 -->
         <template slot='title'>
            <i class='el-icon-s-order'></i>
            <span >内容管理</span>
          </template>
        <!-- 放置 el-menu-item -->
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
        <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index=2>
         <template slot='title'>
           <i class='el-icon-s-flag'></i>
            <span>粉丝管理</span>
          </template>
        <el-menu-item index='/home/fansImg'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansPaint'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fansGen'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansList'>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index='/home/accountInfo'>
        <i class='el-icon-s-custom'></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['changeover'],
  // 接受父组件传过来的值，根据bonlern 值传递给 :collapse="changeover" el-menu 的默认属性
  // 根据changeover的boolern值是否水平折叠收起菜单
  data () {
    return {
      defaulBigImg: require('../../assets/img/logo_admin.png'),
      defaultSmallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
.layoutAside {
  // .el-menu-item {
  //   padding-left:60px !important;
  // }
  // .el-submenu__title span  {
  //   padding-left:40px !important;
  // }
  background-color: #323745;
  .logo {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
