<template>
  <el-card class="articles-up" shadow="never">
    <breark-crumbs slot="header">
      <template slot="title">发表内容</template>
    </breark-crumbs>
    <!-- 1，快速构建表单结构 -->
    <el-form label-position="right" ref='articlesForm' label-width="100px" :model="publishForm" :rules=" publishrules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="publishForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop='content'>
        <el-input v-model="publishForm.content"></el-input>
      </el-form-item>
      <el-form-item label="文章封面" prop="type">
        <el-radio-group v-model="publishForm.cover.type">
          <el-radio :label="-1">自动</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道类型" prop="channel_id">
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
        <el-button type="primary" @click='publishAticle'>发布</el-button>
        <el-button plain @click='publishAticle'>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表单内容数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: -1, // 图片状态
          images: [] // 图片信息
        },
        channel_id: null // 频道列表
      },
      //   表单校验规则
      publishrules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, message: '内容不少于五个字', trigger: 'blur' }, // 最小字段规则
          { max: 30, message: '内容以达到最大值', trigger: 'blur' } // 最大字段规则
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        type: [],
        channel_id: [
          { required: true, message: '频道列表不能为空' }
        ]
      },
      channelOptions: [] // 接收频道数据
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
    // 3，全局校验以及添加内容
    publishAticle () {
      this.$refs.articlesForm.validate((isOk) => {
        if (isOk) {
          alert('校验成功')
        }
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
