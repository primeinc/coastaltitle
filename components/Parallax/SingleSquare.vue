<template>
  <div class="parallax-wrap">
    <div class="testi inner-parallax">
      <div class="figure">
        <div v-if="loaded">
          <scroll-parallax
            :speed="0.2"
            direction="y"
          >
            <div class="parallax-square parallax-secondary-single" />
          </scroll-parallax>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './parallax-style.scss';
</style>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
  },
};
</script>
