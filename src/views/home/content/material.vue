<template>
   <el-card class="box-card" shadow="never">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">素材管理</template>
    </breark-crumbs>
    <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="first">全部素材</el-tab-pane>
    <el-tab-pane label="收藏素材" name="second">收藏素材</el-tab-pane>
  </el-tabs>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second'
    }
  }
}
</script>

<style>

</style>
