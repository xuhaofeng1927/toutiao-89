<template>
  <el-card class="box-card" shadow="never" body-style="padding: 0">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">账户信息</template>
    </breark-crumbs>
    <el-upload class="head-upload" action :show-file-list="false" :http-request="uploadImg">
      <img :src="accountInfoForm.photo?accountInfoForm.photo:defaultphoto" alt />
    </el-upload>
    <el-form class="accountInfoForm"
    ref="myInfoForm"
      label-position="left"
      label-width="80px"
      :model="accountInfoForm"
      :rules="InfoFormRule"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="accountInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="个人签名" prop='intro'>
        <el-input v-model="accountInfoForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮件" prop="email">
        <el-input v-model="accountInfoForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="accountInfoForm.mobile" disabled></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submitAccountForm">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultphoto: require('../../assets/img/header.jpg'),
      accountInfoForm: {
        name: '', // 用户名
        intro: '', // 个人签名
        email: '', // 邮箱
        mobile: '', // 手机号
        photo: '' // 头像
      },
      InfoFormRule: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, message: '用户名最少为两个字节' },
          { max: 10, message: '用户名最多为10个字节' }
        ], // 用户名
        intro: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ], // 个人签名
        email: [
          { required: true,
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确',
            trigger: 'blur' }
        ], // 邮箱
        mobile: [], // 手机号
        photo: [] // 头像
      }
    }
  },
  methods: {
    // 2,校验表单信息提交
    submitAccountForm () {
      this.$refs.myInfoForm.validate(isOk => {
        if (isOk) {
          // alert('校验成功')
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.accountInfoForm
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.getAccountInfo()
          })
        }
      })
    },
    // 1,获取个人账户信息
    getAccountInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.accountInfoForm = result.data
        this.$evenBus.$emit('synchronization') // 定义一个自定义事件
      })
    },
    // 3,上传头像
    uploadImg (params) {
      let form = new FormData()
      form.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: form
      }).then(result => {
        this.accountInfoForm.photo = result.data.photo
        this.$evenBus.$emit('synchronization') // 定义一个自定义事件
        this.$message({
          type: 'success',
          message: '上传成功'

        })
      })
    }
  },
  created () {
    this.getAccountInfo()
  }
}
</script>

<style lang="less" scoped>
.box-card {
    .accountInfoForm {
        margin-top:60px;
        margin-left:50px;
        position: relative;
    }
  min-height: 100vh;
  .el-input {
    width: 40%;
  }
  .head-upload {
    position: absolute;
    z-index: 2;
    right: 300px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
}
</style>
