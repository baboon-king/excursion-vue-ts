<template>
  <div>
    <PageHeader :isSearch="false" content="注册"></PageHeader>

    <div class="form-container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

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
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
export default class Register extends Vue {
  ruleForm = {
    name: '',
    password: '',
    phone: '',
    sex: '男',
    uname: ''
  }
  rules = {
    name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    phone: [{ required: true, message: '请输入手机号码', trigger: 'change' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    uname: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 5, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ]
  }

  submitForm(formName: any) {
    const elForm: any = this.$refs[formName]
    elForm.validate(async (valid: boolean) => {
      if (valid) {
        // + this.$utils.objToStrParams(this.ruleForm)
        const data: UserInfo = await this.$axios.post<UserInfo>('/user-info/save', this.ruleForm)
        if (data) {
          this.$router.push({ name: 'login' })
          this.$message.success('注册成功，我们来登录吧！')
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
