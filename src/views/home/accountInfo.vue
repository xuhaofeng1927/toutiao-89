<template>
  <el-card class="box-card" shadow="never" body-style="padding: 0">
    <!-- 面包屑 -->
    <breark-crumbs slot="header">
      <template slot="title">账户信息</template>
    </breark-crumbs>
    <el-upload class="head-upload" action :show-file-list="false">
      <img :src="accountInfoForm.photo?accountInfoForm.photo:defaultphoto" alt />
    </el-upload>
    <el-form class="accountInfoForm"
      label-position="left"
      label-width="80px"
      :model="accountInfoForm"
      :rules="InfoFormRule"
    >
      <el-form-item label="用户名">
        <el-input v-model="accountInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="个人签名">
        <el-input v-model="accountInfoForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮件">
        <el-input v-model="accountInfoForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="accountInfoForm.mobile" disabled></el-input>
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
        name: [], // 用户名
        intro: [], // 个人签名
        email: [], // 邮箱
        mobile: [], // 手机号
        photo: [] // 头像
      }
    }
  },
  methods: {
    // 获取个人账户信息
    getAccountInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.accountInfoForm = result.data
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
    right: 300px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
}
</style>
