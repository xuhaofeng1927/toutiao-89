<template>
  <el-container>
    <el-aside  :style="{'width': changeover ? '60px' : '230px'}" class="aside">
      <layoutAside :changeover="changeover"></layoutAside>
    </el-aside>
    <el-container>
      <el-header>
        <layoutHeade></layoutHeade>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 要写成与头部导航组件中一样的结构
      changeover: false
    }
  },
  created () {
    // 要写成与头部导航组件中一样的结构
    this.$evenBus.$on('changebin', () => {
      this.changeover = !this.changeover
    })
  }
}
</script>
<style lang="less" scoped>
  .aside {
    transition:all .5s;
    background-color: #353b4e;
    min-height:100vh;
  }
</style>
