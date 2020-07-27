<template>
  <div>
    <PageHeader :isSearch="false" content="商品详情"></PageHeader>
    <div class="product">
      <div class="product-item">
        <el-carousel height="200px" indicator-position="outside" :interval="4000" type="card">
          <el-carousel-item v-for="(img,index) in images" :key="index">
            <el-image :src="img"></el-image>
            <!-- <el-image :src="product.picUrl"></el-image> -->
          </el-carousel-item>
        </el-carousel>
        <el-link :title="product.name + product.brief +product.details" class="product-name">{{product.name + product.brief + product.details || '商品1'}}</el-link>
        <div class="product-price">
          <dfn>¥</dfn>
          {{product.price || 999999}}
          <em>起</em>
        </div>
      </div>

      <div class="product-item">
        <el-row :gutter="10">
          <el-col :span="4">产品名称</el-col>
          <el-col :span="20">
            <h3>{{product.name + product.brief + product.details}}</h3>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">产品简介</el-col>
          <el-col :span="20">{{product.brief}}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">产品详情</el-col>
          <el-col :span="20">{{product.details}}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">产品价格</el-col>
          <el-col :span="20" class="product-price">
            <dfn>¥</dfn>
            {{product.price || 999999}}
            <em>起</em>
          </el-col>
        </el-row>
      </div>
<!-- 
      <div class="product-item">
        <el-button type="primary">立即购买</el-button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Attraction, ResponsePage } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'

@Component({ components: { PageHeader } })
export default class ProductDetails extends Vue {
  private product: Attraction = {}
  private productId!: number

  private images: string[] = [
    'https://dimg14.c-ctrip.com/images/730i0l000000d50b628F0_R_400_400.jpg',
    'https://dimg14.c-ctrip.com/images/730e0g000000860ec5FA1_R_400_400.jpg',
    'https://dimg14.c-ctrip.com/images/730r0v000000jkmntA37F_R_400_400.jpg',
    'https://dimg04.c-ctrip.com/images/730l1b000001bralqC022_R_400_400.jpg',
    'https://dimg04.c-ctrip.com/images/730r17000001334utC53E.png',
    'https://dimg04.c-ctrip.com/images/730e1b000001aju0cADCE.png'
  ]
  created() {
    this.productId = +this.$route.params.id
  }
  async mounted() {
    if (!this.productId) {
      this.$message.error('商品Id异常')
      return
    }
    this.product = await this.$axios.post<Attraction>(`/product/get-product-info?id=${this.productId}`)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.product-item {
  width: 600px;
  margin: 0 20px 20px;
  padding: 6px 9px 4px;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  z-index: 0;
}

.product-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-price {
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
