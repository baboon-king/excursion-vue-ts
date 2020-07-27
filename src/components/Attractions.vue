<template>
  <div class="attraction">
    <div class="attraction-item" v-for="(item, index) in list" :key="index" @click="toDetails(item.id)">
      <el-image :src="item.picUrl" lazy></el-image>
      <el-link :title="item.name" class="attraction-name">{{item.name}}</el-link>
      <div class="attraction-price">
        推荐等级
        <span style="font-size:18px">{{item.enableLevel}}</span>
        级
      </div>
    </div>
    <!-- 不足3三个补上3个 -->
    <!-- <template v-if="attractions.length < 3">
      <div v-for="item  in ['一','二','三']" :key="item" class="attraction-item"></div>
    </template>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Attraction, ResponsePage } from '@/types/index'

@Component({ components: {} })
export default class Attractions extends Vue {
  @Prop({ type: Array })
  private list!: Attraction[]
  async mounted() {}
  // 去详情
  toDetails(id: number) {
    this.$router.push({ name: 'attractionDetails', params: { id: id + '' } })
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
  width: 290px;
  margin: 0 10px 10px;
  padding: 6px 9px 4px;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}
.attraction-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  transform: scale(1.05);
  -webkit-transform: scale(1.05); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1.05); /*兼容-moz-引擎浏览器*/
}
.attraction-item:active {
  transform: scale(1);
  -webkit-transform: scale(1); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1); /*兼容-moz-引擎浏览器*/
}
.attraction-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.attraction-price {
  padding-top: 5px;
  color: red;
}
.el-image {
  width: 100%;
  height: 200px;
  border-radius: 6px;
}
</style>
