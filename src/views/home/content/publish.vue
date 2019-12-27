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
        <quill-editor class="quill" v-model="publishForm.content" ></quill-editor>
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
        <el-button type="primary" @click='publishAticle(false)'>发布</el-button>
        <el-button plain @click='publishAticle(true)'>存入草稿</el-button>
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
          { required: true, message: '频道列表不能为空', trigger: 'blur' }
        ]
      },
      channelOptions: [] // 接收频道数据
    }
  },
  // 监听传过来的路由地址参数$route（修改按钮传过来的）
  watch: {
    '$route': function (to, from) {
      if (Object.keys(to.params).length) { // Object.keys(对象)将对象的属性遍历生成数组
        // alert('修改') // 有参数修改
      } else {
        // alert('发表文章') // 没有参数，发表文章
        this.publishForm = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: -1, // 图片状态
            images: [] // 图片信息
          },
          channel_id: null // 频道列表
        }
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
    // 3，全局校验以及添加内容/修改内容
    publishAticle (draft) {
      this.$refs.articlesForm.validate((isOk) => {
        if (isOk) {
          let { Id } = this.$route.params
          this.publishOrArticler(Id, draft)
        //   if (Id) {
        //     // id存在,修改文章
        //     this.$axios({
        //       url: `/articles/${Id}`,
        //       method: 'put',
        //       params: {
        //         draft
        //       },
        //       data: this.publishForm
        //     }).then(() => {
        //       this.$router.push('/home/articles')
        //       this.$message({
        //         type: 'success',
        //         message: '修改成功'
        //       })
        //     })
        //   } else {
        //     // id不存在,发布文章
        //     this.$axios({
        //       url: '/articles',
        //       method: 'post',
        //       params: {
        //         //   draft: draft
        //         draft
        //       },
        //       data: this.publishForm
        //     }).then(() => {
        //       this.$router.push('/home/articles')
        //       this.$message({
        //         type: 'success',
        //         message: '上传成功'
        //       })
        //     })
        //   }
        }
      })
    },
    // id存在,修改文章 id不存在,发布文章
    publishOrArticler (id, draft) {
      this.$axios({
        url: id ? `/articles/${id}` : '/articles',
        method: id ? 'put' : 'post',
        params: {
          draft
        },
        data: this.publishForm
      }).then(() => {
        this.$router.push('/home/articles')
        this.$message({
          type: 'success',
          message: id ? '修改成功' : '上传成功'
        })
      })
    },
    //  根据传过来的id值获取指定的文章信息
    getalterArticle (Id) {
      this.$axios({
        url: `/articles/${Id}`
      }).then(result => {
        this.publishForm = result.data // 将获取到的内容传给表单数据
      })
    }
  },
  // 钩子函数实例创建后执行方法
  created () {
    this.getChannel() // 调用获取文章频道
    let { Id } = this.$route.params
    if (Id) {
      this.getalterArticle(Id)
    }
  }
}
</script>

<style lang='less' scoped>
.quill {
  height: 300px;
  margin-bottom: 100px;
}
</style>
