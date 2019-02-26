<template>
  <add :edit="id"></add>
</template>

<script>
import Add from './add'
export default {
  components: {
    Add
  },
  data () {
    return {
      id: this.$route.query.id
    }
  }
}
</script>
