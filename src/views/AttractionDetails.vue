<template>
  <div>
    <PageHeader :isSearch="false" content="景点详情"></PageHeader>

    <div class="attraction">
      <div class="attraction-item">
        <el-carousel height="200px" indicator-position="outside" :interval="4000" type="card">
          <el-carousel-item v-for="(img,index) in images" :key="index">
            <el-image :src="img"></el-image>
            <!-- <el-image :src="attraction.picUrl"></el-image> -->
          </el-carousel-item>
        </el-carousel>
        <el-link :title="attraction.name" class="attraction-name">{{attraction.name}}</el-link>
        <div class="attraction-price">
          推荐等级
          <span style="font-size:18px">{{attraction.enableLevel}}</span>
          级
        </div>
      </div>

      <div class="attraction-item">
        <el-row :gutter="10">
          <el-col :span="4">景点名称</el-col>
          <el-col :span="20">
            <h3>{{attraction.name}}</h3>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">景点简介</el-col>
          <el-col :span="20">{{attraction.brief}}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">景点类型</el-col>
          <el-col :span="20">{{custom}}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">推荐等级</el-col>
          <el-col :span="20" class="attraction-level">{{attraction.enableLevel}} 级</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">推荐类型</el-col>
          <el-col :span="20">{{attraction.enableType}}</el-col>
        </el-row>
      </div>
      <div class="attraction-item">
        <el-button type="primary" @click="dialogFormVisible = true">现在出发</el-button>
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog title="更多信息" :center="true" :visible.sync="dialogFormVisible" :width="isMobileOrPc ? '90%' : '50%' " ref="dialog">
      <InputOrderInfo ref="inputOrderInfo" v-model="form" @closeDialog="dialogFormVisible = false"></InputOrderInfo>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Attraction, ResponsePage, Order, Custom, UserInfo } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'
import InputOrderInfo from '@/components/InputOrderInfo.vue'

@Component({ components: { PageHeader, InputOrderInfo } })
export default class AttractionDetails extends Vue {
  private images: string[] = [
    'https://dimg04.c-ctrip.com/images/300516000000zrm8r3F18_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300j170000011fdunD7BF_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300211000000rn51vEE2E_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300h0o000000exz7p4FC4_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/30030v000000ju4is5E4B_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300s13000000v8jv4710F_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/30040s000000hwyeo4FFB_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300m0r000000hj8c09AE9_C_228_132.png',
    'https://dimg04.c-ctrip.com/images/30040s000000hwyeo4FFB_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300j170000011fdunD7BF_C_228_132.jpg',
    'https://images4.c-ctrip.com/target/20061c000001cb24yB152_C_228_132.jpg',
    'https://dimg04.c-ctrip.com/images/300h0o000000exz7p4FC4_C_228_132.jpg',
    'https://images4.c-ctrip.com/target/200o0g0000007xatnF595_C_228_132.jpg',
    'https://images4.c-ctrip.com/target/200g0h00000092bblE7A1_C_228_132.jpg',
    'https://dimg03.c-ctrip.com/images/200b0q000000gp5stFA3A_C_228_132.jpg',
    'https://images4.c-ctrip.com/target/200q14000000wdhte5FC4_C_228_132.jpg'
  ]
  private attraction: Attraction = {}
  private attractionId!: number
  // 获取 景点类型
  public get custom(): string {
    const customs: Custom[] = this.$store.state.customs
    const custom = Array.isArray(customs) && customs.find(el => el.id === this.attraction.custrom)

    if (!custom) {
      return '类型未知'
    }
    return custom!.name + ''
  }

  private isMobileOrPc: boolean = this.$utils.isMobileOrPc()
  private userInfo: UserInfo = this.$store.state.userInfo
  private dialogFormVisible: boolean = false
  private form: Order = {
    budget: 999,
    countPrice: 999,
    destination: '杭州',
    getTime: new Date(),
    outTime: new Date(),
    peopleNum: 1,
    // remark: 'string',

    enableDining: 0,
    enablePeople: 0,
    enableStay: 0,
    enableTraffic: 0,
    orderEnable: 0,
    gmtCreate: new Date(),
    gmtModified: new Date(),
    name: this.attraction.name,
    phone: this.userInfo.phone,
    outNum: 0,
    id: 0,
    userId: this.userInfo.id,
    username: this.userInfo.name
  }

  created() {
    this.attractionId = +this.$route.params.id
  }

  async mounted() {
    if (!this.attractionId) {
      this.$message.error('景点Id异常')
      return
    }
    this.attraction = await this.$axios.post<Attraction>(`/attractions/attrtionsById?id=${this.attractionId}`)
  }

  submitForm() {
    if (!this.userInfo || !this.userInfo.id) {
      this.$message.warning('您还未登录，请先登录吧')
      return
    }
    this.form.name=this.attraction.name;

    const inputOrderInfo: { submitForm: Function } = this.$refs['inputOrderInfo'] as any
    inputOrderInfo.submitForm()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.attraction {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.attraction-item {
  width: 600px;
  margin: 0 20px 20px;
  padding: 6px 9px 4px;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  z-index: 0;
}
.attraction-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.attraction-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.attraction-level {
  color: red;
}
.el-image {
  width: 100%;
  height: 200px;
  border-radius: 6px;
}
h3 {
  margin: 0;
  line-height: 30px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
