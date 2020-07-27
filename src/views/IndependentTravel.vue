<template>
  <div>
    <PageHeader :isSearch="false" content="自由行"></PageHeader>

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
export default class IndependentTravel extends Vue {
  readonly defaultEnableType: number = 3
  private pars: { level: number; keyword: string } = { level: this.defaultEnableType, keyword: '' }
  attractions: Attraction[] = []

  async mounted() {
    // this.attractions = await this.$axios.post<Attraction>('/attractions/attractionCustom?' + this.$utils.objToStrParams(this.pars))
    this.attractions = await this.$axios.post<Attraction>('/attractions/attractionCustom?customId=' + this.defaultEnableType)
  }

  //查询
  async query() {
    // this.btuStatus = true
    // this.attractions = await this.$axios.post<Attraction>('/attractions/attractionCustom?' + this.$utils.objToStrParams(this.pars))
    this.attractions = await this.$axios.post<Attraction>('/attractions/attractionCustom?customId=' + this.defaultEnableType)
    // this.btuStatus = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
