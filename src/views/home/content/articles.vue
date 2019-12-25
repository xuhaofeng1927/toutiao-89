<template>
  <div>
    <el-card class="articles-up" shadow="never">
      <!-- 面包屑 -->
      <breark-crumbs slot="header">
        <template slot="title">内容列表</template>
      </breark-crumbs>
      <!-- el-row 行 -->
      <el-row class="searchTool">
        <el-col :span="2">
          <span>文章状态</span>
        </el-col>
        <el-col :span="22">
          <!-- <p>文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部</p> -->
          <el-radio-group v-model="formData.status" @change="changeCondition">
            <!-- 全部这个5是默认的,在传参的时候判断一下 是不是5 如果是5 就传个null -->
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="searchTool">
        <el-col :span="2">
          <span>频道列表</span>
        </el-col>
        <el-col :span="22">
          <el-select v-model="formData.channel_id" placeholder="请选择" @change="changeCondition">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="searchTool">
        <el-col :span="2">
          <span>时间选择</span>
        </el-col>
        <el-col :span="22">
          <el-date-picker
           @change="changeCondition"
            value-format='yyyy-MM-dd'
            v-model="formData.dataValue"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"

          ></el-date-picker>
        </el-col>
      </el-row>
    </el-card>
    <!-- 此刻的class类名和上面的类名一样因为都是卡片 -->
    <el-card class="articles-under" shadow="never">
      <el-row slot="header">
        <span>共找到1000条符合条件的内容</span>
      </el-row>
      <el-row class="articles-content" v-for="item in articlesList" :key="item.id.toString()">
        <el-col :span="18">
          <el-row type="flex" justify="start" :gutter="10">
            <el-col class="articles-img" :span="8">
              <!-- <img :src="defaultimg" alt=""> //见鬼了这行代码不能用-->
              <!-- <img :src="defaultimg" alt=""> -->
              <!-- 当传入的的图片数据长度存在时，显示第一张图片，不是显示默认图片 -->
              <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
            </el-col>
            <el-col :span="16">
              <div class="articles-text">
                <span>{{item.title}}</span>
                <el-tag class="tag" :type="item.status | transTypehint">{{item.status | tranStatus}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="right" type="flex" justify="end">
            <span>
              <i class="el-icon-edit"></i>修改
            </span>
            <span>
              <i class="el-icon-delete"></i> 删除
            </span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提前定义一个对象，用于后面获取数据时请求参数时调用
      formData: {
        status: 5, // 默认为5为选中全部， 状态
        channel_id: null, // 默认为空，频道
        dataValue: [] // 默认为空，后面接受参数，日期
      },
      channelOptions: [], // 频道列表
      defaultImg: require('../../../assets/bdlg.jpg'), // 3,默认图片地址
      articlesList: [],
      loading: false
    }
  },
  filters: {
    // 4,转换状态
    tranStatus: function (value) {
      switch (value) {
        // <!-- <p>文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部</p> -->
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    transTypehint: function (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'warning'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 2,获取文章频道
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channelOptions = result.data.channels
      })
    },
    // 1,获取文章列表
    getAticles (params) {
      this.$axios({
        url: '/articles',
        params // ES6 的写法
      }).then(result => {
        this.articlesList = result.data.results
      })
    },
    // 改变条件时
    changeCondition () {
      alert('开始请求了')
      this.loading = true
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 疑问：为什么这里必须是nul它和空字符串有什么区别？
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dataValue.length ? this.formData.dataValue[0] : null, // Bug:没有写formData
        end_pubdate: this.formData.dataValue.length > 1 ? this.formData.dataValue[1] : null
      }
      this.getAticles(params) // 传入参数重新获取数据
      this.loading = false
      alert('请求回来了，看看有问题吗')
    }
  },
  // 实例创建后调用方法
  created () {
    this.getChannel()
    this.getAticles()
  }
}
</script>

<style lang='less' scoped>
.articles-up {
  .searchTool {
    height: 60px;
    padding-left: 40px;
    display: flex;
    align-items: center;
  }
}
.articles-under {
  margin-top: 20px;
  .articles-content {
    padding-top: 10px;
    height: 160px;
    border-bottom: 1px solid rgb(226, 226, 226);
    .articles-img {
      width: 180px;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .articles-text {
      height: 100%;
      padding: 15px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tag {
        width: 60px;
        text-align: center;
      }
      .date {
        font-size: 12px;
        color: rgb(143, 142, 142);
      }
    }
    .right {
      padding: 15px 0;
      span {
        margin-left: 8px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
