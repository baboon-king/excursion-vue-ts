<template>
  <div class="page-header-container">
    <div class="page-header" :class="{ 'page-header-fixed' : pageHeaderFixed , 'page-header-no-fixed' : !pageHeaderFixed }">
      <el-page-header @back="$router.back()" :content="content"></el-page-header>
      <div class="search" v-if="isSearch">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="newValue" placeholder="搜索" style="max-width:170px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" style="width:100px" @click="handleClick" :disabled="btuStatus" :loading="btuStatus">
              <template v-if="btuStatus">搜索中</template>
              <template v-if="!btuStatus">搜索</template>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue, Emit, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class PageHeader extends Vue {
  @Model('input', { type: String }) readonly value!: string

  @Prop({ default: true }) private isSearch!: boolean
  @Prop({ default: false }) private btuStatus!: boolean
  @Prop({ type: String }) private content!: string

  private pageHeaderFixed: boolean = false
  private newValue = this.value

  @Watch('newValue')
  handleChange(newVal: string) {
    this.$emit('input', newVal)
  }
  // 提交submit 事件
  @Emit('submit')
  handleClick() {}

  mounted() {
    // 给window添加一个滚动滚动监听事件
    window.addEventListener('scroll', this.listener_throttle, true)
  }
  beforeDestroy() {
    // 移除监听事件
    window.removeEventListener('scroll', this.listener_throttle, true)
  }

  // 处理滑动
  handleScroll(event: Event) {
    if (!event.target) {
      return
    }
    const scrollTarget: { scrollTop: number } = event.target as any
    const scrollTop: number = scrollTarget.scrollTop
    const val: number = 100
    if (scrollTop > val) {
      this.pageHeaderFixed = true
    }
    if (scrollTop < val) {
      this.pageHeaderFixed = false
    }
  }

  // 监听函数 // 防抖效果
  readonly debounce = { timeout: 0, wait: 100 }
  listener_debounce(ev: Event) {
    if (this.debounce.timeout) {
      clearTimeout(this.debounce.timeout)
    }
    this.debounce.timeout = setTimeout(() => {
      this.handleScroll(ev)
    }, this.debounce.wait)
  }
  // 监听函数 // 节流效果
  readonly throttle = { gapTime: 100, lastTime: 0 }
  listener_throttle(ev: Event) {
    let _nowTime = +new Date()
    if (_nowTime - this.throttle.lastTime > this.throttle.gapTime || !this.throttle.lastTime) {
      this.handleScroll(ev)

      this.throttle.lastTime = _nowTime
    }

    // 到顶立即执行
    const scrollTarget: { scrollTop: number; clientHeight: number; scrollHeight: number } = ev.target as any
    if (scrollTarget.scrollTop === 0) {
      this.pageHeaderFixed = false
    }
    // // 快到底立即执行
    // if (scrollTarget.scrollHeight - (scrollTarget.scrollTop + scrollTarget.clientHeight) < 1) {
    //   this.pageHeaderFixed = true
    // }
    // 到底立即执行
    // if (scrollTarget.scrollTop + scrollTarget.clientHeight === scrollTarget.scrollHeight) {
    //   this.pageHeaderFixed = true
    // }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-header-container {
  height: 70px;
  padding: 10px 0 40px 0;
}

.page-header {
  z-index: 1;
  background: white;
  max-width: 1333px;
  min-width: 650px;
  display: flex;
  align-items: center;
  height: 60px;
  top: 0px;
  border-bottom: solid 1px #e6e6e6;
}

.page-header-fixed {
  position: fixed;
  width: calc(100% - 17px);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0px 12px 8px -12px #909399;
  border-radius: 0 0 10px 10px;
}
.page-header-no-fixed {
  transform: translateY(-0%);
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
@media screen and (max-width: 650px) {
  .page-header-no-fixed {
    position: fixed;
    width: calc(100% - 17px);
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-shadow: 0px 12px 8px -12px #909399;
    border-radius: 0 0 10px 10px;
  }
}
.search {
  margin: 0 50px;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
