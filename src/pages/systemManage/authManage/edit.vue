<template>
  <add edit="id"></add>
</template>

<script>
import Add from './add'
export default {
  data () {
    return {
      id: this.$route.query.id
    }
  },
  components: {
    Add
  }
}
</script>
