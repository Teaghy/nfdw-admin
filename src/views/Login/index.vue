
<template>
  <div class="login-container">
      <el-tabs v-model="activeName" class="top-title">
        <el-tab-pane label="用户登录" name="login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm">
              <h3 class="title">系统登录</h3>
              <el-form-item prop="account">
                <el-input type="text"  v-model="ruleForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
              </el-form-item>
            </el-form>         
        </el-tab-pane>
        <el-tab-pane label="立即注册" name="register">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm">
            <h3 class="title">注册账号</h3>
            <el-form-item prop="account">
              <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入账号或手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次确认密码"></el-input>
            </el-form-item> 
            <el-form-item style="width:100%;">
              <el-button type="primary" style="width:100%;" @click.native.prevent="registerSubmit" :loading="logining">注册</el-button>  
            </el-form-item>
          </el-form>         
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
  import {mapActions,mapMutations} from 'vuex';
  export default {
    name:'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.pass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        logining: false,
        activeName: 'login',
        ruleForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        ruleForm2: {
          account: '',
          pass: '',
          checkPass:''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      // window.location.reload()
    },
    methods: {
      ...mapMutations(['updateUserInfo']),
      ...mapActions(['login']),
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit(ev) {
        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
            sessionStorage.setItem('username',this.ruleForm.account)
            this.updateUserInfo(loginParams)
            this.$router.push({name: 'home', params:loginParams})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      registerSubmit(){
         this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
             this.$message({
              message: '账号:'+this.ruleForm2.account+' 密码:' + this.ruleForm2.checkPass,
              type: 'success'
            });
            this.$refs.ruleForm2.resetFields()
             this.activeName="login"
          } else {
            console.log('error submit!!');
            return false;
          }
        })
       
      },
    },
    computed:{
        
    }
  }
</script>
<style lang="less">
  .top-title{
    .el-tabs__nav.is-top{
      margin-left: 100px;
    }
  }
  .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
</style>
<style lang="less" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 20px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>