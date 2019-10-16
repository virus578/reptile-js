<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper" style="display=inline-block">
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        <i class="el-icon-caret-bottom"/> -->
        <span class="work-id">{{ `你好【${workId}】` }}</span>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <!-- <el-dropdown-item>
            返回首页
          </el-dropdown-item> -->
        </router-link>
        <el-dropdown-item>
          <span class="block" @click="modify_password">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'workId'
    ])
  },
  mounted() {
    this.set_work_id(sessionStorage.getItem('job_number'))
  },
  methods: {
    ...mapMutations([
      'set_work_id'
    ]),
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      this.$confirm('此操作将清用户除数据,确认退出？', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(_ => {
          sessionStorage.removeItem('Token')
          this.$router.push('/login')
        })
        .catch(_ => {})
      // })
    },
    modify_password() {
      this.$emit('is_show', true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .work-id {
      line-height: 40px;
  }
}
</style>

