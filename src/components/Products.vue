<template>
  <div class="product">
    <div class="product-item" v-for="(item, index) in list" :key="index" @click="toDetails(item.id)">
      <!-- fit="scale-down" -->
      <el-image :src="item.picUrl" lazy></el-image>
      <el-link :title="item.details" class="product-name">{{item.name+'|'+item.brief+'|'+item.details}}</el-link>
      <div class="product-price">
        <dfn>¥</dfn>
        {{item.price}}
        <em>起</em>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Prodeuct, ResponsePage } from '@/types/index'

@Component({ components: {} })
export default class Products extends Vue {
  @Prop({ type: Array })
  private list!: Prodeuct[]

  async mounted() {}
  // 去详情
  toDetails(id: number) {
    this.$router.push({ name: 'productDetails', params: { id: id + '' } })
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
  width: 290px;
  margin: 0 10px 10px;
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
