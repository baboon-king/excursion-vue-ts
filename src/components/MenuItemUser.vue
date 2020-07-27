<template>
  <div class="user">
    <template v-if="!userInfo.loginStatus">
      <span>
        <el-link type="success" @click="toLogin">您好，请登录</el-link>
      </span>
      <span>
        <el-link type="primary" @click="toReg">注册</el-link>
      </span>
      <span>
        <el-avatar icon="el-icon-user" size="medium"></el-avatar>
      </span>
    </template>

    <template v-if="userInfo.loginStatus">
      <span>
        <el-link type="success">欢迎您，{{userInfo.name}}</el-link>
      </span>
      <span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="updataUserInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="userOrder">我的订单</el-dropdown-item>
            <el-dropdown-item divided>
              <el-link :underline="false" type="danger" @click="logout">退出登录</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { State } from 'vuex-class'
// eslint-disable-next-line no-unused-vars
import { UserInfo } from '../types'

@Component
export default class MenuItemUser extends Vue {
  get userInfo(): UserInfo {
    let userInfo: UserInfo = {}
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo)
      this.$store.commit('commit', { userInfo })
    }
    if (this.$store.state.userInfo) {
      userInfo = this.$store.state.userInfo
    }
    return userInfo
  }

  // 登出/注销登录
  logout() {
    this.$store.commit('commit', { userInfo: {} })
    window.sessionStorage.userInfo = ''
    this.$message.success('已退出登录')
    this.$router.push({ name: 'home' })
  }

  /**
   * 去注册
   */
  toReg() {
    this.$router.push({ name: 'reg' })
  }
  /**
   * 去登录
   */

  toLogin() {
    this.$router.push({ name: 'login' })
  }
  // 下拉框触发事件
  handleCommand(par: string) {
    this.$router.push({ name: par! })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  font-size: 14px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
}
.user:focus,
.el-dropdown-link :active {
  outline: none;
}
.user span {
  margin: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-link :hover {
  transform: scale(1.05);
  -webkit-transform: scale(1.05); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1.05); /*兼容-moz-引擎浏览器*/
}
.el-dropdown-link :active {
  transform: scale(1);
  -webkit-transform: scale(1); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1); /*兼容-moz-引擎浏览器*/
}
</style>
