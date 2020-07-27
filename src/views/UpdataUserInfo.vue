<template>
  <div>
    <PageHeader :isSearch="false" content="个人信息"></PageHeader>

    <div class="form-container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="当前登录的是" prop="name">{{ruleForm.name}}</el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>

        <el-form-item label="名称" prop="uname">
          <el-input v-model="ruleForm.uname"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="男" border>男</el-radio>
          <el-radio v-model="ruleForm.sex" label="女" border>女</el-radio>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { UserInfo } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'

@Component({ components: { PageHeader } })
export default class UpdataUserInfo extends Vue {
  ruleForm: UserInfo = {
    uname: '',
    name: '',
    password: '',
    phone: '',
    sex: '男'
  }
  rules = {
    uname: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    phone: [{ required: true, message: '请输入手机号码', trigger: 'change' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
  }
  //mounted 钩子
  async mounted() {
    this.ruleForm = await this.$axios.post<UserInfo>('/user-info/query-info?id=' + this.userInfo.id)
  }
  // 获取userInfo
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
  submitForm(formName: string) {
    const elForm: any = this.$refs[formName]
    elForm.validate(async (valid: boolean) => {
      if (valid) {
        const data: UserInfo = await this.$axios.post<UserInfo>('/user-info/save' + this.$utils.objToStrParams(this.ruleForm), this.ruleForm)
        if (data) {
          const userInfo: UserInfo = this.ruleForm
          this.ruleForm.loginStatus = true
          this.$store.commit('commit', { userInfo: { userInfo } })
          window.sessionStorage.userInfo = JSON.stringify(userInfo)
          this.$router.replace({ name: 'home' })
          this.$message.success('更新成功')
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
  async resetForm(formName: any) {
    const elForm: any = this.$refs[formName]
    elForm.resetFields()
    this.ruleForm = await this.$axios.post<UserInfo>('/user-info/query-info?id=' + this.userInfo.id)
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
