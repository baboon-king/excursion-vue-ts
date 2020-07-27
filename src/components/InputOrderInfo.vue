<template>
  <el-form style="width:80%px;margin: 0 auto;" :model="newValue" :rules="rules" ref="ruleForm" label-width="120px">
    <el-form-item label="出行时间">
      <el-date-picker :style="{'width': formItemWidth}" v-model="newValue.outTime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"></el-date-picker>
    </el-form-item>
    <el-form-item label="回游时间">
      <el-date-picker :style="{'width': formItemWidth}" v-model="newValue.getTime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"></el-date-picker>
    </el-form-item>
    <el-form-item label="目的地">
      <el-select :style="{'width': formItemWidth}" v-model="newValue.destination" filterable clearable placeholder="请选择(可搜索)">
        <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="人数">
      <el-input-number :style="{'width': formItemWidth}" v-model="newValue.peopleNum" :controls="!isMobileOrPc"></el-input-number>
    </el-form-item>
    <el-form-item label="预算价格">
      <el-input-number :style="{'width': formItemWidth}" v-model="newValue.budget" :precision="2" :controls="!isMobileOrPc"></el-input-number>
    </el-form-item>
    <el-form-item label="总价格">
      <el-input-number :style="{'width': formItemWidth}" v-model="newValue.countPrice" :precision="2" :controls="!isMobileOrPc"></el-input-number>
    </el-form-item>
    <el-form-item label="备注">
      <el-input :style="{'width': formItemWidth}" type="textarea" row="3" resize="fal" v-model="newValue.remark"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Model, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class InputOrderInfo extends Vue {
  @Model('input', { type: Object }) readonly value!: string
  private newValue = this.value

  @Watch('newValue')
  handleChange(newVal: string) {
    this.$emit('input', newVal)
  }

  readonly formItemWidth = '80%'

  private citys = this.$utils.citys
  private isMobileOrPc: boolean = this.$utils.isMobileOrPc()

  private rules = {
    budget: [{ required: true, message: '请输入预算', trigger: 'blur' }],
    countPrice: [{ required: true, message: '请输入价格', trigger: 'change' }],
    destination: [{ required: true, message: '请填写目的地', trigger: 'blur' }],
    getTime: [{ required: true, message: '请输入回游时间', trigger: 'change' }],
    outTime: [{ required: true, message: '请填写出行时间', trigger: 'blur' }],
    peopleNum: [{ required: true, message: '请输入出行人数', trigger: 'change' }]
    // remark: [{ required: true, message: '请填写备注', trigger: 'blur' }]
  }

  pickerOptions = {
    shortcuts: [
      {
        text: '今天',
        onClick(picker: Vue) {
          picker.$emit('pick', new Date())
        }
      },
      {
        text: '昨天',
        onClick(picker: Vue) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      },
      {
        text: '一周前',
        onClick(picker: Vue) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }
    ]
  }

  mounted() {}
  beforeDestroy() {}

  // 提交表单
  submitForm() {
    const elForm: any = this.$refs['ruleForm']
    elForm.validate(async (valid: boolean) => {
      if (valid) {
        const data: number[] = await this.$axios.post<number[]>('/order/save-order', this.value)
        if (data[0] === 1) {
          this.$message.success('订单保存成功')
          this.$emit('closeDialog');
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
