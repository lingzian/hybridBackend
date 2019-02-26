<template>
  <div>
    <bread-crumb></bread-crumb>
    <worker v-if="type == '1'" :optionList="data"></worker>
    <bb-care v-else-if="type == '2'" :optionList="data"></bb-care>
    <house-work v-else-if="type == '3'" :optionList="data"></house-work>
    <bb-sister v-else-if="type == '4'" :optionList="data"></bb-sister>
    <dirver v-else-if="type == '5'" :optionList="data"></dirver>
    <foreign-dirver v-else :optionList="data"></foreign-dirver>
  </div>
</template>

<script>
import Worker from '../../components/position/worker'
import bbCare from '../../components/position/bbCare'
import houseWork from '../../components/position/houseWork'
import bbSister from '../../components/position/bbSister'
import dirver from '../../components/position/dirver'
import foreignDirver from '../../components/position/foreignDirver'
import { WorkerOption } from '@/assets/api/job'
export default {
  props: ['edit'],
  components: {
    Worker,
    bbCare,
    houseWork,
    bbSister,
    dirver,
    foreignDirver
  },
  data () {
    return {
      type: this.$route.query.type,
      data: null
    }
  },
  created () {
    let sendData = {
      id: this.$route.query.id || 0,
      type_id: this.type || 0
    }
    WorkerOption(sendData).then(res => {
      this.data = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/config/ui.scss';
.header{
  color: $publicColor;
}
</style>
