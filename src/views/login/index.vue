<template>
  <div class="login">
    <el-card class="box-card">
      <!-- <h3>登录页面</h3> -->
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form style="margin-top:30px;">
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="验证码" style="width:66%"></el-input>
          <el-button style="float:right;" type="primary" plain>发送验证码</el-button>
        </el-form-item>
         <el-form-item>
             <el-checkbox v-model="checked">我已阅读并同意协议和隐私条款</el-checkbox>
        </el-form-item>
         <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  // background-image:('../../assets/img/login_bg.jpg');
  background: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 480px;
    height: 350px;
    .logo {
      margin: 0 auto;
      width: 200px;
      img {
        height: 44px;
      }
    }
  }
}
</style>
