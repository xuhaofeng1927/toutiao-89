<template>
  <el-card class="articles-up" shadow="never">
    <breark-crumbs slot="header">
      <template slot="title">发表内容</template>
    </breark-crumbs>
    <!-- 1，快速构建表单结构 -->
    <el-form :label-position="labelPosition" label-width="80px" :model="publishForm">
      <el-form-item label="文章标题">
        <el-input v-model="publishForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="publishForm.region"></el-input>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-radio-group v-model="publishForm.radio">
          <el-radio :label="-1">自动</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道类型">
         <el-select v-model="publishForm.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button plain>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      publishForm: {
        name: '',
        region: '',
        type: '',
        radio: -1,
        channel_id: null // 频道列表
      },
      channelOptions: [],
      value: ''
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
    }
  },
  // 钩子函数实例创建后执行方法
  created () {
    this.getChannel() // 调用获取文章频道
  }
}
</script>

<style>
</style>
