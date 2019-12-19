<template>
  <el-container>
    <el-aside style="background-color: #353b4e; height:100vh;width:230px">
      <layoutAside></layoutAside>
    </el-aside>
    <el-container>
      <el-header>头部容器</el-header>
      <el-main>
        <h6>主要内容</h6>
        <router-view>二级路由</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/layout-aside'
export default {
  components: {
    layoutAside
  }
}
</script>
