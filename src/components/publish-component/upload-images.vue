<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部素材" name="all">
          <!-- 全部素材 -->
          <div class="img-list">
            <el-card class="img-card" v-for="item in list" :key="item.id" body-style="padding:10px;height:150px;">
                <img @click="clickImage(item.url)" :src="item.url" alt />
            </el-card>
          </div>
           <!-- 分页 -->
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>

      </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选择
      list: [],
      page: {
        total: 0, // 默认总条数
        currentPage: 1, // 默认当前页数，第一条页数
        pageSize: [8]// 默认每页条数,好像默认就是10
      }
    }
  },
  methods: {
    // 2，获取素材列表
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 3， 判断boolern值来确定all或者collect
          page: this.page.currentPage,
          per_page: this.page.pageSize[0]
        }
      }).then(result => {
        // 获取图片的数据
        this.list = result.data.results
        // 获取图片的总页数
        this.page.total = result.data.total_count
      })
    },
    //  3，分页点击改变页数事件
    cheagePage (newPage) {
      this.page.currentPage = newPage
      // 重新获取数据
      this.getMaterial()
    },
    // 4,点击图片时将图片传入父元素组件中
    clickImage (url) {
      //   需要将url地址传出去  子传父 $emit 自定义事件 => 携带参数传递给其父元素<cover-images>
      this.$emit('selectImage', url) // 自定义事件名这里不再强制小写
    }
  },
  created () {
    this.getMaterial() // 执行素材列表方法
  }
}
</script>

<style lang='less' scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .img-card {
      width: 150px;
      height: 150px;
      margin: 8px 13px;
      img {
        width: 100%;
        height: 100%
      }
    }
  }
</style>
