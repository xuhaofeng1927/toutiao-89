<template>
  <el-row>
    <el-col :span="6">
      <el-container>
        <el-aside>左侧容器</el-aside>
      </el-container>
    </el-col>
    <el-col :span="18">
      <el-container>
        <el-header>头部容器</el-header>
        <el-main>
          <h6>主要内容</h6>
          <router-view>二级路由</router-view>
          </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {}
}
</script>
