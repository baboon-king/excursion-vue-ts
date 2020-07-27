<template>
  <div class="nav">
    <el-menu :default-active="activeIndex" :router="true" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" :route="'/'">首页</el-menu-item>
      <el-menu-item index="2" :route="'/travelAround'">周边游</el-menu-item>
      <el-menu-item index="3" :route="'/independentTravel'">自由行</el-menu-item>
      <el-menu-item index="4" :route="'/familyTour'">亲子游</el-menu-item>
      <el-menu-item index="5" :route="'/5'">定制游</el-menu-item>
      <el-menu-item index="6" :route="'/product'">集市</el-menu-item>
      <MenuItemUser></MenuItemUser>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import MenuItemUser from '@/components/MenuItemUser.vue'

@Component({
  components: {
    MenuItemUser
  }
})
export default class Nav extends Vue {
  @Prop() private msg!: string

  private activeIndex: string = '1'

  created() {
    this.routeChange()
  }

  handleSelect(index: string) {
    this.activeIndex = index
  }
  @Watch('$route')
  routeChange() {
    // const routeName: string = this.$route.name!
    const routePath: string = this.$route.path!
    switch (routePath) {
      case '/':
        this.activeIndex = '1'
        break
      case '/travelAround':
        this.activeIndex = '2'
        break
      case '/independentTravel':
        this.activeIndex = '3'
        break
      case '/familyTour':
        this.activeIndex = '4'
        break
      case '/5':
        this.activeIndex = '5'
        break
      case '/product':
        this.activeIndex = '6'
        break

      default:
        this.activeIndex = ''
        break
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  max-width: 1333px;
  min-width: 700px;
  margin: 0 auto;
}
</style>
