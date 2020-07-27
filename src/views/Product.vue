<template>
  <div>
    <PageHeader :isSearch="false" content="集市商品"></PageHeader>

    <Products :list="products"></Products>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Prodeuct, ResponsePage } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'
import Products from '@/components/Products.vue'

@Component({
  components: { PageHeader, Products }
})
export default class Product extends Vue {
  readonly defaultEnableLv: number = 1
  private pars: { level: number; keyword: string } = { level: this.defaultEnableLv, keyword: '' }
  products: Prodeuct[] = []

  async mounted() {
    const data: ResponsePage<Prodeuct> = await this.$axios.post<ResponsePage<Prodeuct>>('/product/list')
    this.products = data.rows
  }
  //查询
  async query() {
    // this.btuStatus = true
    const data: ResponsePage<Prodeuct> = await this.$axios.post<ResponsePage<Prodeuct>>('/product/list' + this.$utils.objToStrParams(this.pars))
    this.products = data.rows
    // this.btuStatus = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
}
.product-item {
  width: 380px;
  margin: 0 20px 20px;
  padding: 6px 9px 4px;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}
.product-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  transform: scale(1.05);
  -webkit-transform: scale(1.05); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1.05); /*兼容-moz-引擎浏览器*/
}
.product-item:active {
  transform: scale(1);
  -webkit-transform: scale(1); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1); /*兼容-moz-引擎浏览器*/
}
.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product-price {
  padding-top: 5px;
  color: red;
}
.el-image {
  width: 100%;
  height: 200px;
  border-radius: 6px;
}
</style>
