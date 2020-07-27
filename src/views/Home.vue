<template>
  <div>
    <PageHeader v-model="pars.keyword" :btuStatus="btuStatus" @submit="query" content="热门推荐"></PageHeader>
    <Attractions :list="attractions"></Attractions>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line no-unused-vars
import { Attraction, ResponsePage } from '@/types/index'
import PageHeader from '@/components/PageHeader.vue'
import Attractions from '@/components/Attractions.vue'

@Component({
  components: { PageHeader, Attractions }
})
export default class Home extends Vue {
  private btuStatus: boolean = false
  readonly defaultEnableLv: number = 1
  private pars: { level: number; keyword: string } = { level: this.defaultEnableLv, keyword: '' }
  attractions: Attraction[] = []
  async mounted() {
    this.attractions = await this.$axios.post<Attraction>('/attractions/attractionLevel' + this.$utils.objToStrParams(this.pars))
  }

  //查询
  async query() {
    this.btuStatus = true
    this.attractions = await this.$axios.post<Attraction>('/attractions/attractionLevel' + this.$utils.objToStrParams(this.pars))
    this.btuStatus = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
