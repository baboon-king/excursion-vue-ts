<template>
  <el-container>
    <el-header :style="{'width' : isMobileOrPc ? '100%' : 'calc(100% - 17px)'}">
      <Nav></Nav>
    </el-header>

    <el-main>
      <transition name="fade">
        <router-view />
      </transition>
    </el-main>

    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

@Component({
  components: {
    Nav,
    Footer
  }
})
export default class Container extends Vue {
  public get isMobileOrPc(): boolean {
    return this.$utils.isMobileOrPc()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  padding-top: 60px;
  min-height: 100%;
}
.el-header {
  height: 60px;
  position: fixed;
  width: calc(100% - 17px);
  top: 0;
  z-index: 2;
  padding: 0;
}
.el-main,
.el-footer {
  width: 1333px;
  margin: 0 auto;
  text-align: center;
  padding: 0;
}
.el-main {
  text-align: center;
  overflow-y: hidden;
  min-width: 650px;
}
@media screen and (max-width: 1333px) {
  .el-main,
  .el-footer {
    width: 100%;
  }
}
</style>
