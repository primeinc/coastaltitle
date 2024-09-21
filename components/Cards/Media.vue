<template>
  <v-btn
    :class="setSize"
    class="media-card"
    @click="showImg"
  >
    <span class="figure">
      <img
        :src="bg"
        alt="img"
      >
    </span>
    <span class="property">
      <span class="title">
        {{ title }}
      </span>
      <span class="desc">
        {{ desc }}
      </span>
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
@import './card-style';
</style>

<script>
export default {
  props: {
    bg: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'medium',
    },
    showImg: {
      type: Function,
      default: () => false,
    },
  },
  computed: {
    setSize() {
      switch (this.size) {
        case 'small':
          return 'small';
        case 'big':
          return 'big';
        default:
          return 'medium';
      }
    },
  },
};
</script>
