<template>
  <div>
    <PageHeader :isSearch="false" content="我的订单"></PageHeader>
    <div class="order-list">
      <el-card shadow="hover" style="margin-bottom:20px;background:#F2F6FC" v-for="(item,index) in orders_page" :key="index">
        <el-row :gutter="12" type="flex" justify="space-between" align="center" style="margin-bottom:20px">
          <el-col :span="3">
            <h3>创建时间</h3>
          </el-col>
          <el-col :span="12">
            <h3>订单名称</h3>
          </el-col>
          <el-col :span="3">
            <h3>备注</h3>
          </el-col>
          <el-col :span="2">
            <h3>总价格</h3>
          </el-col>
          <el-col :span="2">
            <i class="el-icon-delete" style="color:red;font-size:25px" @click="deleteOrder(item.id)"></i>
          </el-col>
        </el-row>
        <el-row :gutter="12" type="flex" justify="space-between" align="center">
          <el-col :span="3">{{item.gmtCreate | dateTimeValFormater}}</el-col>
          <el-col :span="12" :title="item.name" class="order-name">{{item.name}}</el-col>
          <el-col :span="3">{{item.remark}}</el-col>
          <el-col :span="2">{{item.countPrice}}</el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="12" type="flex" justify="space-between" align="center" style="margin-bottom:20px">
          <el-col :span="3">
            <h4>下单时间</h4>
          </el-col>
          <el-col :span="3">
            <h4>目的地</h4>
          </el-col>
          <el-col :span="3">
            <h4>出行时间</h4>
          </el-col>
          <el-col :span="3">
            <h4>回游时间</h4>
          </el-col>
          <el-col :span="3">
            <h4>出行人数</h4>
          </el-col>
          <el-col :span="3">
            <h4>预算价格</h4>
          </el-col>
          <el-col :span="3">
            <h4>联系人</h4>
          </el-col>
          <el-col :span="3">
            <h4>联系电话</h4>
          </el-col>
        </el-row>
        <el-row :gutter="12" type="flex" justify="space-between" align="center" style="margin-bottom:20px">
          <el-col :span="3">{{item.gmtModified | dateTimeValFormater}}</el-col>
          <el-col :span="3">{{item.destination}}</el-col>
          <el-col :span="3">{{item.outTime | dateTimeValFormater}}</el-col>
          <el-col :span="3">{{item.getTime | dateTimeValFormater}}</el-col>
          <el-col :span="3">{{item.peopleNum}}</el-col>
          <el-col :span="3">{{item.budget}}</el-col>
          <el-col :span="3">{{item.username}}</el-col>
          <el-col :span="3">
            <a :href="'tel:'+item.phone">
              <i class="el-icon-phone"></i>
              {{item.phone}}
            </a>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page=" !page.total"
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      :total="page.total"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Order, ResponsePage, UserInfo } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'

type Page = { total: number; pageSize: number; pageNum: number }

@Component({
  components: { PageHeader },
  filters: {
    dateTimeValFormater(val: number): string {
      if (!val) {
        return ''
      }
      const date: Date = new Date(val)
      return date.toLocaleString()
    }
  }
})
export default class UserOrder extends Vue {
  private orders: Order[] = []
  private orders_page: Order[] = []
  private page: Page = { total: 0, pageSize: 3, pageNum: 1 }

  public get userId(): string {
    const userInfo: UserInfo = this.$store.state.userInfo
    return userInfo.id + ''
  }

  mounted() {
    this.query()
  }
  // 查询订单
  async query() {
    this.orders = await this.$axios.post<Order[]>('/order/user-order?userId=' + this.userId)
    if (!this.orders || this.orders.length === 0) {
      this.$message.info('没有查询到当前用户的订单信息')
      return
    }
    this.page.total = this.orders.length
    this.currentChange()
  }
  // 删除订单
  deleteOrder(id: number) {
    this.$confirm('此操作将永久删除该订单, 是否继续?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }).then(async () => {
      const data: number[] = await this.$axios.post<number[]>('/order/delete-order?orderId=' + id)
      if (data && data[0] === 1) {
        this.$message.success('删除成功')
        this.query()
      }
    })
  }

  // 翻页
  currentChange(currentPage: number = 1) {
    const pageSize = this.page.pageSize
    this.orders_page = this.orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-list {
  padding: 0 20px;
}
.order-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
