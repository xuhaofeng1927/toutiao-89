<template>
  <el-card class="box-card" shadow="never">
    <breark-crumbs slot="header">
      <template slot="title">评论列表</template>
    </breark-crumbs>
    <el-table :data="tableListData" stripe style="width: 100%" fit>
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column :formatter="formatterJudge" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button type="text">{{  obj.row.comment_status ? '关闭评论' : '打开评论'  }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableListData: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.tableListData = result.data.results
        console.log(this.tableListData)
      })
    },
    formatterJudge (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
