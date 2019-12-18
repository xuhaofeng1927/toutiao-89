<template>
  <div class="login">
    <el-card class="box-card">
      <!-- <h3>登录页面</h3> -->
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form style="margin-top:30px;" :model='ruleForm' :rules='loginRules' ref='myForm'>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input placeholder="验证码" style="width:66%"  v-model='ruleForm.code'></el-input>
          <el-button style="float:right;" type="primary" plain>发送验证码</el-button>
        </el-form-item>
         <el-form-item prop='checket'>
             <el-checkbox  v-model='ruleForm.checket'>我已阅读并同意协议和隐私条款</el-checkbox>
        </el-form-item>
         <el-form-item>
          <el-button style="width:100%" type="primary" @click='submitForm()'>登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        mobile: '',
        code: '',
        checket: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ],
        checket: [{
          validator: function (a, b, c) {
            if (b) {
              c()
            } else {
              c(new Error('你必须选中这个按钮才可以登录'))
            }
          }
        }]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          console.log('前端校验成功，请前往后端请求代码')
        }
      })
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
