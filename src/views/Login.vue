<template>
  <div>
    <PageHeader :isSearch="false" content="登录"></PageHeader>

    <div class="form-container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { UserInfo, ResponseData } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'

@Component({
  components: { PageHeader }
})
export default class Login extends Vue {
  ruleForm: UserInfo = {
    name: '',
    password: ''
  }
  rules = {
    name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }]
  }

  submitForm(formName: any) {
    const elForm: any = this.$refs[formName]
    elForm.validate(async (valid: boolean) => {
      if (valid) {
        const data: UserInfo = await this.$axios.post<UserInfo>('/user-info/login' + this.$utils.objToStrParams(this.ruleForm))
        if (data) {
          data.loginStatus = true
          this.$store.commit('commit', { userInfo: { data } })
          window.sessionStorage.userInfo = JSON.stringify(data)
          this.$router.replace({ name: 'home' })
          this.$message.success('登录成功')
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  resetForm(formName: any) {
    const elForm: any = this.$refs[formName]
    elForm.resetFields()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-container {
  width: 500px;
  text-align: left;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
