<template>
  <el-card class="box-card" shadow="never">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">素材管理</template>
    </breark-crumbs>
     <!-- 上传图片 -->
    <div class="upload">
      <el-upload :http-request="uploadImg" :show-file-list="false" action>
        <el-button type="primary" size="small">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-upload>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <div style="height: 160px;">
              <img :src="item.url" alt />
            </div>
            <el-row class="callget">
              <el-col :span="12">
                <div class="i">
                 <i class="el-icon-star-off"></i>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="i">
                   <i class="el-icon-delete"></i>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 收藏素材 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <div style="height: 160px;">
              <img :src="item.url" alt />
            </div>
            <el-row class="callget">
              <el-col :span="12">
                <div class="i">
                   <i class="el-icon-star-off"></i>
                </div>、
              </el-col>
              <el-col :span="12">
                <div class="i">
                  <i class="el-icon-delete"></i>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
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
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选择全部
      list: [], // 用来获取默认数据
      page: {
        total: 0, // 默认总条数
        currentPage: 1, // 默认当前页数，第一条页数
        pageSize: [10]// 默认每页条数,好像默认就是10
      },
      loading: false
    }
  },
  methods: {
    // 1,获取图片数据
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // 3， 判断boolern值来确定all或者collect
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
    // tab切换事件
    handleClick () {
      this.page.currentPage = 1 // 切换默认当前页数为1
      this.getMaterial()
    },
    //  4，分页点击改变页数事件
    cheagePage (newPage) {
      this.page.currentPage = newPage
      // 重新获取数据
      this.getMaterial()
    },
    // 上传图片数据
    uploadImg (filedata) {
      this.loading = true // 打开进度条
      let form = new FormData() // 定义一个form对象
      form.append('image', filedata.file) // 添加文件到formData
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: form // formData数据
      }).then(result => {
        //   说明已经上传成功了一张图片
        this.loading = false // 关闭进度条
        this.getMaterial()
      })
    }
  },
  // 2，实例创建后调用方法
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.box-card {
  position: relative;
  .upload {
    position: absolute;
    z-index: 2;
    right: 30px;
    top: 65px;
  }
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .img-card {
    width: 200px;
    height: 240px;
    margin: 10px 15px;
    img {
      width: 100%;
    }
    .callget {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .i {
        text-align: center;
        font-size: 26px;
        line-height: 30px;
      }
    }
  }
}
</style>
