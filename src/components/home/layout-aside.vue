<template>
  <div class="layoutAside">
    <div class="logo">
      <a href>
        <img src="../../assets/img/logo_admin.png" alt />
      </a>
    </div>
    <el-menu  router background-color="#353b4e"
      text-color="#adafb5"
      active-text-color='#ffd04b'
      style=" width: 230px;
            border-right:none;"

    >
      <el-menu-item index='/home'>首页</el-menu-item>
      <el-submenu index=1>
        <!-- 具名插槽 -->
        <span slot="title">内容管理</span>
        <!-- 放置 el-menu-item -->
        <el-menu-item index='/home/publish'>发布文章</el-menu-item>
        <el-menu-item index='/home/articles'>内容列表</el-menu-item>
        <el-menu-item index='/home/comment'>评论列表</el-menu-item>
        <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index=2>
        <span slot="title">粉丝管理</span>
        <el-menu-item index='/home/fansImg'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansPaint'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fansGen'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansList'>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layoutAside {
  .el-menu-item {
    padding-left:60px !important;
  }
  .el-submenu__title span  {
    padding-left:40px !important;
  }
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
