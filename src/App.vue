<template>
  <!--  -->
  <div id="app" :style="{'position' : !isMobileOrPc ? 'static': ''}">
    <Container></Container>
    <el-backtop target="#app" :visibility-height="100" style="right: 100px; bottom: 150px;">UP</el-backtop>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Container from '@/views/Container.vue'
// eslint-disable-next-line no-unused-vars
import { Custom } from '@/types/index'

@Component({
  components: {
    Container
  }
})
export default class App extends Vue {
  public get isMobileOrPc(): boolean {
    return this.$utils.isMobileOrPc()
  }
  async mounted() {
    // 获取custom 集合
    const customs: Custom[] = this.$store.state.customs
    if (!customs || !Array.isArray(customs) || customs.length === 0) {
      const customs: Custom[] = await this.$axios.post<Custom[]>(`/custom/list`)
      this.$store.commit('commit', { customs: customs })
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  overflow-y: scroll;
}
@media screen and (max-width: 650px) {
  #app {
    position: absolute;
  }
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;

  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;

  font-size: 14px;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, 
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
