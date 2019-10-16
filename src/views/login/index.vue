<template>
  <div class="login">
    <div class="mask"/>
    <div class="content-login">
      <el-row :gutter="8">
        <el-col :span="12">
          <div class="slogan"/>
        </el-col>
        <el-col :span="12">
          <div class="fr">
            <div class="border-login">
              <div class="login-title">
                crawer
              </div>
              <div class="login-body">
                <div class="input-data user-icon">
                  <input
                    ref="username"
                    v-model="account"
                    class="input-box"
                    type="text"
                    placeholder="请输入账号">
                </div>
                <div class="input-data password-icon">
                  <input v-model="password" class="input-box" type="password" placeholder="请输入密码" @keyup.enter="login">
                </div>
                <div class="mt-sm"/>
              </div>
              <div class="sign-in" @click="login">
                登录
              </div>
            </div>
            <div class="company-name">
              深圳市利朗达科技有限公司
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { isvalidUsername } from '@/utils/validate'
import { login } from '@/api/reptile-login'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      account: '',
      password: '',
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          // this.$store.dispatch('Login', this.loginForm).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: this.redirect || '/' })
          // }).catch(() => {
          //   this.loading = false
          // })
          this.$router.push({ path: '/' })
        } else {
          return false
        }
      })
    },
    ...mapMutations([
      'set_work_id'
    ]),
    login() {
      const data = {
        user: this.account,
        password: this.password
      }
      login(data).then(res => {
        if (res.status) {
          this.set_work_id(res.job_number)
          sessionStorage.setItem('job_number', res.job_number)
          sessionStorage.setItem('rank', res.rank)
        }
        if (!res.status) {
          this.$message({
            type: 'error',
            message: res.message
          })
          return
        }
        this.$router.push({ path: this.$route.query.redirect || '/' })
      }).catch(res => {
        this.$message.error('请求服务器错误')
      })
    }
  }
}
</script>

<style lang="scss">
.login {
        height:100%;
        max-width:100%;
        background:url(../../assets/bj.jpg) no-repeat;
        background-size:cover;
        background-position:bottom center;
        font-family:'微软雅黑',Consolas,Monaco,monospace;
        .mask{
            position: absolute;
            top: 60px;
            left: 60px;
            width:160px;
            height:55px;
            background:url(../../assets/logo-2019-1-4-2.png) no-repeat center;
            background-size:cover;
            z-index: 555;
        }
        .content-login{
            position:absolute;
            top:18%;
            left:56%;
            height: 600px;
            width: 1200px;
            margin-left: -600px;
            z-index:9999;
            .slogan{
                margin-top:15%;
                h1{
                     font:normal 400% '微软雅黑',Consolas,Monaco,monospace;
                     color:#fff;
                 }
                @-webkit-keyframes type{
                    from { width: 0;}
                    to {width: 250px}
                }
                @keyframes type{
                    from { width: 0;}
                    to {width: 250px}
                }
                }
                }
        .company-name{
            margin-top:40px;
            font-size:18px;
            color:#E5E6E9;
            width: 437px;
            text-align:center;
        }
        .border-login {
            box-sizing: border-box;
            width: 415px;
            text-align:center;
            padding:44px;
            background:#fff;
            border-radius:5px;
            .login-title{
                font-size:25px;
                font-family:'微软雅黑',Consolas,Monaco,monospace;
                color:#00acac;
                position: relative;
                &:before, &:after {
                    content: '';                 /*CSS伪类用法*/
                    position: absolute;         /*定位背景横线的位置*/
                    top: 52%;
                    background: #00acac;       /*宽和高做出来的背景横线*/
                    width: 15%;
                    height: 2px;
                }
                &:before{
                    left: 8%;        /*调整背景横线的左右距离*/
                }
                &:after {
                    right: 8%;
                }
			}
			.sign-in{
                margin-top: 65px;
                height: 67px;
                line-height:50px;
                width:100%;
                background:url(../../assets/sign-in-icon.png) no-repeat;
                background-size:cover;
                background-position:center;
                text-align:center;
                font-size:25px;
                color:#fff;
                cursor:pointer;
                transition:all 0.2s;
                &:hover{
                    background:url(../../assets/sign-in-icon-active.png) no-repeat;
                    background-size:cover;
                    background-position:center;
                }
                &:active{
                    background:url(../../assets/sign-in-icon-active.png) no-repeat;
                    background-size:cover;
                    background-position:center;
                }
            }
            .login-body{
                width:100%;
                margin-top: 30px;
                .input-data{
                    box-sizing: border-box;
                    width: 100%;
                    height: 48px;
                    margin-top: 45px;
                    border-bottom:2px solid #d1d1d1;
                    padding-left:48px;
                    position:relative;
                    &.user-icon{
                        background:url(../../assets/user-new.png) no-repeat;
                        background-size:25px;
                        background-position:10px 8px;
                    }
                    &.password-icon{
                        background:url(../../assets/password-new.png) no-repeat;
                        background-size:25px;
                        background-position:10px 8px;
                    }
                    &.verification-icon{
                        background:url(../../assets/verification-new.png) no-repeat;
                        background-size:25px;
                        background-position:10px 8px;
                    }
                    .input-box{
                        box-sizing: border-box;
                        border: none;
                        outline: none;
                        width: 100%;
                        line-height: 44px;
                        color:#666;
                        display: inline-block;
                        font-size:16px;
                    }
                    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                        color: #d1d1d1;
                        font-size:14px;
                    }
                    ::-moz-placeholder { /* Mozilla Firefox 19+ */
                        color: #d1d1d1;
                        font-size:14px;
                    }
                    input:-ms-input-placeholder{
                        color: #d1d1d1;
                        font-size:14px;
                    }
                    input::-webkit-input-placeholder{
                              color: #d1d1d1;
                              font-size:14px;
                    }
                    .auth{
                        width:140px;
                        float:left;
                    }
                    .auth-code{
                        border-top-right-radius :3px;
                        border-bottom-right-radius :3px;
                        float: right;
                        height:100%;
                        /*height:100%;*/
                    }
                    .btn{
                        box-sizing: border-box;
                        border: none;
                        outline: none;
                        width: 100%;
                        height:100%;
                        padding: 0 22px;
                        line-height: 1;
                        background-color: #e4393c;
                        color:#fff;
                        opacity:1;
                        >span{
                            font:bold 200% Consolas,Monaco,monospace;
                        }
                        &:active{
                               color:#ddd;
                         }
                    }
                    .inimg{
                        width :18px;
                        height :21px;
                    }
                }
            }
        }
    }
</style>

