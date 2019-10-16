<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="修改密码"
      width="30%"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="工号:" prop="workId">
          <span>{{ workId }}</span>
        </el-form-item>
        <el-form-item label="新密码:" prop="password">
          <el-input v-model="ruleForm.password"/>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="repassword">
          <el-input v-model="ruleForm.repassword"/>
        </el-form-item>
        <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="clear(),dialogVisible = false,submitForm('ruleForm')">提交</el-button>
        <el-button size="small" @click="clear(),dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { change_password } from '@/api/user-info'
export default {
  name: 'AppMain',
  props: {
    value: {}
  },
  data() {
    return {
      dialogVisible: false,
      new_password: '',
      re_password: '',
      ruleForm: {
        workId: this.workId,
        password: '',
        repassword: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'workId'
    ])
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  watch: {
    dialogVisible(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    handleClose(done) {
      this.clear()
      this.dialogVisible = false
    },
    clear() {
      this.new_password = this.ruleForm.password
      this.re_password = this.ruleForm.repassword
      this.ruleForm = {
        workId: '',
        password: '',
        repassword: ''
      }
    },
    submitForm() {
      if (this.new_password.length < 6 || this.re_password.length < 6) {
        this.$message.error('密码不能小于6位')
        return
      }
      if (this.new_password.length > 17 || this.re_password.length > 17) {
        this.$message.error('密码不能小于大于16位')
        return
      }
      if (this.new_password !== this.re_password) {
        this.$message.error('两次密码输入不一致,请重新输入密码')
        return
      }
      const data = { new_password: this.new_password }
      change_password(data).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        }
        this.$router.push('/login')
      })
        .catch(
          () => {
            this.$message.error('请求服务器错误')
          }
        )
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 110px);
  position: relative;
  overflow: hidden;
}
</style>
