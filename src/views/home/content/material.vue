<template>
  <el-card class="box-card" shadow="never">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">素材管理</template>
    </breark-crumbs>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <div style="height: 160px;">
              <img :src="item.url" alt='' />
            </div>
            <el-row class="callget">
              <el-col :span="12">
                <div class="i">
                   <i class="el-icon-delete"></i>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="i">
                 <i class="el-icon-star-off"></i>
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
              <img :src="item.url" alt='' />
            </div>
            <el-row class="callget">
              <el-col :span="12">
                <div class="i">
                   <i class="el-icon-delete"></i>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="i">
                 <i class="el-icon-star-off"></i>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选择全部
      list: [] // 用来获取默认数据
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect'
        }
      }).then(result => {
        this.list = result.data.results
      })
    },
    handleClick () {
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
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
      margin-top:10px;
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
