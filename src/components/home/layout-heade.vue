<template>
  <!-- 头部组件 -->
  <el-row class="layout-header" type="flex" align="middle" justify="space-between">
    <!-- 左侧 -->
    <el-col class="left" :span="6">
      <!-- 左侧图标 -->
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <!-- 这里personinfo.photo是变量所以要加:或v-bind -->
        <!-- <img src="../../assets/img/header.jpg" alt=""> -->
        <!-- <img :src="personinfo.photo" alt=""> -->
        <img :src="personinfo.photo?personinfo.photo: defaultImg" alt />
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click" @command="handleCommand">
        <!-- handleCommand 一个方法名 -->
          <!-- <span>山隔壁还是山</span> -->
          <span class="el-dropdown-link">{{personinfo.name}} <i class="el-icon-arrow-down el-icon--right"></i> </span>
          <!-- 下拉菜单  具名插槽 -->
          <el-dropdown-menu slot="dropdown">
            <!-- 下拉内容 -->
            <el-dropdown-item command="perInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="gitPath">Git地址</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      personinfo: {},
      defaultImg: require('../../assets/img/header.jpg')
    }
  },
  created () {
    // let token = window.localStorage.getItem('user-token') // 获取本地存储中的地址
    // console.log(token)

    this.$axios({
      url: '/user/profile'
    }).then(result => {
      this.personinfo = result.data
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        window.localStorage.removeItem('user-token')// 删除令牌
        this.$router.push('/login')// 跳转登录
      } else if (command === 'gitPath') {
        location.href = 'https://github.com/xuhaofeng1927/toutiao-89/commits/master'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  .left {
    font-size: 18px;
    .title {
      margin-left: 4px;
      color: #2c3e50;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
