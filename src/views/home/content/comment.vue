<template>
  <el-card class="box-card">
    <breark-crumbs slot="header">
      <template slot="title">评论列表</template>
    </breark-crumbs>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="" label="标题" width="600"></el-table-column>
      <el-table-column prop="" label="评论状态"></el-table-column>
      <el-table-column prop="" label="总评论数"></el-table-column>
      <el-table-column prop="" label="粉丝评论数"></el-table-column>
      <el-table-column prop="" label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
</style>
