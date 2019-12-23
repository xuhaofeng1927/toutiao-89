<template>
  <el-card class="box-card" shadow="never">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">评论列表</template>
    </breark-crumbs>
    <!-- table表格 -->
    <el-table :data="tableListData" stripe style="width: 100%" fit>
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column :formatter="formatterJudge" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrclose(obj.row)"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 6，分页栏 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-sizes="page.pageSize"
        :current-page="page.currentPage"
        @current-change="cheagePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableListData: [],
      // 7，分页信息
      page: {
        total: 0, // 默认总条数
        currentPage: 1, // 默认当前页数，第一条页数
        pageSize: 10 // 默认每页条数,好像默认就是10
      }
    }
  },
  methods: {
    // 4，打开/关闭评论
    openOrclose (row) {
      // row 当前行数据
      let messStatus = row.comment_status ? '关闭' : '打开' // 根据状态取反
      this.$confirm(`您是否确定要${messStatus}评论吗`) // primise
        .then(() => {
          // alert(1)
          this.$axios({
            url: '/comments/status',
            method: 'put',
            params: {
              article_id: row.id.toString()
            }, // 5，JSONBig 大数字转换
            data: {
              allow_comment: !row.comment_status // 再次取反修改boolern值返回数据中
            }
          }).then(result => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.getComment()
          })
        })
    },

    // 1，获取评论数据
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // 请求列表信息数据
        this.tableListData = result.data.results
        // 8，请求总页数数据
        this.page.total = result.data.total_count
      })
    },
    // 9， 改变页数事件
    cheagePage (newPage) {
      // 当前页数等于点击页数
      this.page.currentPage = newPage
      // 重新获取数据
      this.getComment()
    },

    // 3， table表格不识别boolearn值  formatter 格式化内容
    formatterJudge (row, column, cellValue, index) {
      // row 当前行数据
      // column 当前列数据
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    // 2， 实例创建后调用方法
    this.getComment()
  }
}
</script>

<style>
</style>
