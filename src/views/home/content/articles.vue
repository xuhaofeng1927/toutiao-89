<template>
  <el-card class="articles">
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
        <el-radio-group v-model="formData.status">
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
        <el-select v-model="formData.channel_id" placeholder="请选择">
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
          v-model="formData.dataValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        {{formData.dataValue}}
      </el-col>
    </el-row>
  </el-card>
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
      channelOptions: []
    }
  },
  methods: {
    // 获取文章频道
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channelOptions = result.data.channels
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang='less' scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 40px;
    display: flex;
    align-items: center;
  }
}
</style>
