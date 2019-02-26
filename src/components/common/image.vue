<template>
  <div class="image_view border" :class="bgClass" :style="bgStyle">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      default: 100,
      type: [String, Number]
    },
    height: {
      default: 100,
      type: [String, Number]
    },
    thumb: {
      default: '',
      type: [String]
    }
  },
  data () {
    return {
      state: 'loading'
    }
  },
  computed: {
    bgClass () {
      let bgClass = {}
      if (this.state === 'loading') {
        bgClass.loading = true
      } else if (this.state === 'error') {
        bgClass.error = true
      } else {
        bgClass.loaded = true
      }
      return bgClass
    },
    bgStyle () {
      let bgStyle = {
        width: parseInt(this.width) + 'px',
        height: parseInt(this.height) + 'px'
      }
      if (this.state === 'loaded') {
        bgStyle.backgroundImage = `url(${this.thumb})`
      }
      return bgStyle
    }
  },
  watch: {
    thumb: {
      handler: 'checkImage',
      immediate: true
    }
  },
  methods: {
    checkImage () {
      let img = document.createElement('img')
      img.src = this.thumb
      img.onload = () => {
        this.state = 'loaded'
      }
      img.onerror = () => {
        this.state = 'error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image_view{
  background-repeat: no-repeat;
  background-position: center;
  &.loading{
    background-size: 40px 40px;
    background: url('../../assets/images/loading.gif') no-repeat center center;
  }
  &.error{
    background: url('../../assets/images/error_img.jpeg') no-repeat center center;
    background-size: cover;
  }
  &.loaded{
    background-size: contain;
  }
  &.border{
    border:1px solid #dedede;
  }
}
</style>
